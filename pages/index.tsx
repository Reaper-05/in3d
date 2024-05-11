import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "@/assets/Logo.svg";
import { Button } from "@/components";

import { useEffect } from "react";
import axios from "axios";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import JSZip from "jszip";
import CryptoJS from "crypto-js";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   convertFBXtoOBJ();
  // }, []);

  const getMd5Sum = async (zipFile: any) => {
    const checksum = CryptoJS.MD5(zipFile).toString();
    return checksum;
  };

  const convertFBXtoOBJ = async () => {
    const apiKey = "zGE7QslGxjQm6ijJjqhVJGQgIk1Q3o9yFLst";
    try {
      // Fetch FBX file from API
      const { data } = await axios.get(
        "https://threejs.org/examples/models/fbx/Samba%20Dancing.fbx",
        {
          responseType: "arraybuffer",
        }
      );

      const fbxData = data;

      // Parse FBX file
      const loader = new FBXLoader();
      const fbxModel = loader.parse(fbxData, "");

      // Export FBX model to OBJ format
      const exporter = new OBJExporter();
      const objData = exporter.parse(fbxModel);

      // Now you have the OBJ data, you can save it or use it as needed
      // console.log(objData);

      var zip = new JSZip();

      // Add a text file with the contents "Hello World\n"
      zip.file("sample.obj", objData);

      zip.generateAsync({ type: "blob" }).then(async function (content) {
        const { data } = await axios.post(
          `https://api.tg3ds.com/api/v1/scan_records/ext_obj?apikey=${apiKey}`,
          {
            user_name: "Monik Test",
            gender: "1",
          }
        );

        console.log(data, " ====== 1st Response");

        try {
          const response = await axios.put(data.upload_url, {
            body: content,
          });

          const md5 = await getMd5Sum(content);

          const secondUploadRes = await axios.post(
            `https://api.tg3ds.com/api/v1/scan_records/${data.tid}/ext_obj_uploaded?apikey=${apiKey}`,
            {
              md5: md5,
              ext_process_type: 0,
            }
          );

          console.log(secondUploadRes, "= 2nd response");

          const getScanRecordRes = await axios.get(
            `https://api.tg3ds.com/api/v1/scan_records/${data.tid}?apikey=${apiKey}`
          );

          console.log(getScanRecordRes, "= Get Scan response");

          // const postScanRecordForXtRes = await axios.get(
          //   `https://api.tg3ds.com/api/v1/scanners/${getScanRecordRes.data.scanner.uuid}/${data.tid}/result?apikey=${apiKey}`
          // );

          // console.log(postScanRecordForXtRes, "= 2nd response");

          //api.tg3ds.com/api/v1/scanners/abcdefg/xxxx-xxx-xxxx-xxxx/result?apikey=xxxxxxxx

          // const thirdUploadRes = await axios.get(
          //   `https://api.tg3ds.com/api/v1/scan_records/${data.tid}/manual_measurements/?apikey=${apiKey}`
          // );

          // console.log(thirdUploadRes, "= 3rd response");

          const fourthUploadRes = await axios.get(
            `https://api.tg3ds.com/api/v1/scan_records/${data.tid}/size_xt?apikey=${apiKey}&details=true&pose=A`
          );

          console.log(fourthUploadRes, "= 3rd response");
        } catch (error) {
          console.log(error, " response Error");
        }
      });

      // const blob = new Blob([objData], { type: "text/plain" });
      // const url = URL.createObjectURL(blob);

      // const link = document.createElement("a");
      // link.href = url;
      // link.download = "model.obj";
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    } catch (error) {
      console.error("Error converting FBX to OBJ:", error);
    }
  };

  const handleGetStarted = () => {
    router.push("instructions");
  };

  return (
    <div className="flex items-center justify-between mobile:h-screen xsm:h-full flex-col px-8 max-[767px]:py-4 py-8 w-full max-h-[90vh]">
      <div>
        {/* <button onClick={convertFBXtoOBJ}>Run the operation</button> */}

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
