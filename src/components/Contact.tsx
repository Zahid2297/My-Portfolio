import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate safe elegant submission API trigger
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-14 z-10">
      <div className="max-w-[620px] mx-auto text-center">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-4 text-mono text-[10px] uppercase tracking-[0.35em] text-gold mb-4"
        >
          Let's talk
          <span className="block w-10 h-[1px] bg-gold/30" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-light leading-snug tracking-tight mb-5"
        >
          Have a project{" "}
          <span className="text-gold italic font-bold">in mind?</span>
        </motion.h2>

        <p className="font-sans text-xs md:text-sm text-cream/48 leading-[1.85] font-light mb-12 max-w-md mx-auto">
          Open to full time roles, freelance projects, and exciting
          collaborations. Let's build something great together.
        </p>

        {/* Interactive message form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mt-8 mb-12 max-w-[540px] mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-1 flex flex-col">
                <label
                  className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/45"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-cream/15 focus:border-gold py-2.5 text-sm text-cream placeholder-cream/20 focus:outline-none transition-colors font-sans rounded-none cursor-none"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="space-y-1 flex flex-col">
                <label
                  className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/45"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-cream/15 focus:border-gold py-2.5 text-sm text-cream placeholder-cream/20 focus:outline-none transition-colors font-sans rounded-none cursor-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1 flex flex-col">
              <label
                className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/45"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full bg-transparent border-b border-cream/15 focus:border-gold py-2.5 text-sm text-cream placeholder-cream/20 focus:outline-none transition-colors font-sans rounded-none resize-none cursor-none"
                placeholder="Hi Mohammad, let's collaborate on..."
                required
              />
            </div>

            {error && (
              <p className="text-red-400 font-mono text-[10px] tracking-wide">
                {error}
              </p>
            )}

            <AnimatePresence>
              {success && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gold font-mono text-[10px] tracking-wide"
                >
                  ✓ Message sent successfully. Speak to you soon!
                </motion.p>
              )}
            </AnimatePresence>

            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative inline-flex items-center justify-center gap-2.5 border border-gold/30 hover:border-gold bg-transparent px-8 py-3 font-sans text-[10px] font-bold tracking-[0.25em] text-gold uppercase transition-colors duration-300 overflow-hidden hover:bg-gold hover:text-black disabled:opacity-55 cursor-none"
              >
                <span>{isLoading ? "Transmitting..." : "Send Message"}</span>

                {!isLoading && (
                  <svg
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Traditional direct mail support link */}
        <div className="flex flex-col items-center gap-1 mt-6">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#5a564e]">
            Or direct contact
          </span>
          <a
            href="mailto:zahed@email.com"
            className="font-sans text-xs text-cream hover:text-gold tracking-widest border-b border-gold/25 pb-0.5 transition-colors duration-250 cursor-none"
          >
            techpirate97@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
