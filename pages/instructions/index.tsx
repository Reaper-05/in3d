import { useState } from "react";

import { StartFaceScan } from "@/components";
import FaceScanComplete from "@/components/FaceScanComplete";
import UserImageShots from "@/components/UserImageShots";
import { imagesObject } from "@/types";
import ArrowLeft from "@/assets/ArrowLeft.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Instructions() {
  const router = useRouter();
  const [currentInstruction, setCurrentInstruction] = useState<number>(0);
  const [capturedImagesList, setCapturedImagesList] = useState<imagesObject>(
    {}
  );

  const handleClick = (step: number) => {
    setCurrentInstruction(step);
  };

  const goBack = () => {
    if (currentInstruction === 1) {
      router.back();
    } else {
      setCurrentInstruction(currentInstruction - 1);
    }
  };

  const handleImageCapture = (newImage: imagesObject) =>
    setCapturedImagesList({ ...capturedImagesList, ...newImage });

   // Animation styles
   const animationStyles = {
    top: {
      animation: "flipFromTop 0.5s",
    },
    left: {
      animation: "flipFromLeft 0.5s",
    },
    right: {
      animation: "flipFromRight 0.5s",
    },
  };

  const handleInstructions = () => {
    switch (currentInstruction) {
      case 1:
        return (
          <UserImageShots
            cameraAngle="front"
            subHeading={"1. Front-on"}
            imageData={capturedImagesList?.front}
            handleCameraSwitch={() => {}}
            imageClick={handleImageCapture}
            next={() => handleClick(2)}
            style={currentInstruction === 1 ? animationStyles.top : undefined}
          />
        );
      case 2:
        return (
          <UserImageShots
            cameraAngle="left"
            subHeading={"2. Left-Profile"}
            imageData={capturedImagesList?.left}
            handleCameraSwitch={() => {}}
            imageClick={handleImageCapture}
            next={() => handleClick(3)}
            style={currentInstruction === 2 ? animationStyles.left : undefined}
          />
        );
      case 3:
        return (
          <UserImageShots
            cameraAngle="right"
            subHeading={"3. Right-Profile"}
            imageData={capturedImagesList?.right}
            handleCameraSwitch={() => {}}
            imageClick={handleImageCapture}
            next={() => handleClick(4)}
            style={currentInstruction === 3 ? animationStyles.right : undefined}
          />
        );
      case 4:
        return (
          <FaceScanComplete
            imagesList={capturedImagesList}
            handleRetake={() => {
              setCurrentInstruction(0);
              window.location.reload();
            }}
          />
        );
      default:
        return <StartFaceScan handleClick={handleClick} />;
    }
  };
  return (
    <div className="text-black flex justify-between mobile:h-screen overflow-y-scroll mobile:py-10 w-full xsm:h-full flex-col xsm:py-5">
      {currentInstruction >= 1 && currentInstruction <= 3 && (
        <Image
          alt="logo"
          src={ArrowLeft}
          className="mb-0 ml-4 mb-2 cursor-pointer"
          onClick={goBack}
        />
      )}

      <div className="h-full">{handleInstructions()}</div>
    </div>
  );
}

export default Instructions;
