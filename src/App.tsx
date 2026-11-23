/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { MotionConfig } from "motion/react";
import Cursor from "./components/Cursor";
import Backdrop from "./components/Backdrop";
import Greeting from "./components/Greeting";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InquirySheet from "./components/InquirySheet";
import { initAnalytics } from "./analytics";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return (saved as "light" | "dark") || "dark";
    }
    return "dark";
  });
  const [showContent, setShowContent] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-obsidian text-cream select-none overflow-x-hidden selection:bg-gold-dim selection:text-cream">
      <Greeting onFinish={() => setShowContent(true)} />

      {showContent && (
        <>
          {/* Dynamic Cursor tracker */}
          <Cursor />

          {/* Unified static/parallax Aurora fluid glass gradient canvas background */}
          <Backdrop />

          {/* Modern floating inline header navbar */}
          <Navbar
            theme={theme}
            toggleTheme={toggleTheme}
            onOpenInquiry={() => setInquiryOpen(true)}
          />

          {/* Primary scrollable wrapper */}
          <main className="relative z-10 w-full">
            {/* About / Introduction */}
            <Hero />

            {/* Technical stack grids */}
            <Skills />

            {/* Selected custom project grids */}
            <Projects />

            {/* Interactive message form and support triggers */}
            <Contact onInquire={() => setInquiryOpen(true)} />
          </main>

          {/* Legal & social coordinates */}
          <Footer />

          <InquirySheet
            open={inquiryOpen}
            onClose={() => setInquiryOpen(false)}
          />
        </>
      )}
    </div>
    </MotionConfig>
  );
}
