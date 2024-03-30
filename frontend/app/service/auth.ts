import axiosClient from "./axiosClient";

const authApi = {
  login: async (
    params: any
  ): Promise<{ accessToken: string; refreshToken: string }> =>
    await axiosClient.post("auth/login", params),
  register: (params: any) => axiosClient.post("user", params),
  getUserData: () => axiosClient.get("user"),
  // getUserData: (params: any) => axiosClient.get("user/getUserData", params),
};

export default authApi;
