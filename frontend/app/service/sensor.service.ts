import axiosClient from "./axiosClient";
import { Message } from "../dto/Message.dto";

const sensorApi = {
  getSensor: (params: any = {}) => axiosClient.get("sensor", params),
  getSensorType: (params: any = {}) => axiosClient.get("sensorType", params),
  getMessage: (params: any = {}) =>
    axiosClient.get<Message[]>("message", params),
  getMessageValue: (params: any = {}) =>
    axiosClient.get("messageValue", params),
};

export default sensorApi;
