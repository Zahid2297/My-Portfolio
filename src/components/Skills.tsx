import React from "react";
import { motion } from "motion/react";
import {
  Database,
  Server,
  Atom,
  Terminal,
  Code2,
  Globe2,
  GitBranch,
  Palette,
  Braces,
  KeyRound,
  Container,
  FileCode,
  Layers,
  Table2,
  CloudRain,
  Sparkles,
  Zap,
  Github,
} from "lucide-react";

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SkillGroup {
  heading: string;
  skills: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    heading: "Languages",
    skills: [
      { name: "JavaScript", icon: Braces },
      { name: "TypeScript", icon: FileCode },
      { name: "HTML5", icon: Code2 },
      { name: "CSS3", icon: Palette },
      { name: "Python", icon: Terminal },
    ],
  },
  {
    heading: "Frontend",
    skills: [
      { name: "React", icon: Atom },
      { name: "Next.js", icon: Layers },
      { name: "Tailwind CSS", icon: Palette },
    ],
  },
  {
    heading: "Backend",
    skills: [
      { name: "Node.js", icon: Terminal },
      { name: "Express.js", icon: Server },
      { name: "REST APIs", icon: Globe2 },
      { name: "JWT / OAuth / BetterAuth", icon: KeyRound },
    ],
  },
  {
    heading: "Databases & ORMs",
    skills: [
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "Prisma", icon: Table2 },
      { name: "Drizzle", icon: CloudRain },
    ],
  },
  {
    heading: "AI & Tooling",
    skills: [
      { name: "OpenAI API", icon: Sparkles },
      { name: "Inngest", icon: Zap },
      { name: "Docker", icon: Container },
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: Github },
    ],
  },
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

        <div className="flex flex-col gap-12">
          {SKILL_GROUPS.map((group) => (
            <div key={group.heading}>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold mb-4"
              >
                {group.heading}
              </motion.h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5"
              >
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={cardVariants}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="relative p-5 md:p-6 border border-gold/10 bg-obsidian/30 backdrop-blur-sm group overflow-hidden"
                  >
                    <span className="absolute top-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-out" />

                    <div className="mb-3.5 text-gold/50 group-hover:text-gold transition-colors duration-300">
                      <skill.icon className="w-5 h-5 stroke-[1.5]" />
                    </div>

                    <h4 className="font-sans text-xs md:text-sm font-semibold text-cream tracking-normal">
                      {skill.name}
                    </h4>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
