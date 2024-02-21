import appServiceInstance from "../../services/instance";

export default async function handler(req: any, res: any) {
  const response = await appServiceInstance.post("scans/new?config=head_body");
  res.status(200).json({
    data: response?.data,
  });
}
