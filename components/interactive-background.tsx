"use client";

import { useEffect, useRef } from "react";

export function InteractiveBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || touch) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        element.style.setProperty("--mx", `${50 + x * 8}%`);
        element.style.setProperty("--my", `${45 + y * 8}%`);
        element.style.setProperty("--tilt-x", `${y * -4}deg`);
        element.style.setProperty("--tilt-y", `${x * 4}deg`);
      });
    };

    const onVisibility = () => {
      element.style.animationPlayState = document.hidden ? "paused" : "running";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <div className="interactive-bg" ref={ref} aria-hidden="true" />;
}
