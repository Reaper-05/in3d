import axios from "axios";

const appServiceInstance = axios.create({
  baseURL: process.env.BASE_URL || "https://api.developer.in3d.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

appServiceInstance.interceptors.request.use(
  async function (config) {
    config.headers.Authorization = `Bearer ${
      process.env.AUTHORIZATION_TOKEN ||
      "i47AztLard4kaWdkkOBMQ6HMUm17h4cYNXx8aKFtDpSK4D48tSEMSPJOVhEwpnh-5Y1W9jne85QkQoEtef03XA"
    }`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default appServiceInstance;
