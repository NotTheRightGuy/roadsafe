import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MapProvider } from "@/context/MapContext";
import { LocationProvider } from "@/components/LocationContext";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "RoadSafe by Chill Guys",
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
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <LocationProvider>
                    <MapProvider>{children}</MapProvider>
                </LocationProvider>
            </body>
        </html>
    );
}
