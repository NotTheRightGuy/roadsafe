import { Building } from "lucide-react";

export default function ConstructionMarker() {
	return (
		<div
			className="bg-white p-2 rounded-full border border-black"
			title="Construction"
		>
			<Building size={20} />
		</div>
	);
}
