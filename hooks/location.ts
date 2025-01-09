import { useState, useEffect } from 'react';
import { FixedSizeArray } from '@/lib/fixedSizeArray';

export interface Location {
  latitude: number;
  longitude: number;
  speed: number | null;
  altitude: number | null;
  heading: number | null;
}

export function useLocation(delay: number = 10000, historySize: number = 50) {
  const [location, setLocation] = useState<Location | null>(null);
  const [history, setHistory] = useState<FixedSizeArray<Location>>(new FixedSizeArray(historySize));

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
          setHistory(prevHistory => {
            const newHistory = new FixedSizeArray<Location>(historySize);
            prevHistory.getAll().forEach(item => newHistory.add(item));
            newHistory.add(loc);
            return newHistory;
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
  }, [delay, historySize]);

  return { currentLocation: location, locationHistory: history.getAll() };
}

