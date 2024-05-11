import Image from "next/image";
import Button from "@/components/Button";
import { BodyScanInstructionProps } from "@/types";
import { bodyScanInstructions } from "@/constant";

export default function BodyScanInstruction(props: BodyScanInstructionProps) {
  const { handleClick } = props;

  return (
    <div className="flex items-center justify-between flex-col mobile:p-5 p-5 mobile:minHeight xsm:h-full">
      <div>
        <h2 className="font-semibold text-center text-medium m-auto">
          Let’s Capture Your Virtual Twin’s Body
        </h2>
        <p className="text-center m-auto mb-7 mt-2 text-sm max-w-[260px]">
          A few important tips to get the most accurate Virtual Twin
        </p>
      </div>
      <div>
        {bodyScanInstructions.map((instruction, index) => {
          return (
            <div
              className={`flex mobile:my-7 xsm:my-3 w-full items-center ${
                index === 0 && "mobile:mt-0"
              }`}
              key={`instruction-${index + 1}`}
            >
              <Image
                className="block w-24"
                alt={`instruction-${index + 1}`}
                src={instruction.image}
              />
              <div className="pl-4 w-full">
                <p className="text-left text-primary text-[14px] font-semibold mb-1">
                  {instruction.title}
                </p>
                <p className="text-left text-[12px] font-[500]">
                  {instruction.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        text="Next"
        type="primary"
        className="mt-[10px] max-w-[300px]"
        handleOnClick={handleClick}
      />
    </div>
  );
}
