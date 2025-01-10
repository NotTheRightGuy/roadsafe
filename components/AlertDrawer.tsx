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
    [23.033863, 72.585022],
    [23.030357, 72.517845],
    [23.0275, 72.5883],
    [22.992, 72.603],
    [23.06, 72.58],
    [23.0735, 72.6266],
    [23.0338, 72.5463],
    [23.0256, 72.5623],
    [23.0405, 72.53],
    [22.9786, 72.501],
    [23.0225, 72.5714],
    [23.0222, 72.5717],
    [23.0258, 72.5873],
    [23.033, 72.5625],
    [23.008, 72.5145],
    [23.03, 72.43],
    [23.07, 72.51],
    [23.037, 72.562],
    [23.0085, 72.5626],
    [23.05, 72.55],
    [23.06, 72.6],
    [22.99, 72.6],
    [23.0039, 72.5461],
    [23.1, 72.55],
    [23.11, 72.6],
    [23.1, 72.6],
    [23.08, 72.58],
    [23.07, 72.64],
    [23.04, 72.65],
    [22.97, 72.63],
    [22.99, 72.58],
    [23.05, 72.61],
    [23.07, 72.57],
    [23.05, 72.55],
    [23.02, 72.52],
    [23.02, 72.55],
    [23.05, 72.52],
    [23.0, 72.53],
    [22.99, 72.51],
    [23.0, 72.54],
    [23.07, 72.55],
    [23.03, 72.6],
    [23.03, 72.59],
    [23.01, 72.58],
    [23.02, 72.57],
    [23.02, 72.58],
    [23.04, 72.6],
    [23.05, 72.62],
    [23.03, 72.63],
    [23.02, 72.64],
    [23.0335, 72.5785],
    [23.06, 72.47],
    [23.07, 72.54],
    [23.08, 72.51],
    [23.07, 72.5],
    [23.22, 72.67],
    [23.0256, 72.5616],
    [23.05, 72.53],
    [23.0087, 72.5146],
    [23.04, 72.5],
    [23.02, 72.67],
    [23.05, 72.65],
    [22.99, 72.62],
    [22.98, 72.66],
    [22.99, 72.64],
    [23.06, 72.56],
    [23.12, 72.6],
    [23.05, 72.47],
    [23.08, 72.62],
    [23.0, 72.62],
    [23.08, 72.57],
    [23.03, 72.53],
    [23.01, 72.54],
    [23.02, 72.56],
    [23.05, 72.58],
    [22.99, 72.54],
    [22.97, 72.64],
    [23.1, 72.5],
    [23.02, 72.45],
    [23.02, 72.44],
    [23.06, 72.5],
    [23.05, 72.49],
    [23.01, 72.46],
    [22.96, 72.62],
    [23.04, 72.64],
    [23.13, 72.58],
    [23.25, 72.5],
    [23.07, 72.59],
    [23.1, 72.55],
    [22.95, 72.64],
    [23.06, 72.58],
    [23.07, 72.65],
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
    const [selectedIncident, setSelectedIncident] =
        useState<IncidentType | null>(null);
    const [loading, setLoading] = useState(false);
    const submitIncident = async () => {
        if (selectedIncident) {
            setLoading(true);
            try {
                const resp = await fetch("/api/incident", {
                    method: "POST",
                    body: JSON.stringify({
                        longitude: currentLocation.longitude,
                        latitude: currentLocation.latitude,
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
                    <h2
                        className={`text-lg font-extrabold ${jakarta.className}`}
                    >
                        Your current location
                    </h2>
                    <div
                        className="w-full h-56 overflow-hidden bg-gray-200 rounded-lg"
                        id="static-map"
                    ></div>

                    <div className="">
                        <h2
                            className={`text-lg font-extrabold mb-4 ${jakarta.className}`}
                        >
                            Report an Incident
                        </h2>
                        <div
                            className={`grid grid-cols-3 gap-4 mb-4 ${jakarta.className}`}
                        >
                            {incidents.map((incident) => (
                                <button
                                    key={incident.id}
                                    onClick={() =>
                                        setSelectedIncident(incident)
                                    }
                                    className={`bg-slate-200/70 ${
                                        selectedIncident?.id === incident.id
                                            ? "ring-2 ring-slate-300"
                                            : ""
                                    } p-4 rounded-lg flex flex-col items-center justify-center transition-all hover:opacity-90`}
                                >
                                    <span className="text-2xl mb-2">
                                        {incident.icon}
                                    </span>
                                    <span className="text-md font-bold">
                                        {incident.label}
                                    </span>
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
                        {loading && <Loader2 className="size-5 animate-spin" />}{" "}
                        Reporting {selectedIncident?.label.toLowerCase()}
                    </Button>
                </div>
            </DragCloseDrawer>
        </div>
    );
};
