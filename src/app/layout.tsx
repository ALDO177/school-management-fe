import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: "System Management Sekolah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TopLoader/>
        <SkeletonTheme>
          {children}
        </SkeletonTheme>
        <ToastContainer />
      </body>
    </html>
  );
}
