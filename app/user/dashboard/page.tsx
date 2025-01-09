"use client";
import { useEffect, useState } from "react";
import { useMap } from "@/context/MapContext";
import { CirclePlus, CircleMinus } from "lucide-react";
import {
  AccidentMarker,
  PotholeMarker,
  ConstructionMarker,
  LowVisibilityMarker,
  ObstacleMarker,
  RoadClosureMarker,
  SlipperyMarker,
  StalledMarker,
} from "@/components/markers";
import AlertIcon from "@/components/AlertIcon";
import useGetIncidents from "@/hooks/useGetIncidents";
import { AlertDrawer } from "@/components/AlertDrawer";
import { SpeedIndicator } from "@/components/ui/SpeedIndicator";
import { supabase } from "@/lib/supabase";
import NavigationBar from "@/components/NavigationBar";
import Chatbot from "@/components/ui/user-dashboard/Chatbot";
import { useLocationContext } from "@/context/LocationContext";
import { useSpeedLimit } from "@/hooks/useSpeedLimit";
import { Incident } from "@/app/police/dashboard/Dashboard";
import ChatDrawer from "@/components/ui/ChatDrawer";

export default function Dashboard() {
  const { map, currentLocation, initMap, zoomIn, zoomOut, addMarker } =
    useMap();

  const location = useLocationContext();
  const speedLimit = useSpeedLimit();

  const [open, setOpen] = useState(false);
  const [chatopen, setChatOpen] = useState(false);
  const { incidents, setIncidents } = useGetIncidents();

  useEffect(() => {
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
              prevIncidents.filter((incident) => incident.id !== payload.old.id)
            );
          } else {
            setIncidents(
              (prevIncidents) => [...prevIncidents, payload.new] as any[]
            );
          }
        }
      )
      .subscribe();

    return () => {
      incidentListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentLocation) {
      initMap(currentLocation);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (map != null) {
      incidents.forEach((incident) => {
        let marker: (() => JSX.Element) | null = null;
        switch (incident.incident_type.toLowerCase()) {
          case "crash":
            marker = AccidentMarker;
            break;
          case "pothole":
            marker = PotholeMarker;
            break;
          case "road_closure":
            marker = RoadClosureMarker;
            break;
          case "construction":
            marker = ConstructionMarker;
            break;
          case "low_visibility":
            marker = LowVisibilityMarker;
            break;
          case "obstacle":
            marker = ObstacleMarker;
            break;
          case "slippery":
            marker = SlipperyMarker;
            break;
          case "stalled":
            marker = StalledMarker;
            break;
        }
        if (marker) {
          addMarker(incident.longitude, incident.latitude, map, marker);
        } else {
          addMarker(incident.longitude, incident.latitude, map);
        }
      });
    }
  }, [map, incidents]);


  const [incidentsOnRoute, setIncidentsOnRoute] = useState<Incident[]>([]);

    return (
        <div id="map" className="relative h-full">
            <NavigationBar setIncidentsOnRoute={setIncidentsOnRoute} />
            <AlertIcon
                onClick={() => {
                    setOpen(true);
                }}
            />
            <SpeedIndicator speedLimit={60} currentSpeed={0} />
            <Chatbot
        onClick={() => {
          setChatOpen(true);
        }}
      />
            <SpeedIndicator
                speedLimit={speedLimit.limit}
                currentSpeed={location?.currentLocation?.speed ?? 0}
            />
            <div className="*:p-2 fixed bottom-4 right-2 *:bg-white *:shadow-md z-10">
                <button className="rounded-l-full p-2">
                    <CirclePlus size={24} onClick={zoomIn} />
                </button>
                <button className="rounded-r-full">
                    <CircleMinus size={24} onClick={zoomOut} />
                </button>
            </div>
            <AlertDrawer open={open} setOpen={setOpen} />
        </div>
    );;
}
