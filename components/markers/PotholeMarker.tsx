import { Drill } from "lucide-react";

export default function PotholeMarker() {
    return (
        <div
            className="bg-white p-2 rounded-full border border-black"
            title="Pothole"
        >
            <Drill size={20} />
        </div>
    );
}
