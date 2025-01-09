import type { Metadata } from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })


export const metadata: Metadata = {
    title: "RoadSafe by Chill Guy",
    description: "A road safety app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.className}  antialiased h-screen w-screen`}
      >
        {children}
      </body>
    </html>
  );
}
