import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "../lib/motion";
import { VesselGrowth } from "../illustrations/VesselGrowth";
import { Macrophages } from "../illustrations/Macrophages";
import { ScrollCue } from "./ScrollCue";

export function HeroSvg() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-black flex items-center"
    >
      {/* Vessel-regrowth illustration anchored to top-right corner */}
      <div
        className="pointer-events-none absolute -top-20 -right-32 md:right-0 md:top-0 w-[55vw] max-w-[820px] aspect-square opacity-90"
        aria-hidden="true"
      >
        <VesselGrowth origin="top-right" className="h-full w-full" />
      </div>

      {/* M2 macrophages — full-height right panel; particles ascend to vessels */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[55vw] max-w-[720px]"
        aria-hidden="true"
      >
        <Macrophages className="h-full w-full" />
      </div>

      {/* Editorial typographic hero — same px/max-w pattern as Section */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 pt-32">
        <motion.div
          variants={stagger(0.1, 0.08)}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.35em] text-angel-sky mb-10"
          >
            Liukocyte BioSciences · UC Irvine
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(48px,9vw,140px)] leading-[0.88] tracking-tightest font-semibold"
          >
            <span className="block">Immune</span>
            <span className="block text-grad">Innovation</span>
            <span className="block">for Active</span>
            <span className="block">Healing.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-xl text-lg md:text-xl text-bone-300 leading-relaxed"
          >
            ANGel is an engineered bioactive hydrogel that uses your body's own
            healing intelligence to rebuild wounds — not just cover them.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center gap-3"
          >
            <a
              href="#needs"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-bone-100"
            >
              Discover ANGel
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#pitch"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium ring-1 ring-white/15 hover:bg-white/5 transition-colors"
            >
              Watch the Pitch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue — absolute, bottom-center of hero */}
      <ScrollCue
        label="The Need"
        href="#needs"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      />
    </section>
  );
}
