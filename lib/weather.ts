const API_KEY = process.env.OPENWEATHER_API_KEY ?? ""
if (API_KEY === "") {
	throw new Error("OPENWEATHER_API_KEY env var not set")
}

export type Weather = {
	main: string
	description: string
	iconURL: string
}


export async function fetchWeather(lat: number, lon: number) {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
	const resp = await fetch(url)
	const jsonResp = await resp.json()
	return {
		...jsonResp['weather'][0],
		iconURL: `http://openweathermap.org/img/wn/${jsonResp['weather'][0].icon}.png`
	} as Weather
}
