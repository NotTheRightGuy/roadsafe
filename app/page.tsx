import { fetchWeather } from "@/lib/weather";

export default async function Home() {
  const weather = await fetchWeather(23.5, 72.7)
  return (
    <div className="">
      {weather.main}<br />
      {weather.description}
    </div>
  );
}
