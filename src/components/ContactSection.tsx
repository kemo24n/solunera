import { useState, FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", org: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const inputStyle = {
    color: "var(--ink)",
    borderColor: "var(--wire-strong)",
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-36 border-t z-20"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--wire)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 max-w-lg">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold block mb-4" style={{ color: "var(--ink-faint)" }}>
              [ START A PROJECT ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-8" style={{ color: "var(--ink)" }}>
              Let’s build something that works.
            </h2>
            <p className="text-sm md:text-base leading-relaxed font-light mb-12" style={{ color: "var(--ink-dim)" }}>
              Tell us about your challenge—whether it’s a chatbot, a data pipeline, or a
              full e‑commerce platform. We’ll get back to you within one business day.
            </p>

            <div className="flex flex-col gap-6 text-sm">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest block mb-1" style={{ color: "var(--ink-faint)" }}>
                  Email
                </span>
                <span className="font-mono tracking-wider cursor-pointer" style={{ color: "var(--ink)" }}>
                  hello@solunera.ai
                </span>
              </div>
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest block mb-1" style={{ color: "var(--ink-faint)" }}>
                  Office
                </span>
                <span className="font-light" style={{ color: "var(--ink)" }}>
                  One Maritime Plaza, Suite 1400<br />
                  San Francisco, CA 94111
                </span>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-7 w-full border p-8 md:p-12 rounded-3xl relative overflow-hidden"
            style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--wire)" }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-mono text-[10px] tracking-widest uppercase font-semibold" style={{ color: "var(--ink-dim)" }}>
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Elena Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-transparent border-b py-3 text-sm focus:outline-none transition-colors duration-300"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--signal)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--wire-strong)")}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="org" className="font-mono text-[10px] tracking-widest uppercase font-semibold" style={{ color: "var(--ink-dim)" }}>
                      Organization
                    </label>
                    <input
                      id="org"
                      type="text"
                      placeholder="e.g. Nova Aerospace"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="bg-transparent border-b py-3 text-sm focus:outline-none transition-colors duration-300"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--signal)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--wire-strong)")}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-[10px] tracking-widest uppercase font-semibold" style={{ color: "var(--ink-dim)" }}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="e.g. elena@novaaerospace.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-transparent border-b py-3 text-sm focus:outline-none transition-colors duration-300"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--signal)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--wire-strong)")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-mono text-[10px] tracking-widest uppercase font-semibold" style={{ color: "var(--ink-dim)" }}>
                    Briefly describe your project
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="What are you trying to automate or improve? Scale, timeline, any special requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-transparent border-b py-3 text-sm focus:outline-none resize-none transition-colors duration-300"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--signal)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--wire-strong)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 text-sm font-semibold tracking-wider py-4 rounded-full transition-all duration-300 group cursor-pointer mt-4 disabled:opacity-50"
                  style={{ backgroundColor: "var(--signal)", color: "#0a0d12" }}
                >
                  <span>{submitting ? "Sending..." : "Send Inquiry"}</span>
                  {!submitting && (
                    <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in">
                <div className="w-16 h-16 rounded-full border flex items-center justify-center mb-8" style={{ backgroundColor: "var(--bg)", borderColor: "var(--wire-strong)" }}>
                  <Check className="w-6 h-6" style={{ color: "var(--signal)" }} />
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-3 font-semibold" style={{ color: "var(--ink-faint)" }}>
                  Message received
                </span>
                <h3 className="text-2xl font-bold tracking-wide mb-4" style={{ color: "var(--ink)" }}>
                  We’ll be in touch.
                </h3>
                <p className="text-sm font-light max-w-sm leading-relaxed mb-8" style={{ color: "var(--ink-dim)" }}>
                  Thank you, <span className="font-medium" style={{ color: "var(--ink)" }}>{formData.name}</span>.
                  Our team will reply to <span className="font-medium" style={{ color: "var(--ink)" }}>{formData.email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", org: "", email: "", message: "" });
                  }}
                  className="text-xs tracking-widest uppercase font-semibold cursor-pointer transition-colors duration-300 hover:underline"
                  style={{ color: "var(--ink-dim)" }}
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}