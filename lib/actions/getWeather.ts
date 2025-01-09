"use server"

import { fetchWeather } from "@/lib/weather"

export async function getWeather(latitude: number, longitude: number) {
	const weather = await fetchWeather(latitude, longitude)
	return weather
}