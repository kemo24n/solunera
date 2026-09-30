import { ArrowUpRight } from "lucide-react";

export default function WorkSection() {
  const projects = [
    {
      title: "Support Automation",
      category: "E‑commerce Chatbot",
      metric: "-45% Tickets",
      desc: "Deployed an AI chatbot that handles 70% of customer inquiries autonomously, reducing response time from minutes to seconds.",
      accent: "var(--signal)",
    },
    {
      title: "Demand Forecasting",
      category: "ML for Retail",
      metric: "+12% Accuracy",
      desc: "Built a custom predictive model that improved inventory planning and cut stockouts by 18% for a national retailer.",
      accent: "var(--pulse)",
    },
  ];

  return (
    <section
      id="portfolio"
      className="relative w-full py-24 md:py-36 border-t z-20"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--wire)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold block mb-4" style={{ color: "var(--ink-faint)" }}>
            [ CASE STUDIES ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15]" style={{ color: "var(--ink)" }}>
            Proven results for our clients.
          </h2>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {projects.map((proj, idx) => (
            <div
              key={proj.title}
              className="group relative w-full rounded-3xl border overflow-hidden flex flex-col lg:flex-row transition-all duration-500"
              style={{ borderColor: "var(--wire)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = proj.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--wire)")}
            >
              <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-between z-10" style={{ backgroundColor: "var(--bg)" }}>
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: "var(--ink-dim)" }}>
                      {proj.category}
                    </span>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--ink-faint)" }} />
                    <span
                      className="font-mono text-xs font-bold px-2.5 py-0.5 rounded border"
                      style={{ color: proj.accent, borderColor: "var(--wire-strong)", backgroundColor: "var(--bg-elevated)" }}
                    >
                      {proj.metric}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-wide mb-6" style={{ color: "var(--ink)" }}>
                    {proj.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed font-light max-w-lg mb-12" style={{ color: "var(--ink-dim)" }}>
                    {proj.desc}
                  </p>
                </div>

                <button
                  className="flex items-center gap-2 text-[13px] font-semibold tracking-wider group/btn cursor-pointer transition-colors duration-300"
                  style={{ color: "var(--ink)" }}
                >
                  <span>Read Full Case Study</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                </button>
              </div>

              <div
                className="flex-1 min-h-[300px] lg:min-h-auto relative flex items-center justify-center p-8 overflow-hidden border-t lg:border-t-0 lg:border-l"
                style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--wire)" }}
              >
                <div
                  className="w-[80%] h-[75%] rounded-2xl border relative flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-700"
                  style={{ backgroundColor: "rgba(0,0,0,0.35)", borderColor: "var(--wire)" }}
                >
                  <div className="absolute inset-x-0 h-[1px] top-1/3" style={{ backgroundColor: "var(--wire)" }} />
                  <div className="absolute inset-x-0 h-[1px] top-2/3" style={{ backgroundColor: "var(--wire)" }} />
                  <div className="absolute inset-y-0 w-[1px] left-1/3" style={{ backgroundColor: "var(--wire)" }} />
                  <div className="absolute inset-y-0 w-[1px] left-2/3" style={{ backgroundColor: "var(--wire)" }} />

                  <div
                    className="w-8 h-8 rounded-full border flex items-center justify-center animate-pulse"
                    style={{ backgroundColor: "var(--bg-elevated)", borderColor: proj.accent }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: proj.accent }} />
                  </div>

                  <span className="absolute bottom-4 right-4 font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--ink-faint)" }}>
                    CASE_0{idx + 1} // LIVE
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}