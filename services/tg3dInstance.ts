import axios from "axios";

const tg3dServiceInstance = axios.create({
  baseURL: process.env.BASE_URL || "https://api.tg3ds.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

tg3dServiceInstance.interceptors.request.use(
  async function (config) {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default tg3dServiceInstance;
