"use client";
import { useState, useEffect } from "react";
import { OlaMaps } from "@/mapsSDK";
import { CirclePlus, CircleMinus } from "lucide-react";
import { ReportIcon, SpeedIndicator } from "@/components/ui/user-dashboard/bottomicons";

export default function UserDashboard() {
  //eslint-disable-next-line
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
    //esllint-disable-next-line
  }, []);

  const zoomIn = () => {
    map.setZoom(map.getZoom() + 1);
  };

  const zoomOut = () => {
    map.setZoom(map.getZoom() - 1);
  };

  return (
    <div id="map" className="relative h-full">
      <ReportIcon />
      <SpeedIndicator speedLimit={50} currentSpeed={40} />
      <div className="*:p-2 fixed top-2 left-2 *:bg-white *:shadow-md z-10">
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
