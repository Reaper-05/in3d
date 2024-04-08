import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import {
  b64toBlob,
  getBase64Data,
  InitCamera,
  stopCamera,
} from "@/utils/common";
import { BodyScanCompleteProps } from "@/types";
import {
  APIKEY,
  MEMBER_NUMBER,
  PROVIDER,
  ScanCompleteOptions,
  SCANNER_ID,
} from "@/constant";
import {
  fetchUploadResult,
  handleScanIdGenerate,
  scanStatus,
  uploadData,
} from "@/services/in3d";
import { useInterval } from "@/utils/useInterval";
import { ErrorNotify, SuccessNotify } from "@/components/Toast";
import Loader from "@/components/Loader";
import {
  createNewScan,
  getAccessToken,
  registerAccount,
  registerScanner,
  reportOBJUploaded,
  setProfile,
  waitMeasurements,
} from "@/services/tg3d";

function BodyScanComplete(props: BodyScanCompleteProps) {
  const { video, retakeVideoRecording } = props;
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [scanId, setScanId] = useState<string>("");
  const [refreshInterval, setRefreshInterval] = useState<null | number>(null);
  const [scanResult, setScanResult] = useState({});
  const userAgent = window?.navigator?.userAgent;
  const isSafariMobile = userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
  const uploadFiles = async () => {
    if (loader) return;
    stopCamera();
    const imagesList = localStorage.getItem("imagesList") || "{}";
    const { front, left, right } = JSON.parse(imagesList);
    const frontImage = b64toBlob(getBase64Data(front));
    const leftImage = b64toBlob(getBase64Data(left));
    const rightImage = b64toBlob(getBase64Data(right));
    setLoader(true);
    const fetchVideo = await fetch(video);
    const videoBlob = await fetchVideo.blob();
    const files = [
      { name: "head/00000.jpg", bytes: frontImage },
      { name: "head/00001.jpg", bytes: leftImage },
      { name: "head/00002.jpg", bytes: rightImage },
      { name: "body/rgb.mp4", bytes: videoBlob },
    ];
    const scan_id = await handleScanIdGenerate();
    setScanId(scan_id);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file.bytes, file.name);
    });

    try {
      await uploadData(scan_id, formData)
        .then(async (response) => { })
        .catch((error) => {
          setLoader(false);
        })
        .finally(async () => {
          // tgScanner();
          setRefreshInterval(5000);
        });
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  useInterval(() => {
    if (scanId) {
      scanStatus(scanId).then(async (res: any) => {
        if (["completed", "failed"].includes(res?.data?.status)) {
          setRefreshInterval(null);
          if (res?.data?.status === "completed") {
            const result: any = await handleFetchResult(scanId);
            if (result) {
              setScanResult(result);
              SuccessNotify("Data uploaded");
              setLoader(false);
            }
          } else {
            setLoader(false);
            ErrorNotify(res?.data?.status);
          }
        }
      });
    }
  }, refreshInterval);

  const tgScanner = async () => {
    const payload = {
      member_number: MEMBER_NUMBER,
      provider: PROVIDER,
    };
    // Register account
    const userAccount = await registerAccount(APIKEY, payload);
    // Get access token
    const accessToken = await getAccessToken(APIKEY, userAccount);
    localStorage.setItem("accessToken", accessToken?.access_token);
    // Set profile
    const profilePayload = {
      nick_name: "Test",
      gender: "Male",
      birthday: "03",
    };
    const profileResult = await setProfile(APIKEY, profilePayload);
    if (profileResult?.status === 200) {
      // Register scanner
      const registerScannerPayload = {
        app_id: "eZnx9B4",
        sw_version: "1",
      };
      registerScanner(APIKEY, registerScannerPayload)
        .then((response) => console.log(response, "response"))
        .catch((error) => console.log(error));

      // Create new scan
      createNewScan(APIKEY, SCANNER_ID)
        .then((response) => { })
        .catch((error) => console.log(error));

      // Report OBJ uploaded
      reportOBJUploaded(APIKEY, "12", SCANNER_ID, {
        md5: "ZIPPED_OBJ_FILE_MD5",
      })
        .then((response) => { })
        .catch((error) => console.log(error));

      //  Wait measurements (long polling)
      waitMeasurements(APIKEY, "12", SCANNER_ID)
        .then((response) => { })
        .catch((error) => console.log(error));
    }
  };

  const handleFetchResult = async (id: string) => {
    return await fetchUploadResult(id || scanId).then((res: any) => {
      return res;
    });
  };

  const cameraRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    cameraInit();
  }, []);

  const cameraInit = async () => {
    const stream = await InitCamera();
    handleCameraInitiated(stream);
  };

  const handleCameraInitiated = (stream?: MediaStream) => {
    if (cameraRef.current) {
      cameraRef.current.srcObject = stream as MediaStream;
    }
  };

  return (
    <div className="mobile:px-5 px-5 h-full flex justify-between items-center flex-col relative">
      <h2 className="text-center mobile:mb-0 xsm:mb-1 font-semibold">
        Happy with Your Full-Body Scan?
      </h2>
      <div className="flex items-center justify-between mb-3 mt-1.5 w-full max-[767px]:justify-around">
        {ScanCompleteOptions?.map((item) => (
          <div key={item?.title}>
            <Image src={item?.image} alt="check" className="m-auto" />
            <p className="text-[12px] font-[500] max-w-[65px] mt-1 text-center text-black ">
              {item?.title}
            </p>
          </div>
        ))}
      </div>

      <div className="relative w-full emptyAreaHeight">
        {loader ? <Loader /> : null}
        <div className="w-full h-full bg-gray rounded-lg overflow-hidden">
          <video
            controls
            className=" h-full w-full bg-white object-cover videoPlayer"
            autoPlay={isSafariMobile as any}
          >
            <source src={video} type="video/mp4"></source>
          </video>
        </div>
      </div>

      <div className="flex justify-between w-full mt-3 items-end">
        <Button
          className="text-primary m-2"
          text="Take Again"
          type="secondary"
          handleOnClick={retakeVideoRecording}
        />
        <Button
          className="m-2 bg-indigo-500"
          text="Looks good!"
          type="primary"
          handleOnClick={() => uploadFiles()}
          isLoading={loader}
        />
      </div>
    </div>
  );
}

export default BodyScanComplete;
