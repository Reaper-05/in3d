import Image from "next/image";
import shutterButtonImage from "@/assets/shutterButton.svg";
import switchCameraImage from "@/assets/switchCamera.svg";
import { useEffect, useRef, useState } from "react";
import useCameraPermissions from "@/hooks/userCameraPermission";
import { UserImageShotsProps } from "@/types";
import { InitCamera } from "@/utils/common";

function UserImageShots(props: UserImageShotsProps) {
  const {
    imageClick,
    cameraAngle = "front",
    next,
    imageData,
    subHeading,
    style
  } = props;

  const { isCameraGranted } = useCameraPermissions();
  const cameraRef = useRef<HTMLVideoElement>(null);
  const shutterButtonRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const angle = cameraAngle.toUpperCase();
  useEffect(() => {
    cameraInit();

    return () => {
      const context = canvasRef.current?.getContext("2d");
      if (canvasRef.current) {
        context?.clearRect(
          0,
          0,
          canvasRef.current?.width,
          canvasRef.current?.height
        );
      }
    };
  }, [facingMode]);

  const cameraInit = async () => {
    const stream = await InitCamera(facingMode);
    handleCameraInitiated(stream);
  };

  const handleCameraInitiated = (stream?: MediaStream) => {
    if (cameraRef.current) {
      cameraRef.current.srcObject = stream as MediaStream;
    }
  };

  const handleShutterClick = () => {
    if (cameraRef.current) {
      const context = canvasRef.current?.getContext("2d");
      if (context) {
        context.drawImage(
          cameraRef.current as HTMLVideoElement,
          0,
          0,
          canvasRef.current?.width || 330,
          canvasRef.current?.height || 440,
        );
        const imageSource: string =
          canvasRef.current?.toDataURL("image/jpeg") || "";
        setCapturedImage(imageSource);
        imageClick({ [cameraAngle]: imageSource });
        next();
      }
    }
  };

  const stopCamera = () => {
    if (cameraRef.current) {
      const stream: any = cameraRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track: any) => track.stop());
      }
    }
  };

  const switchCamera = async () => {
    if (isCameraGranted) {
      stopCamera();
      setFacingMode((prevMode) =>
        prevMode === "environment" ? "user" : "environment"
      );
    } else {
      alert("Please allow camera permission");
    }
  };

  return (
    <div className="mobile:p-5 5 mobile:pb-0 h-full flex justify-between items-center flex-col">
      <div>
        <h2 className="text-center mb-4 font-semibold text-medium px-4">
          Look into the Camera and Snap a Selfie{" "}
        </h2>
        <p className="text-center font-[500] text-[15px]">
          {subHeading || `${angle}-Profile`}
        </p>
      </div>
      <div className="relative max-w-[330px] w-full landscape-height h-[440px]">
        {/* <div className="bg-gray max-w-[115px] border-[1px] flex items-center justify-between absolute -bottom-10 -left-8 z-20 h-[137px] rounded-[12px]">
          <p className="text-xsmall font-semibold p-4 text-center">
            {angle} FACING PORTRAIT REFERENCE IMAGE
          </p>
        </div> */}
        <div className="relative emptyAreaHeight overflow-hidden rounded-[8px] border-shadow" style={style}>
          <div className="relative border h-full w-full rounded-[8px] border-shadow border-none bg-[#fff]"></div>
          <canvas
            ref={canvasRef}
            id="canvas"
            width="480"
            height="640"
            className="absolute z-10 top-0 h-full w-full rounded-[8px] border-shadow border-none bg-[#fff] border"
          ></canvas>
          
            <video
              ref={cameraRef}
              id="userImage"
              muted
              autoPlay
              playsInline
              className={`absolute z-10 top-0 h-full w-full border-shadow border-none bg-[#fff] border rounded-[8px] transform ${facingMode === "user" && 'scale-x-[-1]'}`}
            />
        </div>
      </div>
      <div className="relative flex justify-around w-4/5 h-[100px] w-full items-end max-w-[300px]">
        <Image
          id="shutter-button"
          className="cursor-pointer"
          ref={shutterButtonRef}
          src={shutterButtonImage}
          alt="shutter"
          onClick={() => {
            if (cameraRef.current && isCameraGranted) {
              handleShutterClick();
            } else {
              alert("Please allow camera permission");
            }
          }}
        />
        <Image
          src={switchCameraImage}
          alt="switch"
          onClick={switchCamera}
          className="absolute bottom-[13px] right-[0px] cursor-pointer"
        />
      </div>
    </div>
  );
}

export default UserImageShots;
