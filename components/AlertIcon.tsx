import React from "react";
import { TriangleAlertIcon } from "lucide-react";

export default function AlertIcon({ ...props }) {
    return (
        <div
            className="fixed right-2 bottom-16 z-10 bg-red-500 p-3 text-white rounded-2xl"
            {...props}
        >
            <TriangleAlertIcon size={24} />
        </div>
    );
}
