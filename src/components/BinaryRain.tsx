import { useEffect, useRef } from "react";

export default function BinaryRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let columns: { y: number; speed: number; chars: string[] }[] = [];
    const glyphs = "01";
    const fontSize = 13;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const count = Math.floor(canvas.width / (fontSize * 1.6));
      columns = Array.from({ length: count }, () => ({
        y: Math.random() * -canvas.height,
        speed: 0.4 + Math.random() * 0.9,
        chars: Array.from({ length: 22 }, () => glyphs[Math.floor(Math.random() * glyphs.length)]),
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      columns.forEach((col, ci) => {
        const x = ci * (fontSize * 1.6) + 8;
        col.chars.forEach((ch, ri) => {
          const y = col.y + ri * (fontSize * 1.1);
          if (y < 0 || y > canvas.height) return;
          const fade = ri / col.chars.length;
          const opacity = (1 - fade) * 0.16;
          ctx.fillStyle = ri === 0 ? `rgba(124,92,255,${0.22})` : `rgba(143,216,255,${opacity})`;
          ctx.fillText(ch, x, y);
          if (Math.random() < 0.01) col.chars[ri] = glyphs[Math.floor(Math.random() * glyphs.length)];
        });
        col.y += col.speed;
        if (col.y - col.chars.length * fontSize * 1.1 > canvas.height) {
          col.y = -Math.random() * 200;
        }
      });

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}
