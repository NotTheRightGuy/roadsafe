"use client";
import { useState, useEffect } from "react";
import { OlaMaps } from "@/mapsSDK";
import { CirclePlus, CircleMinus } from "lucide-react";

export default function UserDashboard() {
    const [map, setMap] = useState<any>(null);
    const olaMaps = new OlaMaps({
        apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
    });

    useEffect(() => {
        const myMap = olaMaps.init({
            container: "map",
            center: [72.5714, 23.0225],
            zoom: 15,
        });
        setMap(myMap);

        document.getElementsByClassName("maplibregl-ctrl-attrib")[0].remove();
    }, []);

    const zoomIn = () => {
        map.setZoom(map.getZoom() + 1);
    };

    const zoomOut = () => {
        map.setZoom(map.getZoom() - 1);
    };

    return (
        <div id="map" className="relative h-full">
            <div className="*:p-2 fixed bottom-2 right-2 *:bg-white *:shadow-md z-10">
                <button className="rounded-l-full p-2">
                    <CirclePlus size={24} onClick={zoomIn} />
                </button>
                <button className="rounded-r-full">
                    <CircleMinus size={24} onClick={zoomOut} />
                </button>
            </div>
        </div>
    );
}
