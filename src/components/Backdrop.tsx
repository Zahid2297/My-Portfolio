import React from "react";
import { motion } from "motion/react";

// Cosmic dust particles flowing slowly diagonally upwards
const COSMIC_DUST = [
  { id: 1, left: "15%", top: "70%", size: 3, delay: 0, duration: 16 },
  { id: 2, left: "35%", top: "40%", size: 2, delay: 3, duration: 22 },
  { id: 3, left: "55%", top: "80%", size: 4, delay: 1, duration: 18 },
  { id: 4, left: "80%", top: "25%", size: 2.5, delay: 4, duration: 25 },
  { id: 5, left: "20%", top: "15%", size: 3.5, delay: 2, duration: 20 },
  { id: 6, left: "70%", top: "60%", size: 2, delay: 5, duration: 15 },
  { id: 7, left: "90%", top: "75%", size: 3.5, delay: 2.5, duration: 21 },
  { id: 8, left: "45%", top: "15%", size: 1.5, delay: 1.2, duration: 28 },
  { id: 9, left: "5%", top: "45%", size: 2, delay: 3.5, duration: 19 },
  { id: 10, left: "50%", top: "50%", size: 4.5, delay: 0.5, duration: 24 },
  { id: 11, left: "65%", top: "10%", size: 2.5, delay: 5.2, duration: 17 },
  { id: 12, left: "85%", top: "90%", size: 3, delay: 1.8, duration: 26 },
];

