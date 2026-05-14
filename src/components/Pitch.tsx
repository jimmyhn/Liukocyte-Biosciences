import { motion } from "framer-motion";
import { Section } from "./Section";
import { fadeUp, stagger } from "../lib/motion";

export function Pitch() {
  return (
    <Section id="pitch" num="07" label="Pitch">
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
          The <span className="text-grad">ANGel pitch.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-bone-300 max-w-2xl"
        >
          Two minutes on the science, the market, and why ANGel is the only
          product that delivers all five.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12 relative rounded-3xl overflow-hidden ring-1 ring-white/10 bg-ink-900 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      >
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/315vUUdaZY8"
            title="Liukocyte Biosciences ANGel Pitch"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </motion.div>
    </Section>
  );
}
