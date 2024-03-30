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
import axiosClient from "../../service/axiosClient";
import sensorApi from "../../service/sensor.service";
import { Message, SensorType } from "../../interfaces/Response/Sensor";
import { useRouter } from "next/navigation";

export default function EquipmentPage() {
  const router = useRouter();

  const initialSenor: Array<Message> = [];
  const [sensors, setSensors] = useState(initialSenor);
  useEffect(() => {
    sensorApi
      .getMessage()
      .then((sensorData: Message[]) => setSensors(sensorData));
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
        sensors.map((equipment: Message) => (
          <Grid item key={equipment.Id} xs={12} sm={6} md={4}>
            <CardActionArea
              onClick={() => {
                debugger;
                router.push("/sensor/sensorData");
              }}
            >
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
                    Project: {equipment.Project}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Raw Data: {equipment.RawData}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Sensor Id: {equipment.SensorId}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Sequence Nr: {equipment.SequenceNr}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Timestamp: {equipment.Timestamp}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
    </Grid>
  );
}
