import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "../lib/motion";
import { VesselGrowth } from "../illustrations/VesselGrowth";

/**
 * Alternate hero — MCP-1 style "video background" treatment.
 * Since the YouTube reference can't be embedded as a true background,
 * we use a full-bleed version of the same VesselGrowth animation
 * scaled to cover the viewport. Text overlays on top with a dark scrim.
 *
 * Once a real .mp4 URL is provided, swap the <VesselGrowth/> for a <video>.
 */
export function HeroVideo() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-black flex items-end"
    >
      {/* Full-bleed background animation */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 scale-[1.4] translate-x-[10%] -translate-y-[10%]">
          <VesselGrowth origin="top-right" className="h-full w-full opacity-70" />
        </div>
        {/* dark scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Overlay text */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 pb-24 md:pb-32 pt-40">
        <motion.div
          variants={stagger(0.1, 0.08)}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.35em] text-angel-sky mb-8"
          >
            Liukocyte BioSciences
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(44px,8vw,120px)] leading-[0.9] tracking-tightest font-semibold"
          >
            Immune Innovation
            <br />
            for <span className="text-grad">Active Healing.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-lg md:text-xl text-bone-200 leading-relaxed"
          >
            An engineered bioactive hydrogel for enhanced angiogenesis in the
            wound bed.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-3"
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
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium ring-1 ring-white/20 hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Watch the Pitch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
