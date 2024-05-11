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
      "dSLJFxOLQLkukIUrsqkgXW7h212BvUpP9bsIsTmPf2eOTyyFoytY230WoTnvjpVc4OR-AUZ_1GslGfah_XJn2A"
    }`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default appServiceInstance;
