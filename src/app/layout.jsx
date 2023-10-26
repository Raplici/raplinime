import "@/app//globals.css";
import { Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";

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
  title: "AnimeList",
  description: "Website Anime Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} bg-Black-8`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
