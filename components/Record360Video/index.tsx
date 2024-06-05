import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import rotateImage from "@/assets/rotate.svg";
import rotateGreyImage from "@/assets/rotateGrey.svg";
import BodyScanComplete from "@/components/BodyScanComplete";
import useCameraPermissions from "@/hooks/userCameraPermission";
import { Record360VideoProps } from "@/types";
import { toast } from "react-toastify";

const videoLinks: any = [];

export default function Record360Video(props: Record360VideoProps) {
  const {
    retakeVideoRecording,
    onCompleted,
    cameraRef,
    setFacingMode,
    facingMode,
    cameraInitRef,
  } = props;
  const { isCameraGranted } = useCameraPermissions();
  const [recordingComplete, setRecordingComplete] = useState<boolean>(false);
  const [count, setCount] = useState(8);
  const [recordingCountDown, setRecordingCountDown] = useState<number>(10);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [facingMode]);

  const startRecording = async () => {
    const interval = setInterval(() => {
      setRecordingCountDown((prevCount) => {
        return prevCount - 1;
      });
    }, 1000);
  };

  const haveLoadedMetadata = (stream: any) => {
    let preview = document.createElement("video");
    preview.srcObject = stream;
    return new Promise((resolve) => (preview.onloadedmetadata = resolve));
  };
  const start = (ms: any) => {
    console.log("start");
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode,
          aspectRatio: 12 / 9,
          width: {
            min: 480,
          },
          height: {
            min: 640,
          },
        },
      })
      .then((stream) =>
        haveLoadedMetadata(stream)
          .then(() => record(stream, ms))
          .then((recordingData) => {
            const video = URL.createObjectURL(new Blob(recordingData));
            // stop(stream);
            onCompleted(true);
            setRecordingComplete(true);
            videoLinks.push(video);
          })
      )
      .catch((e) => {
        toast.error("Something went wrong during initializing camera");
        console.log(e);
      });
  };

  const record = (stream: any, ms: any) => {
    const rec = new MediaRecorder(stream),
      data: any = [];
    rec.ondataavailable = (e) => data.push(e.data);
    rec.start();
    const stopped = new Promise(
      (y, n) => (
        (rec.onstop = y), (rec.onerror = (e: any) => n(e.error || e.name))
      )
    );

    return Promise.all([stopped, wait(ms).then(() => rec.stop())]).then(
      () => data
    );
  };

  const stop = (stream: any) =>
    stream.getTracks().forEach((track: any) => track.stop());
  const wait = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const onVideoRecord = async (recordingCountDown: any) => {
    if (recordingCountDown >= 0 && videoLinks?.length <= 0 && count <= 0) {
      start(10500);
    }
  };

  useEffect(() => {
    onVideoRecord(recordingCountDown);
  }, [recordingCountDown]);

  useEffect(() => {
    if (count === 0 && isCameraGranted) {
      setCount(0);
      startRecording();
    }
  }, [count]);

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
    if (count >= 1) {
      cameraInitRef.current = false;
      stopCamera();
      setFacingMode((prevMode: any) =>
        prevMode === "environment" ? "user" : "environment"
      );
    }
  };

  if (recordingComplete) {
    return (
      <BodyScanComplete
        video={videoLinks?.[0]}
        retakeVideoRecording={retakeVideoRecording}
      />
    );
  }

  const heading = recordingCountDown < 10 ? "Scan Ends in" : "Scan Starts in";

  return (
    <div className="flex items-center justify-between flex-col mobile:p-5 p-5 h-full">
      <div>
        <h2 className="font-semibold text-center text-[18px] xsm:w-full m-auto">
          {heading}
        </h2>
        {recordingCountDown >= 0 || count >= 1 ? (
          <p className="text-center mb-0 mt-4 text-xlarge font-semibold text-primary">
            {count >= 1 ? count : recordingCountDown}
          </p>
        ) : (
          <p className="text-center mb-0 mt-4 text-xlarge font-semibold text-primary h-[45px]" />
        )}
      </div>
      <div className="relative w-full emptyAreaHeight emptyAreaHeightScan">
        <div className="w-full h-full bg-gray rounded-lg overflow-hidden">
          <video
            ref={cameraRef}
            id="userVideo"
            autoPlay={true}
            playsInline={true}
            muted={true}
            className={`h-full w-full bg-white transform object-fill ${
              facingMode === "user" && "scale-x-[-1]"
            }`}
          />{" "}
        </div>
      </div>
      <div className="mt-2">
        <Image
          alt="rotate"
          src={recordingCountDown < 10 ? rotateImage : rotateGreyImage}
          onClick={() => switchCamera()}
          width={30}
          height={35}
          unoptimized
        />
      </div>
    </div>
  );
}
