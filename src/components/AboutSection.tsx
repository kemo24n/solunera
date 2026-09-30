export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-36 border-t z-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--wire)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-32">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold block mb-8" style={{ color: "var(--ink-faint)" }}>
            [ ABOUT US ]
          </span>
          <p className="text-2xl sm:text-3xl md:text-4.5xl font-light leading-tight tracking-tight italic" style={{ color: "var(--ink)" }}>
            “We believe in technology that earns its keep—by delivering measurable,
            reliable results.”
          </p>
          <div className="w-12 h-[1px] mx-auto mt-8" style={{ backgroundColor: "var(--wire-strong)" }} />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase block mt-4 font-semibold" style={{ color: "var(--ink-dim)" }}>
            Our core principle
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight leading-[1.2] mb-6" style={{ color: "var(--ink)" }}>
              Built by engineers, trusted by leaders.
            </h2>
            <div className="w-16 h-[1px] mb-8" style={{ backgroundColor: "var(--wire-strong)" }} />
            <p className="text-sm md:text-base leading-relaxed font-light mb-6" style={{ color: "var(--ink-dim)" }}>
              Solunera is a team of software engineers, data scientists, and designers
              who have helped over 20 companies—from startups to Fortune 500s—automate
              their operations, engage customers, and make smarter decisions.
            </p>
            <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: "var(--ink-dim)" }}>
              Our clients consistently report <span style={{ color: "var(--signal)" }}>100% satisfaction</span> and
              we’ve earned a reputation for delivering on time, within budget, and with
              zero downtime.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl border flex flex-col justify-between h-44" style={{ backgroundColor: "var(--bg)", borderColor: "var(--wire)" }}>
              <span className="text-4xl font-light font-mono" style={{ color: "var(--signal)" }}>20+</span>
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: "var(--ink)" }}>Clients Served</h3>
                <p className="text-xs" style={{ color: "var(--ink-dim)" }}>Across finance, retail, logistics, and tech.</p>
              </div>
            </div>
            <div className="p-8 rounded-2xl border flex flex-col justify-between h-44" style={{ backgroundColor: "var(--bg)", borderColor: "var(--wire)" }}>
              <span className="text-4xl font-light font-mono" style={{ color: "var(--pulse)" }}>100%</span>
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: "var(--ink)" }}>Positive Feedback</h3>
                <p className="text-xs" style={{ color: "var(--ink-dim)" }}>Every client would recommend us.</p>
              </div>
            </div>
            <div className="p-8 rounded-2xl border flex flex-col justify-between h-44 col-span-2" style={{ backgroundColor: "var(--bg)", borderColor: "var(--wire)" }}>
              <span className="text-4xl font-light font-mono" style={{ color: "var(--ink)" }}>12+</span>
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: "var(--ink)" }}>Years Combined Experience</h3>
                <p className="text-xs" style={{ color: "var(--ink-dim)" }}>Our senior team brings deep expertise from top tech companies and research labs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}