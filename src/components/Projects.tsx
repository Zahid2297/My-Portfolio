import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

const PROJECTS_DATA: (Project & { imageUrl: string })[] = [
  {
    id: "devconnect",
    num: "01",
    title: "DevConnect",
    description: "A social platform for developers with real-time messaging, profile showcasing, and community post sharing. Built end-to-end on the MERN stack.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "#",
    imageUrl: "https://picsum.photos/seed/devconnect/800/600",
  },
  {
    id: "shopflow",
    num: "02",
    title: "ShopFlow",
    description: "Full-stack e-commerce platform featuring product management, dynamic cart, secure Stripe payment integration, and a comprehensive admin dashboard.",
    tags: ["React", "Express", "Stripe", "JWT"],
    link: "#",
    imageUrl: "https://picsum.photos/seed/shop/800/600",
  },
  {
    id: "tasksync",
    num: "03",
    title: "TaskSync",
    description: "Real-time project management app with drag-and-drop kanban boards, live team collaboration, and deadline tracking across multiple workspaces.",
    tags: ["React", "Node.js", "WebSockets", "Redux"],
    link: "#",
    imageUrl: "https://picsum.photos/seed/workspace/800/600",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(Project & { imageUrl: string }) | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const projectCardVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const openModal = (proj: (Project & { imageUrl: string }), e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProject(proj);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative py-28 px-6 md:px-14 z-10">
      <div className="max-w-[1140px] mx-auto">
        
        {/* Section label */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 text-mono text-[10px] uppercase tracking-[0.35em] text-gold mb-4"
        >
          Selected work
          <span className="block w-10 h-[1px] bg-gold/25" />
        </motion.div>

        {/* Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-light leading-snug tracking-tight mb-16"
        >
          Featured <span className="text-gold italic font-bold">Projects</span>
        </motion.h2>

        {/* Simplified & Creative Project Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROJECTS_DATA.map((proj) => (
            <motion.div
              key={proj.id}
              variants={projectCardVariants}
              onClick={(e) => openModal(proj, e)}
              className="group relative flex flex-col justify-between overflow-hidden cursor-none bg-obsidian/30 border border-gold-mid transition-all duration-300 pointer-events-auto rounded-md"
            >
              {/* 1. Creative Project Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian-dim">
                {/* Visual Image */}
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Thin overlay mesh */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Top tracking info */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-gold/60 uppercase">
                    [ PROJECT_{proj.num} ]
                  </span>
                  
                  {/* Subtle index mark */}
                  <div className="w-5 h-5 rounded-full border border-gold/15 bg-obsidian/85 flex items-center justify-center font-serif text-[10px] text-gold italic">
                    {proj.num}
                  </div>
                </div>
              </div>

              {/* 2. Simplified Information Panel */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-sans text-base font-bold text-cream tracking-wide group-hover:text-gold transition-colors duration-300 mb-2">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-cream/60 leading-relaxed font-light mb-6 line-clamp-2">
                    {proj.description}
                  </p>
                </div>

                {/* Tags and arrow details */}
                <div className="flex items-center justify-between pt-4 border-t border-gold-mid">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.slice(0, 3).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 border border-gold/10 text-gold/50 bg-gold/[0.01]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-gold/50 group-hover:text-gold group-hover:translate-x-1.5 transition-all duration-300">
                    ↗
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Elegant Details Modal popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[300] bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full border border-gold/20 bg-obsidian text-left outline-none rounded-lg overflow-hidden flex flex-col"
            >
              {/* Image Header with close cross */}
              <div className="relative aspect-[16/9] w-full bg-obsidian-dim overflow-hidden">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent" />
                
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-obsidian/80 hover:bg-obsidian border border-gold/25 flex items-center justify-center text-gold cursor-none transition-all duration-200"
                  aria-label="Close project modal"
                >
                  ✕
                </button>

                <div className="absolute bottom-4 left-6">
                  <span className="font-mono text-[9px] tracking-widest text-gold/60 uppercase block mb-1">
                    PROJECT // DETAILS_{selectedProject.num}
                  </span>
                  <h3 className="font-sans text-xl md:text-2xl font-bold text-cream tracking-wide">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Core Contents */}
              <div className="p-6 md:p-8 space-y-6">
                <p className="font-sans text-sm text-cream/80 leading-relaxed font-light">
                  {selectedProject.description}
                </p>

                <p className="font-sans text-xs md:text-sm text-cream/50 leading-relaxed font-light">
                  A cohesive digital solution designed to support multi-threaded responsive performance, seamless visual continuity, and optimized user flows. Developed with strict attention to modular layout paradigms.
                </p>

                {/* Stack overview */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold font-medium">Tools & Architecture</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 border border-gold/15 text-gold bg-gold/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gold/10">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2 font-sans text-[10px] tracking-widest uppercase border border-gold/20 text-cream hover:bg-gold/5 transition-colors cursor-none"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      closeModal();
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-2 font-sans text-[10px] tracking-widest uppercase bg-gold text-obsidian font-bold hover:opacity-90 transition-opacity cursor-none"
                  >
                    Discuss
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
