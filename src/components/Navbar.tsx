import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Home, LayoutGrid, Boxes, Info, Send } from "lucide-react";

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  logoVisible?: boolean;
  chromeVisible?: boolean;
}

const LINKS = [
  { name: "Home", id: "home", icon: Home },
  { name: "Services", id: "services", icon: LayoutGrid },
  { name: "Portfolio", id: "portfolio", icon: Boxes },
  { name: "About", id: "about", icon: Info },
  { name: "Contact", id: "contact", icon: Send },
];

export default function Navbar({ onScrollToSection, logoVisible = true, chromeVisible = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onScrollToSection(id);
  };

  return (
    <>
      {/* Brand mark */}
      <button
        onClick={() => handleLinkClick("home")}
        className="fixed top-6 left-6 md:left-8 z-50 flex items-center gap-3 group cursor-pointer focus:outline-none"
        style={{ opacity: logoVisible ? 1 : 0, transition: "opacity 200ms ease-out" }}
      >
        <div
          className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded border transition-all duration-300"
          style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--wire-strong)" }}
        >
          <img
            src="/logo.png"
            alt="Solunera"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const fallback = document.createElement("div");
                fallback.className = "font-mono text-xs font-bold tracking-widest";
                fallback.style.color = "var(--signal)";
                fallback.innerText = "S";
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
        <span
          className="hidden sm:inline font-mono font-semibold tracking-[0.25em] text-sm transition-opacity duration-500"
          style={{ color: "var(--ink)", opacity: chromeVisible ? 1 : 0 }}
        >
          SOLUNERA
        </span>
      </button>

      {/* CTA */}
      <button
        onClick={() => handleLinkClick("contact")}
        className="hidden md:flex fixed top-6 right-8 z-50 items-center gap-2 text-[13px] font-semibold tracking-wider px-5 py-2.5 rounded-full transition-all duration-500 group cursor-pointer hover:scale-[1.02]"
        style={{
          backgroundColor: "var(--signal)",
          color: "#0a0d12",
          opacity: chromeVisible ? 1 : 0,
          transform: chromeVisible ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: chromeVisible ? "auto" : "none",
        }}
      >
        <span>Book a Call</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </button>

      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 right-6 z-50 p-2 rounded-full border cursor-pointer transition-opacity duration-500"
        style={{
          color: "var(--ink)",
          backgroundColor: "var(--bg-elevated)",
          borderColor: "var(--wire-strong)",
          opacity: chromeVisible ? 1 : 0,
          pointerEvents: chromeVisible ? "auto" : "none",
        }}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Floating dock */}
      <nav
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full p-[1.5px] nav-dock-border transition-all duration-500"
        style={{
          opacity: chromeVisible ? (scrolled ? 0.96 : 0.9) : 0,
          transform: chromeVisible ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: chromeVisible ? "auto" : "none",
        }}
      >
        <div
          className="flex items-center gap-1 rounded-full backdrop-blur-md transition-all duration-500"
          style={{
            backgroundColor: "rgba(10,13,18,0.88)",
            padding: scrolled ? "6px" : "8px",
          }}
        >
          {LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="relative flex items-center gap-2 rounded-full cursor-pointer transition-all duration-300"
                style={{
                  padding: scrolled ? "8px 12px" : "9px 16px",
                  backgroundColor: isActive ? "var(--bg-elevated)" : "transparent",
                  color: isActive ? "var(--ink)" : "var(--ink-dim)",
                }}
              >
                <Icon className="w-[15px] h-[15px] flex-shrink-0" style={{ color: isActive ? "var(--signal)" : "inherit" }} />
                <span
                  className="font-mono text-[11px] tracking-wide uppercase overflow-hidden transition-all duration-300 whitespace-nowrap"
                  style={{
                    maxWidth: isActive || !scrolled ? "100px" : "0px",
                    opacity: isActive || !scrolled ? 1 : 0,
                  }}
                >
                  {link.name}
                </span>
                {isActive && (
                  <span
                    className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full animate-tick"
                    style={{ backgroundColor: "var(--signal)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col px-8 py-24 md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--bg)", borderLeft: "1px solid var(--wire)" }}
      >
        <div className="flex flex-col gap-6 mb-12">
          {LINKS.map((link, index) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="flex items-center gap-4 text-left text-2xl font-semibold tracking-wide py-2 transition-all duration-300"
                style={{
                  color: active === link.id ? "var(--signal)" : "var(--ink)",
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                  transform: isOpen ? "none" : "translateX(20px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handleLinkClick("contact")}
          className="w-full flex items-center justify-center gap-2 text-sm font-semibold tracking-wider py-4 rounded-full transition-all duration-300 group mt-auto"
          style={{ backgroundColor: "var(--signal)", color: "#0a0d12" }}
        >
          <span>Book a Call</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>
    </>
  );
}