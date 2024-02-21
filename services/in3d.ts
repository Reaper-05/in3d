export const handleScanIdGenerate = async () => {
  const response = await fetch("/api/scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result?.data?.id;
};


export const uploadData = async (scan_id: any, formData: any) => {
  const response = await fetch(
    `https://in3d-uploads-legacy-zlhq6agkjq-uc.a.run.app/upload/${scan_id}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const result = await response.json();
  return result;
};

export const fetchUploadResult = async (scanId: string) => {
  const response = await fetch(`/api/scans-result?scanId=${scanId}&type=${"glb"}`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};

export const scanStatus = async (scanId: string) => {
  const response = await fetch(`/api/get-scan-status?scanId=${scanId}`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};
