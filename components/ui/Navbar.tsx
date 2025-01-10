import React from "react";
import Link from "next/link";
import Logo from "./Logo";

function Navbar() {
  return (
    <header className="flex h-fit z-10 w-full items-center justify-between py-2 px-1 overflow-hidden">
      <div className="flex items-center justify-center">
        <Logo />
        <h1 className="font-black text-2xl">Roadsafe</h1>
      </div>
      <nav className="flex flex-wrap items-center justify-center gap-4 mr-2"></nav>
    </header>
  );
}

export default Navbar;
