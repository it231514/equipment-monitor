"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import axiosClient from "../service/axiosClient";
import sensorApi from "../service/sensor.service";
import { Sensor } from "../interfaces/Response/Sensor";

export default function EquipmentPage() {
  const initialSenor: Array<Sensor> = [];
  const [sensors, setSensors] = useState(initialSenor);
  useEffect(() => {
    sensorApi
      .getSensor()
      .then((sensorData: Sensor[]) => setSensors(sensorData));
  }, []);
  return (
    <Grid
      container
      spacing={4}
      style={{
        marginTop: "60px",
        marginBottom: "80px",
        marginLeft: "80px",
        marginRight: "80px",
        width: "90%",
        minHeight: "90vh",
      }}
    >
      {sensors &&
        sensors.map((equipment: Sensor) => (
          <Grid item key={equipment.Id} xs={12} sm={6} md={4}>
            <CardActionArea component="a" href="#">
              <Card>
                {/* <CardMedia
                  component="img"
                  height="140"
                  image={equipment.image}
                  alt={equipment.title}
                /> */}
                <CardContent>
                  <Typography variant="h5" component="div">
                    SigfoxSensorId: {equipment.SigfoxSensorId}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Project: {equipment.Project}
                  </Typography>
                  <Typography variant="body2">
                    Branch: {equipment.Branch}
                  </Typography>
                  <Typography variant="body2">
                    Hall: {equipment.Hall}
                  </Typography>
                  <Typography variant="body2">
                    SensorTypeId: {equipment.SensorTypeId}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
    </Grid>
  );
}
