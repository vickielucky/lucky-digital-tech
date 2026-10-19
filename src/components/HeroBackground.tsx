"use client";

import LightBeams from "./LightBeams";
import ParticleField from "./ParticleField";

export default function HeroBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#020202] bg-gradient-to-br from-[#020202] via-[#060906] to-[#010101] opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.07),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(56,189,115,0.05),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.03),transparent_22%,transparent_78%,rgba(255,255,255,0.03))] opacity-45" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:180px_180px] opacity-12" />

      <ParticleField />
      <LightBeams />
    </div>
  );
}
