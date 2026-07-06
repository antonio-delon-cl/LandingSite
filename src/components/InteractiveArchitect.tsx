import React, { useState, useEffect } from "react";
import { Cpu, Terminal, FileText, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Code, Server, Database, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Proposal } from "../types";

interface InteractiveArchitectProps {
  onProposalGenerated?: (proposal: Proposal) => void;
}

const INDUSTRIES = [
  "Artificial Intelligence / Agents",
  "Fintech & Payment Infrastructure",
  "Healthcare & Biotech",
  "SaaS & Productivity Systems",
  "E-Commerce & Digital Goods",
  "Logistics & Operations Management"
];

const PLATFORMS = [
  "Web Application (Vite/SPA)",
  "Cross-Platform Mobile App",
  "Full-Stack Microservice Portal",
  "AI Workflow Agent Hub",
  "Real-Time Analytics Dashboard"
];

const BUDGETS = [
  "Bootstrapped MVP ($10k - $20k)",
  "Seed/Growth Venture ($20k - $50k)",
  "Enterprise Scale ($50k+)"
];

const LOADING_STAGES = [
  "Deconstructing venture objectives...",
  "Synthesizing cloud-native architecture...",
  "Structuring relational database schemas...",
  "Modeling deployment node workloads...",
  "Formulating Phase 1 MVP features...",
  "Applying security compliance standards...",
  "Finalizing executive roadmap blueprint..."
];

