import { useState, useEffect, useRef, useMemo } from "react";
import { FixedSizeArray } from "@/lib/fixedSizeArray";

export interface Location {
    latitude: number;
    longitude: number;
    speed: number | null;
    altitude: number | null;
    heading: number | null;
}

export function useLocation(delay: number = 10000, historySize: number = 50) {
    const [location, setLocation] = useState<Location | null>(null);
    const historyRef = useRef(new FixedSizeArray<Location>(historySize));
    const [updateTrigger, setUpdateTrigger] = useState(0);

    useEffect(() => {
        historyRef.current = new FixedSizeArray(historySize);
        setUpdateTrigger((prev) => prev + 1);
    }, [historySize]);

    useEffect(() => {
        if (navigator.geolocation) {
            console.log("Starting to watch location...");
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const loc: Location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        speed: position.coords.speed,
                        altitude: position.coords.altitude,
                        heading: position.coords.heading,
                    };
                    setLocation(loc);

                    // Append the new location to the history
                    historyRef.current.add(loc);
                    setUpdateTrigger((prev) => prev + 1);

                    console.debug("Location updated:", position.coords);
                },
                (error) => {
                    console.error("Error watching location:", error);
                },
                { timeout: delay }
            );

            return () => {
                console.log("Stopping location watch...");
                navigator.geolocation.clearWatch(watchId);
            };
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, [delay, historySize]);

    const locationHistory = useMemo(
        () => historyRef.current.getAll(),
        [updateTrigger]
    );

    return { currentLocation: location, locationHistory };
}
