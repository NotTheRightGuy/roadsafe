"use client";
import React from "react";
import Navbar from "../ui/Navbar";
import Link from "next/link";
import { AccidentSvg } from "./AccidentSvg";

function Section1() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="flex w-screen flex-col items-start justify-start mt-16 px-3">
        <h1 className="text-3xl font-extrabold tracking-tighter leading-normal">
          Helping Communities, Preventing{" "}
          <span className="text-red-600">Accidents</span>
        </h1>
        <p className="text-lg leading-8 text-slate-600 mt-1 mb-6">
          Preventing Accidents Through the Power of Community Reporting
        </p>
        <Link
          href="#"
          className="rounded-xl bg-slate-900 px-4 py-3 text-base font-bold text-slate-50"
        >
          Report Accident
        </Link>
        <div className="mt-8">
          <AccidentSvg />
        </div>
      </div>
    </div>
  );
}

export default Section1;
