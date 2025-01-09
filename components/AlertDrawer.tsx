import { useState, useEffect } from "react";
import DragCloseDrawer from "./ui/DragCloseDrawer";
import { Button } from "./ui/button";
import { useMap } from "@/context/MapContext";

export const AlertDrawer = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: any;
}) => {
    const { olamaps, currentLocation } = useMap();
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
                <div className="max-w-lg mx-auto p-6 bg-slate-100">
                    <div className="flex items-center justify-between mb-4"></div>

                    <div
                        className="w-full h-56 bg-gray-200 rounded-lg mb-4"
                        id="static-map"
                    ></div>

                    <div className="mb-6">
                        <p className="text-center text-sm text-gray-600 mb-3">
                            Is this location above correct?
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full">
                                Yes
                            </Button>
                            <Button
                                variant="outline"
                                disabled
                                className="w-full "
                            >
                                No
                            </Button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-base font-semibold mb-4">
                            Report an Incident
                        </h2>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
                                ></div>
                            ))}
                        </div>
                    </div>

                    <Button className="w-full" variant="outline">
                        Reporting Crash
                    </Button>
                </div>
            </DragCloseDrawer>
        </div>
    );
};
