import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "../lib/motion";
import { VesselGrowth } from "../illustrations/VesselGrowth";

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

      {/* Editorial typographic hero */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 pt-40 pb-24 md:pb-32">
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
            Liukocyte BioSciences · UC Irvine BME
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
              href="#product"
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

        {/* Stat strip along the bottom */}
        <motion.dl
          variants={stagger(0.6, 0.12)}
          initial="hidden"
          animate="show"
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 max-w-4xl"
        >
          {[
            ["160K", "Skin grafts / yr in the U.S."],
            ["1 in 4", "Graft procedures that fail"],
            ["$32B", "Chronic wound burden, U.S."],
            ["$260", "Mfg cost vs $10K competitors"],
          ].map(([num, lbl]) => (
            <motion.div key={num} variants={fadeUp}>
              <dt className="font-display text-3xl md:text-4xl font-semibold text-grad">
                {num}
              </dt>
              <dd className="mt-1 text-xs md:text-sm text-bone-400 leading-tight">
                {lbl}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      {/* hairline divider at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </section>
  );
}
