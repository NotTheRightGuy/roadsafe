import { EyeClosed } from "lucide-react";

export default function LowVisibilityMarker() {
	return (
		<div
			className="bg-white p-2 rounded-full border border-black"
			title="LowVisibility"
		>
			<EyeClosed size={20} />
		</div>
	);
}
