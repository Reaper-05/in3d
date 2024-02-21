import Image from "next/image";
import { useRouter } from "next/navigation";

import roundCheckImage from "@/assets/roundCheck.svg";
import Button from "@/components/Button";
import { FaceScanCompleteProps } from "@/types";

function FaceScanComplete(props: FaceScanCompleteProps) {
  const { handleRetake, imagesList } = props;
  const router = useRouter();

  const { front, left, right } = imagesList;

  const handleImageUpload = () => {
    localStorage.setItem("imagesList", JSON.stringify(imagesList));
    router.push("body-scan");
  };

  return (
    <div className="mobile:px-5 px-5 h-full flex justify-between items-center flex-col h-full gap-y-4">
      <h2 className="text-center mobile:mb-2 xsm:mb-0 font-semibold text-[18px]">
        Happy with your selfies?
      </h2>
      <div className="flex items-center justify-between max-[767px]:justify-around mobile:mb-5 xsm:mb-3 mt-0 w-full">
        <div className="px-4">
          <Image src={roundCheckImage} alt="check" className="m-auto" />
          <p className="text-[12px] mt-1 font-[500] text-center">No Glasses?</p>
        </div>
        <div className="px-4">
          <Image src={roundCheckImage} alt="check" className="m-auto" />
          <p className="text-[12px] mt-1 font-[500] text-center">Hair Tied?</p>
        </div>
        <div className="px-4">
          <Image src={roundCheckImage} alt="check" className="m-auto" />
          <p className="text-[12px] mt-1 font-[500] text-center"> Good Lighting?</p>
        </div>
        <div className="px-4">
          <Image src={roundCheckImage} alt="check" className="m-auto" />
          <p className="text-[12px] mt-1 font-[500] text-center">Head Only?</p>
        </div>
      </div>

      <div className="relative h-[175px] max-w-[131px] w-full rounded-lg shrink-0">
        {/* <div className="bg-gray border-[1px] flex items-center justify-center h-20 absolute -right-2 px-2 -bottom-[20px] z-20 rounded-lg">
          <p className="text-[18px] font-semibold">FRONT</p>
        </div> */}
        <Image
          src={front}
          alt="front-camera-view"
          className="absolute w-full h-full object-cover overflow-hidden rounded-lg -top-2"
          width="100"
          height="100"
        />
         <p className="text-[16px] font-[500] absolute left-[50%] -translate-x-[45%] px-2 -bottom-[20px]">Front</p>
        <div className="relative border h-full w-full rounded-lg border-primary overflow-hidden  -top-2"></div>
      </div>
      <div className="flex mb-6 mt-6 justify-between w-full">
        <div className="relative h-[150px] max-w-[112px] w-full rounded-lg shrink-0">
          {/* <div className="bg-gray border-[1px] flex items-center justify-center px-2 h-[65px] w-[54px] absolute -right-2 px-2 -bottom-[20px] z-20 rounded-lg">
            <p className="text-[14px]  font-semibold">LEFT</p>
          </div> */}
          <p className="text-[16px] font-[500] absolute left-[50%] -translate-x-[45%] px-2 -bottom-[30px]">Left</p>
          <Image
            src={left}
            alt="front-camera-left"
            className="absolute w-full h-full object-cover overflow-hidden rounded-lg"
            width="100"
            height="100"
          />
          <div className="relative border h-full w-full rounded-lg border-primary"></div>
        </div>
        <div className="relative h-[150px] max-w-[112px] w-full rounded-lg shrink-0">
          {/* <div className="bg-gray border-[1px] flex items-center justify-center px-2 h-[65px] w-[54px] absolute -right-2 px-2 -bottom-[20px] z-20 rounded-lg">
            <p className="text-[14px] font-semibold">RIGHT</p>
          </div> */}
          <p className="text-[16px] font-[500] absolute left-[50%] -translate-x-[45%] px-2 -bottom-[30px]">Right</p>
          <Image
            src={right}
            alt="front-camera-right"
            className="absolute w-full h-full object-cover overflow-hidden rounded-lg"
            width="100"
            height="100"
          />
          <div className="relative border h-full w-full rounded-lg border-primary overflow-hidden"></div>
        </div>
      </div>

      <div className="flex justify-around w-full mt-5">
        <Button
          className="text-primary m-2 !w-[135px] !px-[10px]"
          text="Take Again"
          type="secondary"
          handleOnClick={handleRetake}
        />
        <Button
          className="m-2 !w-[135px] !px-[10px]"
          text="Looks good!"
          type="primary"
          handleOnClick={handleImageUpload}
        />
      </div>
    </div>
  );
}

export default FaceScanComplete;
