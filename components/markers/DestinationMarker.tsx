"use client";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const svgVariants: Variants = {
  normal: {
    y: 0,
  },
  animate: {
    y: [0, -5, -3],
    transition: {
      duration: 0.5,
      times: [0, 0.6, 1],
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
};

const circleVariants: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [0.5, 0],
    transition: {
      delay: 0.3,
      duration: 0.5,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
};

const MapPinIcon = ({ className }: { className?: string }) => {
  const controls = useAnimation();

  return (
    <div
      className={cn(
        "cursor-pointer scale-110 select-none p-2 rounded-md transition-colors duration-200 flex items-center justify-center",
        className
      )}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={svgVariants}
        initial="normal"
        className={cn("fill-red-500")}
        animate={controls}
      >
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <motion.circle
          cx="12"
          cy="10"
          r="3"
          variants={circleVariants}
          initial="normal"
          animate={controls}
          className={cn("fill-slate-200")}
        />
      </motion.svg>
    </div>
  );
};

export { MapPinIcon };
