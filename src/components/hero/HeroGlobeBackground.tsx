"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

const GLOBE_THETA = 0.22;

function globeSize(container: HTMLElement): number {
  const w = container.clientWidth;
  const h = container.clientHeight;
  const size = Math.min(w, h, 1840);
  return Math.max(Math.round(size), 360);
}

export function HeroGlobeBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let phi = 0;
    let raf = 0;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let disposed = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const mapSamples = isMobile ? 8000 : 16000;

    const tick = () => {
      if (!globe || disposed) return;
      phi += 0.004;
      globe.update({
        width: width * dpr,
        height: width * dpr,
        phi,
        markers: [],
      });
      raf = requestAnimationFrame(tick);
    };

    const mountGlobe = () => {
      if (disposed || globe) return;

      width = globeSize(wrap);
      if (width < 120) {
        raf = requestAnimationFrame(mountGlobe);
        return;
      }

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: 0,
        theta: GLOBE_THETA,
        dark: 0,
        diffuse: 1.15,
        mapSamples,
        mapBrightness: 6.2,
        baseColor: [0.94, 0.95, 0.99],
        glowColor: [0.97, 0.98, 1],
        markerColor: [0.94, 0.95, 0.99],
        markers: [],
      });

      raf = requestAnimationFrame(tick);
    };

    mountGlobe();

    const ro = new ResizeObserver(() => {
      if (!globe || disposed) return;
      width = globeSize(wrap);
    });
    ro.observe(wrap);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      globe?.destroy();
      globe = null;
    };
  }, []);

  return (
    <div
      className="hero-globe pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="hero-globe-stage">
        <div ref={wrapRef} className="hero-globe-canvas-wrap">
          <canvas ref={canvasRef} className="hero-globe-canvas" />
        </div>
      </div>
      <div className="hero-globe-vignette" />
    </div>
  );
}
