"use client";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    ReactNode,
} from "react";

import { CurrentMarker } from "@/components/markers";
import { renderToString } from "react-dom/server";
import { OlaMaps } from "@/mapsSDK";
import { useLocationContext } from "@/context/LocationContext";

interface MapContextProps {
    map: any;
    currentLocation: any;
    initMap: (location: { longitude: number; latitude: number }) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    addMarker: (
        longitude: number,
        latitude: number,
        map: any,
        marker?: () => JSX.Element
    ) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
    const [map, setMap] = useState<any>(null);
    const ctxValue = useLocationContext();
    const currentLocation = ctxValue?.currentLocation;

    const olaMapsRef = useRef<OlaMaps | null>(null);

    useEffect(() => {
        if (!olaMapsRef.current) {
            olaMapsRef.current = new OlaMaps({
                apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
            });
        }
    }, []);

    const initMap = (location: { longitude: number; latitude: number }) => {
        const { longitude, latitude } = location;
        if (!map) {
            const myMap = olaMapsRef.current!.init({
                container: "map",
                center: [longitude, latitude],
                zoom: 15,
            });
            addMarker(longitude, latitude, myMap, CurrentMarker);

            setMap(myMap);
            document
                .getElementsByClassName("maplibregl-ctrl-attrib")[0]
                ?.remove();
        } else {
            map.setCenter([longitude, latitude]);
        }
    };

    const addMarker = (
        longitude: number,
        latitude: number,
        map: any,
        marker?: () => JSX.Element
    ) => {
        if (marker) {
            const customMarker = document.createElement("div");
            customMarker.innerHTML = renderToString(marker());

            olaMapsRef
                .current!.addMarker({ element: customMarker })
                .setLngLat([longitude, latitude])
                .addTo(map);
        } else {
            olaMapsRef
                .current!.addMarker()
                .setLngLat([longitude, latitude])
                .addTo(map);
        }
    };

    const zoomIn = () => {
        map.setZoom(map.getZoom() + 1);
    };

    const zoomOut = () => {
        map.setZoom(map.getZoom() - 1);
    };

    return (
        <MapContext.Provider
            value={{
                map,
                currentLocation,
                initMap,
                zoomIn,
                zoomOut,
                addMarker,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export const useMap = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error("useMap must be used within a MapProvider");
    }
    return context;
};
