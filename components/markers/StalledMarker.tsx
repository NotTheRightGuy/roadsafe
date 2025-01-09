import { CarFront } from "lucide-react";

export default function StalledMarker() {
    return (
        <div
            className="bg-white p-2 rounded-full border border-black"
            title="Stalled"
        >
            <CarFront size={20} />
        </div>
    );
}
