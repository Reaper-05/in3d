import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "@/assets/Logo.svg";
import { Button } from "@/components";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("instructions");
  };
  return (
    <div className="flex items-center justify-between mobile:h-screen xsm:h-full flex-col px-8 max-[767px]:py-4 py-8 w-full">
      <div>
        <Image alt="logo" src={Logo} className="m-auto mb-3" />
        <h2 className="text-center text-black text-[20px] font-semibold">
          Let’s Create your Virtual Twin
        </h2>
        <p className=" font-[400] text-[13px] justify-center text-black text-center mb-2 mt-1 z-10 top-0">
          It only takes a few minutes.
        </p>
      </div>
      <div className="relative max-w-[329px] min-[1025px]:h-[65%] max-[1024px]:h-3/5">
        <div className="flex items-center justify-center w-full h-full bg-gray overflow-hidden">
          <p className=" font-[500] p-10 justify-center text-black text-small text-center mb-5 mt-4 z-10 top-0">
            here will be animation 3d characters in reel. will integrate this
            vide ourselves
          </p>
        </div>
      </div>
      <div className="flex items-center flex-col w-full">
        <Button
          text="Get Started"
          type="primary"
          className="w-full max-w-[300px] mt-[10px]"
          handleOnClick={handleGetStarted}
        />
      </div>
    </div>
  );
}
