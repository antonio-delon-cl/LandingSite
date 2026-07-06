import React, { useState } from "react";
import { Search, Code2, ShieldCheck, Rocket } from "lucide-react";
import { motion } from "motion/react";

interface ProcessStep {
  num: string;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  description: string;
  deliverables: string[];
  metrics: string;
}

const steps: ProcessStep[] = [
  {
    num: "01",
    title: "Discovery & Blueprinting",
    icon: <Search className="w-5 h-5" />,
    subtitle: "Mapping Venture Objectives to Tech Architectures",
    description: "We deep-dive into your venture's product mechanics. This phase details core user pathways, defines relational database schemas, and outlines REST API endpoints before writing a single line of production code.",
    deliverables: ["Product Specification Document", "Database Architecture Schemas", "Wireframe Workflows"],
    metrics: "Completed in 3-5 Business Days"
  },
  {
    num: "02",
    title: "Rapid Compilation",
    icon: <Code2 className="w-5 h-5" />,
    subtitle: "High-Velocity, Modular Engineering",
    description: "Our agile sprint model launches a secure development container. We build using modern type-safe standards: robust Express API microservices paired with a razor-sharp React frontend, connected via ultra-fast data layers.",
    deliverables: ["Interactive Sandbox Preview", "Fully Instrumented Git Repositories", "REST & GraphQL Pipelines"],
    metrics: "Continuous Integration / CD Pipelines Live"
  },
  {
    num: "03",
    title: "Rigid Validation",
    icon: <ShieldCheck className="w-5 h-5" />,
    subtitle: "Verification, Load Testing, and Audit",
    description: "We conduct meticulous syntax audits and stress-test the environment. Every component is analyzed for responsive fluidity across devices. We carry out security audits on secrets handling and environment variables.",
    deliverables: ["Vulnerability Scan Certification", "Responsive UX Audit Report", "API Load Benchmark Outputs"],
    metrics: "99.9% Load Stability Target"
  },
  {
    num: "04",
    title: "Cloud Orchestration",
    icon: <Rocket className="w-5 h-5" />,
    subtitle: "Seamless Ingress & Secure Production Release",
    description: "Deploying the production bundle. We build isolated container images, configure reverse proxy layers for optimal ingress, set up secure SSL keys, and hand over clean documentation for painless scaling.",
    deliverables: ["Production-Ready Cloud Run Nodes", "Automatic SSL Cert Provisioning", "Architecture & Secrets Handover"],
    metrics: "1-Click Production Scalability"
  }
];

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-[#0F0F0F]">
      {/* Top border line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-3 justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Execution Lifecycle</span>
            <div className="h-[1px] w-12 bg-[#D4AF37]/40"></div>
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-display font-extrabold uppercase tracking-tighter text-white">
            Elite Build <span className="text-stroke">Lifecycle</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-xs md:text-sm uppercase tracking-widest leading-relaxed">
            From design parameters to production containers. Our engineering process is transparent, rapid, and mathematically precise.
          </p>
        </div>

        {/* Desktop Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          {/* Step Selector Column */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-6 rounded-none border transition-all duration-300 flex items-center gap-5 cursor-pointer relative group ${
                    isActive
                      ? "bg-white/5 border-white/20 text-white shadow-lg shadow-[#D4AF37]/5"
                      : "bg-transparent border-white/5 hover:border-white/15 text-white/50 hover:text-white"
                  }`}
                >
                  {/* Left Active Glow bar */}
                  {isActive && (
                    <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-[#D4AF37]" />
                  )}

                  <div className={`font-mono text-lg font-bold ${isActive ? "text-[#D4AF37]" : "text-white/20 group-hover:text-white/40"}`}>
                    {step.num}
                  </div>

                  <div className={`p-2.5 rounded-none border ${isActive ? "bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37]" : "bg-black/40 border-white/10 text-white/40"}`}>
                    {step.icon}
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-base leading-snug uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="text-xs text-white/40 mt-0.5 line-clamp-1">
                      {step.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step Showcase Column */}
          <div className="lg:col-span-7 bg-[#0F0F0F] border border-white/10 rounded-none p-8 relative overflow-hidden min-h-[400px] flex flex-col justify-between">
            {/* Subtle background flow gradient */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/5 px-2.5 py-1 rounded-none border border-[#D4AF37]/20">
                  {steps[activeStep].metrics}
                </span>
                <span className="text-4xl font-mono font-extrabold text-white/10 select-none">
                  PHASE {steps[activeStep].num}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-sans font-bold text-white uppercase tracking-wide">
                {steps[activeStep].title}
              </h3>
              <p className="text-xs font-mono text-white/40 mt-1 uppercase tracking-widest">
                {steps[activeStep].subtitle}
              </p>

              <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed max-w-xl font-sans">
                {steps[activeStep].description}
              </p>

              <div className="mt-8">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/80 font-semibold mb-3">
                  Key Deliverables
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {steps[activeStep].deliverables.map((item) => (
                    <li key={item} className="text-xs text-white/60 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-white/30 gap-2">
              <span>STANDARD OPERATIONAL METRIC</span>
              <span className="text-[#D4AF37]">DLON.IO QUALITY ASSURED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
