import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";

/**
 * The 4 ways existing wound care products fall short.
 * Mirrors the UROP "Existing Solutions Fall Short" callout block.
 */
const items = [
  {
    name: "High Cost",
    detail: "Up to $10,000 per unit for leading biologics.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="16" cy="16" r="10" />
        <path d="M16 10 V22 M13 13 C13 11 19 11 19 13.5 C19 16 13 16 13 18.5 C13 21 19 21 19 19" />
      </svg>
    ),
  },
  {
    name: "Passive Healing",
    detail: "Cover the wound but do not activate repair biology.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="4" y="10" width="24" height="12" rx="2" />
        <path d="M8 16 H24" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    name: "Long Wait Times",
    detail: "Frequent re-application or slow vascularization.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="16" cy="16" r="11" />
        <path d="M16 9 V16 L21 19" />
      </svg>
    ),
  },
  {
    name: "Poor Vascularization",
    detail: "Wound bed stays starved of new blood vessels.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 26 C10 22 12 16 16 16 C20 16 22 22 27 26" />
        <path d="M9 16 C9 10 13 6 16 6 C19 6 23 10 23 16" strokeDasharray="2 3" />
      </svg>
    ),
  },
];

export function ExistingFallShort({ className = "" }: { className?: string }) {
  return (
    <motion.div
      variants={stagger(0.05, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`grid grid-cols-2 lg:grid-cols-4 gap-3 ${className}`}
    >
      {items.map((it) => (
        <motion.div
          key={it.name}
          variants={fadeUp}
          className="rounded-2xl bg-white/[0.02] p-5 ring-1 ring-white/8"
        >
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-angel-orange/12 text-angel-orange ring-1 ring-angel-orange/30">
            {it.icon}
          </div>
          <p className="mt-4 font-display text-base font-semibold">{it.name}</p>
          <p className="mt-1 text-xs text-bone-400 leading-snug">{it.detail}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
