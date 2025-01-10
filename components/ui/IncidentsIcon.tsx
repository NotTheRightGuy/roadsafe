import { Siren } from "lucide-react";
import React from "react";

function IncidentsIcon({ ...props }) {
  return (
    <button
      className="fixed top-48 cursor-pointer right-2 z-10 bg-amber-500 p-3 text-white rounded-2xl"
      {...props}
    >
      <Siren size={24} className="" />
    </button>
  );
}

export default IncidentsIcon;
