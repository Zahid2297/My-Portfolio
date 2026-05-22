import React from "react";
import { motion } from "motion/react";
import {
  Database,
  Server,
  Atom,
  Terminal,
  Code2,
  ShieldAlert,
  Globe2,
  GitBranch,
  Palette,
  Braces,
  KeyRound,
  Container,
} from "lucide-react";
import { Skill } from "../types";

interface SkillWithIcon extends Skill {
  icon: React.ComponentType<{ className?: string }>;
}

const SKILLS_DATA: SkillWithIcon[] = [
  { name: "MongoDB", category: "Database", icon: Database },
  { name: "Express.js", category: "Backend", icon: Server },
  { name: "React.js", category: "Frontend", icon: Atom },
  { name: "Node.js", category: "Runtime", icon: Terminal },
  { name: "JavaScript", category: "Language", icon: Braces },
  { name: "TypeScript", category: "Language", icon: ShieldAlert },
  { name: "REST APIs", category: "Architecture", icon: Globe2 },
  { name: "Git & GitHub", category: "Version Control", icon: GitBranch },
  { name: "Tailwind CSS", category: "Styling", icon: Palette },
  { name: "HTML5", category: "Language", icon: Code2 },
  { name: "CSS3", category: "Language", icon: Palette },
  { name: "JWT / OAuth", category: "Auth", icon: KeyRound },
  { name: "Docker", category: "DevOps", icon: Container }, //hidden skill for now, can be added back later when I have more experience with it
];

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="skills" className="relative py-28 px-6 md:px-14 z-10">
      <div className="max-w-[1140px] mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 text-mono text-[10px] uppercase tracking-[0.35em] text-gold mb-4"
        >
          What I work with
          <span className="block w-10 h-[1px] bg-gold/30" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-light leading-snug tracking-tight mb-14"
        >
          Skills &{" "}
          <span className="text-gold italic font-bold">Technologies</span>
        </motion.h2>

        {/* Responsive Grid Boxes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5"
        >
          {SKILLS_DATA.map((skill, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="relative p-5 md:p-6 border border-gold/10 bg-obsidian/30 backdrop-blur-sm group overflow-hidden"
            >
              {/* Top hover underline effect */}
              <span className="absolute top-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-out" />

              {/* Skill Icon */}
              <div className="mb-3.5 text-gold/50 group-hover:text-gold transition-colors duration-300">
                <skill.icon className="w-5 h-5 stroke-[1.5]" />
              </div>

              {/* Skill Content */}
              <h3 className="font-sans text-xs md:text-sm font-semibold text-cream mb-1 tracking-normal">
                {skill.name}
              </h3>
              <p className="font-mono text-[9px] uppercase tracking-wider text-gold/50">
                {skill.category}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
