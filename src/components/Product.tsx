import { motion } from "framer-motion";
import { Section } from "./Section";
import { fadeUp, stagger } from "../lib/motion";
import { DualSyringe } from "../illustrations/DualSyringe";
import { SkinCrossSection } from "../illustrations/SkinCrossSection";
import { ScrollCue } from "./ScrollCue";

const workflowSteps = [
  "Debridement & Sterilization",
  "Eject ANGel onto wound & wait until it solidifies",
  "Cover with any non-adherent dressing",
  "Seal with film dressing",
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
          ANGel <span className="text-grad">promotes</span> angiogenesis by working 
          {" "}<span className="text-grad">with</span> your body's 
          {" "}<span className="text-grad">own</span> immune system.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-bone-300 w-[135%] max-w-none"
        >
          Macrophages are the equivalent of your body's custodian. They consume anything that they think is foreign, dead, or dangerous. When our hydrogel is applied to a wound, 
          macrophages will "eat" this foriegn material, in which dead neutrophil factors are embedded in as well. When this happens, it promotes macrophages to send anti-inflammatory signals that 
          will signal other macrophages and other immune cells who are already in an inflammatory state to become pro-angiogenic. Thus ANGel can accelerate the healing process for physcians 
          and patients alike.
        </motion.p>
      </motion.div>

      {/* Dual-barrel syringe + workflow */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT — syringe module */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl bg-white/[0.02] ring-1 ring-white/8 p-8 md:p-10 flex flex-col items-center"
        >
          <DualSyringe className="w-full h-auto" />
          <p className="mt-5 text-center text-base md:text-lg text-bone-300 leading-snug max-w-xs">
            Once ejected out, reagent will mix and hydrogel will{" "}
            <span className="text-grad font-semibold">solidify in 5–10 seconds.</span>
          </p>
        </motion.div>

        {/* RIGHT — workflow steps */}
        <motion.div
          variants={stagger(0.05, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col justify-center h-full"
        >
          <motion.h3
            variants={fadeUp}
            className="font-display text-2xl md:text-3xl font-semibold leading-snug"
          >
            <span className="text-grad">Seamlessly</span> integrates with
            physicians&apos; workflows, in 4 steps.
          </motion.h3>
          <motion.ol variants={stagger(0.05, 0.1)} className="mt-8 space-y-5">
            {workflowSteps.map((step, i) => (
              <motion.li
                key={step}
                variants={fadeUp}
                className="flex items-start gap-4"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-angel-blue/20 ring-1 ring-angel-blue/40 flex items-center justify-center font-mono text-sm font-semibold text-angel-sky">
                  {i + 1}
                </span>
                <span className="text-base md:text-lg text-bone-200 leading-snug pt-0.5">
                  {step}
                </span>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
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

      <div className="mt-16 flex justify-center">
        <ScrollCue label="Competition" href="#competition" />
      </div>
    </Section>
  );
}
