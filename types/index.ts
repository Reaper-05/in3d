export type UserImageShotsProps = {
  cameraAngle: "front" | "left" | "right";
  imageData: string;
  imageClick: (image: { [key: string]: string }) => void;
  next: () => void;
  handleCameraSwitch: () => void;
  subHeading?: string;
  style?: any;
};

export type imagesObject = { [key: string]: string };

export type FaceScanCompleteProps = {
  handleRetake: () => void;
  imagesList: imagesObject;
};

export type StartScanProps = {
  handleClick: (step: number) => void;
};

export type BodyScanInstructionProps = {
  handleClick: () => void;
};

export type StartBodyScanProps = {
  handleClick: () => void;
  cameraRef: HTMLVideoElement | any;
};

export type Record360VideoProps = {
  retakeVideoRecording: () => void;
  onCompleted: (e: boolean) => void;
  cameraRef: HTMLVideoElement | any;
  setFacingMode: (e: any) => void;
  facingMode: string;
  cameraInitRef: HTMLVideoElement | any;
};

export type BodyScanCompleteProps = {
  handleClick?: (step: number) => void;
  retakeVideoRecording: () => void;
  imagesList?: imagesObject;
  video: string;
};

export type ButtonProps = {
  text: string;
  type: "primary" | "secondary";
  handleOnClick: () => void;
  className?: string;
  isLoading?: boolean;
};
