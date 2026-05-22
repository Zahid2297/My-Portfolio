import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
// @ts-ignore
import heroCodingArt from "../assets/images/hero_developer_stars_1779324026582.png";

export default function Hero() {
  const roles = [
    "Full Stack Developer",
    "MERN Stack Specialist",
    "Creative Problem Solver",
    "SaaS Product Builder",
    "Interactive UI Designer",
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const fullText = roles[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        setCurrentText(fullText.substring(0, currentText.length + 1));

        if (currentText === fullText) {
          // Finished typing, pause for 2 seconds before deletion
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
          return;
        }
      } else {
        // Deleting characters
        setCurrentText(fullText.substring(0, currentText.length - 1));

        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }
    };

    // Slightly faster speed when deleting to feel more dynamic
    const speed = isDeleting ? 30 : 65;
    timer = setTimeout(handleType, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, roles]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 35, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-[92vh] flex items-center px-6 md:px-14 pt-32 pb-16 z-10"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1140px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left Column - Hero Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Availability Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 text-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-6 font-semibold"
          >
            <span className="inline-block w-8 h-[1px] bg-gold" />
            Available for work
          </motion.div>

          {/* Display Typography Title */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-[clamp(2.8rem,9vw,6rem)] font-normal leading-[0.9] tracking-tight mb-8"
          >
            <span className="block text-cream font-sans font-semibold">
              Mohemmad
            </span>
            <span className="block text-gold italic font-bold">Zahed</span>
          </motion.h1>

          {/* Creative developer role banner */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5 mb-8"
          >
            <motion.div
              variants={lineVariants}
              className="w-[1px] h-9 bg-gradient-to-b from-transparent via-gold to-transparent origin-center"
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 min-h-[28px]">
              <span className="font-sans text-[12px] md:text-[14px] font-semibold tracking-[0.22em] text-cream/70 uppercase flex items-center gap-2">
                <span>I'm a</span>
                <span className="font-serif text-gold italic font-black tracking-normal text-[13px] md:text-[15.5px] whitespace-nowrap inline-flex items-center">
                  {currentText}
                  <span className="ml-1 w-[2px] h-[13px] md:h-[15px] bg-gold animate-pulse" />
                </span>
              </span>
            </div>
          </motion.div>

          {/* Bio paragraph description */}
          <motion.p
            variants={itemVariants}
            className="max-w-[480px] font-sans text-sm md:text-base text-cream/75 leading-[1.85] font-normal mb-12 tracking-normal"
          >
            Full stack developer passionate about creating beautiful, functional
            digital experiences. I blend creative problem solving with solid
            engineering to deliver products users love.
          </motion.p>

          {/* Action button CTA */}
          <motion.div variants={itemVariants}>
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="group relative inline-flex items-center gap-3 border border-gold px-8 py-3.5 font-sans text-[11px] font-bold tracking-[0.2em] text-gold uppercase transition-colors duration-450 overflow-hidden hover:text-obsidian"
            >
              {/* Sliding black background layer */}
              <span className="absolute inset-0 bg-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-350 ease-out z-0" />

              <span className="relative z-10">View My Work</span>
              <svg
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Right Column - Animated Artistic Frame / Image Container */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex justify-center items-center relative w-full"
        >
          {/* Ambient Outer Aura Glow */}
          <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-gold/15 to-accent/20 blur-xl opacity-80" />

          {/* Interactive Floating Picture Frame */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-[340px] aspect-[4/5] rounded-[24px] border border-gold/18 bg-obsidian-light/35 backdrop-blur-md overflow-hidden flex items-center justify-center p-4 group select-none shadow-2xl"
          >
            {/* Visual Grid Accents inside the frame */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,169,110,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,169,110,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Corner Decorative Brackets */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold/40 z-10" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-gold/40 z-10" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-gold/40 z-10" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold/40 z-10" />

            {/* MAIN IMAGE BLOCK - Beautiful generated artistic image */}
            <div className="relative w-full h-full rounded-[16px] overflow-hidden flex items-center justify-center bg-obsidian-light/20 border border-gold/15 shadow-lg group-hover:scale-[1.02] transition-transform duration-500">
              <img
                src={heroCodingArt}
                alt="Creative Coding Art"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
