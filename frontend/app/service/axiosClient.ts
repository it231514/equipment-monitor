import axios from "axios";
import queryString from "query-string";

// const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/v1/`;
const baseUrl = `http://localhost:5000/api/v1/`;
const getToken = () => localStorage.getItem("accessToken");

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) return alert(err);
    throw err.response;
  }
);

export default axiosClient;
