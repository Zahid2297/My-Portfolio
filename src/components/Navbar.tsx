import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Orbit, Sun, Moon } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle scroll detection to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setVisible(false);
      } else {
        // Scrolling up - show navbar
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectSection = (id: string) => {
    closeMenu();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 450); // wait for menu animation out
  };

  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] flex justify-between items-center px-6 md:px-14 py-4 md:py-5 bg-obsidian/30 backdrop-blur-md transition-all duration-300 ${
          visible || isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Left branding signet */}
        <a
          href="#about"
          onClick={(e) => handleScrollTo("about", e)}
          className="group relative flex items-center gap-2.5 cursor-none focus:outline-none"
          aria-label="Scroll back to top"
        >
          <motion.div
            className="relative flex items-center justify-center w-14 h-14 rounded-full transition-colors duration-500 overflow-hidden"
            style={{ fontFamily: '"Amsterdam One", cursive' }}
          >
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <defs>
                <radialGradient id="badgeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(167, 139, 250, 0.28)" />
                  <stop offset="70%" stopColor="rgba(167, 139, 250, 0.08)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle
                cx="60"
                cy="60"
                r="52"
                stroke="rgba(167, 139, 250, 0.28)"
                strokeWidth="2"
              />
              <g
                stroke="rgba(167, 139, 250, 0.55)"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="60" y1="6" x2="60" y2="18" />
                <line x1="60" y1="102" x2="60" y2="114" />
                <line x1="6" y1="60" x2="18" y2="60" />
                <line x1="102" y1="60" x2="114" y2="60" />
                <line x1="12" y1="12" x2="30" y2="30" />
                <line x1="108" y1="12" x2="90" y2="30" />
                <line x1="12" y1="108" x2="30" y2="90" />
                <line x1="108" y1="108" x2="90" y2="90" />
              </g>
              <circle cx="60" cy="60" r="28" fill="url(#badgeGlow)" />
            </motion.svg>
            <motion.span
              initial={{ opacity: 0, y: -4, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[18px] text-gold leading-none text-center"
              style={{
                fontFamily: '"Alex Brush", cursive',
                letterSpacing: "-0.02em",
                textShadow: "0 0 8px rgba(167,139,250,0.45)",
                transform: "translateZ(0)",
              }}
            >
              Z
            </motion.span>
          </motion.div>
        </a>

        {/* Right controls */}
        <div className="flex items-center gap-5">
          {/* Animated Light/Dark Mode Toggle button */}
          <button
            onClick={toggleTheme}
            className="relative w-8 h-8 flex items-center justify-center rounded-full border border-gold/20 hover:border-gold bg-gold-dim cursor-none text-gold focus:outline-none overflow-hidden group transition-all duration-300"
            title={theme === "light" ? "Switch to Dark" : "Switch to Light"}
            aria-label="Toggle theme display mode"
          >
            <span className="absolute inset-0 rounded-full bg-gold/10 scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />

            <AnimatePresence mode="wait">
              {theme === "light" ? (
                <motion.div
                  key="sun"
                  initial={{ y: 20, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sun className="w-3.5 h-3.5 text-gold" strokeWidth={2} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ y: 20, opacity: 0, rotate: 45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.25 }}
                >
                  <Moon className="w-3.5 h-3.5 text-gold" strokeWidth={2} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Golden Orbit/Burger Trigger */}
          <button
            onClick={toggleMenu}
            className="flex flex-col items-end gap-[5px] bg-transparent border-0 p-1.5 cursor-none z-[220] focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-[1px] bg-gold transition-all duration-400 origin-right ${
                isOpen ? "w-6 rotate-[-45deg] translate-y-[6px]" : "w-7"
              }`}
            />
            <span
              className={`block h-[1px] bg-gold transition-all duration-350 ${
                isOpen ? "w-0 opacity-0" : "w-[18px]"
              }`}
            />
            <span
              className={`block h-[1px] bg-gold transition-all duration-400 origin-right ${
                isOpen ? "w-6 rotate-[45deg] -translate-y-[6px]" : "w-6"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen Orbital Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeMenu();
            }}
            className="fixed inset-0 z-[190] bg-obsidian/96 backdrop-blur-2xl flex items-center justify-center overflow-hidden"
          >
            {/* Nav inner orbital ring layout */}
            <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px]">
              {/* Spinning Decorative Rings */}
              <motion.div
                initial={{ rotate: -15, scale: 0.85, opacity: 0 }}
                animate={{ rotate: 15, scale: 1, opacity: 1 }}
                exit={{ rotate: -15, scale: 0.85, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-gold/15"
              />
              <motion.div
                initial={{ rotate: 30, scale: 0.9, opacity: 0 }}
                animate={{ rotate: -10, scale: 1, opacity: 1 }}
                exit={{ rotate: 30, scale: 0.9, opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute inset-[50px] md:inset-[70px] rounded-full border border-gold/10"
              />
              <motion.div
                initial={{ rotate: -40, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 20, scale: 1, opacity: 1 }}
                exit={{ rotate: -40, scale: 0.8, opacity: 0 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                className="absolute inset-[105px] md:inset-[140px] rounded-full border border-gold/20"
              />

              {/* Orbital Connector Lines spanning across */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute top-[50%] left-[50%] w-[1px] h-[100px] md:h-[130px] -mt-[100px] md:-mt-[130px] bg-gradient-to-b from-gold/25 to-transparent origin-bottom"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.18 }}
                className="absolute top-[50%] left-[50%] h-[1px] w-[100px] md:w-[130px] bg-gradient-to-r from-transparent to-gold/25 origin-left"
              />
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.8, delay: 0.26 }}
                className="absolute top-[50%] left-[50%] w-[1px] h-[100px] md:h-[130px] bg-gradient-to-b from-transparent to-gold/25 origin-top"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.34 }}
                className="absolute top-[50%] left-[50%] h-[1px] w-[100px] md:w-[130px] -ml-[100px] md:-ml-[130px] bg-gradient-to-r from-gold/25 to-transparent origin-right"
              />

              {/* Core central text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="block font-serif text-[15px] md:text-[18px] italic tracking-widest text-gold/30">
                  Navigate
                </span>
              </div>

              {/* Interactive Navigation Points (Diamond Ends) */}

              {/* TOP: About */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                onClick={() => handleSelectSection("about")}
                className="absolute top-[8%] lg:top-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[6px] group cursor-none focus:outline-none bg-transparent border-0"
              >
                <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-cream uppercase transition-colors group-hover:text-gold">
                  About
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform duration-300" />
              </motion.button>

              {/* RIGHT: Skills */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.23, duration: 0.4 }}
                onClick={() => handleSelectSection("skills")}
                className="absolute top-1/2 left-[92%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[6px] group cursor-none focus:outline-none bg-transparent border-0"
              >
                <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-cream uppercase transition-colors group-hover:text-gold">
                  Skills
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform duration-300" />
              </motion.button>

              {/* BOTTOM: Projects */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.31, duration: 0.4 }}
                onClick={() => handleSelectSection("projects")}
                className="absolute bottom-[8%] lg:bottom-[12%] left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-[6px] group cursor-none focus:outline-none bg-transparent border-0"
              >
                <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-cream uppercase transition-colors group-hover:text-gold">
                  Projects
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform duration-300" />
              </motion.button>

              {/* LEFT: Contact */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.39, duration: 0.4 }}
                onClick={() => handleSelectSection("contact")}
                className="absolute top-1/2 left-[8%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[6px] group cursor-none focus:outline-none bg-transparent border-0"
              >
                <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-cream uppercase transition-colors group-hover:text-gold">
                  Contact
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
