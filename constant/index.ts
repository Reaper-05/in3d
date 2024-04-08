import rectangleGreyImage from "@/assets/RectangleGrey.svg";
import instructionRectangle from "@/assets/RectangleGrey.svg";
import roundCheckImage from "@/assets/roundCheck.svg";
import FaceGlasses from '../assets/face-with-glasses.svg';
import FaceWithoutGlasses from '../assets/face-without-glasses.svg';
import HairOpen from '../assets/hair-open.svg';
import HairTied from '../assets/hair-tied-up.svg';
import FaceFull from '../assets/face-full.svg';
import FaceOnly from '../assets/face-above-neck.svg';

export const bodyScanInstructions = [
  {
    title: "Clothes",
    text: "It is best to wear tight fitting clothing that does not cover your legs or arms.",
    image: rectangleGreyImage,
  },
  {
    title: "Phone Position",
    text: "Place your phone vertically on a surface at your hip level.",
    image: rectangleGreyImage,
  },
  {
    title: "Pose",
    text: "Make sure your full-body is in view and stand in the A-pose throughout the 360° spin.",
    image: rectangleGreyImage,
  },
  {
    title: "Light Source",
    text: "Like with the selfies, make sure you are facing a good, natural light source.",
    image: rectangleGreyImage,
  },
];

export const faceScanInstructions = [
  {
    leftImage: FaceGlasses,
    text: "Remove Glasses",
    rightImage: FaceWithoutGlasses,
  },
  {
    leftImage: HairOpen,
    text: "Tie up Hair",
    rightImage: HairTied,
  },
  {
    leftImage: instructionRectangle,
    text: "Face good, natural lighting ",
    rightImage: instructionRectangle,
  },
  {
    leftImage: FaceFull,
    text: "Capture above neck only",
    rightImage: FaceOnly,
  },
];

export const ScanCompleteOptions = [
  {
    title: "Maintained A-pose?",
    image: roundCheckImage,
  },
  {
    title: "Full 360° Spin?",
    image: roundCheckImage,
  },
  {
    title: "Good Lighting?",
    image: roundCheckImage,
  },
  {
    title: "Tight Clothing?",
    image: roundCheckImage,
  },
];

export const MEMBER_NUMBER = "gda2112@columbia.edu"
export const APIKEY = "zGE7QslGxjQm6ijJjqhVJGQgIk1Q3o9yFLst"
export const PROVIDER = "10242"
export const SCANNER_ID = "eZnx9B4"