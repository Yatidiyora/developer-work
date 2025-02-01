import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { ColumnLineSeriesProps } from "../../../common/types/interface/ChartRender.interface";

const columnLineSeriesChart = (
  displayData: any,
  rootTag: string,
  xCategoryField: string,
  seriesProps: ColumnLineSeriesProps[],
  xLabel?: string
) => {
  const root = am5.Root.new(rootTag);
  root.setThemes([am5themes_Animated.new(root)]);
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      paddingLeft: 0,
      layout: root.verticalLayout,
    })
  );

  const xRenderer = am5xy.AxisRendererX.new(root, {
    minGridDistance: 10,
    minorLabelsEnabled: false,
  });
  xRenderer.grid.template.set("visible", false);

  xRenderer.labels.template.setAll({
    maxWidth: xLabel ? 100 : 55, // Maximum width for each label
    oversizedBehavior: "wrap", // Wrap text if it exceeds maxWidth
    textAlign: "center", // Align the text in the center
    fontSize: "12px",
  });

  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: xCategoryField,
      renderer: xRenderer,
    })
  );

  xAxis.data.setAll(displayData);

  if (xLabel) {
    xAxis
      .get("renderer")
      .labels.template.adapters.add("html", (html, target) => {
        const dataItem: any = target.dataItem?.dataContext;

        if (dataItem) {
          // console.log("dataItem", dataItem);
          const str = xLabel;
          let result = str.replace(
            /{(.*?)}/g,
            (_, key) => dataItem[key] || `{${key}}`
          );
          return result;
        }
        return html;
      });
  }

  const seriesCreator = (props: ColumnLineSeriesProps) => {
    const {
      isLineSeries,
      isSmoothLineSeries,
      fontSize,
      opposite,
      gridVisible,
      min,
      max,
      numberFormat,
      name,
      valueYField,
      yStroke,
      strokeDasharray,
      strokeOpacity,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      cornerRadiusTL,
      cornerRadiusTR,
      cornerRadiusBL,
      cornerRadiusBR,
      strokeWidth,
      yFill,
      yVisible = true,
      categoryXField,
      colWidth,
      stroke,
      fill,
      boundschanged,
      fillProps,
      tooltip,
    } = props;
    const yRenderer = am5xy.AxisRendererY.new(root, { opposite });
    yRenderer.grid.template.set("visible", gridVisible);
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min,
        max,
        numberFormat,
        strictMinMax: true,
        calculateTotals: true,
        renderer: yRenderer,
      })
    );

    const renderToolTip = am5.Tooltip.new(root, {
      labelText: tooltip, // Tooltip format
      pointerOrientation: "vertical", // Ensures the pointer points to the correct column
    });

    yRenderer.grid.template.setAll({
      visible: gridVisible,
      stroke: yStroke,
      strokeDasharray,
      strokeOpacity,
    });

    yAxis.get("renderer").labels.template.setAll({
      fill: yFill,
      fontSize,
    });
    if (!yVisible) {
      yAxis.events.on("boundschanged", () => {
        const yRenderer = yAxis.get("renderer");
        if (yRenderer) {
          yRenderer.labels.each((label) => {
            label.set("forceHidden", true);
          });
        }
      });
    }
    if (boundschanged) {
      yAxis.events.on("boundschanged", () => {
        const yRenderer = yAxis.get("renderer");

        if (yRenderer) {
          // Update the visibility of labels
          yRenderer.labels.each((label) => {
            const dataItem = label.dataItem as any; // Ensure dataItem exists
            const value = dataItem?.get("value"); // Safely access 'value'

            if (value !== undefined && typeof value === "number") {
              if (value % boundschanged !== 0) {
                label.set("forceHidden", true); // Hide non-multiples of boundschanged
              } else {
                label.set("forceHidden", false); // Show multiples of boundschanged
              }
            }
          });

          // Update the visibility of grid lines
          yRenderer.grid.each((grid) => {
            const dataItem = grid.dataItem as any; // Ensure dataItem exists
            const value = dataItem?.get("value"); // Safely access 'value'

            if (value !== undefined && typeof value === "number") {
              if (value % boundschanged !== 0) {
                grid.set("forceHidden", true); // Hide non-multiples of boundschanged
              } else {
                grid.set("forceHidden", false); // Show multiples of boundschanged
              }
            }
          });
        }
      });
    }
    if (isLineSeries) {
      const series = chart.series.push(
        isSmoothLineSeries
          ? am5xy.SmoothedXLineSeries.new(root, {
              name,
              stacked: true,
              xAxis,
              yAxis,
              valueYField,
              categoryXField,
              stroke,
              fill,
              ...(tooltip && { tooltip: renderToolTip }),
            })
          : am5xy.LineSeries.new(root, {
              name,
              stacked: true,
              xAxis,
              yAxis,
              valueYField,
              categoryXField,
              stroke,
              fill,
              ...(tooltip && { tooltip: renderToolTip }),
            })
      );
      series.strokes.template.setAll({
        strokeWidth,
      });
      series.fills.template.setAll({
        visible: true,
        ...(fillProps?.stops && {
          fillGradient: am5.LinearGradient.new(root, {
            stops: fillProps?.stops?.map((stop) => {
              return {
                color: stop.color,
                opacity: stop.opacity,
              };
            }),
            rotation: fillProps?.rotation,
          }),
        }),
        ...(fillProps?.fillPattern && {
          fillPattern: am5.LinePattern.new(root, {
            ...fillProps?.fillPattern,
          }),
        }),
      });
      series.data.setAll(displayData);
      return series;
    } else {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          stacked: true,
          xAxis,
          yAxis,
          valueYField,
          categoryXField,
          stroke,
          fill,
          ...(tooltip && { tooltip: renderToolTip }),
        })
      );
      series.columns.template.setAll({
        width: am5.percent(colWidth ?? 50),
        shadowOffsetX,
        shadowOffsetY,
        shadowBlur,
        cornerRadiusTL,
        cornerRadiusTR,
        cornerRadiusBL,
        cornerRadiusBR,
        strokeOpacity,
        strokeWidth,
        ...(fillProps?.stops && {
          fillGradient: am5.LinearGradient.new(root, {
            stops: fillProps?.stops,
            rotation: fillProps?.rotation,
          }),
        }),
        ...(fillProps?.fillPattern && {
          fillPattern: am5.LinePattern.new(root, {
            ...fillProps?.fillPattern,
          }),
        }),
      });

      series.data.setAll(displayData);
      return series;
    }
  };

  const marginSeries = seriesProps.map((series) => seriesCreator(series));
  marginSeries
    .filter((series) => series instanceof am5xy.ColumnSeries)
    .forEach((series, seriesIndex) => {
      series.columns.template.adapters.add("layer", (layer, target) => {
        const dataContext = target.dataItem
          ?.dataContext as (typeof displayData)[0];
        const xCategory = dataContext[xCategoryField]; // Get the product (category)
        if (!xCategory) {
          return layer; // Fallback if no product is found
        }

        const columnPositions = marginSeries
          .filter((series) => series instanceof am5xy.ColumnSeries)
          .map((s) => {
            const dataItem = s.dataItems.find(
              (d) => d.get("categoryX") === xCategory
            );
            if (!dataItem) return Infinity;

            const column = dataItem.get("graphics");
            if (!column) return Infinity;

            return Number(column.get("y"));
          });

        const sortedPositions = [...columnPositions].sort((a, b) => a - b);
        const currentPosition = columnPositions[seriesIndex];
        return sortedPositions.indexOf(currentPosition);
      });
    });
  const cursor = chart.set(
    "cursor",
    am5xy.XYCursor.new(root, {
      behavior: "zoomX", // Adjust behavior as needed
    })
  );

  cursor.lineX.setAll({
    visible: false, // Hide the vertical cursor line
    strokeOpacity: 0, // Ensure no stroke is visible
  });

  cursor.lineY.setAll({
    visible: false, // Hide the horizontal cursor line
    strokeOpacity: 0, // Ensure no stroke is visible
  });

  chart.appear(1000, 100);
  marginSeries.forEach((series) => {
    series.appear();
  });
  return root;
};

export { columnLineSeriesChart };
