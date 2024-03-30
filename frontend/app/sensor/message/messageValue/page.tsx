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
import axiosClient from "../../../service/axiosClient";
import sensorApi from "../../../service/sensor.service";
import { MessageValue, SensorType } from "../../../interfaces/Response/Sensor";

export default function EquipmentPage() {
  const initialSenor: Array<MessageValue> = [];
  const [sensors, setSensors] = useState(initialSenor);
  useEffect(() => {
    sensorApi
      .getMessageValue()
      .then((sensorData: MessageValue[]) => setSensors(sensorData));
  }, []);
  return (
    <Grid
      container
      spacing={4}
      style={{
        marginTop: "60px",
        marginBottom: "80px",
        marginLeft: "60px",
        marginRight: "80px",
        width: "90%",
        minHeight: "90vh",
      }}
    >
      {sensors &&
        sensors.map((equipment: MessageValue) => (
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
                    Id: {equipment.Id}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Message Id: {equipment.MessageId}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Tag: {equipment.Tag}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Unit: {equipment.Unit}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Value: {equipment.Value}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
    </Grid>
  );
}