export default function Backdrop() {
  return (
    <>
      {/* FIXED LAYER: Ambient film grain, deep space nebulae, and drifting cosmic dust */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none bg-obsidian transition-colors duration-500">
        
        {/* 1. Fine cinematic ambient film grain simulation */}
        <div 
          className="absolute inset-0 opacity-[0.24] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cinema-grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cinema-grain)' opacity='0.045'/%3E%3C/svg%3E")`,
          }}
        />

        {/* 2. Deep Space Ambient Nebula Clouds (Slowly blending, soft, warm, and cosmic) */}
        <div className="absolute inset-0 w-full h-full filter blur-[120px] md:blur-[180px] opacity-100 transition-opacity duration-500">
          
          {/* Luminous Golden Star Nebula */}
          <motion.div
            animate={{
              scale: [1, 1.15, 0.95, 1],
              rotate: [0, 60, 120, 360],
              x: ["-5%", "10%", "-2%", "-5%"],
              y: ["-5%", "2%", "-8%", "-5%"],
            }}
            transition={{
              duration: 65,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[20%] left-[15%] w-[450px] h-[450px] md:w-[700px] md:h-[700px] rounded-full mix-blend-normal"
            style={{ backgroundColor: "var(--nebula-1)" }}
          />

          {/* Ethereal Crimson/Opal Deep Glow */}
          <motion.div
            animate={{
              scale: [0.95, 1.08, 1.02, 0.95],
              rotate: [360, 270, 90, 0],
              x: ["5%", "-5%", "2%", "5%"],
              y: ["2%", "-10%", "2%", "2%"],
            }}
            transition={{
              duration: 75,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full mix-blend-normal"
            style={{ backgroundColor: "var(--nebula-2)" }}
          />

          {/* Soft center drift light leak */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.4, 0.3],
              scale: [0.9, 1.1, 0.95, 0.9],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-1/3 left-1/3 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full mix-blend-normal"
            style={{ backgroundColor: "var(--nebula-3)" }}
          />
        </div>

        {/* 3. Cinematic Drifting Dust Particles (Smoothly flowing diagonally across screen) */}
        <div className="absolute inset-0 w-full h-full">
          {COSMIC_DUST.map((dust) => (
            <motion.div
              key={dust.id}
              initial={{ 
                opacity: 0, 
                x: 0, 
                y: 0, 
                scale: 0.6 
              }}
              animate={{
                opacity: [0, 0.65, 0.85, 0.3, 0],
                scale: [0.6, 1.15, 1.35, 0.9, 0.6],
                x: [0, 100, 200],
                y: [0, -120, -240],
              }}
              transition={{
                duration: dust.duration,
                repeat: Infinity,
                ease: "linear",
                delay: dust.delay,
              }}
              className="absolute rounded-full"
              style={{
                left: dust.left,
                top: dust.top,
                width: `${dust.size}px`,
                height: `${dust.size}px`,
                backgroundColor: dust.id % 3 === 0 ? "var(--fg-primary)" : "var(--accent)",
                boxShadow: "0 0 10px var(--accent)",
              }}
            />
          ))}
        </div>

        {/* 4. Elegant atmospheric lighting shimmer rays */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-obsidian/75 via-transparent to-obsidian/75 pointer-events-none" />
      </div>

      {/* SCROLLABLE LAYER: Falling shooting star streams across all sections */}
      <div className="absolute inset-x-0 top-0 w-full min-h-full pointer-events-none overflow-hidden z-0 select-none">
        
        {/* Definition of Glowing Gradients */}
        <svg className="absolute w-0 h-0" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Violet/Purple Falling Star Glow */}
            <linearGradient id="purple-stream-grad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="var(--accent)" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            
            {/* Secondary Violet/Deep Purple Falling Star Glow */}
            <linearGradient id="purple-stream-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="var(--accent)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* Shooting Stars / Diagonal Meteor Laser Streams Canvas */}
        <svg 
          className="absolute inset-0 w-full h-[450vh] min-h-full" 
          viewBox="0 0 1200 4500" 
          preserveAspectRatio="none"
          fill="none"
        >
          {/* --- PATHWAY 1: Hero Top-Right --- */}
          <motion.path
            d="M 1100, -100 L 100, 1500"
            stroke="url(#purple-stream-grad)"
            strokeWidth="1.5"
            strokeDasharray="200 600"
            initial={{ strokeDashoffset: 1600 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          />

          {/* --- PATHWAY 2: Hero Mid-Left to Skills --- */}
          <motion.path
            d="M 600, -100 L -100, 1200"
            stroke="url(#purple-stream-grad-2)"
            strokeWidth="1.2"
            strokeDasharray="160 540"
            initial={{ strokeDashoffset: 1400 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ repeat: Infinity, duration: 28, ease: "linear", delay: 4 }}
          />

          {/* --- PATHWAY 3: Skills to upper Projects --- */}
          <motion.path
            d="M 1150, 1300 L 50, 2900"
            stroke="url(#purple-stream-grad)"
            strokeWidth="1.4"
            strokeDasharray="180 580"
            initial={{ strokeDashoffset: 1550 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ repeat: Infinity, duration: 32, ease: "linear", delay: 8 }}
          />

          {/* --- PATHWAY 4: Alternate Middle Cascade --- */}
          <motion.path
            d="M 800, 1100 L -100, 2500"
            stroke="url(#purple-stream-grad-2)"
            strokeWidth="1.1"
            strokeDasharray="150 500"
            initial={{ strokeDashoffset: 1400 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear", delay: 12 }}
          />

          {/* --- PATHWAY 5: Projects to Contact --- */}
          <motion.path
            d="M 1200, 2700 L 100, 4300"
            stroke="url(#purple-stream-grad)"
            strokeWidth="1.6"
            strokeDasharray="220 580"
            initial={{ strokeDashoffset: 1600 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ repeat: Infinity, duration: 26, ease: "linear", delay: 2 }}
          />

          {/* --- PATHWAY 6: Contact/Footer Zone --- */}
          <motion.path
            d="M 900, 2900 L 100, 4500"
            stroke="url(#purple-stream-grad-2)"
            strokeWidth="1.3"
            strokeDasharray="170 530"
            initial={{ strokeDashoffset: 1450 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ repeat: Infinity, duration: 34, ease: "linear", delay: 16 }}
          />
        </svg>

      </div>
    </>
  );
}
