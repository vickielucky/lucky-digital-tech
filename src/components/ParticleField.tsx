"use client";

import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleField() {
  const particleOptions: ISourceOptions = {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: { value: 85 },
      color: { value: "#b4ffd9" },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.2, max: 0.8 },
        animation: { enable: true, speed: 0.4, minimumValue: 0.15, sync: false },
      },
      size: { value: { min: 1, max: 2.5 } },
      move: {
        enable: true,
        speed: 0.45,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: { onHover: { enable: false }, onClick: { enable: false }, resize: true },
    },
    detectRetina: true,
    background: { color: { value: "transparent" } },
  };

  return (
    <Particles
      id="hero-particle-field"
      options={particleOptions}
      className="pointer-events-none absolute inset-0"
    />
  );
}
