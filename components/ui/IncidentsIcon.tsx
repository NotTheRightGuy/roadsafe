import { jakarta } from "@/app/layout";
import { Siren } from "lucide-react";
import React from "react";

function IncidentsIcon({ ...props }) {
  return (
    <button
      className="fixed top-48 cursor-pointer right-2 z-10 bg-amber-500 p-3 text-white rounded-2xl"
      {...props}
    >
      <div
        className={`p-1 min-h-5 min-w-5 max-w-max max-h-max bg-amber-400 rounded-full absolute text-sm font-bold text-white -top-1 -right-1 ${jakarta.className}`}
      >
        {props.count}
      </div>
      <Siren size={24} className="" />
    </button>
  );
}

export default IncidentsIcon;
