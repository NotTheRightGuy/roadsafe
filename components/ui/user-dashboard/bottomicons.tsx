import { TriangleAlertIcon } from "lucide-react";

export function ReportIcon() {
  return (
    <div className="p-4 bg-red-500 absolute bottom-2 right-2 z-50 rounded-md">
      <TriangleAlertIcon className="text-zinc-50"size={24} />
    </div>
  );
}

export function SpeedIndicator({
  speedLimit,
  currentSpeed,
}: {
  speedLimit: number;
  currentSpeed: number;
}) {
  return (
    <div className="flex items-center justify-center gap-4 absolute bottom-2 right-20 z-50 bg-white px-4 py-2 rounded-3xl shadow-md">
      <span className="text-lg font-semibold px-4 py-2 border-2 border-red-500 rounded-full">
        {speedLimit}
      </span>
      <span className="text-base font-bold text-center leading-[-8px]">
        {currentSpeed}
        <br />
        Km/h
      </span>
    </div>
  );
}
