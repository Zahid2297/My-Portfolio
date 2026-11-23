import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WHATSAPP_NUMBER } from "../config";

const INTENTS = [
  "A new website",
  "A web app",
  "Freelance help",
  "A full-time role",
  "A collaboration",
  "Something else",
] as const;

const TIMELINES = [
  "As soon as possible",
  "This month",
  "In the next few months",
  "Just exploring",
] as const;

const BUDGETS = [
  "Not sure yet",
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000+",
  "Hiring / salary",
] as const;

interface InquirySheetProps {
  open: boolean;
  onClose: () => void;
}

function useIsDesktop() {
  const query = "(min-width: 768px)";
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : true,
  );

  useEffect(() => {
    const read = () => window.matchMedia(query).matches;
    const onChange = () => setIsDesktop(read());
    const media = window.matchMedia(query);
    onChange();
    media.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  return isDesktop;
}

const fieldClass =
  "inquiry-field w-full appearance-none bg-transparent border border-gold/20 focus:border-gold px-3 py-3 text-sm text-cream focus:outline-none transition-colors font-sans";

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/60">
        {label}
      </span>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldClass} cursor-none pr-10`}
          required={required}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold/70 text-xs">
          ▾
        </span>
      </div>
    </label>
  );
}

export default function InquirySheet({ open, onClose }: InquirySheetProps) {
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const [name, setName] = useState("");
  const [intent, setIntent] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState<string>(BUDGETS[0]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !intent || !timeline) {
      setError("Name, what you need, and timeline are required.");
      return;
    }

    const message = [
      "Hi Zahed, I have an inquiry from your portfolio.",
      `Name: ${name.trim()}`,
      `Looking for: ${intent}`,
      `Timeline: ${timeline}`,
      `Budget: ${budget}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="inquiry-root"
          className="fixed inset-0 z-[400]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close inquiry"
            className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm cursor-none"
            onClick={onClose}
          />

          <motion.aside
            key={isDesktop ? "side" : "bottom"}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={
              reduceMotion
                ? { x: 0, y: 0 }
                : isDesktop
                  ? { x: "100%", y: 0 }
                  : { x: 0, y: "100%" }
            }
            animate={{ x: 0, y: 0 }}
            exit={
              reduceMotion
                ? { x: 0, y: 0 }
                : isDesktop
                  ? { x: "100%", y: 0 }
                  : { x: 0, y: "100%" }
            }
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            style={{ willChange: "transform" }}
            className={`absolute flex flex-col border-gold/20 bg-obsidian text-cream shadow-2xl ${
              isDesktop
                ? "right-0 top-0 h-full w-[min(420px,100%)] border-l"
                : "inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl border-t"
            }`}
          >
            {!isDesktop && (
              <div className="flex justify-center pt-3" aria-hidden="true">
                <span className="h-1 w-10 rounded-full bg-gold/30" />
              </div>
            )}

            <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold/70">
                  Inquiry
                </p>
                <h2
                  id={titleId}
                  className="mt-1 font-serif text-3xl font-light text-cream"
                >
                  Tell me what you{" "}
                  <span className="italic font-bold text-gold">need</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-1 flex h-8 w-8 items-center justify-center border border-gold/25 text-gold cursor-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 pb-6 select-text"
            >
              <label className="flex flex-col gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/60">
                  Name
                </span>
                <input
                  autoFocus
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className={`${fieldClass} cursor-text`}
                  required
                />
              </label>

              <SelectField
                label="What do you need?"
                name="intent"
                value={intent}
                onChange={setIntent}
                options={INTENTS}
                placeholder="Choose one"
                required
              />

              <SelectField
                label="Timeline"
                name="timeline"
                value={timeline}
                onChange={setTimeline}
                options={TIMELINES}
                placeholder="Choose one"
                required
              />

              <SelectField
                label="Budget"
                name="budget"
                value={budget}
                onChange={setBudget}
                options={BUDGETS}
              />

              {error && (
                <p className="font-mono text-[10px] tracking-wide text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-auto inline-flex items-center justify-center border border-gold bg-gold px-6 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-obsidian cursor-none transition-opacity hover:opacity-90"
              >
                Continue on WhatsApp
              </button>
              <p className="text-center font-sans text-[11px] leading-relaxed text-cream/45">
                Nothing is sent to a server. This opens WhatsApp with your answers already filled in.
              </p>
            </form>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
