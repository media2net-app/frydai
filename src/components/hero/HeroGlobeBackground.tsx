"use client";

import { useEffect, useRef, useState } from "react";

const GLOBE_THETA = 0.22;

function globeSize(container: HTMLElement): number {
  const w = container.clientWidth;
  const h = container.clientHeight;
  const size = Math.min(w, h, 1200);
  return Math.max(Math.round(size), 320);
}

function shouldRenderGlobe(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(max-width: 767px)").matches) return false;
  return true;
}

export function HeroGlobeBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!shouldRenderGlobe()) return;

    const start = () => setActive(true);
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const idleId = idle(start, { timeout: 1200 });

    return () => cancel(idleId);
  }, []);

  useEffect(() => {
    if (!active) return;

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let width = globeSize(wrap);
    let phi = 0;
    let raf = 0;
    let disposed = false;
    let cleanup: (() => void) | null = null;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    void import("cobe").then(({ default: createGlobe }) => {
      if (disposed) return;

      const globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: 0,
        theta: GLOBE_THETA,
        dark: 0,
        diffuse: 1.15,
        mapSamples: 10000,
        mapBrightness: 6.2,
        baseColor: [0.94, 0.95, 0.99],
        glowColor: [0.97, 0.98, 1],
        markerColor: [0.94, 0.95, 0.99],
        markers: [],
      });

      const tick = () => {
        phi += 0.004;
        globe.update({
          width: width * dpr,
          height: width * dpr,
          phi,
          markers: [],
        });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const ro = new ResizeObserver(() => {
        width = globeSize(wrap);
      });
      ro.observe(wrap);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        globe.destroy();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [active]);

  return (
    <div
      className="hero-globe pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="hero-globe-stage">
        <div ref={wrapRef} className="hero-globe-canvas-wrap">
          {active ? <canvas ref={canvasRef} className="hero-globe-canvas" /> : null}
        </div>
      </div>
      <div className="hero-globe-vignette" />
    </div>
  );
}
