"use client";
import { useEffect } from "react";
import { useMap } from "@/context/MapContext";
import { CirclePlus, CircleMinus } from "lucide-react";
import { ReportIcon, SpeedIndicator } from "@/components/ui/user-dashboard/bottomicons";
import { AccidentMarker, PotholeMarker } from "@/components/markers";
import useGetIncidents from "@/hooks/useGetIncidents";

export default function Dashboard() {
    const { map, currentLocation, initMap, zoomIn, zoomOut, addMarker } =
        useMap();
    const incidents = useGetIncidents();

    useEffect(() => {
        if (currentLocation) {
            initMap(currentLocation);
        }
    }, [currentLocation]);

    useEffect(() => {
        if (map != null) {
            incidents.forEach((incident) => {
                if (incident.incident_type.toLowerCase() === "accident")
                    addMarker(
                        incident.longitude,
                        incident.latitude,
                        map,
                        AccidentMarker
                    );
                else if (incident.incident_type.toLowerCase() === "pothole")
                    addMarker(
                        incident.longitude,
                        incident.latitude,
                        map,
                        PotholeMarker
                    );
                else addMarker(incident.longitude, incident.latitude, map);
            });
        }
    }, [map, incidents]);

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
