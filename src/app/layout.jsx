import "@/app//globals.css";
import { Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const manrope = Manrope({
  preload: true,
  adjustFontFallback: true,
  display: "swap",
  subsets: ["latin", "latin-ext"],
  style: ["normal"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "AnimeVibe",
  description: "Website Anime Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} bg-Black-8 `}
        suppressHydrationWarning={true}
      >
        <div className="flex flex-col h-screen justify-between">
          <div className="flex flex-col px-5 py-2.5 md:py-12">
            <Navbar />
            {children}
          </div>

          <div className="flex rounded-t-lg px-5 py-3 mt-3 md:mt-0 w-full bg-Black-12 items-center text-Grey-60">
            <div className="container flex flex-col h-16 gap-0.5 justify-center text-center items-center text-sm md:text-base">
              <p>Created by Raplici.</p>
              <p>
                Thank you for visiting this website. Hopefully, this can provide the
                information you need.
              </p>
            </div>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
