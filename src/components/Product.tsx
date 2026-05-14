import { motion } from "framer-motion";
import { Section } from "./Section";
import { fadeUp, stagger } from "../lib/motion";
import { DualSyringe } from "../illustrations/DualSyringe";
import { SkinCrossSection } from "../illustrations/SkinCrossSection";
import { ClinicalWorkflow } from "../illustrations/ClinicalWorkflow";

const features = [
  {
    heading: "PEG-NHS-PLL composition",
    body: "Synthetic chemistry that's antimicrobial by design and ~38× cheaper to manufacture than competing biologics.",
  },
  {
    heading: "Dual-barrel syringe delivery",
    body: "Inject into tunneling wounds or spread across large surfaces — one applicator, every clinical workflow.",
  },
  {
    heading: "Neutrophil-derived AN factor",
    body: "Healing factors from your own immune cells shift the wound from inflammation to active repair.",
  },
  {
    heading: "Macrophage activation",
    body: "Triggers M1 → M2 transition, driving organized skin formation, reduced scarring, and rapid vascularization.",
  },
];

const indications = [
  "Burns",
  "Chronic Wounds",
  "Skin Graft Prep",
  "Full Thickness Wounds",
];

export function Product() {
  return (
    <Section id="product" num="02" label="Product">
      {/* Headline */}
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
          An engineered bioactive hydrogel
          <br />
          <span className="text-grad">for enhanced angiogenesis.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-bone-300 max-w-2xl"
        >
          Healing factors from your own immune cells, delivered directly into
          the wound bed — shifting the wound from inflammation to repair.
        </motion.p>
      </motion.div>

      {/* Dual-barrel syringe + features */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl bg-white/[0.02] ring-1 ring-white/8 p-8 md:p-12"
        >
          <DualSyringe className="w-full h-auto" />
          <p className="mt-6 text-center text-xs font-mono uppercase tracking-[0.3em] text-bone-400">
            Hydrogel + AN factor · One applicator
          </p>
        </motion.div>

        <motion.dl
          variants={stagger(0.05, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          {features.map((f) => (
            <motion.div key={f.heading} variants={fadeUp} className="group">
              <dt className="font-display text-xl font-semibold transition-colors group-hover:text-grad">
                {f.heading}
              </dt>
              <dd className="mt-1.5 text-sm text-bone-400 leading-relaxed">
                {f.body}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      {/* Skin cross-section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-24 rounded-3xl bg-white/[0.015] ring-1 ring-white/8 p-6 md:p-10"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400 mb-2">
          In the wound bed
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-semibold mb-6">
          From inflammation to <span className="text-grad">vascularization</span>.
        </h3>
        <SkinCrossSection className="w-full h-auto" />
      </motion.div>

      {/* Workflow */}
      <div className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h3 className="font-display text-2xl md:text-3xl font-semibold">
            As simple as <span className="text-grad">four steps</span>.
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-bone-400">
            Clinical workflow
          </p>
        </div>
        <ClinicalWorkflow />
      </div>

      {/* Indication pills */}
      <motion.div
        variants={stagger(0.05, 0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-20 flex flex-wrap justify-center gap-2.5"
      >
        <motion.span
          variants={fadeUp}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400 self-center mr-2"
        >
          For
        </motion.span>
        {indications.map((i) => (
          <motion.span
            key={i}
            variants={fadeUp}
            className="rounded-full px-4 py-2 text-sm ring-1 ring-white/15 hover:ring-angel-sky hover:text-angel-sky transition-colors"
          >
            {i}
          </motion.span>
        ))}
      </motion.div>
    </Section>
  );
}
