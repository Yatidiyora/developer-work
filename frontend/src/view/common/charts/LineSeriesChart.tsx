import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import {
  LineChartRenderProps,
  RoundedLineSeriesProps,
} from "../../../common/types/interface/ChartRender.interface";

const lineSeriesChart = (
  displayData: any,
  rootTag: string,
  xCategoryField: string,
  seriesProps: LineChartRenderProps[],
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
    minGridDistance: 20,
    minorLabelsEnabled: false,
  });
  xRenderer.grid.template.set("visible", false);

  xRenderer.labels.template.setAll({
    maxWidth: xLabel ? 80 : 55, // Maximum width for each label
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
  xAxis.set("start", 0.029);
  xAxis.set("end", 0.972);

  const chartRenderCreator = (chartRenderProps: LineChartRenderProps) => {
    const {
      opposite,
      gridVisible,
      yStroke,
      strokeDasharray,
      strokeOpacity,
      min,
      max,
      numberFormat,
      yFill,
      yFontSize,
      yVisible = true,
      boundschanged,
      sName,
      sStacked,
      valueYField,
      categoryXField,
      sFill,
      sStroke,
      tooltip,
      fillOpacity,
      fillVisible,
      fillRotation,
      strokeWidth,
    } = chartRenderProps;
    const renderTooltip = am5.Tooltip.new(root, {
      labelText: tooltip, // Tooltip format
      pointerOrientation: "vertical", // Ensures the pointer points to the correct column
    });
    const yRender = am5xy.AxisRendererY.new(root, { opposite });
    yRender.grid.template.set("visible", gridVisible);
    yRender.grid.template.setAll({
      visible: gridVisible,
      stroke: yStroke,
      strokeDasharray,
      strokeOpacity,
    });
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min,
        max,
        numberFormat,
        strictMinMax: true,
        calculateTotals: true,
        renderer: yRender,
      })
    );
    yAxis.get("renderer").labels.template.setAll({
      fill: yFill,
      fontSize: yFontSize,
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

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: sName,
        stacked: sStacked,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField,
        categoryXField,
        fill: sFill,
        stroke: sStroke,
        ...(tooltip && { tooltip: renderTooltip }),
      })
    );
    series.fills.template.setAll({
      // fillOpacity, // Adjust opacity for a smoother gradient
      visible: fillVisible,
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          {
            color: sFill,
            opacity: fillOpacity ? fillOpacity[0] : 0.6,
          },
          {
            color: sFill,
            opacity: fillOpacity ? fillOpacity[1] ?? 0.3 : 0.3,
          },
          {
            color: sFill,
            opacity: fillOpacity ? fillOpacity[2] ?? 0.1 : 0.1,
          },
        ],
        rotation: fillRotation,
      }),
    });
    series.strokes.template.setAll({
      strokeWidth,
    });

    series.data.setAll(displayData);
    return series;
  };
  const seriesArray = seriesProps.map((props) => {
    return chartRenderCreator(props);
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
  seriesArray.forEach((eachSeries) => eachSeries.appear());
  return root;
};

const roundedBulletLineSeriesChart = (
  displayData: any,
  rootTag: string,
  xCategoryField: string,
  seriesProps: RoundedLineSeriesProps[],
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
    minGridDistance: 20,
    minorLabelsEnabled: false,
  });
  xRenderer.grid.template.set("visible", false);

  xRenderer.labels.template.setAll({
    maxWidth: xLabel ? 80 : 55, // Maximum width for each label
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
          console.log("dataItem", dataItem);
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

  xAxis.set("start", 0.025);
  xAxis.set("end", 0.972);

  const seriesCreator = (props: RoundedLineSeriesProps) => {
    const {
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
      yFill,
      yVisible = true,
      categoryXField,
      stroke,
      fill,
      fillOpacity,
      strokeWidth,
      rotation,
      boundschanged,
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
    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
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
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          {
            color: fill,
            opacity: fillOpacity ? fillOpacity[0] : 0.6,
          },
          {
            color: fill,
            opacity: fillOpacity ? fillOpacity[1] ?? 0.3 : 0.3,
          },
          {
            color: fill,
            opacity: fillOpacity ? fillOpacity[2] ?? 0.1 : 0.1,
          },
        ],
        rotation, // Vertical gradient
      }),
    });

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

    series.bullets.push(() => {
      // Create a container for the bullet
      const bulletContainer = am5.Container.new(root, {
        centerX: am5.p50,
        centerY: am5.p50,
      });

      // Create the outer circle (transparent ring effect)
      const outerCircle = am5.Circle.new(root, {
        radius: 3.2, // Outer circle size
        fill: am5.color(0xffffff), // White fill for the background
        stroke: stroke, // Border color matches the series stroke color
        strokeWidth: 6, // Thickness of the border
        strokeOpacity: 0.3, // Set transparency for the ring
        centerX: am5.p50,
        centerY: am5.p50,
      });

      // Create the inner circle (solid dot)
      const innerCircle = am5.Circle.new(root, {
        radius: 2, // Inner circle size
        fill: stroke, // Inner circle color matches the series stroke color
        centerX: am5.p50,
        centerY: am5.p50,
      });

      // Add the circles to the container
      bulletContainer.children.push(outerCircle);
      bulletContainer.children.push(innerCircle);

      // Return the bullet
      return am5.Bullet.new(root, {
        locationX: 0.5, // Position on the X-axis relative to the data point
        locationY: 0.5, // Position on the Y-axis to align with the line
        sprite: bulletContainer, // Set the container as the bullet's sprite
      });
    });

    series.data.setAll(displayData);
    return series;
  };

  const marginSeries = seriesProps.map((series) => seriesCreator(series));

  // Enable cursor and tooltip display
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

export { lineSeriesChart, roundedBulletLineSeriesChart };

