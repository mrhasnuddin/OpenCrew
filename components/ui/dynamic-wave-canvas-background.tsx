'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Wave canvas background — adapted from the 21st.dev "dynamic wave canvas"
 * (client direction) and re-tuned for this system:
 *
 *  - TWO colours only: the brand gold (#C19C68, `--logo-gold`) over a black a
 *    step lighter than the canvas. No blue/purple accents.
 *  - Held back: the gold never exceeds ~STRENGTH of the pixel, so white copy
 *    and the gold CTA stay readable on top of it.
 *  - Sized to its CONTAINER, not the window, so it works both as the hero's
 *    first-viewport backdrop and inside the closing CTA card.
 *  - Cheap: rendered at 1/4 resolution and upscaled with smoothing (it is a
 *    soft field, so this reads as intentional blur), capped at 30fps, paused
 *    while off-screen or when the tab is hidden. Reduced motion: one static
 *    frame.
 *
 * Decorative only (aria-hidden); it carries no content.
 */

const SCALE = 4;          // render at 1/4 res, upscale
const FPS = 30;           // frame cap
const STRENGTH = 0.5;     // max gold share of a pixel (0..1); keeps copy readable
const DARK = [13, 13, 13];       // #0D0D0D — a step lighter than the #000 canvas
const GOLD = [0xc1, 0x9c, 0x68]; // #C19C68 — the logo gold, exactly

const TABLE = 1024;
const SIN = new Float32Array(TABLE);
const COS = new Float32Array(TABLE);
for (let i = 0; i < TABLE; i++) {
  const a = (i / TABLE) * Math.PI * 2;
  SIN[i] = Math.sin(a);
  COS[i] = Math.cos(a);
}
const TWO_PI = Math.PI * 2;
const fastSin = (x: number) => SIN[Math.floor(((((x % TWO_PI) + TWO_PI) % TWO_PI) / TWO_PI) * TABLE) & (TABLE - 1)];
const fastCos = (x: number) => COS[Math.floor(((((x % TWO_PI) + TWO_PI) % TWO_PI) / TWO_PI) * TABLE) & (TABLE - 1)];

export function HeroWave({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0, height = 0;
    let imageData: ImageData | null = null;
    let data: Uint8ClampedArray | null = null;
    let raf = 0;
    let visible = true;
    let last = 0;
    const start = performance.now();

    const resize = () => {
      const host = canvas.parentElement ?? canvas;
      const w = Math.max(1, Math.floor(host.clientWidth));
      const h = Math.max(1, Math.floor(host.clientHeight));
      canvas.width = w;
      canvas.height = h;
      width = Math.max(1, Math.floor(w / SCALE));
      height = Math.max(1, Math.floor(h / SCALE));
      imageData = ctx.createImageData(width, height);
      data = imageData.data;
      draw(performance.now());
    };

    const draw = (now: number) => {
      if (!imageData || !data) return;
      const t = (now - start) * 0.001;
      const dr = DARK[0], dg = DARK[1], db = DARK[2];
      const gr = GOLD[0] - dr, gg = GOLD[1] - dg, gb = GOLD[2] - db;
      for (let y = 0; y < height; y++) {
        const uy = (2 * y - height) / height;
        for (let x = 0; x < width; x++) {
          const ux = (2 * x - width) / height;
          let a = 0, d = 0;
          for (let i = 0; i < 4; i++) {
            a += fastCos(i - d + t * 0.5 - a * ux);
            d += fastSin(i * uy + a);
          }
          // wave in [-1, 1] → t in [0, 1]; squared so most of the field
          // stays dark and the gold shows as ridges rather than a wash
          const wave = (fastSin(a) + fastCos(d)) * 0.5;
          const k = 0.5 + 0.5 * wave;
          const m = k * k * STRENGTH;
          const idx = (y * width + x) * 4;
          data[idx] = dr + gr * m;
          data[idx + 1] = dg + gg * m;
          data[idx + 2] = db + gb * m;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (now - last < 1000 / FPS) return;
      last = now;
      draw(now);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);
    resize();

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 block h-full w-full', className)}
    />
  );
}

export default HeroWave;
