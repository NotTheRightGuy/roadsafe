"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAgoDuration } from "@/lib/timeutils";
import Link from "next/link";
import { useMap } from "@/context/MapContext";
import { AccidentMarker, PotholeMarker } from "@/components/markers";
import useGetIncidents from "@/hooks/useGetIncidents";
import { supabase } from "@/lib/supabase";

export interface Incident {
    id: string;
    incident_type: incidentType;
    latitude: number;
    longitude: number;
    created_at: string;
    reported_by: string;
}

<<<<<<< HEAD
type incidentType =
    | "road_closure"
    | "pothole"
    | "crash"
    | "obstacle"
    | "stalled_vehicle"
    | "under_construction"
    | "low_visibility"
    | "slippery_road";
=======
type incidentType = "road_closure" | "pothole" | "crash" | "obstacle" | "stalled_vehicle" | "under_construction" | "low_visibility" | "slippery_road"
>>>>>>> cbfe69c6a690c8e73b9d8b9b810d9375ba326528

async function reverseGeocode(lat: number, lon: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return "Unknown location";
        }

        const data = await response.json();
        const district = data.address.state_district;
        const state = data.address.state;
        return `${district}, ${state}`;
    } catch (error) {
        console.error("Failed to reverse geocode:", error);
        return "Unknown location";
    }
}

function IncidentCard({ incident }: { incident: Incident }) {
    const [location, setLocation] = React.useState("Loading location...");
    React.useEffect(() => {
        reverseGeocode(incident.latitude, incident.longitude).then(setLocation);
    }, [incident.latitude, incident.longitude]);

    let severity = "";
    const type = incident.incident_type;
    if (type == "road_closure" || type == "crash" || type == "obstacle") {
        severity = "Critical";
    } else if (
        type == "pothole" ||
        type == "low_visibility" ||
        type == "slippery_road" ||
        type == "stalled_vehicle" ||
        type == "under_construction"
    ) {
        severity = "Moderate";
    } else {
        severity = "Low";
    }

    const title = type.replace(/_/g, " ");
    const formattedTitle = title.replace(/\b\w/g, (char: string) =>
        char.toUpperCase()
    );

    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        {getAgoDuration(new Date(incident.created_at))}
                    </span>
                    <Badge
                        variant={
                            severity === "Critical"
                                ? "destructive"
                                : "secondary"
                        }
                        className={
                            severity === "Moderate"
                                ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                                : severity === "Low"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : ""
                        }
                    >
                        {severity}
                    </Badge>
                </div>
                <h3 className="font-medium">{formattedTitle}</h3>
                <p className="text-sm text-muted-foreground">
                    {incident.reported_by} • {location}
                </p>
            </div>
            <Link href={`/police/dashboard/incident/${incident.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    RESPOND
                </Button>
            </Link>
        </div>
    );
}

function IncidentFeed({ incidents }: { incidents: any }) {
    return (
        <div className="bg-background border rounded-lg h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Live Incident Feed</h2>
            </div>
            <div className="divide-y overflow-y-auto flex-1">
                {incidents.map((incident: any) => (
                    <IncidentCard key={incident.id} incident={incident} />
                ))}
            </div>
        </div>
    );
}

export default function Dashboard() {
    const { map, currentLocation, initMap, addMarker } = useMap();
    const { incidents, setIncidents } = useGetIncidents();

    React.useEffect(() => {
        const incidentListener = supabase
            .channel("supabase_realtime:incidents")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                },
                (payload) => {
                    if (payload.eventType === "DELETE") {
                        setIncidents((prevIncidents) =>
                            prevIncidents.filter(
                                (incident) => incident.id !== payload.old.id
                            )
                        );
                    } else {
                        setIncidents(
                            (prevIncidents) =>
                                [...prevIncidents, payload.new] as any[]
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            incidentListener.unsubscribe();
        };
    }, []);

    React.useEffect(() => {
        if (currentLocation) {
            initMap(currentLocation);
        }
    }, [currentLocation]);

    React.useEffect(() => {
        if (map != null) {
            incidents.forEach((incident) => {
                if (incident.incident_type.toLowerCase() === "accident")
                    addMarker(
                        incident.longitude,
                        incident.latitude,
                        map,
                        AccidentMarker
                    );
                else if (incident.incident_type.toLowerCase() === "pothole")
                    addMarker(
                        incident.longitude,
                        incident.latitude,
                        map,
                        PotholeMarker
                    );
                else addMarker(incident.longitude, incident.latitude, map);
            });
        }
    }, [map, incidents]);

    return (
        <div className="h-full w-full px-4">
            <div className="grid lg:grid-cols-5 gap-4 h-full">
                <div className="lg:col-span-3 h-full">
                    <div
                        id="map"
                        className="relative w-full h-full bg-zinc-100 rounded-lg overflow-hidden"
                    />
                </div>
                <div className="lg:col-span-2 h-full">
                    <IncidentFeed incidents={incidents} />
                </div>
            </div>
        </div>
    );
}
