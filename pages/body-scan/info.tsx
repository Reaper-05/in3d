import BodyScanInstruction from "@/components/BodyScanInstruction";
import { useRouter } from "next/router";

const BodyScanInfo = () => {
    const router = useRouter();
    return (
        <div className="text-black flex justify-between flex-col py-5 w-full">
          <BodyScanInstruction handleClick={()=>router.push("/body-scan")}/>
        </div>
      );
}

export default BodyScanInfo;