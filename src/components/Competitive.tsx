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
          Out of 6 competitors, ANGel is the most{" "}
          <span className="text-grad">cost efficient</span>
        </motion.h2>
      </motion.div>

      <div className="mt-16">
        <CompetitiveMatrix />
      </div>

      <div className="mt-16 flex justify-center">
        <ScrollCue label="Market" href="#market" />
      </div>
    </Section>
  );
}
