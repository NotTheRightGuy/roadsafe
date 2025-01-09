"use client"
import { useLocation } from "@/hooks/location";
import { getWeather } from "@/lib/actions/getWeather";
import { Weather } from "@/lib/weather";

import { useEffect, useState } from "react";

export function LiveWeather() {
	const location = useLocation();
	const [weather, setWeather] = useState<Weather | null>(null);

	useEffect(() => {
		async function fetchData() {
			if (!location) {
				return;
			}
			const weatherData = await getWeather(location.latitude, location.longitude);
			setWeather(weatherData);
		}
		fetchData();
	}, [location]);

	if (!weather) {
		return <div>Loading...</div>;
	}

	return (
		<div className="">
			{weather.main}<br />
			{weather.description}
		</div>
	);
}