import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const GREETINGS = [
  "Hello",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "Привет",
  "Привет",
  "مرحبا",
  "नमस्ते",
  "こんにちは",
  "你好",
  "안녕하세요",
  "Hej",
  "Salve",
  "Sziasztok",
  "Szia",
  "שלום",
  "नमस्कार",
  "Sawubona",
  "Sveiki",
  "Xin chào",
  "Marhaba",
  "Kia ora",
  "Yassas",
  "Olá",
];

const FIRST_TWO = ["Hello", "مرحبا"];
const ALL_LANGUAGES = GREETINGS.filter(
  (g) => g !== FIRST_TWO[0] && g !== FIRST_TWO[1],
);
const SECOND_PHASE_DURATION = 3000;

interface GreetingProps {
  onFinish: () => void;
}

export default function Greeting({ onFinish }: GreetingProps) {
  const [visible, setVisible] = useState(true);
  const [displayText, setDisplayText] = useState(FIRST_TWO[0]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let cycle: ReturnType<typeof setTimeout> | null = null;
    let endTimeout: ReturnType<typeof setTimeout> | null = null;

    const phase1 = setTimeout(() => {
      setDisplayText(FIRST_TWO[1]);
    }, 1000);

    const phase2 = setTimeout(() => {
      const minPer = 80;
      const maxPer = 180;
      const steps = ALL_LANGUAGES.length;
      let idx = 0;
      setDisplayText(ALL_LANGUAGES[idx]);

      const scheduleNext = () => {
        idx += 1;
        if (idx < ALL_LANGUAGES.length) {
          setDisplayText(ALL_LANGUAGES[idx]);
          const progress = idx / Math.max(1, steps - 1);
          const per = Math.round(maxPer - (maxPer - minPer) * progress);
          cycle = setTimeout(scheduleNext, per);
        } else {
          endTimeout = setTimeout(() => {
            onFinish();
            setVisible(false);
          }, 200);
        }
      };

      cycle = setTimeout(scheduleNext, Math.round((maxPer + minPer) / 2));
    }, 2000);

    return () => {
      clearTimeout(phase1);
      clearTimeout(phase2);
      if (cycle) clearTimeout(cycle);
      if (endTimeout) clearTimeout(endTimeout);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[900] flex items-center justify-center bg-obsidian/98"
        >
          <motion.div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={displayText}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="text-center text-[clamp(2rem,9vw,5rem)] font-serif italic text-gold drop-shadow-[0_8px_24px_rgba(167,139,250,0.25)]"
              >
                {displayText}
              </motion.h1>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
