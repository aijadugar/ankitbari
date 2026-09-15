"use client";
import { useEffect, useRef } from "react";

/**
 * TrainingRunWidget
 * -----------------
 * Two live loss curves — train and validation — drawn with a continuous,
 * non-looping stochastic simulation (an exponential decay toward a floor,
 * perturbed by a mean-reverting noise walk so it keeps breathing forever
 * instead of resetting). Nothing here is on a fixed loop: it's driven by
 * elapsed real time, so it can run indefinitely without ever repeating
 * the same trace.
 *
 * The simulation state lives at module scope and is pre-warmed on first
 * use, so route changes that unmount/remount this component resume the
 * same evolved curves instead of collapsing to flat, overlapping lines.
 *
 * Fully responsive: the canvas measures its parent and redraws on resize,
 * and every drawn coordinate is derived from the current width/height so it
 * reads correctly whether it's dropped into a small avatar square or a
 * larger card. Palette pulled toward the portfolio's own look (near-black
 * surface, off-white text, a soft violet accent echoing the "Twitter DM"
 * button) while keeping the extracted tokens' font, radius, and border.
 */

interface TrainingRunWidgetProps {
  className?: string;
}

interface Series {
  value: number; // current displayed loss (0..1 normalized-ish)
  ou: number; // mean-reverting noise state
  floor: number; // asymptote it decays toward
  start: number; // starting loss
  tau: number; // decay time constant (steps)
  theta: number; // OU mean-reversion strength
  sigma: number; // OU noise scale
  history: number[];
}

const MAX_POINTS = 96;
const PREWARM_STEPS = 320; // fast-forward so curves are already "trained"

interface SimState {
  t: number;
  train: Series;
  val: Series;
}

// Module-level singleton: survives remounts (route changes / view transitions)
let sim: SimState | null = null;

function getSim(): SimState {
  if (sim) return sim;

  const fresh = (floor: number, start: number, tau: number, theta: number, sigma: number): Series => ({
    value: start,
    ou: 0,
    floor,
    start,
    tau,
    theta,
    sigma,
    history: [],
  });

  const s: SimState = {
    t: 0,
    train: fresh(0.08, 1, 260, 0.08, 0.006),
    val: fresh(0.16, 1.05, 300, 0.05, 0.014),
  };

  // Seed full history and pre-warm the decay: without this, a (re)mount
  // shows 96 identical points → two straight, overlapping lines with the
  // endpoint dots marching in perfect parallel until the noise diverges.
  s.train.history.push(...Array(MAX_POINTS).fill(s.train.start));
  s.val.history.push(...Array(MAX_POINTS).fill(s.val.start));

  const gauss = () => {
    // Box-Muller
    const u1 = Math.max(Math.random(), 1e-6);
    const u2 = Math.random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };

  const advance = (series: Series, tGlobal: number) => {
    const decay = series.floor + (series.start - series.floor) * Math.exp(-tGlobal / series.tau);
    series.ou += -series.theta * series.ou + series.sigma * gauss();
    const next = Math.max(0.02, decay + series.ou);
    series.value = next;
    series.history.push(next);
    if (series.history.length > MAX_POINTS) series.history.shift();
  };

  for (let i = 0; i < PREWARM_STEPS; i++) {
    s.t += 1;
    advance(s.train, s.t);
    advance(s.val, s.t);
  }

  sim = s;
  return s;
}

