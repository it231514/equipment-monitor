"use client";
import { useState } from "react";
import sensorApi from "./service/sensor.service";
import { Message } from "./dto/Message.dto";

export default function Home() {
  const [sensor, setSensor] = useState();
  const [sensorType, setSensorType] = useState();
  const [message, setMessage] = useState();
  const [messageValue, setMessageValue] = useState();

  async function getMessageData() {
    const mesages = await sensorApi.getMessage();
    setMessage(mesages);
  }
  async function getMessageValueData() {
    const mesages = await sensorApi.getMessageValue();
    setMessageValue(mesages);
  }
  async function getSensorData() {
    const mesages = await sensorApi.getSensor();
    setSensor(mesages);
  }
  async function getSensorTypeData() {
    const mesages = await sensorApi.getSensorType();
    setSensorType(mesages);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hallo</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <button onClick={getSensorData}>Sensor</button>
          <ul style={{ textAlign: "center" }}>
            {sensor &&
              sensor.map((item: Message) => {
                return (
                  <li
                    style={{
                      margin: "10px",
                      border: "1px solid white",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    key={item.Id}
                  >
                    {item.Project}
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <button onClick={getSensorTypeData}>Sensor Type</button>
          <ul style={{ textAlign: "center" }}>
            {sensorType &&
              sensorType.map((item: Message) => {
                return (
                  <li
                    style={{
                      margin: "10px",
                      border: "1px solid white",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    key={item.Id}
                  >
                    {item.Project}
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <button onClick={getMessageData}>Message</button>
          <ul style={{ textAlign: "center" }}>
            {message &&
              message.map((item: Message) => {
                return (
                  <li
                    style={{
                      margin: "10px",
                      border: "1px solid white",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    key={item.Id}
                  >
                    {item.Project}
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <button onClick={getMessageValueData}>Message Value</button>
          <ul style={{ textAlign: "center" }}>
            {messageValue &&
              messageValue.map((item: Message) => {
                return (
                  <li
                    style={{
                      margin: "10px",
                      border: "1px solid white",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    key={item.Id}
                  >
                    {item.Project}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </main>
  );
}
