export type IntroPhase = "logo" | "move" | "robot" | "done";

interface IntroOverlayProps {
  phase: IntroPhase;
}

/**
 * One-shot boot animation: the logo starts large and centered, then shrinks
 * and travels to the exact spot where the real navbar logo lives (top-6
 * left-6, w-8 h-8 — see Navbar.tsx), so the handoff to the real nav mark is
 * seamless. The dark backdrop fades out during the move so the page
 * underneath is revealed at the same time.
 */
export default function IntroOverlay({ phase }: IntroOverlayProps) {
  if (phase === "done") return null;

  const moved = phase === "move" || phase === "robot";

  return (
    <div
      className="fixed inset-0 z-[200]"
      style={{
        backgroundColor: "var(--bg)",
        opacity: moved ? 0 : 1,
        transition: "opacity 650ms ease-out",
        transitionDelay: moved ? "250ms" : "0ms",
        pointerEvents: "none",
      }}
    >
      <div
        className={`fixed flex items-center justify-center overflow-hidden transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          moved
            ? "top-6 left-6 md:left-8 -translate-x-0 -translate-y-0 w-8 h-8 rounded border"
            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-transparent"
        }`}
        style={{
          borderColor: moved ? "var(--wire-strong)" : "transparent",
          backgroundColor: moved ? "var(--bg-elevated)" : "transparent",
        }}
      >
        <img src="/logo.png" alt="Solunera" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
