import axiosClient from "./axiosClient";
import { Message } from "../dto/Message.dto";
import {
  MessageValue,
  Sensor,
  SensorType,
  Message as ResMessage,
} from "../interfaces/Response/Sensor";

const sensorApi = {
  getSensor: async (): Promise<Sensor[]> => await axiosClient.get("sensor"),
  getSensorType: async (): Promise<SensorType[]> =>
    await axiosClient.get("sensorType"),
  getMessage: async (): Promise<ResMessage[]> =>
    await axiosClient.get("message"),
  getMessageValue: async (): Promise<MessageValue[]> =>
    await axiosClient.get("messageValue"),
  getMessageValuesForSensor: async (): Promise<any[]> =>
    await axiosClient.get("messageValuesForSensor"),
};

export default sensorApi;
