"use client";
import { useEffect } from "react";
import { useMap } from "@/context/MapContext";
import { CirclePlus, CircleMinus } from "lucide-react";

export default function Dashboard() {
    const { map, currentLocation, initMap, zoomIn, zoomOut } = useMap();

    useEffect(() => {
        if (currentLocation) {
            initMap(currentLocation);
        }
    }, [currentLocation]);

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
