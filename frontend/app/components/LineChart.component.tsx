import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Day", "Sensor A", "Sensor B", "Sensor C"],
  [1, 10, 12, 12.5],
  [2, 11.4, 10.5, 12.4],
  [3, 13.6, 12, 14],
  [4, 11.7, 18.8, 10.5],
  [5, 11.9, 17.6, 10.4],
  [6, 8.8, 13.6, 7.7],
  [7, 7.6, 12.3, 9.6],
  [8, 12.3, 29.2, 10.6],
  [9, 16.9, 42.9, 14.8],
  [10, 12.8, 30.9, 11.6],
];

export const options = {
  chart: {
    title: "Temperature Sensor Overview",
    subtitle: "in C°",
  },
};

export function LineChart() {
  return (
    <Chart
      style={{ background: "none" }}
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
