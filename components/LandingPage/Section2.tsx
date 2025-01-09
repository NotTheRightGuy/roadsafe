import { Cat, type LucideIcon } from "lucide-react";

function Section2() {
  return (
    <div className="overflow-x-hidden flex flex-col items-center justify-center">
      <p className="font-bold text-3xl mb-4">Our Impact</p>
      <ImpactCard />
    </div>
  );
}

function ImpactCard({
  lucideIcon,
  heading,
  description,
}: {
  lucideIcon: LucideIcon;
  heading: string;
  description: string;
}) {
  return (
    <div className="bg-green-600 h-40 w-2/3 flex flex-col items-center justify-center mb-2">
      <Cat size={50} className="p-2 bg-red-500 rounded-xl text-zinc-50"/>
    </div>
  );
}
export default Section2;
