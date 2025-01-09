import React from "react";
import Link from "next/link";
import Logo from "./Logo";

function Navbar() {
  return (
    <header className="absolute right-0 top-0 flex h-fit z-10 w-full items-center justify-between py-2 px-1">
      <div className="scale-75">
        <Logo />
      </div>
      <nav className="flex flex-wrap items-center justify-center gap-4 w-56">
        <Link href="/signup" className="py-2  text-zinc-950 font-semibold">Sign Up</Link>
        <Link href="/login" className="py-2 px-4 rounded-lg bg-red-700 text-zinc-50">Login</Link>
      </nav>
    </header>
  );
}

export default Navbar;
