"use client";
import { ExternalLink, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Incident } from "@/app/police/dashboard/Dashboard";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IncidentDetailsProps {
    incident: any;
}

export function IncidentDetails({ incident }: IncidentDetailsProps) {
    const router = useRouter();
    const date = new Date(incident.created_at);
    const datetime = `${date.toDateString()} ${date.toTimeString()}`;
    return (
        <Card>
            <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold">
                        {incident.incident_type.charAt(0) +
                            incident.incident_type.slice(1).toLowerCase()}{" "}
                        Incident
                    </CardTitle>
                    <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-700"
                    >
                        Active
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label className="text-sm text-muted-foreground">
                            Type of incident
                        </Label>
                        <p className="text-sm font-medium">
                            {incident.incident_type}
                        </p>
                    </div>
                    <div>
                        <Label className="text-sm text-muted-foreground">
                            Reported Date
                        </Label>
                        <p className="text-sm font-medium">{datetime}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Location Details</h3>
                    <div className="space-y-2">
                        <div>
                            <Label className="text-sm text-muted-foreground">
                                Reported By
                            </Label>
                            <p className="text-sm font-medium">
                                {incident.reported_by}
                            </p>
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">
                                Coordinates
                            </Label>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4" />
                                <p className="font-medium">
                                    {incident.latitude.toFixed(6)},{" "}
                                    {incident.longitude.toFixed(6)}
                                    <Link
                                        href={`https://maps.google.com/?q=${incident.latitude},${incident.longitude}`}
                                        target="_blank"
                                    >
                                        <Button className="ml-2">
                                            Navigate <ExternalLink />
                                        </Button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={async () => {
                        const resp = await fetch(`/api/incident`, {
                            method: "DELETE",
                            body: JSON.stringify({ id: incident.id }),
                        });
                        if (resp.status !== 200) {
                            console.log(resp);
                            alert("Failed to mark incident as resolved");
                            return;
                        }
                        router.push("/police/dashboard");
                    }}
                >
                    Mark Resolved
                </Button>
            </CardContent>
        </Card>
    );
}
