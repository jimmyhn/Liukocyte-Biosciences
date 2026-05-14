import { motion } from "framer-motion";
import { Section } from "./Section";
import { fadeUp, stagger } from "../lib/motion";
import { MarketGrowth } from "../illustrations/MarketGrowth";
import { ScrollCue } from "./ScrollCue";

const pillars = [
  {
    title: "Reimbursable",
    body: "Revenue structured through HCPCS / CPT billing codes — mirroring established competitors like Apligraf.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 26 H28 M6 24 V12 L16 6 L26 12 V24 M11 24 V16 H21 V24" />
      </svg>
    ),
  },
  {
    title: "Workflow-Ready",
    body: "Fits the existing workflow that surgeons, nurses, and physician assistants already use. No new training.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="16" cy="16" r="11" />
        <path d="M16 8 V16 L21 19" />
      </svg>
    ),
  },
  {
    title: "Margin to Scale",
    body: "Manufacturing at $260 vs. competitors at $10,000 creates strong margin — priced well below market rate.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 20 L12 12 L17 17 L28 6 M28 6 H22 M28 6 V12" />
      </svg>
    ),
  },
];

const targets = [
  "Plastic surgeons",
  "Wound care doctors",
  "Podiatrists",
  "Hospital procurement",
  "Burn units",
  "Outpatient wound clinics",
];

export function Market() {
  return (
    <Section id="market" num="05" label="Market">
      <motion.div
        variants={stagger(0.05, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(36px,5vw,72px)] leading-[1.02] tracking-tightest font-semibold"
        >
          $10 billion market by 2030.
          <br />
          <span className="text-grad">ANGel is ready.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-bone-300 max-w-2xl"
        >
          The wound care market is oversaturated with overpriced, passive
          products. ANGel enters as a clinically superior, dramatically more
          affordable alternative.
        </motion.p>
      </motion.div>

      {/* Growth chart */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-16 rounded-3xl bg-white/[0.015] ring-1 ring-white/8 p-6 md:p-10"
      >
        <MarketGrowth className="w-full h-auto" />
      </motion.div>

      {/* 3 pillars */}
      <motion.div
        variants={stagger(0.05, 0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {pillars.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            className="rounded-2xl bg-white/[0.02] ring-1 ring-white/8 p-7 transition-colors hover:bg-white/[0.04]"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-angel-blue/15 text-angel-sky ring-1 ring-angel-blue/30">
              {p.icon}
            </div>
            <p className="mt-5 font-display text-lg font-semibold">{p.title}</p>
            <p className="mt-2 text-sm text-bone-400 leading-relaxed">
              {p.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Targets */}
      <motion.div
        variants={stagger(0.04, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-16"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400 mb-4"
        >
          Go-to-market targets
        </motion.p>
        <div className="flex flex-wrap gap-2.5">
          {targets.map((t) => (
            <motion.span
              key={t}
              variants={fadeUp}
              className="rounded-full px-4 py-2 text-sm ring-1 ring-white/12 text-bone-200 hover:text-angel-sky hover:ring-angel-sky transition-colors"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <div className="mt-16 flex justify-center">
        <ScrollCue label="Team" href="#team" />
      </div>
    </Section>
  );
}
