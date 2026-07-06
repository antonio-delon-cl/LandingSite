import React, { useState, useEffect } from "react";
import { DlonLogo } from "./components/DlonLogo";
import { SolutionsGrid } from "./components/SolutionsGrid";
import { InteractiveArchitect } from "./components/InteractiveArchitect";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { ContactForm } from "./components/ContactForm";
import { Cpu, ChevronRight, Terminal, Shield, Sparkles, Layers, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  // Monitor page scroll to style navbar glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen text-[#F0F0F0] relative font-sans">
      {/* Absolute background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* LEFT Vertical Text Column - Artistic Flair Pattern */}
      <aside className="hidden xl:flex fixed left-0 top-0 bottom-0 w-20 border-r border-white/10 items-center justify-center z-40 bg-[#0F0F0F]">
        <div className="rotate-[-90deg] whitespace-nowrap text-[9px] uppercase tracking-[0.7em] text-white/30 font-mono">
          Est. MMXXIV &mdash; Technology Solutions
        </div>
      </aside>

      {/* RIGHT Vertical Metadata Column - Artistic Flair Pattern */}
      <aside className="hidden xl:flex fixed right-0 top-0 bottom-0 w-20 border-l border-white/10 items-center justify-center z-40 bg-[#0F0F0F]">
        <div className="rotate-[90deg] whitespace-nowrap text-[9px] uppercase tracking-[0.7em] text-[#D4AF37]/50 font-mono">
          Prism Design Framework &mdash; Scale Venture
        </div>
      </aside>

      {/* Floating Glassmorphic Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 xl:px-20 ${
          scrolled
            ? "py-4 bg-[#0F0F0F]/90 backdrop-blur-md border-b border-white/10"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand logo link */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-4 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors duration-300">
              <div className="w-4 h-4 border-2 border-black rotate-45"></div>
            </div>
            <div className="flex flex-col items-start leading-none text-left">
              <span className="font-display font-bold tracking-[0.4em] text-xs text-white uppercase">
                DLOn<span className="text-[#D4AF37] font-normal">.io</span>
              </span>
              <span className="text-[7px] font-mono tracking-widest text-white/40 uppercase mt-0.5">
                Tech Solutions
              </span>
            </div>
          </button>

          {/* Nav Items with wide tracking */}
          <nav className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.25em] opacity-60 font-semibold font-mono">
            <button
              onClick={() => scrollToSection("solutions")}
              className="hover:text-[#D4AF37] hover:opacity-100 transition-all cursor-pointer"
            >
              Identity
            </button>
            <button
              onClick={() => scrollToSection("architect")}
              className="hover:text-[#D4AF37] hover:opacity-100 transition-all cursor-pointer flex items-center gap-1.5"
            >
              AI Architect <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="hover:text-[#D4AF37] hover:opacity-100 transition-all cursor-pointer"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-[#D4AF37] hover:opacity-100 transition-all cursor-pointer"
            >
              Archive
            </button>
          </nav>

          {/* Action CTA */}
          <div>
            <button
              onClick={() => scrollToSection("architect")}
              className="px-6 py-2 border border-white/20 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors cursor-pointer font-mono"
            >
              Compile Blueprint
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden xl:px-20">
        {/* Background glow node */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center justify-center text-center">
          {/* Announcement tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-none text-[10px] font-mono tracking-[0.2em] uppercase text-white/50 mb-8"
          >
            <span className="text-[#D4AF37]">●</span>
            <span> Bespoke Engineering for High-Velocity Ventures </span>
          </motion.div>

          {/* Giant Logo matching the upload lockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 w-full flex justify-center"
          >
            <div className="relative">
              {/* Concentric design rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full pointer-events-none" />
              <DlonLogo size="lg" className="scale-105 relative z-10" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold uppercase tracking-tighter text-white max-w-4xl leading-[0.85]"
          >
            Identity<br />
            <span className="text-stroke">Redefined</span>
          </motion.h1>

          {/* Descriptive Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-white/60 text-xs sm:text-sm md:text-base max-w-xl uppercase tracking-widest leading-relaxed font-sans"
          >
            DLON.io is an elite full-stack technology agency. We compile secure SaaS portals, cloud-native microservices, auto-scaling databases, and automated AI pipelines designed specifically for high-growth entrepreneurs.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto font-mono"
          >
            <button
              onClick={() => scrollToSection("architect")}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-[#D4AF37] font-semibold text-xs tracking-widest uppercase rounded-none transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch AI Architect</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={() => scrollToSection("solutions")}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 border border-white/20 text-white font-semibold text-xs tracking-widest uppercase rounded-none transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Tech Capabilities</span>
            </button>
          </motion.div>

          {/* Bottom Trust Panel / Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-28 pt-12 border-t border-white/10 w-full grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center max-w-5xl"
          >
            {/* Stat 1 */}
            <div>
              <div className="text-3xl md:text-4xl font-display font-extrabold text-white">18+</div>
              <div className="text-[9px] font-mono tracking-[0.3em] text-white/40 uppercase mt-2">MVPs Shipped</div>
            </div>

            {/* Stat 2 */}
            <div>
              <div className="text-3xl md:text-4xl font-display font-extrabold text-[#D4AF37]">99.99%</div>
              <div className="text-[9px] font-mono tracking-[0.3em] text-white/40 uppercase mt-2">Cloud Node Uptime</div>
            </div>

            {/* Stat 3 */}
            <div>
              <div className="text-3xl md:text-4xl font-display font-extrabold text-white">4.2 Wks</div>
              <div className="text-[9px] font-mono tracking-[0.3em] text-white/40 uppercase mt-2">Avg. Velocity</div>
            </div>

            {/* Stat 4 */}
            <div>
              <div className="text-3xl md:text-4xl font-display font-extrabold text-[#D4AF37]">$1.2M+</div>
              <div className="text-[9px] font-mono tracking-[0.3em] text-white/40 uppercase mt-2">Capital Raised</div>
            </div>
          </motion.div>
        </div>

        {/* Separator gradient */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0F0F0F] to-transparent pointer-events-none" />
      </section>

      {/* Solutions / Bento Grid Section */}
      <SolutionsGrid />

      {/* Interactive AI Architect Portal */}
      <InteractiveArchitect />

      {/* Process Timeline Section */}
      <ProcessTimeline />

      {/* Standalone contact brief form */}
      <ContactForm />

      {/* Elegant Footer matching the lockup style of the brand */}
      <footer className="py-20 border-t border-white/10 bg-[#0F0F0F] relative xl:px-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-8">
          {/* Logo with subtitle */}
          <DlonLogo size="md" />

          {/* Tech accents */}
          <div className="flex items-center gap-4 text-[9px] font-mono tracking-[0.3em] text-white/40 uppercase pt-4">
            <span>SECURE INGRESS</span>
            <span>•</span>
            <span>NODE ACTIVE</span>
            <span>•</span>
            <span>TLS 1.3 COMPLIANCE</span>
          </div>

          <div className="text-[10px] font-mono text-white/30 pt-8 border-t border-white/5 w-full flex flex-col sm:flex-row items-center justify-between gap-4 uppercase tracking-widest">
            <div>
              © {new Date().getFullYear()} DLON.io. All rights reserved. Technology Solutions for Entrepreneurs.
            </div>
            <div className="flex gap-8">
              <button onClick={() => scrollToSection("solutions")} className="hover:text-white transition-colors cursor-pointer">SOLUTIONS</button>
              <button onClick={() => scrollToSection("architect")} className="hover:text-white transition-colors cursor-pointer">BLUEPRINTS</button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors cursor-pointer">CONTACT</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Solid High-Contrast Micro-Bar Footer from the Design */}
      <footer className="min-h-[48px] py-4 bg-white text-black flex flex-col md:flex-row items-center justify-between px-12 text-[10px] font-bold uppercase tracking-[0.2em] gap-4 text-center relative z-40">
        <div>Available for Select Collaborations 2026</div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <span className="hover:opacity-70 transition-opacity cursor-pointer">hello@dlon.io</span>
          <span className="hover:opacity-70 transition-opacity cursor-pointer">ABustamanteDelon@gmail.com</span>
          <span className="hover:opacity-70 transition-opacity cursor-pointer">Silicon Valley, CA</span>
        </div>
      </footer>
    </div>
  );
}
