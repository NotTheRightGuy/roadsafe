"use client";

import {
  BarChartIcon as ChartNoAxesColumn,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const routeName = usePathname();

  return (
    <div className="h-full w-full py-4 flex flex-col">
      {/* Navigation Links */}
      <div className="flex flex-col items-center gap-4">
        <Link
          href="#"
          className={`p-3 rounded-md transition-colors ${
            routeName === "/police/dashboard"
              ? "bg-red-500 text-red-200"
              : "bg-red-200 text-red-500 hover:bg-red-300"
          }`}
        >
          <LayoutDashboard size={20} />
        </Link>

        <Link
          href="/police/dashboard/feed"
          className={`p-3 rounded-md transition-colors ${
            routeName === "/police/dashboard/feed"
              ? "bg-red-500 text-red-200"
              : "bg-red-200 text-red-500 hover:bg-red-300"
          }`}
        >
          <ChartNoAxesColumn size={20} />
        </Link>
      </div>

      {/* Profile Button - Auto pushed to bottom */}
      <div className="mt-auto flex justify-center">
        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-lg">
          P
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
