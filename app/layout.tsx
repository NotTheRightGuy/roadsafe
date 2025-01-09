import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { MapProvider } from "@/context/MapContext";
import { LocationProvider } from "@/components/LocationContext";

export const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

const metadata: Metadata = {
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
            <body className={`${jakarta.className} h-full w-full`}>
                <LocationProvider>
                    <MapProvider>{children}</MapProvider>
                </LocationProvider>
            </body>
        </html>
    );
}
