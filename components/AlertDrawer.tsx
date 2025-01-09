import React from "react";
import DragCloseDrawer from "./ui/DragCloseDrawer";
import { Button } from "./ui/button";

export const AlertDrawer = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: any;
}) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <DragCloseDrawer open={open} setOpen={setOpen}>
                <div className="max-w-lg mx-auto p-6 bg-slate-100">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4"></div>

                    {/* Map Placeholder */}
                    <div className="w-full h-56 bg-gray-200 rounded-lg mb-4"></div>

                    {/* Location Confirmation */}
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

                    {/* Report Section */}
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

                    {/* Footer Button */}
                    <Button className="w-full" variant="outline">
                        Reporting Crash
                    </Button>
                </div>
            </DragCloseDrawer>
        </div>
    );
};
