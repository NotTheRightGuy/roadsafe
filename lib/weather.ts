const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ?? "";
if (API_KEY === "") {
    throw new Error("NEXT_PUBLIC_OPENWEATHER_API_KEY env var not set");
}

export type Weather = {
    main: string;
    description: string;
    iconURL: string;
    currentTemp: number;
    minTemp: number;
    maxTemp: number;
    rain: number | null;
    snow: number | null;
    windSpeed: number;
    aqi: number;
    humidity: number;
    precipitation: number;
    city: string;
    country: string;
};

export async function fetchWeather(lat: number, lon: number): Promise<Weather> {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    const [weatherResp, aqiResp] = await Promise.all([
        fetch(weatherUrl),
        fetch(aqiUrl),
    ]);
    const [weatherJson, aqiJson] = await Promise.all([
        weatherResp.json(),
        aqiResp.json(),
    ]);

    const precipitation = (weatherJson["rain"] ? weatherJson["rain"]["1h"] : 0) + (weatherJson["snow"] ? weatherJson["snow"]["1h"] : 0);

    return {
        main: weatherJson["weather"][0].main,
        description: weatherJson["weather"][0].description,
        iconURL: `http://openweathermap.org/img/wn/${weatherJson["weather"][0].icon}@2x.png`,
        currentTemp: weatherJson["main"].temp,
        minTemp: weatherJson["main"].temp_min,
        maxTemp: weatherJson["main"].temp_max,
        rain: weatherJson["rain"] ? weatherJson["rain"]["1h"] : null,
        snow: weatherJson["snow"] ? weatherJson["snow"]["1h"] : null,
        windSpeed: weatherJson["wind"].speed,
        aqi: aqiJson["list"][0]["main"]["aqi"],
        humidity: weatherJson["main"].humidity,
        precipitation: precipitation,
        city: weatherJson["name"],
        country: weatherJson["sys"].country,
    };
}
