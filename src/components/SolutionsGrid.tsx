import React from "react";
import { Cpu, Layers, Globe, Database, ShieldCheck, Compass, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface SolutionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  techStack: string[];
  gradient: string;
}

const solutions: SolutionItem[] = [
  {
    id: "ai",
    icon: <Cpu className="w-6 h-6 text-[#D4AF37]" />,
    title: "AI-Driven Automation & Agents",
    description: "Architecting self-correcting workflows, server-side LLM orchestration, semantic search engines, and production-ready intelligent user interfaces.",
    techStack: ["Gemini API", "Vector Embeddings", "Retrieval-Augmented Gen", "Node.js Pipelines"],
    gradient: "from-[#D4AF37]/10 via-white/5 to-transparent",
  },
  {
    id: "cloud",
    icon: <Layers className="w-6 h-6 text-[#D4AF37]" />,
    title: "Full-Stack Cloud Architectures",
    description: "Building auto-scaling microservices with robust Node/Express backends, running inside isolated secure Google Cloud containers.",
    techStack: ["Google Cloud Run", "Express.js", "Docker Containers", "Nginx Gateways"],
    gradient: "from-[#D4AF37]/10 via-white/5 to-transparent",
  },
  {
    id: "saas",
    icon: <Globe className="w-6 h-6 text-[#D4AF37]" />,
    title: "Elite SaaS & MVP Engineering",
    description: "Rapid, type-safe frontend delivery pairing React 19, custom Vite bundler optimizations, and state-of-the-art interactive graphics.",
    techStack: ["React 19", "Vite Bundlers", "Tailwind CSS v4", "TypeScript Strict"],
    gradient: "from-[#D4AF37]/10 via-white/5 to-transparent",
  },
  {
    id: "db",
    icon: <Database className="w-6 h-6 text-[#D4AF37]" />,
    title: "High-Performance Databases",
    description: "Designing relational architectures optimized for sub-millisecond querying, auto-scaling clusters, caching layers, and transaction logging.",
    techStack: ["PostgreSQL (Cloud SQL)", "Drizzle ORM", "Redis Layers", "Firebase Firestore"],
    gradient: "from-[#D4AF37]/10 via-white/5 to-transparent",
  },
  {
    id: "security",
    icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
    title: "Rigorous Security & Audits",
    description: "Continuous vulnerability scanning, clean dependency tree isolation, secret handling, and secure authorization standards.",
    techStack: ["OAuth 2.0 Integration", "HTTPS Encryption", "CORS Hardening", "Environment Audits"],
    gradient: "from-[#D4AF37]/10 via-white/5 to-transparent",
  },
  {
    id: "strategy",
    icon: <Compass className="w-6 h-6 text-[#D4AF37]" />,
    title: "Product Discovery & Blueprinting",
    description: "Unlocking business velocity by converting product concepts into detailed execution roadmaps, database schemas, and API blueprints.",
    techStack: ["Scope Decomposition", "Wireframe Architecture", "Database Modeling", "API Blueprints"],
    gradient: "from-[#D4AF37]/10 via-white/5 to-transparent",
  }
];

export const SolutionsGrid: React.FC = () => {
  return (
    <section id="solutions" className="py-24 relative overflow-hidden bg-[#0F0F0F]">
      {/* Decorative ambient lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-3 justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Expertise Matrix</span>
            <div className="h-[1px] w-12 bg-[#D4AF37]/40"></div>
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-display font-extrabold uppercase tracking-tighter text-white">
            Engineering <span className="text-stroke">Bespoke Systems</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-xs md:text-sm uppercase tracking-widest leading-relaxed">
            We reject general templates. Every system is built on-demand with rigorous modular engineering to secure permanent technological advantages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, idx) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              className="relative group rounded-none border border-white/10 bg-[#0F0F0F] p-8 hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Corner Glow Accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-white/5 rounded-none border border-white/10 group-hover:border-[#D4AF37]/30 transition-colors duration-300">
                    {solution.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">REF. #00{idx + 1}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-all duration-300" />
                  </div>
                </div>

                <h3 className="text-lg uppercase tracking-wider font-semibold text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                  {solution.title}
                </h3>

                <p className="mt-4 text-sm text-white/60 leading-relaxed font-sans">
                  {solution.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-1.5 z-10">
                {solution.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 bg-white/5 text-white/70 rounded-none border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
