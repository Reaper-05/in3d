import tg3dServiceInstance from "./tg3dInstance";

export const registerAccount = async (
  apiKey: string,
  payload: { member_number: string; provider: string }
) => {
  const response = await tg3dServiceInstance.post(
    `mtm_users/users/register_member?apikey=${apiKey}`,
    payload
  );

  return response?.data;
};

export const getAccessToken = async (
  apiKey: string,
  payload: { username: string; provider: number; auth_token: string }
) => {
  const response = await tg3dServiceInstance.post(
    `users/auth?apikey=${apiKey}`,
    payload
  );

  return response?.data;
};

export const setProfile = async (
  apiKey: string,
  payload: { nick_name: string; gender: string; birthday: string }
) => {
  const response = await tg3dServiceInstance.post(
    `users/profile?apikey=${apiKey}`,
    payload,
    {
      headers: {
        "X-User-Access-Token": localStorage.getItem("accessToken"),
      },
    }
  );

  return response;
};

export const registerScanner = async (
  apiKey: string,
  payload: { app_id: string; sw_version: string }
) => {
  const response = await tg3dServiceInstance.post(
    `scanners?apikey=${apiKey}`,
    payload,
    {
      headers: {
        "X-User-Access-Token": localStorage.getItem("accessToken"),
      },
    }
  );

  return response;
};

export const createNewScan = async (apiKey: string, scannerId: string) => {
  const response = await tg3dServiceInstance.post(
    `scanners/${scannerId}/?apikey=${apiKey}`,
    {},
    {
      headers: {
        "X-User-Access-Token": localStorage.getItem("accessToken"),
      },
    }
  );

  return response;
};

export const reportOBJUploaded = async (
  apiKey: string,
  TID: string,
  scannerId: string,
  payload: { md5: string }
) => {
  const response = await tg3dServiceInstance.post(
    `scanners/${scannerId}/${TID}/finished?apikey=${apiKey}`,
    payload,
    {
      headers: {
        "X-User-Access-Token": localStorage.getItem("accessToken"),
      },
    }
  );

  return response;
};

export const waitMeasurements = async (
  apiKey: string,
  TID: string,
  scannerId: string
) => {
  const response = await tg3dServiceInstance.post(
    `scanners/${scannerId}/${TID}/wait_measurement?apikey=${apiKey}`,
    {},
    {
      headers: {
        "X-User-Access-Token": localStorage.getItem("accessToken"),
      },
    }
  );

  return response;
};
