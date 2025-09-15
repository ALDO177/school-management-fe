import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { ToastContainer } from "react-toastify";
import { SkeletonTheme } from 'react-loading-skeleton';
import { TopLoader } from "@components/top-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistem Manajemen Sekolah SMADA",
  description: "Sistem Manajemen Sekolah SMADA Samarinda",
  icons: [
    { rel: "icon", url: "/logo-sma.ico", type: "image/png", sizes: "32x32" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TopLoader />
        <SkeletonTheme>
          {children}
        </SkeletonTheme>
        <ToastContainer />
      </body>
    </html>
  );
}