export const InteractiveArchitect: React.FC<InteractiveArchitectProps> = ({
  onProposalGenerated,
}) => {
  // Input Form State
  const [idea, setIdea] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);

  // UI Engine State
  const [loading, setLoading] = useState(false);
  const [loadingStageIdx, setLoadingStageIdx] = useState(0);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Email Lead State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  // Loading stage animation cycler
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStageIdx((prev) => (prev + 1) % LOADING_STAGES.length);
      }, 2000);
    } else {
      setLoadingStageIdx(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    setProposal(null);
    setError(null);
    setLeadSuccess(false);

    try {
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, industry, budget, platform }),
      });

      if (!response.ok) {
        throw new Error("Failed to compile blueprint proposal. Please try again.");
      }

      const data = (await response.json()) as Proposal;
      setProposal(data);
      if (onProposalGenerated) {
        onProposalGenerated(data);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected issue occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmittingLead(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message: leadMessage || `Interested in proposal: ${proposal?.architectureSummary || ""}`,
          proposalData: proposal
        }),
      });

      if (response.ok) {
        setLeadSuccess(true);
        setName("");
        setEmail("");
        setCompany("");
        setLeadMessage("");
      } else {
        throw new Error("Could not register waitlist profile");
      }
    } catch (err) {
      alert("Failed to submit inquiry. Please email hello@dlon.io directly.");
    } finally {
      setSubmittingLead(false);
    }
  };

  return (
    <section id="architect" className="py-24 relative bg-[#0F0F0F]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-3 justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Interactive Portal</span>
            <div className="h-[1px] w-12 bg-[#D4AF37]/40"></div>
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-display font-extrabold uppercase tracking-tighter text-white">
            DLON AI <span className="text-stroke">Solutions Architect</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-xs md:text-sm uppercase tracking-widest leading-relaxed">
            Input your core system requirements. Our AI design synthesizer compiles a production-grade tech stack, feature roadmap, and development budget in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Input Panel Column */}
          <div className="lg:col-span-5 bg-[#0F0F0F] border border-white/10 rounded-none p-6 md:p-8 flex flex-col justify-between h-full shadow-2xl">
            <form onSubmit={handleGenerateProposal} className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2 font-semibold">
                  1. Describe Your System Concept
                </label>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Example: A secure SaaS CRM platform for high-end boutique hospitality brands. Needs real-time multi-tenant data synchronization, automated emails, and customer analytics dashboard..."
                  className="w-full h-36 px-4 py-3 bg-black/40 border border-white/10 rounded-none text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] resize-none transition-all duration-200"
                  required
                />
                <div className="mt-1 flex items-center justify-between text-[10px] text-white/40 font-mono">
                  <span>DESCRIBE AS MUCH DETAIL AS POSSIBLE</span>
                  <span>{idea.length} CHARACTERS</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2 font-semibold">
                    2. Target Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-none text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer transition-colors"
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind} className="bg-[#0F0F0F]">
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2 font-semibold">
                    3. Core Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-none text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer transition-colors"
                  >
                    {PLATFORMS.map((plat) => (
                      <option key={plat} value={plat} className="bg-[#0F0F0F]">
                        {plat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2 font-semibold">
                  4. Budget Horizon
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`px-3 py-2.5 rounded-none border text-left text-[11px] font-mono leading-tight transition-all duration-200 cursor-pointer ${
                        budget === b
                          ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]"
                          : "bg-black/40 border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !idea.trim()}
                className="w-full py-4 bg-white text-black hover:bg-[#D4AF37] font-mono tracking-widest uppercase rounded-none text-xs flex items-center justify-center gap-2.5 transition-all duration-200 disabled:bg-white/10 disabled:text-white/30 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Analyzing Parameters...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Synthesize Architecture Proposal</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
              <div className="p-2 bg-[#D4AF37]/5 rounded-none border border-[#D4AF37]/10 text-[#D4AF37]">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-normal">
                Powered server-side by <span className="text-white">DLON.io Engine</span> using gemini-3.5-flash reasoning nodes.
              </div>
            </div>
          </div>

          {/* Output Display Column */}
          <div className="lg:col-span-7 bg-[#0F0F0F] border border-white/10 rounded-none min-h-[520px] shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <AnimatePresence mode="wait">
              {/* Idle State */}
              {!loading && !proposal && !error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="p-8 text-center max-w-md relative z-10"
                >
                  <div className="w-16 h-16 bg-white/5 border border-white/10 text-[#D4AF37] rounded-none flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg uppercase tracking-wider font-semibold text-white font-display">
                    Awaiting System Parameters
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-widest text-white/40 leading-relaxed font-sans">
                    Provide your venture idea, core platforms, and budget targets on the left. The DLON compiler will map out a precise, type-safe development roadmap.
                  </p>
                </motion.div>
              )}

              {/* Loading State */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center relative z-10 w-full max-w-sm"
                >
                  <div className="relative w-20 h-20 mx-auto mb-8">
                    {/* Ring animation */}
                    <div className="absolute inset-0 rounded-none border-2 border-[#D4AF37]/10" />
                    <div className="absolute inset-0 rounded-none border-t-2 border-[#D4AF37] animate-spin" />
                    <div className="absolute inset-4 rounded-none border border-white/5 bg-black/40 flex items-center justify-center">
                      <Terminal className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                    DLON.io Compiler
                  </h4>
                  <p className="mt-3 text-xs uppercase tracking-widest text-white font-medium font-sans">
                    {LOADING_STAGES[loadingStageIdx]}
                  </p>
                  <div className="mt-6 flex justify-center gap-1">
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] animate-bounce" />
                  </div>
                </motion.div>
              )}

              {/* Error State */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center max-w-md relative z-10"
                >
                  <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-400 rounded-none flex items-center justify-center mx-auto mb-5">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg uppercase tracking-wider font-semibold text-white">
                    Compilation Failed
                  </h3>
                  <p className="mt-2 text-sm text-red-400">
                    {error}
                  </p>
                  <button
                    onClick={() => handleGenerateProposal({ preventDefault: () => {} } as any)}
                    className="mt-6 px-4 py-2 bg-black/40 hover:bg-white hover:text-black border border-white/10 text-xs font-mono text-white rounded-none transition-all"
                  >
                    Retry Architecture Synthesis
                  </button>
                </motion.div>
              )}

              {/* Proposal Success State */}
              {proposal && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full overflow-y-auto max-h-[640px] p-6 md:p-8 space-y-8 relative z-10 scrollbar-thin scrollbar-thumb-white/10"
                >
                  {/* Top Summary Banner */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-black/40 border border-white/10 rounded-none">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#D4AF37]/10 rounded-none border border-[#D4AF37]/20 text-[#D4AF37]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">BLUEPRINT ID</div>
                        <div className="text-sm font-mono text-[#D4AF37] font-bold tracking-wider">
                          DLON-MVP-{(Math.random() * 100000).toFixed(0)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      <div className="px-3 py-1 bg-black/40 border border-white/5 rounded-none">
                        <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">Complexity</span>
                        <span className="text-xs font-mono text-white font-bold">{proposal.complexity}</span>
                      </div>
                      <div className="px-3 py-1 bg-black/40 border border-white/5 rounded-none">
                        <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">Timeline</span>
                        <span className="text-xs font-mono text-[#D4AF37] font-bold">{proposal.timeline}</span>
                      </div>
                      <div className="px-3 py-1 bg-black/40 border border-white/5 rounded-none">
                        <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">Estimate</span>
                        <span className="text-xs font-mono text-white font-bold">{proposal.costRange}</span>
                      </div>
                    </div>
                  </div>

                  {/* Architecture Summary */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
                      Architecture Design Summary
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed bg-black/20 p-4 rounded-none border border-white/5 font-sans">
                      {proposal.architectureSummary}
                    </p>
                  </div>

                  {/* Tech Stack Modules */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
                      Target Tech Stack Compilation
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Frontend */}
                      <div className="p-4 bg-black/40 border border-white/5 rounded-none flex items-start gap-3">
                        <div className="p-1.5 bg-[#D4AF37]/5 rounded-none text-[#D4AF37] flex-shrink-0 mt-0.5">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Client / Interfaces</div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {proposal.techStack.frontend.map((item) => (
                              <span key={item} className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-black/80 text-white/70 rounded-none border border-white/5">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Backend */}
                      <div className="p-4 bg-black/40 border border-white/5 rounded-none flex items-start gap-3">
                        <div className="p-1.5 bg-[#D4AF37]/5 rounded-none text-[#D4AF37] flex-shrink-0 mt-0.5">
                          <Server className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Apis / Backend</div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {proposal.techStack.backend.map((item) => (
                              <span key={item} className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-black/80 text-white/70 rounded-none border border-white/5">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Database */}
                      <div className="p-4 bg-black/40 border border-white/5 rounded-none flex items-start gap-3">
                        <div className="p-1.5 bg-[#D4AF37]/5 rounded-none text-[#D4AF37] flex-shrink-0 mt-0.5">
                          <Database className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Storage / Relational</div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {proposal.techStack.database.map((item) => (
                              <span key={item} className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-black/80 text-white/70 rounded-none border border-white/5">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Infrastructure */}
                      <div className="p-4 bg-black/40 border border-white/5 rounded-none flex items-start gap-3">
                        <div className="p-1.5 bg-[#D4AF37]/5 rounded-none text-[#D4AF37] flex-shrink-0 mt-0.5">
                          <Code className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Orchestration / Host</div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {proposal.techStack.infrastructure.map((item) => (
                              <span key={item} className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-black/80 text-white/70 rounded-none border border-white/5">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Features */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
                      Target MVP Feature Set
                    </h4>
                    <div className="space-y-2.5">
                      {proposal.keyFeatures.map((feat) => (
                        <div key={feat.title} className="p-4 bg-black/20 border border-white/5 rounded-none text-left">
                          <div className="text-xs font-sans font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <span>{feat.title}</span>
                          </div>
                          <p className="text-xs text-white/60 mt-1.5 pl-3.5 leading-relaxed font-sans">
                            {feat.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Development Phases */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
                      Phase-by-Phase Roadmap
                    </h4>
                    <div className="relative border-l border-white/10 pl-4 space-y-6">
                      {proposal.developmentPhases.map((phase) => (
                        <div key={phase.phase} className="relative">
                          {/* Dot accent */}
                          <div className="absolute -left-[20.5px] top-1 w-3 h-3 rounded-none bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center">
                            <div className="w-1 h-1 bg-[#D4AF37]" />
                          </div>
                          <div className="text-xs font-sans font-bold text-white uppercase tracking-wide flex items-center justify-between">
                            <span>{phase.phase}</span>
                            <span className="text-[9px] font-mono text-[#D4AF37] font-semibold bg-[#D4AF37]/5 border border-[#D4AF37]/10 px-2 py-0.5 rounded-none">
                              {phase.duration}
                            </span>
                          </div>
                          <ul className="mt-2 space-y-1 pl-1">
                            {phase.deliverables.map((del) => (
                              <li key={del} className="text-[11px] text-white/50 flex items-center gap-2">
                                <span className="text-white/20">-</span>
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Advisor Notes */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
                      Architect's Advisory Notes
                    </h4>
                    <p className="text-xs font-mono text-white/50 leading-relaxed italic border-l-2 border-[#D4AF37]/30 pl-3">
                      "{proposal.advisorNotes}"
                    </p>
                  </div>

                  {/* Lead Submission Form */}
                  <div className="pt-6 border-t border-white/5 p-5 bg-black/40 rounded-none border border-white/5">
                    {!leadSuccess ? (
                      <form onSubmit={handleBookConsultation} className="space-y-4 text-left">
                        <div className="text-center md:text-left mb-4">
                          <h4 className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                            Secure this Blueprint Architecture
                          </h4>
                          <p className="text-xs text-white/40 mt-1 leading-relaxed">
                            Provide your details below to register this proposal with a DLON Chief Solutions Consultant and secure a 30-min strategy review call.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your Name"
                              className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-none text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                              required
                            />
                          </div>
                          <div>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Your Email"
                              className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-none text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                              required
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              placeholder="Company / Startup"
                              className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-none text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            value={leadMessage}
                            onChange={(e) => setLeadMessage(e.target.value)}
                            placeholder="Optional message (e.g. 'I am ready to build this next month')"
                            className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-none text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submittingLead}
                          className="w-full py-2.5 bg-[#D4AF37] hover:bg-white text-black font-mono tracking-widest uppercase rounded-none text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                        >
                          {submittingLead ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                              <span>Registering Blueprint Proposal...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 text-black" />
                              <span>Book Strategy Review Call with DLON</span>
                            </>
                          )}
                        </button>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 text-center"
                      >
                        <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-none flex items-center justify-center mx-auto mb-3">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                          Inquiry Successfully Registered
                        </h4>
                        <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto leading-relaxed">
                          Excellent decision! A DLON Chief Solutions Consultant has been assigned to your blueprint proposal. We will email you within 24 business hours to book your review call.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
