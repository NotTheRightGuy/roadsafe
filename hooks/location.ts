import { useState, useEffect } from "react";

export type Location = {
  latitude: number;
  longitude: number;
  speed: number | null;
  altitude: number | null;
  heading: number | null;
};

export function useLocation(delay: number = 10000) {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      console.log("Starting to watch location...");
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
            altitude: position.coords.altitude,
            heading: position.coords.heading,
          });
          console.log("Location updated:", position.coords);
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
  }, [delay]);

  return location;
}
