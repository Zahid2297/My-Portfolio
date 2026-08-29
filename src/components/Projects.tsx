import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "../types";
import ourownfmImg from "../assets/projects/ourownfm.png";
import madlabsImg from "../assets/projects/madlabs.png";
import leadvaultImg from "../assets/projects/leadvault.png";
import mazinImg from "../assets/projects/mazin-portfolio.png";
import aiReviewerImg from "../assets/projects/ai-code-reviewer.png";
import walletImg from "../assets/projects/digital-wallet.png";

type FilterId = "all" | "work" | "personal" | "progress";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "personal", label: "Personal Projects" },
  { id: "progress", label: "In progress" },
];

const PROJECTS_DATA: Project[] = [
  {
    id: "ourownfm",
    title: "OurOwn Facilities Management",
    description:
      "Facilities operations platform for sites, service workflows, and day-to-day FM delivery.",
    tags: ["React", "JavaScript", "Vite"],
    githubUrl: "https://github.com/Zahid2297/ourownfm",
    liveUrl: "https://ourownfm.com/",
    imageUrl: ourownfmImg,
    category: "work",
  },
  {
    id: "madlabs",
    title: "Madlabs Global",
    description:
      "IT consulting site with sticky storytelling that turns visitors into qualified leads.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Zahid2297/Madlabs",
    liveUrl: "https://madlabs-two.vercel.app/",
    imageUrl: madlabsImg,
    category: "work",
  },
  {
    id: "leadvault",
    title: "LeadVault",
    description:
      "B2B email finder that searches, reveals, and exports verified contacts with credits.",
    tags: ["Next.js", "PostgreSQL", "Python"],
    githubUrl: "https://github.com/faizmd26/Lead-Vault",
    liveUrl: "https://leadvault.to/",
    imageUrl: leadvaultImg,
    category: "work",
  },
  {
    id: "mazin-portfolio",
    title: "Mazin Portfolio",
    description:
      "Personal site for a video editor to showcase reels, craft, and booked work.",
    tags: ["TypeScript", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/Zahid2297/mazin-portfolio",
    imageUrl: mazinImg,
    category: "work",
  },
  {
    id: "ai-code-review",
    title: "AI Powered Code Reviewer",
    description:
      "AI-assisted code review that flags issues and suggests cleaner patches in context.",
    tags: ["TypeScript", "OpenAI API", "React"],
    githubUrl: "https://github.com/Zahid2297/Ai-Powered-Code-review",
    liveUrl: "https://ai-powered-code-review-brown.vercel.app",
    imageUrl: aiReviewerImg,
    category: "personal",
  },
  {
    id: "stopwatch",
    title: "Stopwatch & Timer",
    description:
      "Lightweight stopwatch and countdown timer with a clean, focused interface.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    githubUrl: "https://github.com/Zahid2297/Stopwatch-and-Timer-App",
    liveUrl: "https://zahid2297.github.io/Stopwatch-and-Timer-App/",
    imageUrl:
      "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=1400&q=80",
    category: "personal",
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    description:
      "Classic two-player match with instant win checks and a snappy board feel.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    githubUrl: "https://github.com/Zahid2297/Tic-Tac-Toe-game",
    imageUrl:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=1400&q=80",
    category: "personal",
  },
  {
    id: "digital-wallet",
    title: "Digital Wallet",
    description:
      "Secure wallet flows for storing funds, transfers, and transaction history.",
    tags: ["Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/Zahid2297/Digital-Wallet-System",
    imageUrl: walletImg,
    category: "personal",
  },
  {
    id: "corvian-ai",
    title: "Corvian AI",
    description:
      "AI product surface in design — agents, workflows, and a calm operator UI.",
    tags: ["TypeScript", "Inngest", "OpenAI API"],
    githubUrl: "https://github.com/Zahid2297/corvian-ai",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    category: "progress",
  },
];

function ActionIcon({
  href,
  label,
  disabled,
  children,
}: {
  href?: string;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const className =
    "relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 bg-obsidian/80 text-gold/70 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold hover:scale-110 hover:shadow-[0_0_18px_rgba(167,139,250,0.35)] cursor-none";

  if (disabled || !href) {
    return (
      <span
        aria-disabled="true"
        title="Live link coming soon"
        className={`${className} opacity-35 grayscale pointer-events-none`}
      >
        {children}
        <span className="sr-only">{label} unavailable</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
      className={className}
    >
      {children}
    </a>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const inProgress = project.category === "progress";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="project-card group/project relative flex flex-col overflow-hidden rounded-xl border border-gold/12 bg-obsidian/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_22px_50px_-28px_rgba(167,139,250,0.55)]"
    >
      <div className="relative bg-obsidian px-3 pt-3">
        <div className="relative flex h-[210px] md:h-[230px] items-center justify-center overflow-hidden rounded-lg border border-gold/10 bg-black">
          <img
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className={`max-h-full max-w-full w-full h-full object-contain object-center transition-all duration-500 ease-out ${
              inProgress
                ? "blur-[8px] saturate-50 opacity-70 group-hover/project:blur-[6px] group-hover/project:opacity-85"
                : "opacity-95 group-hover/project:opacity-100"
            }`}
          />

          {inProgress && (
            <div className="absolute inset-0 bg-obsidian/40">
              <div className="absolute inset-4 rounded-md border border-dashed border-gold/30 p-2">
                <div className="grid h-full grid-cols-3 gap-2 opacity-50">
                  <span className="col-span-2 rounded-md border border-gold/25 bg-gold/5" />
                  <span className="rounded-md border border-gold/25 bg-gold/5" />
                  <span className="rounded-md border border-gold/20 bg-gold/[0.03]" />
                  <span className="col-span-2 rounded-md border border-gold/20 bg-gold/[0.03]" />
                </div>
              </div>
              <span className="absolute bottom-3 left-3 rounded-full border border-gold/30 bg-obsidian/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-gold">
                In progress
              </span>
            </div>
          )}

          <div className="project-glaze-sheen rounded-lg" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-sans text-base font-bold tracking-wide text-cream transition-colors duration-300 group-hover/project:text-gold">
          {project.title}
        </h3>
        <p className="font-sans text-sm font-light leading-relaxed text-cream/60 line-clamp-1">
          {project.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 border border-gold/12 text-gold/60 bg-gold/[0.03] transition-colors duration-300 group-hover/project:border-gold/30 group-hover/project:text-gold"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ActionIcon href={project.githubUrl} label={`${project.title} GitHub repository`}>
              <Github className="h-3.5 w-3.5" strokeWidth={1.8} />
            </ActionIcon>
            <ActionIcon
              href={project.liveUrl}
              label={`${project.title} live site`}
              disabled={inProgress || !project.liveUrl}
            >
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
            </ActionIcon>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<FilterId>("all");

  const visibleProjects = useMemo(() => {
    if (filter === "all") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((project) => project.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="relative py-28 px-6 md:px-14 z-10">
      <div className="max-w-[1140px] mx-auto">
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

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-light leading-snug tracking-tight mb-8"
        >
          Featured <span className="text-gold italic font-bold">Projects</span>
        </motion.h2>

        <div
          role="tablist"
          aria-label="Filter projects"
          className="mb-10 flex flex-wrap gap-2"
        >
          {FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item.id)}
                className={`cursor-none rounded-full border px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
                  active
                    ? "border-gold bg-gold text-obsidian shadow-[0_0_20px_rgba(167,139,250,0.35)]"
                    : "border-gold/18 bg-obsidian/30 text-cream/70 hover:border-gold/50 hover:text-gold"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
