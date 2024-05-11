import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex items-center justify-center bg-white h-screen max-h-screen">
      <ToastContainer theme={"colored"} />
      <div className="maxWidth h-full main-bg">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
