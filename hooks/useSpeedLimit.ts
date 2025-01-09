import { useLocationContext } from "@/context/LocationContext";
import { useState, useEffect } from "react";

export interface SpeedLimit {
	limit: number
}

export function useSpeedLimit() {
	const locCtx = useLocationContext()
	const [speedLimit, setSpeedLimit] = useState<SpeedLimit>({ limit: 100 });
	if (!locCtx) {
		throw new Error("useSpeedLimit must be used within a LocationProvider")
	}
	const { locationHistory } = locCtx;

	useEffect(() => {
		async function fetchSpeedLimit() {
			const payload = {
				snapStrategy: "snaptoroad",
				points: locationHistory.map(({ latitude, longitude }) => `${latitude},${longitude}`).join("|"),
				api_key: process.env.NEXT_PUBLIC_MAP_API_KEY || ""
			}
			const url = new URL("https://api.olamaps.io/routing/v1/speedLimits/");
			Object.keys(payload).forEach(key => url.searchParams.append(key, (payload as { [key: string]: string })[key]));

			const response = await fetch(url.toString());
			if (response.status !== 200) {
				return
			}
			const data = await response.json();
			setSpeedLimit({ limit: data.limit });
		}

		if (locationHistory.length > 0) {
			fetchSpeedLimit();
		}
	}, [locationHistory]);

	return speedLimit;
}
