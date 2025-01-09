"use client"
import { getWeather } from "@/lib/actions/getWeather";
import { Weather } from "@/lib/weather";
import { Snowflake, Droplets, Wind, Cloud, Gauge } from "lucide-react";

import { useEffect, useState } from "react";
import { useLocationContext } from "./LocationContext";
export function isHazardousWeather(weather: Weather): boolean {
	const HAZARDOUS_WEATHER = [
		"Thunderstorm",
		"Tornado",
		"Squall",
		"Mist",
		"Smoke",
		"Fog",
		"Haze",
		"Dust",
		"Sand"
	];

	const HAZARDOUS_DESCRIPTION = [
		"light intensity drizzle",
		"drizzle",
		"heavy intensity drizzle",
		"freezing rain",
		"blizzard"
	];

	// Check for hazardous weather conditions
	if (
		HAZARDOUS_WEATHER.includes(weather.main) ||
		HAZARDOUS_DESCRIPTION.includes(weather.description.toLowerCase())
	) {
		return true;
	}

	// Check if there is heavy rain or snow
	if ((weather.rain && weather.rain > 5) || (weather.snow && weather.snow > 5)) {
		return true;
	}

	// Check for strong wind
	if (weather.windSpeed > 15) {
		return true;
	}

	// Check for extreme temperatures (freezing or very hot)
	if (weather.currentTemp < 0 || weather.currentTemp > 35) {
		return true;
	}

	// Check for AQI levels
	if (weather.aqi > 150) {
		return true
	}

	// If none of the conditions are met, return false
	return false;
}

const WeatherDisplaySkeleton: React.FC = () => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto animate-pulse">
			<div className="flex items-center justify-between mb-4">
				<div>
					<div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-32"></div>
				</div>
				<div className="w-16 h-16 bg-gray-200 rounded-full"></div>
			</div>

			<div className="mb-4">
				<div className="h-10 bg-gray-200 rounded w-24 mb-2"></div>
				{/* <div className="h-4 bg-gray-200 rounded w-48"></div> */}
			</div>

			<div className="mb-4 flex items-center">
				<div className="w-5 h-5 bg-gray-200 rounded-full mr-2"></div>
				<div className="h-4 bg-gray-200 rounded w-32"></div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{[...Array(4)].map((_, index) => (
					<div key={index} className="flex items-center">
						<div className="w-5 h-5 bg-gray-200 rounded-full mr-2"></div>
						<div className="h-4 bg-gray-200 rounded w-24"></div>
					</div>
				))}
			</div>
		</div>
	)
}

interface WeatherDisplayProps {
	weather: Weather;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-2xl font-semibold text-gray-800">{weather.main}</h2>
					<p className="text-gray-600">{weather.description}</p>
				</div>
				<img src={weather.iconURL} alt={weather.description} className="w-16 h-16" />
			</div>

			<div className="mb-4">
				<p className="text-4xl font-bold text-gray-800">{weather.currentTemp}°C</p>
				{/* <p className="text-gray-600">
					Min: {weather.minTemp}°C | Max: {weather.maxTemp}°C
				</p> */}
			</div>

			<div className="mb-4 flex items-center">
				<Gauge className="w-5 h-5 text-green-500 mr-2" />
				<span className="text-gray-700">Air Quality Index: {weather.aqi}</span>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{weather.rain !== null && (
					<div className="flex items-center">
						<Droplets className="w-5 h-5 text-blue-500 mr-2" />
						<span className="text-gray-700">Rain: {weather.rain} mm</span>
					</div>
				)}
				{weather.snow !== null && (
					<div className="flex items-center">
						<Snowflake className="w-5 h-5 text-blue-300 mr-2" />
						<span className="text-gray-700">Snow: {weather.snow} mm</span>
					</div>
				)}
				<div className="flex items-center">
					<Wind className="w-5 h-5 text-gray-500 mr-2" />
					<span className="text-gray-700">Wind: {weather.windSpeed} m/s</span>
				</div>
				<div className="flex items-center">
					<Cloud className="w-5 h-5 text-gray-400 mr-2" />
					<span className="text-gray-700">{weather.main}</span>
				</div>
			</div>
		</div>
	);
};

export function LiveWeather() {
	const location = useLocationContext();
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
		return <WeatherDisplaySkeleton />
	}

	return (
		<>
			<WeatherDisplay weather={weather} />
			Harardous: {isHazardousWeather(weather) ? "Yes" : "No"}
		</>
	);
}