import axiosClient from "./axiosClient";

const authApi = {
  login: (params: any) => axiosClient.post("user/login", params),
  signIn: (params: any) => axiosClient.post("user/signIn", params),
  getUserData: (params: any) => axiosClient.get("user/getUserData", params),
};

export default authApi;
