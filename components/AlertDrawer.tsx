import { useState, useEffect } from "react";
import DragCloseDrawer from "./ui/DragCloseDrawer";
import { Button } from "./ui/button";
import { useMap } from "@/context/MapContext";
import { incidents, IncidentType } from "@/lib/incidents";
import { jakarta } from "@/app/layout";
import { Loader2 } from "lucide-react";

const indianNames: string[] = [
  "Arjun Malhotra",
  "Priya Subramaniam",
  "Rajesh Choudhury",
  "Zara Sheikh",
  "Karthik Menon",
  "Anjali Deshmukh",
  "Dev Kapoor",
  "Meera Krishnamurthy",
  "Rohan Singhania",
  "Nisha Patel",
];

const latLngPairs: [number, number][] = [
  [23.197147558049394, 72.46355044879485],
  [23.04338102634228, 72.50760906746922],
  [23.089227764809195, 72.63931484213143],
  [22.843163360806532, 72.56305487035357],
  [22.834696402298373, 72.49449161588628],
  [22.931305005887697, 72.69036110752347],
  [23.009411796474698, 72.5358033696882],
  [22.994197403143524, 72.47160717280036],
  [23.166745746120746, 72.69451713459256],
  [22.989878874920873, 72.73090895818228],
];

const randomChoice = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const AlertDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) => {
  const { olamaps, currentLocation } = useMap();
  const [selectedIncident, setSelectedIncident] = useState<IncidentType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const submitIncident = async () => {
    if (selectedIncident) {
      setLoading(true);
      try {
        console.log("Incident reported", selectedIncident);
        const [lat, lng] = randomChoice(latLngPairs);
        const resp = await fetch("/api/incident", {
          method: "POST",
          body: JSON.stringify({
            longitude: lng,
            latitude: lat,
            reported_at: new Date().toISOString(),
            reported_by: randomChoice(indianNames),
            incident_type: selectedIncident.id
              .toLowerCase()
              .replaceAll(" ", "_"),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!resp.ok) {
          throw new Error("Failed to report incident");
        }
        setOpen(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (open && olamaps && currentLocation) {
      olamaps.getStaticMap(
        `https://api.olamaps.io/tiles/v1/styles/default-light-standard/static/${currentLocation.longitude},${currentLocation.latitude},20/800x600.png?marker=${currentLocation.longitude}%2C${currentLocation.latitude}%7Cred%7Cscale%3A0.9&api_key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`,
        "static-map"
      );
    }
  }, [open, olamaps, currentLocation]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="max-w-lg mx-auto flex flex-col p-6 gap-5 bg-slate-100">
          <h2 className={`text-lg font-extrabold ${jakarta.className}`}>
            Your current location
          </h2>
          <div
            className="w-full h-56 overflow-hidden bg-gray-200 rounded-lg"
            id="static-map"
          ></div>

          <div className="">
            <h2 className={`text-lg font-extrabold mb-4 ${jakarta.className}`}>
              Report an Incident
            </h2>
            <div className={`grid grid-cols-3 gap-4 mb-4 ${jakarta.className}`}>
              {incidents.map((incident) => (
                <button
                  key={incident.id}
                  onClick={() => setSelectedIncident(incident)}
                  className={`bg-slate-200/70 ${
                    selectedIncident?.id === incident.id
                      ? "ring-2 ring-slate-300"
                      : ""
                  } p-4 rounded-lg flex flex-col items-center justify-center transition-all hover:opacity-90`}
                >
                  <span className="text-2xl mb-2">{incident.icon}</span>
                  <span className="text-md font-bold">{incident.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            className={`w-full px-4 py-2 bg-red-500 text-base cursor-pointer hover:bg-red-600 ${jakarta.className} `}
            type="button"
            disabled={!selectedIncident || loading}
            variant="default"
            onClick={submitIncident}
          >
            {loading && <Loader2 className="size-5 animate-spin" />} Reporting{" "}
            {selectedIncident?.label.toLowerCase()}
          </Button>
        </div>
      </DragCloseDrawer>
    </div>
  );
};
