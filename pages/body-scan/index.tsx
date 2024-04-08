import { useEffect, useRef, useState } from "react";

import BodyScanInstruction from "@/components/BodyScanInstruction";
import StartBodyScan from "@/components/StartBodyScan";
import Record360Video from "@/components/Record360Video";
import { InitCamera, stopCamera } from "@/utils/common";
import useCameraPermissions from "@/hooks/userCameraPermission";
import Image from "next/image";
import ArrowLeft from "@/assets/ArrowLeft.svg";
import { useRouter } from "next/navigation";


function BodyScan() {
  const router = useRouter();
  const { isCameraGranted } = useCameraPermissions();
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [completed, setCompleted] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const cameraRef = useRef<HTMLVideoElement>(null);
  const cameraInitRef = useRef(false);

  useEffect(() => {
    if (currentStep >= 1) {
      if (cameraInitRef.current) return;
      cameraInitRef.current = true;
      cameraInit();
      console.log("effect");
      
    }
    
  }, [facingMode, currentStep]);

  const cameraInit = async () => {
    try {
      const stream: any = await InitCamera(facingMode);
      handleCameraInitiated(stream);
    } catch (error) {
      console.log(error, "camera init error");
    }
  };

  const handleCameraInitiated = (stream: MediaStream) => {
    if (cameraRef.current) {
      cameraRef.current.srcObject = stream as MediaStream;
    }
  };

  const goBack = () => {
    if (currentStep === 1) {
      router.refresh();
    } else {
      setCurrentStep(currentStep - 1);
    }
    
  };

  const handleScanStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StartBodyScan
            handleClick={() => {
              if (isCameraGranted) {
                cameraInitRef.current = false;
                if (cameraRef.current) {
                  const stream: any = cameraRef.current.srcObject;
                  if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach((track: any) => track.stop());
                  }
                }
                setCurrentStep(2);
              } else {
                alert("Please allow camera permission");
              }
            }}
            cameraRef={cameraRef}
          />
        );
      case 2:
        return (
          <Record360Video
            retakeVideoRecording={() => {
              window.location.reload();
              stopCamera();
              setCurrentStep(0);
            }}
            onCompleted={setCompleted}
            setFacingMode={setFacingMode}
            cameraRef={cameraRef}
            cameraInitRef={cameraInitRef}
            facingMode={facingMode}
          />
        );
    }
  };

  return (
    <div className="text-black flex justify-between h-screen flex-col py-5 w-full">
      {/* {currentStep >= 1 && currentStep <= 2 && !completed && (
        <Image
          alt="logo"
          src={ArrowLeft}
          className="mb-0 ml-5 cursor-pointer"
          onClick={goBack}
        />
      )} */}
      <div className="h-full">{handleScanStep()}</div>
    </div>
  );
}

export default BodyScan;
