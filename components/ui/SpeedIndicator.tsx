import { cn } from "@/lib/utils";
import { div } from "framer-motion/client";

export function SpeedIndicator({
    speedLimit,
    currentSpeed,
    className,
}: {
    speedLimit: number;
    currentSpeed: number;
    className?: string;
}) {
    return (
        <div className="flex z-10 fixed bottom-4 left-2 gap-1">
            <div className="bg-white w-10 h-10 rounded-full border flex items-center justify-center font-semibold shadow text-lg">
                {currentSpeed}
            </div>
        </div>
    );
}
