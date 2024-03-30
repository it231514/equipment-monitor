"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import sensorApi from "../../service/sensor.service"; // replace with your actual API module
import { Grid } from "@mui/material";

export default function SensorData() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    sensorApi.getMessageValuesForSensor().then((sensorData: any) => {
      const formattedData = sensorData.map((item: any, index: number) => ({
        Hours: parseFloat(item.value),
        timestamp: new Date(item.timestamp).toLocaleString(),
      }));
      debugger;
      console.log(formattedData);
      setSensors(formattedData);
    });
  }, []);

  return (
    <Grid
      container
      spacing={4}
      style={{
        marginTop: "200px",
        marginBottom: "80px",
        marginLeft: "80px",
        marginRight: "100px",
        width: "90%",
        minHeight: "90vh",
      }}
    >
      {/* <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={sensors}
          stackOffset="sign"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="pv" fill="#8884d8" stackId="stack" />
          <Bar dataKey="uv" fill="#82ca9d" stackId="stack" />
        </BarChart>
      </ResponsiveContainer> */}

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sensors}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" interval="preserveEnd" tickCount={1} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Hours" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie dataKey="value" data={sensors} fill="#8884d8">
            {sensors.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer> */}
    </Grid>
  );
}
