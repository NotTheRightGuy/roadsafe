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
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    async function getIncidents() {
        try {
            const res = await fetch("/api/incident");
            if (!res.ok) throw new Error("Failed to fetch incidents");
            const data = await res.json();
            return data;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
            return [];
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getIncidents().then((data) => setIncidents(data));
    }, []);

    return { incidents, loading, error, setIncidents };
}
