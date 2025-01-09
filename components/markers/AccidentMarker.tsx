import { Ambulance } from "lucide-react";

export default function AccidentMarker() {
    return (
        <div
            className="bg-white p-2 rounded-full border border-black"
            title="Accident"
        >
            <Ambulance size={24} />
        </div>
    );
}
