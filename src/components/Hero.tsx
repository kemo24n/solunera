import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import RobotHead from "./RobotHead";

interface HeroProps {
  scrollProgress: number;
  onScrollToSection: (sectionId: string) => void;
  robotVisible: boolean;
  contentVisible: boolean;
}

const CAPABILITIES = ["AI Chatbots", "Predictive ML", "Data Automation", "E‑commerce"];

const Hero = forwardRef<HTMLElement, HeroProps>(
  ({ scrollProgress, onScrollToSection, robotVisible, contentVisible }, ref) => {
    return (
      <section
        ref={ref}
        id="home"
        className="relative w-full min-h-screen flex items-center overflow-hidden pt-32 pb-20 lg:pt-24 lg:pb-0"
        style={{ backgroundColor: "var(--bg)" }}
      >
        {/* Ambient glow – subtle blue */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-1/2 h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 65% 50%, rgba(59,130,246,0.15), transparent 70%)",
          }}
        />

        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text column */}
          <div
            className="lg:col-span-6 text-center lg:text-left"
            style={{
              opacity: contentVisible ? 1 - scrollProgress * 1.8 : 0,
              transform: `translateY(${contentVisible ? scrollProgress * -60 : 16}px)`,
              transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border"
              style={{ borderColor: "var(--wire-strong)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-tick" style={{ backgroundColor: "var(--signal)" }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "var(--ink-dim)" }}>
                Trusted by 20+ businesses
              </span>
            </div>

            <h1 className="font-extrabold tracking-tight leading-[1.02] mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              <span className="block" style={{ color: "var(--ink)" }}>
                AI‑driven automation
              </span>
              <span className="block" style={{ color: "var(--signal)" }}>
                that scales with you.
              </span>
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed mb-12 max-w-lg mx-auto lg:mx-0 font-light"
              style={{ color: "var(--ink-dim)" }}
            >
              We build custom AI chatbots, machine learning pipelines, data automation tools,
              and full‑stack e‑commerce solutions—all engineered for reliability and
              measurable impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onScrollToSection("contact")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-semibold tracking-wide px-8 py-4 rounded-full transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                style={{ backgroundColor: "var(--signal)", color: "#0a0d12" }}
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
              <button
                onClick={() => onScrollToSection("services")}
                className="w-full sm:w-auto flex items-center justify-center text-sm font-semibold tracking-wide px-8 py-4 rounded-full transition-all duration-300 border cursor-pointer hover:scale-[1.02]"
                style={{ borderColor: "var(--wire-strong)", color: "var(--ink)" }}
              >
                See Our Work
              </button>
            </div>
          </div>

          {/* Robot column */}
          <div className="lg:col-span-6 relative h-[440px] sm:h-[520px] lg:h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="absolute w-[78%] aspect-square rounded-full border"
                style={{
                  borderColor: "var(--wire)",
                  opacity: robotVisible ? 1 : 0,
                  transition: "opacity 1200ms ease-out",
                  transitionDelay: "200ms",
                }}
              />
            </div>

            <RobotHead scrollProgress={scrollProgress} visible={robotVisible} />

            {/* Capability chips – repositioned for better mobile visibility */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max max-w-[90%] flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: `translate(-50%, ${contentVisible ? 0 : 8}px)`,
                transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: "150ms",
              }}
            >
              {CAPABILITIES.map((label, i) => (
                <span key={label} className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase" style={{ color: "var(--ink-dim)" }}>
                    {label}
                  </span>
                  {i < CAPABILITIES.length - 1 && (
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--wire-strong)" }} />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Hero.displayName = "Hero";
export default Hero;