import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import {
  RadarChartCreator,
  RadarChartProps,
} from "../../../common/types/interface/ChartRender.interface";

const semiCirclePiChart = (
  rootTag: string,
  displayData: any,
  text?: string,
  forceHidden?: boolean,
  hoverTag?: boolean
) => {
  const root = am5.Root.new(rootTag);

  root.setThemes([am5themes_Animated.new(root)]);

  let chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      startAngle: 180,
      endAngle: 360,
      layout: root.verticalLayout,
      innerRadius: am5.percent(60),
    })
  );

  let series = chart.series.push(
    am5percent.PieSeries.new(root, {
      startAngle: 180,
      endAngle: 360,
      valueField: "value",
      categoryField: "category",
      alignLabels: false,
    })
  );

  series.states.create("hidden", {
    startAngle: 180,
    endAngle: 180,
  });

  let bgColor = root.interfaceColors.get("background");

  // Set the labels to display the value of each slice
  series.labels.template.setAll({
    text: "{value}", // Display the numeric value
    forceHidden,
    fontSize: "18px", // Adjust font size
    textAlign: "center",
    textType: "adjusted", // Ensures it fits within the slice
    radius: 28,
    inside: true,
    fill: am5.color("#FFFFFF"),
  });

  series.slices.template.setAll({
    cornerRadius: 2,
    stroke: bgColor,
    strokeWidth: 3,
    templateField: "settings",
  });

  series.ticks.template.setAll({
    forceHidden: true,
  });
  if (hoverTag) {
    series.slices.template.set("tooltipText", "{value}");
  } else {
    series.slices.template.set("tooltipText", "");
  }
  series.slices.template.states.create("hover", {
    scale: 1,
  });
  series.slices.template.set("toggleKey", "disabled");

  if (text) {
    chart.seriesContainer.children.push(
      am5.Label.new(root, {
        textAlign: "center", // Center the text horizontally
        centerY: am5.percent(87), // Center vertically
        centerX: am5.p50, // Center horizontally
        text, // Adjusting the text styles
      })
    );
  }

  series.data.setAll(displayData);

  series.appear(1000, 100);
  return root;
};

const forecastPieCharts = (rootTag: string, props: RadarChartProps[]) => {
  const root = am5.Root.new(rootTag);

  root.setThemes([am5themes_Animated.new(root)]);

  const container = root.container.children.push(
    am5.Container.new(root, {
      layout: root.horizontalLayout,
      width: am5.percent(100),
      height: am5.percent(100),
    })
  );

  const createChart = (chartProp: RadarChartProps) => {
    const {
      xRadius,
      xInnerRadius,
      chartCenterY,
      labels,
      xStrokeOpacity,
      xStartAngle,
      xEndAngle,
      ticksVisible,
      ticksStrokeOpacity,
      gridVisible,
      labelsVisible,
      itemValues,
    } = chartProp;
    const chart = container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        radius: am5.percent(xRadius ?? 50),
        innerRadius: xInnerRadius ?? -15,
        centerY: am5.percent(chartCenterY ?? 20),
        // startAngle: xStartAngle ?? 180,
        // endAngle: xEndAngle ?? 360,
      })
    );

    labels?.forEach((label) => {
      chart.children.push(
        am5.Label.new(root, {
          text: label.text ?? "",
          fontSize: label.fontSize ?? "14px",
          fontWeight: label.fontWeight,
          x: am5.percent(label.x ?? 29),
          y: am5.percent(label.y ?? 16),
        })
      );
    });

    const axisRenderer = am5radar.AxisRendererCircular.new(root, {
      strokeOpacity: xStrokeOpacity ?? 0,
      startAngle: xStartAngle ?? 180,
      endAngle: xEndAngle ?? 360,
    });

    axisRenderer.ticks.template.setAll({
      visible: ticksVisible ?? true,
      strokeOpacity: ticksStrokeOpacity ?? 0.1,
    });

    axisRenderer.grid.template.setAll({
      visible: gridVisible ?? true,
    });

    const minMaxResult = itemValues?.reduce(
      (acc, item) => {
        acc.totalValue += item.itemValue;
        return acc;
      },
      { totalValue: 0 }
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: minMaxResult.totalValue ?? 100,
        strictMinMax: true,
        renderer: axisRenderer,
      })
    );
    xAxis.get("renderer").labels.template.set("visible", labelsVisible);

    const rangeItems = itemValues?.reduce(
      (acc: RadarChartCreator[], item, index) => {
        const startValue = index === 0 ? 0 : acc[index - 1].endValue;
        const endValue = startValue + item.itemValue;

        acc.push({
          startValue,
          endValue,
          color: item?.color,
          visible: item?.visible,
          fillOpacity: item?.fillOpacity,
          cornerRadius: item?.cornerRadius,
          bullet: item?.bullet,
        });
        return acc;
      },
      []
    );

    const createHand = (
      axis: am5xy.ValueAxis<am5xy.AxisRenderer>,
      value: number,
      radius: number,
      fill: string,
      stroke: string,
      strokeWidth: number,
      tooltipText: string,
      centerX: number
    ) => {
      const handDataItem = axis.makeDataItem({
        value: value,
      });
      const circleHand = am5.Circle.new(root, {
        radius: radius ?? 11, // Size of the circle
        fill: am5.color(fill ?? "#344BFD"), // Color of the circle
        stroke: am5.color(stroke ?? "#FFFFFF"),
        strokeWidth: strokeWidth ?? 3.5,
        tooltipText: tooltipText ?? "Indicator",
        centerX: am5.percent(centerX ?? 83),
      });
      const handFront = handDataItem.set(
        "bullet",
        am5xy.AxisBullet.new(root, {
          sprite: circleHand,
        })
      );
      axis.createAxisRange(handDataItem);
      return handFront;
    };

    rangeItems?.forEach((rangeValue) => {
      const rangeDataItem = xAxis.makeDataItem({
        value: rangeValue.startValue ?? 0,
        endValue: rangeValue.endValue ?? 65,
      });
      const range = xAxis.createAxisRange(rangeDataItem);
      const rangeFill = range.get("axisFill") as any;
      rangeFill.setAll({
        visible: rangeValue.visible,
        fill: am5.color(rangeValue.color ?? "#344BFD"),
        fillOpacity: rangeValue.fillOpacity ?? 1,
        cornerRadius: rangeValue.cornerRadius,
      });
      if (rangeValue.bullet) {
        createHand(
          xAxis,
          rangeValue.endValue,
          rangeValue.bullet.radius,
          rangeValue.bullet.fill,
          rangeValue.bullet.stroke,
          rangeValue.bullet.strokeWidth,
          rangeValue.bullet.text,
          rangeValue.bullet.centerX
        );
      }
    });
  };
  props.forEach((eachChartProp: any) => {
    createChart(eachChartProp);
  });
  return root;
};

export { semiCirclePiChart, forecastPieCharts };
