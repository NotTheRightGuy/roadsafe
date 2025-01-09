"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Incident {
  id: string;
  type: string;
  location: string;
  perpetrator: string;
  severity: "Critical" | "Moderate" | "Low";
  timestamp: string;
}

const mockIncidents: Incident[] = [
  {
    id: "1",
    type: "Ouch",
    location: "Gandhinagar",
    perpetrator: "Thief",
    severity: "Critical",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "NO way",
    location: "Gandhinagar",
    perpetrator: "Thief",
    severity: "Moderate",
    timestamp: "2 min ago",
  },
  {
    id: "3",
    type: "Ohoho",
    location: "Gandhinagar",
    perpetrator: "Thief",
    severity: "Low",
    timestamp: "2 min ago",
  },
  {
    id: "4",
    type: "Dead",
    location: "Gandhinagar",
    perpetrator: "Thief",
    severity: "Moderate",
    timestamp: "2 min ago",
  },
];

function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {incident.timestamp}
          </span>
          <Badge
            variant={
              incident.severity === "Critical" ? "destructive" : "secondary"
            }
            className={
              incident.severity === "Moderate"
                ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                : incident.severity === "Low"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : ""
            }
          >
            {incident.severity}
          </Badge>
        </div>
        <h3 className="font-medium">{incident.type}</h3>
        <p className="text-sm text-muted-foreground">
          {incident.perpetrator} • {incident.location}
        </p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700">RESPOND</Button>
    </div>
  );
}

function IncidentFeed({ incidents }: { incidents: Incident[] }) {
  incidents = incidents || mockIncidents;
  return (
    <div className="bg-background border rounded-lg h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Live Incident Feed</h2>
        <Button variant="ghost" size="sm">
          Clear
        </Button>
      </div>
      <div className="divide-y overflow-y-auto flex-1">
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
}

function MapView() {
  return (
    <div className="relative w-full h-full bg-zinc-100 rounded-lg overflow-hidden">
      <img
        src="/placeholder.svg?height=600&width=800"
        alt="Map View"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="h-full w-full p-4">
      <div className="grid lg:grid-cols-5 gap-4 h-full">
        <div className="lg:col-span-3 h-full">
          <MapView />
        </div>
        <div className="lg:col-span-2 h-full">
          <IncidentFeed />
        </div>
      </div>
    </div>
  );
}
