'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Wave canvas background — brand-tuned adaptation of the 21st.dev "dynamic
 * wave canvas". TWO colours only: the logo gold (#C19C68) over a black one
 * step lighter than the canvas, capped so copy on top stays readable.
 *
 * v2 — WEBGL. The original component computed every pixel in JavaScript
 * (putImageData) each frame; at 1440×900 that is ~80k pixels × 8 trig calls
 * on the main thread 30× a second, which is what tanked site performance.
 * The same math now runs as a fragment shader on the GPU: the main thread
 * does one draw call per frame and nothing else.
 *
 *  - Renders at half resolution (it's a soft field; upscaling reads as blur)
 *    and is capped at 30fps.
 *  - Pauses when off-screen (IntersectionObserver) or when the tab is hidden.
 *  - prefers-reduced-motion: renders one static frame and stops.
 *  - No WebGL → the canvas stays transparent and the parent's black shows;
 *    nothing breaks.
 *
 * Sized to its CONTAINER (not the window) so it serves both the hero
 * backdrop and the closing CTA card. Decorative only (aria-hidden).
 */

const SCALE = 2;      // backing store = clientSize / SCALE
const FPS = 30;
const STRENGTH = 0.5; // max gold share of a pixel

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

void main() {
  vec2 p = gl_FragCoord.xy;
  float ux = (2.0 * p.x - u_res.x) / u_res.y;
  float uy = (2.0 * (u_res.y - p.y) - u_res.y) / u_res.y;

  float a = 0.0;
  float d = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    a += cos(fi - d + u_time * 0.5 - a * ux);
    d += sin(fi * uy + a);
  }

  float wave = (sin(a) + cos(d)) * 0.5;
  float k = 0.5 + 0.5 * wave;
  float m = k * k * ${STRENGTH.toFixed(2)};

  vec3 dark = vec3(0.051, 0.051, 0.051);          /* #0D0D0D */
  vec3 gold = vec3(0.757, 0.612, 0.408);          /* #C19C68 */
  gl_FragColor = vec4(mix(dark, gold, m), 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export function HeroWave({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl =
      canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return; // graceful: parent is black anyway

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // one full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let visible = true;
    let last = 0;
    const start = performance.now();

    const draw = (now: number) => {
      gl.uniform1f(uTime, (now - start) * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const host = canvas.parentElement ?? canvas;
      const w = Math.max(1, Math.floor(host.clientWidth / SCALE));
      const h = Math.max(1, Math.floor(host.clientHeight / SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
        draw(performance.now());
      }
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
      gl.getExtension('WEBGL_lose_context')?.loseContext();
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
