const testimonials = [
  {
    quote: "Solunera built our customer support chatbot in under 4 weeks. It now handles 60% of our tickets—our team couldn't be happier.",
    author: "Sarah Chen",
    role: "VP of Operations, Nova Retail",
  },
  {
    quote: "Their predictive models saved us millions in inventory costs. The accuracy is unmatched.",
    author: "Marcus Rivera",
    role: "CTO, LogiCorp",
  },
  {
    quote: "From design to deployment, the entire process was seamless. Our new e‑commerce site runs faster and converts better.",
    author: "Emily Tran",
    role: "Founder, Bloom Marketplace",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">Client Voices</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">What our partners say.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-4xl text-blue-600 font-serif mb-4">“</div>
              <p className="text-slate-600 leading-relaxed mb-6">{t.quote}</p>
              <div>
                <p className="font-semibold text-slate-900">{t.author}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}