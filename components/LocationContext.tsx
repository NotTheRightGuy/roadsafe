"use client"
import { createContext, useContext, ReactNode } from "react";
import { useLocation, Location } from "@/hooks/location";

type LocationContextType = {
	currentLocation: Location | null;
	locationHistory: Location[];
};

const LocationContext = createContext<LocationContextType | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
	const {currentLocation, locationHistory} = useLocation();
	const contextValue = {currentLocation, locationHistory};

	return (
		<LocationContext.Provider value={contextValue}>
			{children}
		</LocationContext.Provider>
	);
};

export const useLocationContext = () => {
	return useContext(LocationContext);
};