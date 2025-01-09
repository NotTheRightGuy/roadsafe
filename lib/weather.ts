const API_KEY = process.env.OPENWEATHER_API_KEY ?? ""
if (API_KEY === "") {
	throw new Error("OPENWEATHER_API_KEY env var not set")
}

export type Weather = {
	main: string
	description: string
	iconURL: string
	currentTemp: number
	minTemp: number
	maxTemp: number
	rain: number | null
	snow: number | null
	windSpeed: number
}

export async function fetchWeather(lat: number, lon: number): Promise<Weather> {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
	const resp = await fetch(url)
	const jsonResp = await resp.json()
	return {
		main: jsonResp['weather'][0].main,
		description: jsonResp['weather'][0].description,
		iconURL: `http://openweathermap.org/img/wn/${jsonResp['weather'][0].icon}.png`,
		currentTemp: jsonResp['main'].temp,
		minTemp: jsonResp['main'].temp_min,
		maxTemp: jsonResp['main'].temp_max,
		rain: jsonResp['rain'] ? jsonResp['rain']['1h'] : null,
		snow: jsonResp['snow'] ? jsonResp['snow']['1h'] : null,
		windSpeed: jsonResp['wind'].speed
	}
}