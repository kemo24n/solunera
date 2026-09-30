import { useEffect, useRef, useState } from "react";

interface AIEntityProps {
  scrollProgress: number;
}

const CAPABILITIES = [
  { tag: "AGENTS", line: "Modeling the next best action..." },
  { tag: "MIDDLEWARE", line: "Routing signal across your systems..." },
  { tag: "DOMAIN MODELS", line: "Aligning to your proprietary data..." },
  { tag: "VISION", line: "Reading the room in real time..." },
];

export default function AIEntity({ scrollProgress }: AIEntityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capIndex, setCapIndex] = useState(0);
  const [coherence, setCoherence] = useState(98.2);
  const [latency, setLatency] = useState(11);

  // Pointer + animation state kept in refs so the RAF loop never re-renders React
  const gaze = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const speakEnergy = useRef(0);
  const speakTarget = useRef(0);
  const blink = useRef({ value: 0, timer: 0, next: 2600 });

  // Cycle capability captions + trigger a "speaking" burst on the mouth
  useEffect(() => {
    const interval = setInterval(() => {
      setCapIndex((i) => (i + 1) % CAPABILITIES.length);
      speakTarget.current = 1;
      setTimeout(() => (speakTarget.current = 0), 1100);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  // Faux telemetry ticking, gives the HUD a live, breathing feel
  useEffect(() => {
    const interval = setInterval(() => {
      setCoherence(97 + Math.random() * 2.4);
      setLatency(8 + Math.round(Math.random() * 9));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const handlePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const nx = (clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (clientY - rect.top - rect.height / 2) / (rect.height / 2);
      gaze.current.tx = Math.max(-1, Math.min(1, nx));
      gaze.current.ty = Math.max(-1, Math.min(1, ny));
    };
    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const onClick = () => {
      speakTarget.current = 1;
      setCapIndex((i) => (i + 1) % CAPABILITIES.length);
      setTimeout(() => (speakTarget.current = 0), 900);
    };
    container.addEventListener("click", onClick);

    let start = performance.now();

    const render = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Ease gaze toward pointer target
      gaze.current.x += (gaze.current.tx - gaze.current.x) * 0.08;
      gaze.current.y += (gaze.current.ty - gaze.current.y) * 0.08;

      // Ease speaking energy toward its target (burst in, settle out)
      speakEnergy.current += (speakTarget.current - speakEnergy.current) * 0.12;

      // Natural blink cycle
      blink.current.timer += 16.7;
      if (blink.current.timer > blink.current.next) {
        blink.current.value = 1;
        blink.current.timer = 0;
        blink.current.next = 2800 + Math.random() * 3400;
      }
      if (blink.current.value > 0) {
        blink.current.value = Math.max(0, blink.current.value - 0.16);
      }

      const cx = width / 2;
      const cy = height / 2 + Math.sin(t * 0.6) * 6; // slow breathing bob
      const coreR = Math.min(width, height) * 0.32;

      // --- Outer atmosphere glow ---
      const glow = ctx.createRadialGradient(cx, cy, coreR * 0.2, cx, cy, coreR * 1.9);
      glow.addColorStop(0, "rgba(124,92,255,0.16)");
      glow.addColorStop(1, "rgba(124,92,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // --- Core body (glass orb) ---
      const bodyGrad = ctx.createRadialGradient(
        cx - coreR * 0.3,
        cy - coreR * 0.35,
        coreR * 0.1,
        cx,
        cy,
        coreR
      );
      bodyGrad.addColorStop(0, "#1c2129");
      bodyGrad.addColorStop(0.55, "#141821");
      bodyGrad.addColorStop(1, "#0a0d12");
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.stroke();

      // Faint rim light (top-left) to sell the "glass" material
      ctx.beginPath();
      ctx.arc(cx, cy, coreR - 0.5, Math.PI * 1.05, Math.PI * 1.55);
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // --- Eyes (track pointer, dilate on speak) ---
      const eyeOffsetX = coreR * 0.34;
      const eyeY = cy - coreR * 0.08;
      const eyeMoveX = gaze.current.x * coreR * 0.12;
      const eyeMoveY = gaze.current.y * coreR * 0.08;
      const dilate = 1 + speakEnergy.current * 0.18;
      const baseEyeH = coreR * 0.34 * dilate;
      const eyeH = baseEyeH * (1 - blink.current.value * 0.92);
      const eyeW = coreR * 0.14;

      [-1, 1].forEach((side) => {
        const ex = cx + side * eyeOffsetX + eyeMoveX;
        const ey = eyeY + eyeMoveY;
        ctx.beginPath();
        const r = eyeW / 2;
        ctx.moveTo(ex - r, ey - eyeH / 2 + r);
        ctx.arcTo(ex - r, ey - eyeH / 2, ex + r, ey - eyeH / 2, r);
        ctx.arcTo(ex + r, ey - eyeH / 2, ex + r, ey + eyeH / 2, r);
        ctx.arcTo(ex + r, ey + eyeH / 2, ex - r, ey + eyeH / 2, r);
        ctx.arcTo(ex - r, ey + eyeH / 2, ex - r, ey - eyeH / 2, r);
        ctx.closePath();
        const eyeGrad = ctx.createLinearGradient(ex, ey - eyeH / 2, ex, ey + eyeH / 2);
        eyeGrad.addColorStop(0, "#a78bff");
        eyeGrad.addColorStop(1, "#7c5cff");
        ctx.fillStyle = eyeGrad;
        ctx.shadowColor = "rgba(124,92,255,0.9)";
        ctx.shadowBlur = 18 + speakEnergy.current * 14;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // --- Mouth (reactive waveform) ---
      const mouthY = cy + coreR * 0.42;
      const bars = 9;
      const spacing = coreR * 0.12;
      const startX = cx - ((bars - 1) * spacing) / 2;
      for (let i = 0; i < bars; i++) {
        const bx = startX + i * spacing;
        const wave =
          Math.sin(t * 6 + i * 0.9) * 0.5 + Math.sin(t * 2.3 + i * 1.7) * 0.5;
        const idle = coreR * 0.02;
        const amp = idle + Math.abs(wave) * coreR * 0.09 * (0.25 + speakEnergy.current);
        ctx.beginPath();
        ctx.moveTo(bx, mouthY - amp);
        ctx.lineTo(bx, mouthY + amp);
        ctx.lineCap = "round";
        ctx.lineWidth = coreR * 0.035;
        ctx.strokeStyle = `rgba(255,122,69,${0.55 + speakEnergy.current * 0.45})`;
        ctx.stroke();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{
        opacity: 1 - scrollProgress * 1.3,
        transform: `translateY(${scrollProgress * 40}px) scale(${1 - scrollProgress * 0.08})`,
      }}
    >
      {/* Rotating HUD reticle ring */}
      <div className="absolute w-[78%] aspect-square rounded-full border border-dashed animate-slow-spin pointer-events-none" style={{ borderColor: "var(--wire-strong)" }} />
      <div className="absolute w-[92%] aspect-square rounded-full border pointer-events-none" style={{ borderColor: "var(--wire)" }} />

      {/* Corner brackets */}
      {[
        "top-2 left-2 border-t border-l",
        "top-2 right-2 border-t border-r",
        "bottom-2 left-2 border-b border-l",
        "bottom-2 right-2 border-b border-r",
      ].map((pos) => (
        <div
          key={pos}
          className={`absolute w-6 h-6 ${pos}`}
          style={{ borderColor: "var(--wire-strong)" }}
        />
      ))}

      <div
        ref={containerRef}
        className="relative w-[70%] aspect-square cursor-pointer"
        role="button"
        aria-label="Interact with the Solunera entity"
        tabIndex={0}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Live telemetry readout */}
      <div className="absolute -top-2 sm:top-2 left-0 sm:left-2 font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--ink-faint)" }}>
        <span className="animate-tick" style={{ color: "var(--pulse)" }}>●</span>{" "}
        coherence {coherence.toFixed(1)}%
      </div>
      <div className="absolute -top-2 sm:top-2 right-0 sm:right-2 font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--ink-faint)" }}>
        latency {latency}ms
      </div>

      {/* Capability caption */}
      <div className="absolute bottom-0 sm:-bottom-4 left-1/2 -translate-x-1/2 w-max max-w-[85%] text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="font-mono text-[10px] tracking-[0.25em] font-bold" style={{ color: "var(--signal)" }}>
            [{CAPABILITIES[capIndex].tag}]
          </span>
        </div>
        <p className="font-mono text-[11px] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
          {CAPABILITIES[capIndex].line}
        </p>
      </div>
    </div>
  );
}
