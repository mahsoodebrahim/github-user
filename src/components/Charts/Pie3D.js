import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "pie3d", // The chart type
    width: "500", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Languages",
        decimals: 0,
        pieRadius: "35%",
        theme: "fusion",
        showLegend: false,
      },
      // Chart Data
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
