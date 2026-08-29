import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const GREETINGS = [
  "Hello",
  "Hola",
  "Bonjour",
  "ಹಲೋ",
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

const OPENING = ["Hello", "مرحبا", "Bonjour", "ಹಲೋ"] as const;
const SEQUENCE = [
  ...OPENING,
  ...GREETINGS.filter((g) => !(OPENING as readonly string[]).includes(g)),
];
const KANNADA_RANGE = /[\u0C80-\u0CFF]/;

function holdMs(index: number) {
  if (index < 4) return 1000;
  const progress = (index - 4) / Math.max(1, SEQUENCE.length - 5);
  return Math.round(180 - 100 * progress);
}

interface GreetingProps {
  onFinish: () => void;
}

export default function Greeting({ onFinish }: GreetingProps) {
  const [visible, setVisible] = useState(true);
  const [displayIndex, setDisplayIndex] = useState(0);
  const displayText = SEQUENCE[displayIndex];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let cycle: ReturnType<typeof setTimeout> | null = null;
    let endTimeout: ReturnType<typeof setTimeout> | null = null;
    let idx = 0;

    const scheduleNext = () => {
      cycle = setTimeout(() => {
        idx += 1;
        if (idx < SEQUENCE.length) {
          setDisplayIndex(idx);
          scheduleNext();
        } else {
          endTimeout = setTimeout(() => {
            onFinish();
            setVisible(false);
          }, 200);
        }
      }, holdMs(idx));
    };

    scheduleNext();

    return () => {
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
                key={`${displayIndex}-${displayText}`}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className={`text-center text-[clamp(2rem,9vw,5rem)] text-gold drop-shadow-[0_8px_24px_rgba(167,139,250,0.25)] ${
                  KANNADA_RANGE.test(displayText)
                    ? "font-kannada not-italic"
                    : "font-serif italic"
                }`}
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
