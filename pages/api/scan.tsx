import appServiceInstance from "../../services/instance";

export default async function handler(req: any, res: any) {
  try {
    const response = await appServiceInstance.post(
      "scans/new?config=head_body"
    );
    res.status(200).json({
      data: response?.data,
    });
  } catch (error) {
    console.log(error, " scan error here");
    throw error;
  }
}
