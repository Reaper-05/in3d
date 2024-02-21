import { useEffect, useRef, useState } from "react";

import Button from "@/components/Button";
import { StartBodyScanProps } from "@/types";
import { InitCamera } from "@/utils/common";

export default function StartBodyScan(props: StartBodyScanProps) {
  const { handleClick, cameraRef } = props;

  return (
    <div className="flex items-center justify-between flex-col mobile:p-5 p-5 h-full">
      <div>
        <h2 className="font-semibold text-center text-[18px]  mobile:w-4/5 xsm:w-full m-auto">
          When the ten second countdown starts, spin 360°
        </h2>
        {/* <p className="text-center mb-2 mt-4 text-[15px] font-[400] max-w-[312px] m-auto">
          Make sure to maintain the A-pose throughout the 360° spin
        </p> */}
      </div>
      <div className="relative w-full emptyAreaHeight emptyAreaHeightScan w-[330px]">
        <div className="w-full h-full bg-gray rounded-lg overflow-hidden">
          <video
            ref={cameraRef}
            id="userImage"
            muted
            autoPlay
            playsInline
            className=" h-full w-full bg-white transform scale-x-[-1]"
          />
        </div>
      </div>
      <Button
        text="Start Scan"
        type="primary"
        className="mt-[10px] max-w-[300px]"
        handleOnClick={handleClick}
      />
    </div>
  );
}
