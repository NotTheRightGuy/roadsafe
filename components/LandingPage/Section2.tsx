import {
  Hand,
  Clock,
  CheckCircle,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

function Section2() {
  // Data for the cards
  const impactData = [
    {
      icon: Hand,
      heading: "Real-Time Reporting",
      description: "Empowering users to report incidents instantly",
    },
    {
      icon: Clock,
      heading: "Faster Response",
      description: "Streamlined processes to minimize delays",
    },
    {
      icon: CheckCircle,
      heading: "High Resolution Rate",
      description: "Efficiently addressing reported cases",
    },
    {
      icon: AlertTriangle,
      heading: "Proactive Alerts",
      description: "Preventing issues before they escalate",
    },
  ];

  return (
    <div className="overflow-x-hidden flex flex-col items-center justify-center p-4 bg-white">
      <p className="font-bold text-xl text-gray-800 mb-6">Our Impact</p>
      <div className="flex flex-col gap-6 w-full items-center">
        {impactData.map((item, index) => (
          <ImpactCard
            key={index}
            lucideIcon={item.icon}
            heading={item.heading}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

function ImpactCard({
  lucideIcon: Icon,
  heading,
  description,
}: {
  lucideIcon: LucideIcon;
  heading: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-md">
        <Icon size={28} className="text-white" />
      </div>
      <p className="font-bold text-lg mt-2">{heading}</p>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default Section2;
