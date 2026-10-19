"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function ParticleField() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particleOptions: ISourceOptions = {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: { value: 85, density: { enable: true, area: 1200 } },
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
      init={particlesInit}
      options={particleOptions}
      className="pointer-events-none absolute inset-0"
    />
  );
}
