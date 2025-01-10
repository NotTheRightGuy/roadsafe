import { Incident } from "@/hooks/useGetIncidents";
import { useLocationContext } from "@/context/LocationContext";
import { useNotification } from "@/hooks/useNotification";
import { haversine } from "@/lib/distance";
import { useEffect, useRef } from "react";

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

	if (!locCtx) return null;
	return (<div className="hidden">lmao</div>)
}