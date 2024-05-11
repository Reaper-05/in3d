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
import { toast } from "react-toastify";

function BodyScanComplete(props: BodyScanCompleteProps) {
  const { video, retakeVideoRecording } = props;
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [scanId, setScanId] = useState<string>("");
  const [refreshInterval, setRefreshInterval] = useState<null | number>(null);
  const [scanResult, setScanResult] = useState({});
  const userAgent = window?.navigator?.userAgent;
  const isSafariMobile = userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);

  const getBase64FromImg = async (url: string): Promise<any> => {
    const response = await fetch("https://i.postimg.cc/vB9w731t/front.jpg");
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();
    return blob;
    // const reader = new FileReader();

    // const readBlobAsDataURLSync = (blob: any): Promise<string> => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(blob);
    //   return new Promise((resolve, reject) => {
    //     reader.onloadend = () => {
    //       resolve(reader.result as string);
    //     };
    //     reader.onerror = reject;
    //   });
    // };

    // Call the synchronous function to read the Blob
    // return await readBlobAsDataURLSync(blob);
  };

  const foo = async () => {
    // front
    // https://i.postimg.cc/vB9w731t/front.jpg
    const frontNew = await getBase64FromImg(
      "https://i.postimg.cc/vB9w731t/front.jpg"
    );

    // left
    // https://i.postimg.cc/Qdp7PrR2/left.jpg
    const leftNew = await getBase64FromImg(
      "https://i.postimg.cc/Qdp7PrR2/left.jpg"
    );

    // Right
    // https://i.postimg.cc/Y9wphh89/right.jpg
    const rightNew = await getBase64FromImg(
      "https://i.postimg.cc/Y9wphh89/right.jpg"
    );

    // Video
    // https://elasticbeanstalk-ap-south-1-618548706388.s3.ap-south-1.amazonaws.com/video.MOV?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiEAmipqwqvc56SFJYBRHkV2%2BwZNWRuhzTS1p2fB0kgOcakCIEKGh6V6TNP3ZljxpgYj%2Bwv%2FkVBSzu0iSTkAO%2FXCqonxKvECCPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNjE4NTQ4NzA2Mzg4IgwadT6Y0iQIh22KG8kqxQKIaazI0qvMWD7g%2FB7eCI8fgYNrY6F8%2B2EqvXepQyNzV4Gj98P9oKeTpvTK%2B4rTM3PYWYimceX6lZZEBY%2F%2FcK3GL%2BQ9VSaHyJF%2ByIeHebs2eXgb0g3yRsEnoW1xECJRD6LItro8moHdyPlMtJ0Pq9haJDi4Ck6aYYpwYUbErWk%2BwTRb9mdU2bDtVSBR6yMbHVmMlCIhT%2FVJZxyn8qKnpoI8gCvFVKQoA3HakOm1wzmD6iL3L4eAwBd%2BbmfWaNfUMb3PKELU9q5VZ6or%2B6d0sS0gAb4iGKHLnlZl5XDjarjjfxtVxYJ9PgRkNYQGDX1pUsr3vOgEhSpCyLU8DZ%2F574vR1nUO84JP%2BjGRGGZiobrxYqxyc0l6wvQoaBYz5kl4NIfWDQpnjDuc49eomXuw%2FqFnSiF84xhjqdixbPLtVMndnGPYUjrkMJq6hbEGOrMCHKYNv1Pqkw0kLEx8DF37vj6goJ0jhVJUAu68Oe2Hbq6tVp0D%2BL83VGv0kpGo2zMR42fZM6djgK5mRgwVarNFzUXV4py1AJ6SZaNFFbEqVr%2FTyyJD%2BYcRlnjwxsfdAZ2NQRPWWRV9A1amlTdv1Ap9sp4xV6dCd%2BiPo0RDUTcbK5gJMXQn8WYxlsGwyXJRvxnv4fYvIiWuiGkMhu47H1LZHcfMYdR74VMv60a6KWJ4T%2FhdahDuEPw8lfB3uDNamCH0xI8xmjurZ0t22wEUeLmtqKRyRfsHfDGznQV3prAnRzflJI%2FnlENLDdM90Wou73wSgxS4yhNULKrfPNmMZYslel3kTKPTMLsGoyQ%2Fg6sOKp8fFvs6czQit440lIt3ltch89V8jywMZb2xZCBFjDFZU786QA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240418T175018Z&X-Amz-SignedHeaders=host&X-Amz-Expires=36000&X-Amz-Credential=ASIAZABDAHRKEGDIAJNG%2F20240418%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=b97e971a2caff2b64373fe773e72e0fe860247822a39dbe4513220e10715cbad

    return {
      frontNew,
      leftNew,
      rightNew,
    };
  };

  function base64ToBytes(base64String: string) {
    const binaryString = atob(base64String);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  const uploadFiles = async () => {
    try {
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
      // Sample running code
      // const newData = await foo();

      // const frontImage = newData.frontNew;
      // const leftImage = newData.leftNew;
      // const rightImage = newData.rightNew;
      // const fetchVideo = await fetch(
      //   "https://elasticbeanstalk-ap-south-1-618548706388.s3.ap-south-1.amazonaws.com/video.MOV"
      // );
      // const videoBlob = await fetchVideo.blob();

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
          .then(async (response) => {})
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
    } catch (error: any) {
      toast.error("Something went wrong");
      console.error(error);
      setLoader(false);
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

  // useEffect(() => {
  //   convertFBXtoOBJ();
  // }, [scanResult]);

  // const convertFBXtoOBJ = async () => {
  //   try {
  //     // Fetch FBX file from API
  //     const response = await axios.get(
  //       "https://threejs.org/examples/models/fbx/Samba%20Dancing.fbx"
  //     );

  //     console.log(response, " ====");

  //     const fbxData = response.data;

  //     // Parse FBX file
  //     const loader = new FBXLoader();
  //     const fbxModel = loader.parse(fbxData, "");

  //     // Export FBX model to OBJ format
  //     const exporter = new OBJExporter();
  //     const objData = exporter.parse(fbxModel);

  //     // Now you have the OBJ data, you can save it or use it as needed
  //     console.log(objData);
  //   } catch (error) {
  //     console.error("Error converting FBX to OBJ:", error);
  //   }
  // };

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
        .then((response) => {})
        .catch((error) => console.log(error));

      // Report OBJ uploaded
      reportOBJUploaded(APIKEY, "12", SCANNER_ID, {
        md5: "ZIPPED_OBJ_FILE_MD5",
      })
        .then((response) => {})
        .catch((error) => console.log(error));

      //  Wait measurements (long polling)
      waitMeasurements(APIKEY, "12", SCANNER_ID)
        .then((response) => {})
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
      <div className="flex items-center justify-between mobile:mb-6 xsm:mb-3 mt-3 w-full max-[767px]:justify-around">
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
            className="h-full w-full bg-white object-cover videoPlayer"
            autoPlay={true}
          >
            <source src={video} type="video/mp4"></source>
          </video>
        </div>
      </div>

      <div className="flex justify-between w-full h-[80px] items-end">
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
