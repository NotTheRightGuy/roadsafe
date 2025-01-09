"use client";
import { useEffect, useState } from "react";
import { useMap } from "@/context/MapContext";
import { CirclePlus, CircleMinus } from "lucide-react";
import { AccidentMarker, PotholeMarker } from "@/components/markers";
import AlertIcon from "@/components/AlertIcon";
import useGetIncidents from "@/hooks/useGetIncidents";
import { AlertDrawer } from "@/components/AlertDrawer";
import { SpeedIndicator } from "@/components/ui/SpeedIndicator";
import getCords from "@/lib/getCords";
import getDirection from "@/lib/getDirection";
import NavigationBar from "@/components/NavigationBar";

export default function Dashboard() {
    const { map, currentLocation, initMap, zoomIn, zoomOut, addMarker } =
        useMap();

    const [open, setOpen] = useState(false);
    const incidents = useGetIncidents();

    useEffect(() => {
        if (currentLocation) {
            initMap(currentLocation);
        }
        // if (currentLocation) {
        //     getCords("Tirupati Aakruti Greenz").then((cords) => {
        //         console.log(currentLocation, cords);
        //         getDirection(
        //             {
        //                 lng: currentLocation.longitude,
        //                 lat: currentLocation.latitude,
        //             },
        //             cords
        //         ).then((data) => {
        //             console.log(data);
        //         });
        //     });
        // }
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
            <NavigationBar />
            <AlertIcon
                onClick={() => {
                    setOpen(true);
                }}
            />
            <SpeedIndicator speedLimit={60} currentSpeed={0} />
            <div className="*:p-2 fixed bottom-4 right-2 *:bg-white *:shadow-md z-10">
                <button className="rounded-l-full p-2">
                    <CirclePlus size={24} onClick={zoomIn} />
                </button>
                <button className="rounded-r-full">
                    <CircleMinus size={24} onClick={zoomOut} />
                </button>
            </div>
            <AlertDrawer open={open} setOpen={setOpen} />
        </div>
    );
}
