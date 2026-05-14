import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";

/**
 * 4-step clinical workflow. Each step has an icon, a number, and a label.
 * Per the UROP poster's "As Simple as 4 Steps" diagram.
 */
const steps = [
  {
    label: "Debride",
    sub: "Remove dead tissue from the wound bed",
    icon: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M8 28 L24 12 M16 12 H24 V20" />
        <path d="M10 30 L14 34 L18 30" />
      </svg>
    ),
  },
  {
    label: "Apply ANGel",
    sub: "Hydrogel + AN factor dressing",
    icon: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 18 H22 M22 14 V22 L28 20 V16 Z M28 18 H34" />
        <circle cx="36" cy="18" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Apply Matrix",
    sub: "Biodegradable temporizing matrix",
    icon: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="8" y="8" width="24" height="24" rx="2" />
        <path d="M8 16 H32 M8 24 H32 M16 8 V32 M24 8 V32" />
      </svg>
    ),
  },
  {
    label: "Wrap",
    sub: "Secure with dressing",
    icon: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 8 C12 8 10 16 14 20 C18 24 20 30 20 34" />
        <path d="M20 8 C28 8 30 16 26 20 C22 24 20 30 20 34" />
      </svg>
    ),
  },
];

export function ClinicalWorkflow({ className = "" }: { className?: string }) {
  return (
    <motion.ol
      variants={stagger(0.1, 0.12)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
    >
      {steps.map((s, i) => (
        <motion.li
          key={s.label}
          variants={fadeUp}
          className="group relative flex flex-col gap-3 rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/8 transition-colors hover:bg-white/[0.04]"
        >
          <span className="font-mono text-[10px] tracking-widest text-bone-400">
            STEP {String(i + 1).padStart(2, "0")}
          </span>
          <div className="text-angel-sky">{s.icon}</div>
          <div>
            <p className="font-display text-lg font-semibold">{s.label}</p>
            <p className="text-sm text-bone-300 mt-1 leading-snug">{s.sub}</p>
          </div>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="hidden lg:block absolute right-[-12px] top-1/2 -translate-y-1/2 text-bone-400/40"
            >
              →
            </span>
          )}
        </motion.li>
      ))}
    </motion.ol>
  );
}
