import React from "react";
import { motion } from "motion/react";

interface ContactProps {
  onInquire: () => void;
}

export default function Contact({ onInquire }: ContactProps) {
  return (
    <section id="contact" className="relative py-28 px-6 md:px-14 z-10">
      <div className="max-w-[620px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-4 text-mono text-[10px] uppercase tracking-[0.35em] text-gold mb-4"
        >
          Let's talk
          <span className="block w-10 h-[1px] bg-gold/30" />
        </motion.div>

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
          collaborations. A short form opens WhatsApp with your answers filled in.
        </p>

        <button
          type="button"
          onClick={onInquire}
          className="group relative inline-flex items-center gap-3 border border-gold px-8 py-3.5 font-sans text-[11px] font-bold tracking-[0.2em] text-gold uppercase transition-colors duration-450 overflow-hidden hover:text-obsidian cursor-none"
        >
          <span className="absolute inset-0 bg-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-350 ease-out z-0" />
          <span className="relative z-10">Start an inquiry</span>
        </button>

        <div className="flex flex-col items-center gap-1 mt-10">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#5a564e]">
            Or direct contact
          </span>
          <a
            href="mailto:techpirate97@gmail.com"
            className="font-sans text-xs text-cream hover:text-gold tracking-widest border-b border-gold/25 pb-0.5 transition-colors duration-250 cursor-none"
          >
            techpirate97@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
