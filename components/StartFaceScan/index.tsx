import Image from "next/image";
import Button from "@/components/Button";
import { StartScanProps } from "@/types";
import { faceScanInstructions } from "@/constant";
import Wrong from '../../assets/wrong.svg';
import Right from '../../assets/right.svg';

export default function StartFaceScan(props: StartScanProps) {
  const { handleClick } = props;

  return (
    <div className="mobile:p-5 p-5 h-full flex justify-between flex-col">
      <div>
        <h2 className="text-center mb-1 mobile:mb-3 mt-0 font-semibold text-base">
          First Step is a Couple Selfies
        </h2>
        <p className="text-center px-[40px] mb-3 mobile:mb-4 text-sm font-[400]">
          A few important tips to get the most<br /> accurate Virtual Twin
        </p>
      </div>
      <div className="flex w-full items-center justify-between">
        <Image src={Wrong} className="ml-8" alt="" />
        <Image src={Right} className="mr-8" alt="" />
      </div>
      <div className="mb-2 mobile:mb-10 mt-0">
        {faceScanInstructions.map((instruction, index) => {
          return (
            <div
              className="flex items-center justify-between my-4"
              key={`instruction-${index + 1}`}
            >
              <Image
                className="block max-w-[90px]"
                alt={`instruction-${index + 1}`}
                src={instruction.leftImage}
              />
              <p className="text-center text-primary text-[14px] font-[600] max-w-[110px]">
                {instruction.text}
              </p>
              <Image
                className="block max-w-[90px]"
                alt={`instruction-${index + 1}`}
                src={instruction.rightImage}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Button
          text="Snap Some Selfies"
          type="primary"
          className="mt-[10px] max-w-[300px]"
          handleOnClick={() => handleClick(1)}
        />
      </div>
    </div>
  );
}
