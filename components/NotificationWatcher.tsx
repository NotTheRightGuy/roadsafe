import { Incident } from "@/hooks/useGetIncidents";
import { useLocationContext } from "@/context/LocationContext";
import { useNotification } from "@/hooks/useNotification";
import { haversine } from "@/lib/distance";
import { useEffect, useRef } from "react";
import { getWeather } from "@/lib/actions/getWeather";
import { isHazardousWeather } from "./LiveWeather";

export function NotificationWatcher({ incidents }: { incidents: Incident[] }) {
	const { notify } = useNotification();
	const notifHistory = useRef(new Set<string>());
	const locCtx = useLocationContext();

	useEffect(() => {
		if (!locCtx) return;
		const { currentLocation } = locCtx;
		if (!currentLocation) return;
		let thresholdDistance = 1;
		if (currentLocation.speed ?? 0 > 5) {
			thresholdDistance = currentLocation.speed! * 0.5 / 60;
		}
		incidents.forEach((incident) => {
			const dist = haversine(
				currentLocation.latitude,
				currentLocation.longitude,
				incident.latitude,
				incident.longitude,
			);
			if (dist <= thresholdDistance) {
				if (notifHistory.current.has(incident.id.toString())) return;
				const message = `There is a ${incident.incident_type.replaceAll("_", " ")} ${Math.floor(dist * 1000)} meters ahead of you`
				notify("Incident ahead", message);
				notifHistory.current.add(incident.id.toString());
			}
		});
	}, [incidents, notify, locCtx]);

	const weatherNotification = () => {
		const latitude = locCtx?.currentLocation?.latitude ?? null;
		const longitude = locCtx?.currentLocation?.longitude ?? null;
		if (!latitude || !longitude) {
			setTimeout(weatherNotification, 15 * 1000)
			return
		};

		getWeather(latitude, longitude).
		then((weather) => {
			console.log(weather)
			if (isHazardousWeather(weather)) {
				notify("Hazardous weather", `The weather is ${weather.description}, please drive safely`)
			}
		})

		setTimeout(weatherNotification, 30 * 60 * 1000);
	}
	useEffect(() => {
		weatherNotification();
	}, []);

	if (!locCtx) return null;
	return (<div className="hidden">lmao</div>)
}