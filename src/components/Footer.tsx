interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <footer
      id="main-footer"
      className="relative w-full py-16 md:py-24 border-t z-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--wire)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12 md:gap-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          <div className="flex flex-col gap-4 max-w-sm">
            <span className="font-mono font-semibold tracking-[0.25em] text-sm" style={{ color: "var(--ink)" }}>
              SOLUNERA
            </span>
            <p className="text-xs md:text-sm font-light leading-relaxed" style={{ color: "var(--ink-faint)" }}>
              Engineering highly precise, cognitive software systems and custom automated
              cores for industry-defining enterprises globally.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-1" style={{ color: "var(--ink-faint)" }}>
                Navigation
              </span>
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onScrollToSection(link.id)}
                  className="text-left text-xs md:text-sm font-light tracking-wide transition-colors duration-300 cursor-pointer"
                  style={{ color: "var(--ink-dim)" }}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-1" style={{ color: "var(--ink-faint)" }}>
                Enterprise
              </span>
              <a href="#services" className="text-xs md:text-sm font-light tracking-wide transition-colors duration-300" style={{ color: "var(--ink-dim)" }}>
                Cognitive Core
              </a>
              <a href="#services" className="text-xs md:text-sm font-light tracking-wide transition-colors duration-300" style={{ color: "var(--ink-dim)" }}>
                Integration APIs
              </a>
              <a href="#contact" className="text-xs md:text-sm font-light tracking-wide transition-colors duration-300" style={{ color: "var(--ink-dim)" }}>
                Systems Security
              </a>
            </div>

            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-1" style={{ color: "var(--ink-faint)" }}>
                Headquarters
              </span>
              <span className="text-xs leading-relaxed font-light" style={{ color: "var(--ink-faint)" }}>
                One Maritime Plaza, Suite 1400<br />
                San Francisco, CA 94111
              </span>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px]" style={{ backgroundColor: "var(--wire)" }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="font-mono text-xs font-light tracking-wider" style={{ color: "var(--ink-faint)" }}>
            © {currentYear} SOLUNERA CORP. ALL RIGHTS RESERVED.
          </span>
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.2em]" style={{ color: "var(--ink-faint)" }}>
            <span>PRECISE COGNITIVE ARCHITECTURES</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--ink-faint)" }} />
            <span>SECURE SHELL v2.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}