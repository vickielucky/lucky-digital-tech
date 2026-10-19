"use client";

import { motion } from "framer-motion";

const beams = [8, 20, 34, 50, 66, 80, 92];

export default function LightBeams() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {beams.map((left, index) => (
        <motion.div
          key={left}
          initial={{ opacity: 0.25, y: 0 }}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -52, 0] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: index * 0.18,
          }}
          className="absolute top-[6%] h-[420px] w-[4px] rounded-full bg-gradient-to-b from-emerald-300/100 via-emerald-500/90 to-transparent shadow-[0_0_120px_rgba(16,185,129,0.9)] blur-sm"
          style={{ left: `${left}%` }}
        >
          <div className="absolute -top-5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-emerald-200/100 shadow-[0_0_30px_rgba(16,185,129,1)]" />
        </motion.div>
      ))}
    </div>
  );
}
