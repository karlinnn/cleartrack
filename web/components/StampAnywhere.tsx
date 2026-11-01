"use client";

import { useEffect, useRef } from "react";
import Seal from "@/components/Seal";
import { createRoot } from "react-dom/client";

function spawnSeal(x: number, y: number) {
  if (typeof window === "undefined") return;

  // Respect prefers-reduced-motion
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) return;

  const tilt = (Math.random() * 30 - 15).toFixed(1); // –15° to +15°
  const size = 72;

  const host = document.createElement("div");
  host.style.cssText = `
    position: fixed;
    left: ${x - size / 2}px;
    top: ${y - size / 2}px;
    width: ${size}px;
    height: ${size}px;
    pointer-events: none;
    z-index: 9999;
    --r: ${tilt}deg;
    animation: stamp-mark 2s cubic-bezier(0.22, 1, 0.36, 1) both;
  `;
  document.body.appendChild(host);

  const root = createRoot(host);
  root.render(
    <Seal
      size={size}
      text="ClearTrack · Verified ·"
      className=""
    />
  );

  setTimeout(() => {
    root.unmount();
    host.remove();
  }, 2100);
}

export default function StampAnywhere() {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "s" && e.key !== "S") return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if ((e.target as HTMLElement).isContentEditable) return;
      spawnSeal(mousePos.current.x, mousePos.current.y);
    };

    const onHeroClick = (e: MouseEvent) => {
      const hero = document.querySelector("[data-hero]");
      if (hero && hero.contains(e.target as Node)) {
        spawnSeal(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onHeroClick);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onHeroClick);
    };
  }, []);

  return null;
}
