import React, { Dispatch, SetStateAction } from "react";
import DragCloseDrawer from "./DragCloseDrawer";
import { jakarta } from "@/app/layout";
import {
    AccidentMarker,
    ConstructionMarker,
    LowVisibilityMarker,
    ObstacleMarker,
    PotholeMarker,
    RoadClosureMarker,
    SlipperyMarker,
    StalledMarker,
} from "../markers";

export default function IncidentDrawer({
    open,
    setOpen,
    incidents,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    incidents: Record<string, number>;
}) {
    enum IncidentLabels {
        crash = "Crash",
        road_closure = "Road Closure",
        pothole = "Pot Hole",
        construction = "In Construction",
        low_visibility = "Low Visibility",
        obstacle = "Obstacle",
        slippery = "Slippery Road",
        stalled = "Stalled Vehicle",
    }
    const IncidentIcons = {
        crash: <AccidentMarker />,
        road_closure: <RoadClosureMarker />,
        pothole: <PotholeMarker />,
        construction: <ConstructionMarker />,
        low_visibility: <LowVisibilityMarker />,
        obstacle: <ObstacleMarker />,
        slippery: <SlipperyMarker />,
        stalled: <StalledMarker />,
    };
    return (
        <div
            className={`absolute inset-0 w-full flex items-center justify-center ${jakarta.className}`}
        >
            <DragCloseDrawer open={open} setOpen={setOpen}>
                <div className="p-4 rounded-lg w-full">
                    <h1 className="text-2xl font-bold">Incidents</h1>
                    <div className="flex flex-col items-start justify-evenly w-full pt-5">
                        {Object.entries(incidents).map(([type, count]) => (
                            <div
                                key={type}
                                className="flex items-center justify-around w-full px-4 py-4 rounded-lg bg-slate-200/60 "
                            >
                                {
                                    IncidentIcons[
                                        type as keyof typeof IncidentIcons
                                    ]
                                }
                                <p className="font-extrabold text-xl">
                                    {
                                        IncidentLabels[
                                            type as keyof typeof IncidentLabels
                                        ]
                                    }
                                </p>
                                <span className="ml-2 font-semibold text-lg text-gray-800">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </DragCloseDrawer>
        </div>
    );
}
