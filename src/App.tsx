import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import WorkSection from "./components/WorkSection";
import AboutSection from "./components/AboutSection";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import IntroOverlay, { IntroPhase } from "./components/IntroOverlay";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const skipIntro =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("calibrate");
  const [introPhase, setIntroPhase] = useState<IntroPhase>(skipIntro ? "done" : "logo");

  useEffect(() => {
    if (skipIntro) return;
    const t1 = setTimeout(() => setIntroPhase("move"), 750);
    const t2 = setTimeout(() => setIntroPhase("robot"), 1750);
    const t3 = setTimeout(() => setIntroPhase("done"), 2850);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [skipIntro]);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      // Progress = how much of the hero section has been scrolled past
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen relative antialiased"
      style={{ backgroundColor: "var(--bg)", color: "var(--ink)", fontFamily: "var(--font-display)" }}
    >
      <Navbar
        onScrollToSection={handleScrollToSection}
        logoVisible={introPhase === "done"}
        chromeVisible={introPhase === "done"}
      />

      <Hero
        ref={heroRef}
        scrollProgress={scrollProgress}
        onScrollToSection={handleScrollToSection}
        robotVisible={introPhase === "robot" || introPhase === "done"}
        contentVisible={introPhase === "done"}
      />

      <IntroOverlay phase={introPhase} />

      <ServicesSection />
      <WorkSection />
      <AboutSection />
      <Testimonials />
      <ContactSection />
      <Footer onScrollToSection={handleScrollToSection} />
    </div>
  );
}