export default function TrainingRunWidget({ className = "" }: TrainingRunWidgetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dims = { w: 220, h: 120 };
    const maxPoints = MAX_POINTS;

    const measure = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || canvas.clientWidth || 220;
      const h = parent?.clientHeight || canvas.clientHeight || 120;
      dims.w = Math.max(72, w);
      dims.h = Math.max(56, h);
    };
    measure();

    // Resume the shared simulation exactly where it left off
    const s = getSim();

    const gauss = () => {
      // Box-Muller
      const u1 = Math.max(Math.random(), 1e-6);
      const u2 = Math.random();
      return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    };

    const advance = (series: Series, tGlobal: number) => {
      const decay = series.floor + (series.start - series.floor) * Math.exp(-tGlobal / series.tau);
      series.ou += -series.theta * series.ou + series.sigma * gauss();
      const next = Math.max(0.02, decay + series.ou);
      series.value = next;
      series.history.push(next);
      if (series.history.length > maxPoints) series.history.shift();
    };

    const applySize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(dims.w * dpr);
      canvas.height = Math.round(dims.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applySize();

    let raf = 0;
    let lastStep = performance.now();
    const stepIntervalMs = 200;

    const draw = (now: number) => {
      if (now - lastStep > stepIntervalMs) {
        lastStep = now;
        s.t += 1;
        advance(s.train, s.t);
        advance(s.val, s.t);
      }

      const cssW = dims.w;
      const cssH = dims.h;
      ctx.clearRect(0, 0, cssW, cssH);

      // --- card surface, tuned toward the portfolio's near-black look ---
      const r = Math.max(4, Math.min(cssW, cssH) * 0.06);
      ctx.save();
      roundRect(ctx, 0, 0, cssW, cssH, r);
      ctx.fillStyle = "rgba(10, 11, 15, 0.72)";
      ctx.fill();
      roundRect(ctx, 0.5, 0.5, cssW - 1, cssH - 1, r);
      ctx.strokeStyle = "rgba(240, 253, 244, 0.1)";
      ctx.lineWidth = 0.64;
      ctx.stroke();
      ctx.restore();

      // --- layout, all relative to the box so it scales cleanly ---
      const padX = Math.max(8, cssW * 0.06);
      const headerH = cssH * 0.32;
      const graphY = cssH * 0.36;
      const graphH = cssH - graphY - cssH * 0.08;
      const graphW = cssW - padX * 2;
      const fontBig = Math.max(7, cssW * 0.052);
      const fontSmall = Math.max(6, cssW * 0.04);

      // --- header ---
      ctx.font = `${fontBig}px "Courier Prime", "Courier New", monospace`;
      ctx.fillStyle = "#f0fdf4";
      ctx.fillText("focusing", padX-20, headerH * 0.55);
      ctx.fillText("on training", padX-20, headerH * 0.98);

      // --- grid ---
      ctx.strokeStyle = "rgba(240, 253, 244, 0.08)";
      ctx.lineWidth = 1;
      for (let gy = 0; gy <= 2; gy++) {
        const y = graphY + (graphH / 2) * gy;
        ctx.beginPath();
        ctx.moveTo(padX, y);
        ctx.lineTo(padX + graphW, y);
        ctx.stroke();
      }

      const range = (() => {
        const all = [...s.train.history, ...s.val.history];
        return { min: Math.min(...all), max: Math.max(...all) };
      })();
      const span = Math.max(0.05, range.max - range.min);
      const norm = (v: number) => graphY + graphH - ((v - range.min) / span) * graphH;

      const plotLine = (series: Series, color: string, glow: string) => {
        const pts = series.history;
        ctx.beginPath();
        pts.forEach((v, i) => {
          const x = padX + (i / (maxPoints - 1)) * graphW;
          const y = norm(v);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.4;
        ctx.lineJoin = "round";
        ctx.stroke();

        const lastX = padX + graphW;
        const lastY = norm(pts[pts.length - 1]);
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(lastX, lastY, 2.2, 0, Math.PI * 2);
        ctx.fill();
      };

      plotLine(s.train, "#22c55e", "#86efac");
      plotLine(s.val, "#8b7cf6", "#c4b5fd");

      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      measure();
      applySize();
    };
    const ro = new ResizeObserver(onResize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", onResize);

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Live training and validation loss curves, continuously updating"
      className={`block w-full h-full ${className}`}
    />
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
