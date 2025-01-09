import { useEffect, useState } from "react";

interface Incident {
    id: number;
    created_at: string;
    longitude: number;
    latitude: number;
    reported_at: string;
    reported_by: string;
    incident_type: string;
}

export default function useGetIncidents() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    async function getIncidents() {
        const res = await fetch("/api/incident");
        const data = await res.json();
        return data;
    }
    useEffect(() => {
        getIncidents().then((data) => setIncidents(data));
    }, []);
    return incidents;
}
