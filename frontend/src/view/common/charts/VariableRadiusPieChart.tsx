import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const donutWithRadialGradient = (
  rootTag: string,
  displayData: any[],
  text?: string,
  forceHidden?: boolean,
) => {
  const root = am5.Root.new(rootTag);
  root.setThemes([am5themes_Animated.new(root)]);

  let chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      layout: root.horizontalLayout,
      radius: am5.percent(70),
    })
  );

  let series = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
      alignLabels: false,
    })
  );

  let bgColor = root.interfaceColors.get("background");

  // Set the labels to display the value of each slice
  series.labels.template.setAll({
    text: "{value}", // Display the numeric value
    forceHidden,
    fontSize: "10px", // Adjust font size
    textAlign: "center",
    textType: "adjusted", // Ensures it fits within the slice
    radius: 40,
    inside: true,
    fill: am5.color("#FFFFFF"),
  });

  const calculatePieValue = (radius: number, value: number, high: number) => {
    const valueDifference = high - value;
    const scaleFactor = valueDifference / high;
    const minVisibleValue = radius * 0.4;
    const adjustedRadius = radius * (1.5 - scaleFactor);
    const finalValue = Math.max(minVisibleValue, adjustedRadius * (1 - 0.05));
    return Math.round(finalValue);
  };

  series.slices.template.adapters.add("radius", function (radius, target) {
    let dataItem = target.dataItem as any;
    let high = series.getPrivate("valueHigh");

    if (dataItem) {
      let value = dataItem.get("valueWorking", 0);
      return calculatePieValue(Number(radius), Number(value), Number(high));
    }
    return radius;
  });

  series.ticks.template.setAll({
    forceHidden: true,
  });

  series.slices.template.setAll({
    stroke: bgColor,
  });

  const sortedDisplayData = displayData.sort((a, b) =>
    a.value > b.value ? -1 : 1
  );

  series.slices.template.adapters.add("fill", (fill, target) => {
    const dataItem = target.dataItem?.dataContext as any;

    if (dataItem && dataItem.backgroundColor) {
      return am5.color(dataItem.backgroundColor); // Using custom color from data
    }

    return fill;
  });

  series.data.setAll(sortedDisplayData);

  let legend = chart.children.push(
    am5.Legend.new(root, {
      centerY: am5.percent(60),
      y: am5.percent(50),
      x: am5.percent(50),
      layout: root.verticalLayout,
    })
  );

  legend.valueLabels.template.set("forceHidden", true);

  legend.labels.template.setAll({
    // width: 80,
    oversizedBehavior: "wrap",
    height: 18,
    centerY: am5.percent(80),
  });
  legend.markerRectangles.template.set("forceHidden", true);

  legend.labels.template.adapters.add("html", (html, target) => {
    const dataItem = target.dataItem?.dataContext as any;

    if (dataItem) {
      const bg = dataItem.backgroundColor;
      // Replace placeholders in the custom string
      const customHtml = `<div class="forecast-legend"><div class="forecast-pie-indicator" style="background-color: ${bg};"></div><strong>${dataItem.category}</strong><span>$${dataItem.value}</span></div>`;

      return customHtml;
    }
    return html;
  });

  legend.data.setAll(series.dataItems);

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

  series.appear(1000, 100);
  return root;
};

export { donutWithRadialGradient };
