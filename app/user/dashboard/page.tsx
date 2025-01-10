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
import { NavigationBar } from "@/components/NavigationBar";
import { Chatbot } from "@/components/ui/user-dashboard/Chatbot";
import { useLocationContext } from "@/context/LocationContext";
// import { useSpeedLimit } from "@/hooks/useSpeedLimit";
import { Incident } from "@/app/police/dashboard/Dashboard";
import ChatDrawer from "@/components/ui/ChatDrawer";
import { NotificationWatcher } from "@/components/NotificationWatcher";
import IncidentDrawer from "@/components/ui/IncidentDrawer";
import IncidentsIcon from "@/components/ui/IncidentsIcon";

export default function Dashboard() {
  const { map, currentLocation, initMap, zoomIn, zoomOut, addMarker } =
    useMap();

  const location = useLocationContext();
  // const speedLimit = useSpeedLimit();

  const [open, setOpen] = useState(false);
  const [chatopen, setChatOpen] = useState(false);
  const [incidentOpen, setIncidentOpen] = useState(false);
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

  // create a map of incident type and its count
  const incidentsMap = incidentsOnRoute.reduce((acc, incident) => {
    acc[incident.incident_type] = (acc[incident.incident_type] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div id="map" className="relative h-full">
      <NavigationBar setIncidentsOnRoute={setIncidentsOnRoute} />
      <AlertIcon
        onClick={() => {
          setOpen(true);
        }}
      />
      <SpeedIndicator
        speedLimit={60}
        currentSpeed={currentLocation?.speed ?? 0}
      />
      <Chatbot
        onClick={() => {
          setChatOpen(true);
        }}
      />
      <IncidentsIcon
        onClick={() => {
          setIncidentOpen(true);
        }}
        count={incidentsOnRoute.length}
        hidden={incidentsOnRoute.length === 0}
      />
      <SpeedIndicator
        speedLimit={120}
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
      <ChatDrawer
        open={chatopen}
        setOpen={setChatOpen}
        key={"chat-drawer"}
        incidents={incidents}
      />
      <IncidentDrawer
        open={incidentOpen}
        setOpen={setIncidentOpen}
        key={"incident-drawer"}
        incidents={incidentsMap}
      />
      <NotificationWatcher incidents={incidents} />
    </div>
  );
}
