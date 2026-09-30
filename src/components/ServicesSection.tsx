import { Bot, Brain, Database, ShoppingCart, Globe } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <Bot className="w-6 h-6" />,
      tag: "CHATBOTS",
      title: "AI‑Powered Chatbots",
      desc: "Intelligent conversational agents that handle customer support, lead qualification, and on‑boarding—24/7, with zero latency.",
      accent: "var(--signal)",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      tag: "ML",
      title: "Predictive Machine Learning",
      desc: "Custom models that forecast demand, detect anomalies, and optimise pricing—built on your own data and deployed at scale.",
      accent: "var(--pulse)",
    },
    {
      icon: <Database className="w-6 h-6" />,
      tag: "DATA",
      title: "Data Automation & CSV Processing",
      desc: "End‑to‑end pipelines that ingest, clean, and transform your spreadsheets and APIs into ready‑to‑use structured data.",
      accent: "var(--pulse)",
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      tag: "ECOMMERCE",
      title: "E‑commerce & Website Systems",
      desc: "Scalable storefronts, headless CMS, and custom integrations that drive conversions and streamline operations.",
      accent: "var(--signal)",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      tag: "WEB",
      title: "Custom Web Applications",
      desc: "Full‑stack platforms built with modern frameworks—designed for performance, security, and a seamless user experience.",
      accent: "var(--pulse)",
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full py-24 md:py-36 border-t z-20"
      style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--wire)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold block mb-4" style={{ color: "var(--ink-faint)" }}>
              [ OUR SERVICES ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15]" style={{ color: "var(--ink)" }}>
              Technology that drives real business outcomes.
            </h2>
          </div>
          <p className="text-sm md:text-base max-w-sm leading-relaxed font-light" style={{ color: "var(--ink-dim)" }}>
            From chatbots to predictive models, every solution is tailored to your goals.
            We’ve delivered for over 20 companies across finance, retail, and logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc) => (
            <div
              key={svc.tag}
              className="group relative border p-8 md:p-12 rounded-2xl flex flex-col justify-between transition-all duration-500 cursor-default hover:scale-[1.01]"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--wire)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = svc.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--wire)")}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500"
                    style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--wire-strong)", color: svc.accent }}
                  >
                    {svc.icon}
                  </div>
                  <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: svc.accent }}>
                    [{svc.tag}]
                  </span>
                </div>

                <h3 className="text-xl font-medium tracking-wide mb-4" style={{ color: "var(--ink)" }}>
                  {svc.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: "var(--ink-dim)" }}>
                  {svc.desc}
                </p>
              </div>

              <div className="w-full h-[1px] mt-12 transition-colors duration-500" style={{ backgroundColor: "var(--wire)" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}