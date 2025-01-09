"use client"
import { createContext, useContext, ReactNode } from "react";
import { useLocation, Location } from "@/hooks/location";

const LocationContext = createContext<Location | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
	const location = useLocation();

	return (
		<LocationContext.Provider value={location}>
			{children}
		</LocationContext.Provider>
	);
};

export const useLocationContext = () => {
	return useContext(LocationContext);
};