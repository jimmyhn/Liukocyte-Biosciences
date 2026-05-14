import { motion } from "framer-motion";
import { Section } from "./Section";
import { fadeUp, stagger } from "../lib/motion";
import { HealingPhases } from "../illustrations/HealingPhases";
import { ExistingFallShort } from "../illustrations/ExistingFallShort";

const stats = [
  { num: "160,000", label: "Skin grafts performed annually in the U.S." },
  { num: "1 in 4",  label: "Graft procedures fail on average." },
  { num: "$32B",    label: "Annual U.S. economic burden of chronic wounds." },
];

export function Needs() {
  return (
    <Section id="needs" num="03" label="The Need">
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
          Wounds stuck in inflammation
          <br />
          <span className="text-grad">can't heal themselves.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-bone-300 max-w-2xl"
        >
          Passive protection isn't enough. Wounds need activation — angiogenesis
          driven by M2 macrophage signaling. Chronic inflammation blocks that
          shift, and the wound bed stays starved of new vessels.
        </motion.p>
      </motion.div>

      {/* Stats strip */}
      <motion.dl
        variants={stagger(0.05, 0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {stats.map((s) => (
          <motion.div
            key={s.num}
            variants={fadeUp}
            className="rounded-2xl bg-white/[0.02] ring-1 ring-white/8 p-8 transition-transform hover:-translate-y-1"
          >
            <dt className="font-display text-4xl md:text-5xl font-semibold text-grad">
              {s.num}
            </dt>
            <dd className="mt-3 text-sm text-bone-300 leading-relaxed">
              {s.label}
            </dd>
          </motion.div>
        ))}
      </motion.dl>

      {/* Healing phase pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className="mt-20 rounded-3xl bg-white/[0.015] ring-1 ring-white/8 p-8 md:p-12"
      >
        <div className="flex flex-wrap items-end justify-between gap-3 mb-10">
          <h3 className="font-display text-2xl md:text-3xl font-semibold">
            The four phases of healing —
            <br className="hidden md:block" />
            <span className="text-grad"> ANGel reignites the path.</span>
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-bone-400">
            M1 → M2 macrophage shift
          </p>
        </div>
        <HealingPhases />
      </motion.div>

      {/* Existing solutions fall short */}
      <div className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <h3 className="font-display text-2xl md:text-3xl font-semibold">
            Existing products <span className="text-grad">fall short.</span>
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-bone-400">
            What's missing today
          </p>
        </div>
        <ExistingFallShort />
      </div>
    </Section>
  );
}
