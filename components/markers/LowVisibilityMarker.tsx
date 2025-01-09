import { EyeOff } from "lucide-react";

export default function LowVisibilityMarker() {
	return (
		<div
			className="bg-white p-2 rounded-full border border-black"
			title="LowVisibility"
		>
			<EyeOff size={20} />
		</div>
	);
}
