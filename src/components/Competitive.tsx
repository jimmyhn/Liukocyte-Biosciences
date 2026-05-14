import { motion } from "framer-motion";
import { Section } from "./Section";
import { fadeUp, stagger } from "../lib/motion";
import { CompetitiveMatrix } from "../illustrations/CompetitiveMatrix";
import { ScrollCue } from "./ScrollCue";

export function Competitive() {
  return (
    <Section id="competition" num="04" label="Competition">
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
          5 key factors. 6 competitors.
          <br />
          <span className="text-grad">One winner.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-bone-300 max-w-2xl"
        >
          ANGel is the only product that scores positively across every factor —
          and the only one that's both immune-activating and antimicrobial.
        </motion.p>
      </motion.div>

      <div className="mt-16">
        <CompetitiveMatrix />
      </div>

      {/* Cost callout */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 items-center gap-6 rounded-3xl bg-white/[0.02] ring-1 ring-white/8 p-10"
      >
        <div className="text-center md:text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400 mb-2">
            Competitors
          </p>
          <p className="font-display text-5xl md:text-6xl font-semibold text-bone-300 line-through decoration-angel-orange decoration-2">
            $10,000
          </p>
          <p className="mt-2 text-xs text-bone-400">per unit to manufacture</p>
        </div>
        <p className="font-display text-xl text-center text-bone-400 italic">
          vs.
        </p>
        <div className="text-center md:text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400 mb-2">
            ANGel
          </p>
          <p className="font-display text-5xl md:text-6xl font-semibold text-grad">
            $260
          </p>
          <p className="mt-2 text-xs text-bone-400">per unit to manufacture</p>
        </div>
      </motion.div>

      <div className="mt-16 flex justify-center">
        <ScrollCue label="Market" href="#market" />
      </div>
    </Section>
  );
}
