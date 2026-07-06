import React, { useState } from "react";
import { Mail, Briefcase, User, Send, CheckCircle2, MessageSquare, Clock, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });

      if (response.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
      } else {
        throw new Error();
      }
    } catch (err) {
      alert("Submission failed. Please try again or email hello@dlon.io directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0F0F0F]">
      {/* Decorative top border */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Initiate Project</span>
                <div className="h-[1px] w-12 bg-[#D4AF37]/40"></div>
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-display font-extrabold uppercase tracking-tighter text-white">
                Let's Build Something <span className="text-stroke">Uncompromising</span>
              </h2>
              <p className="mt-4 text-white/50 text-xs md:text-sm uppercase tracking-widest leading-relaxed">
                Have a validated concept ready to compile? Or require custom integrations, high-scale database structures, or AI model hosting? Write directly to our leadership team.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-none text-[#D4AF37]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Direct Channels</h4>
                  <p className="text-sm font-sans font-semibold text-white mt-1">hello@dlon.io</p>
                  <p className="text-xs text-white/30 mt-0.5 uppercase tracking-wider">Response target: Under 12 hours</p>
                </div>
              </div>

              {/* Response Speed */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-none text-[#D4AF37]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Operational Hours</h4>
                  <p className="text-sm font-sans font-semibold text-white mt-1">08:00 - 18:00 PST</p>
                  <p className="text-xs text-white/30 mt-0.5 uppercase tracking-wider">Monday through Friday</p>
                </div>
              </div>

              {/* Geographic */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-none text-[#D4AF37]">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Origin Node</h4>
                  <p className="text-sm font-sans font-semibold text-white mt-1">Silicon Valley, CA</p>
                  <p className="text-xs text-white/30 mt-0.5 uppercase tracking-wider">Distributed global engineering clusters</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#0F0F0F] border border-white/10 rounded-none p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-white/50 uppercase tracking-widest mb-2 font-semibold">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alexandra Finch"
                          className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/50 uppercase tracking-widest mb-2 font-semibold">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alexandra@venture.com"
                          className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-widest mb-2 font-semibold">
                      Company / Startup Name
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Veloce AI"
                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-widest mb-2 font-semibold">
                      Project Goals & Technical Requirements
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Let us know what platforms, databases, or third-party APIs your project requires..."
                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] h-32 resize-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-white hover:bg-[#D4AF37] text-black font-mono tracking-widest uppercase rounded-none text-xs flex items-center justify-center gap-2 select-none cursor-pointer transition-colors"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        Transmit Message
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center relative z-10"
                >
                  <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-none flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-white uppercase tracking-wider">
                    Message Transmitted Successfully
                  </h3>
                  <p className="mt-3 text-xs text-white/50 max-w-sm mx-auto leading-relaxed font-sans">
                    Thank you. Your project variables have been cataloged. A member of our technical staff will review your brief and contact you within 12 business hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-8 px-6 py-2.5 bg-black/40 border border-white/10 text-white/50 hover:text-white rounded-none hover:border-white/20 transition-colors cursor-pointer"
                  >
                    Submit Another Brief
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
