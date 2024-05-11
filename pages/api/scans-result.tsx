import appServiceInstance from "../../services/instance";

export default async function handler(req: any, res: any) {
  if (!req?.query?.scanId) {
    res.status(400).json({ error: "Invalid scanId" });
    return;
  }
  try {
    const response = await appServiceInstance.get(
      `scans/${req?.query?.scanId}/result?type=fbx`
    );

    res.status(200).json({
      data: response.data,
    });
  } catch (error: any) {
    res.status(500).json(error?.response?.data);
  }
}
