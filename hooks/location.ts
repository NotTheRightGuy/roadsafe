import { useState, useEffect } from "react";

export function useLocation(delay: number = 10000) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        console.log("fetching location...")
        const st = new Date()
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            const et = new Date()
            console.log("location mil gayi in ", et.getTime() - st.getTime(), "ms")
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    updateLocation();
    const intervalId = setInterval(updateLocation, delay);

    return () => clearInterval(intervalId);
  }, [delay]);

  return location;
}