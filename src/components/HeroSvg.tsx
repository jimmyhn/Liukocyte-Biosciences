import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VesselGrowth } from "../illustrations/VesselGrowth";
import { Macrophages } from "../illustrations/Macrophages";
import { ScrollCue } from "./ScrollCue";

const ease = [0.22, 1, 0.36, 1] as const;

const lineV = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const fadeV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function HeroSvg() {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const onRestart = () => setAnimKey((k) => k + 1);
    window.addEventListener("angel:restart", onRestart);
    return () => window.removeEventListener("angel:restart", onRestart);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-black"
    >
      {/* === ILLUSTRATIONS — sit directly on the section so their corners
              reach the viewport edges (beyond the max-w-7xl content margins) === */}

      {/* Macrophage cluster — top-left corner, particles drift diagonally to bottom-right */}
      <div
        key={`cluster-${animKey}`}
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        aria-hidden="true"
      >
        <Macrophages className="h-full w-full" />
      </div>

      {/* Vessels — bottom-right, full-bleed (corner glow at viewport corner) */}
      <div
        key={`vessels-${animKey}`}
        className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-full w-full max-w-[1100px] md:block"
        aria-hidden="true"
      >
        <VesselGrowth origin="bottom-right" className="h-full w-full" />
      </div>

      {/* === DARK BACKDROP behind text for readability === */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-black/85 via-black/55 to-transparent"
      />

      {/* === TEXT — bound to max-w-7xl, padding aligned with sections === */}
      <div className="relative z-10 mx-auto h-full min-h-[100svh] w-full max-w-7xl px-6 md:px-10">
        <motion.div
          key={`text-${animKey}`}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { delayChildren: 0.3 } } }}
          className="relative max-w-3xl pt-[180px] pb-12 md:pt-44"
        >
          <motion.p
            variants={fadeV}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="mb-8 font-mono text-xs uppercase tracking-[0.35em] text-angel-sky"
          >
            Liukocyte BioSciences · UC Irvine
          </motion.p>

          <h1 className="font-display font-semibold leading-[0.92] tracking-tightest text-[clamp(38px,7vw,96px)]">
            {["Immune", "Innovation", "for Active", "Healing."].map(
              (line, i) => (
                <motion.span
                  key={line}
                  variants={lineV}
                  transition={{ duration: 0.7, ease, delay: 0.6 + i * 0.35 }}
                  className={`block ${line === "Innovation" ? "text-grad" : ""}`}
                >
                  {line}
                </motion.span>
              ),
            )}
          </h1>

          <motion.p
            variants={fadeV}
            transition={{ duration: 0.6, ease, delay: 2.3 }}
            className="mt-8 max-w-xl text-base md:text-lg text-bone-300 leading-relaxed"
          >
            ANGel is an engineered bioactive hydrogel that uses your body's own
            healing intelligence to rebuild wounds — not just cover them.
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <motion.a
              variants={fadeV}
              transition={{ duration: 0.55, ease, delay: 2.8 }}
              href="#product"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-bone-100"
            >
              Discover ANGel
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
            <motion.a
              variants={fadeV}
              transition={{ duration: 0.55, ease, delay: 3.2 }}
              href="#pitch"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium ring-1 ring-white/15 hover:bg-white/5 transition-colors"
            >
              Watch the Pitch
            </motion.a>
          </div>
        </motion.div>
      </div>

      <ScrollCue
        label="The Need"
        href="#needs"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      />
    </section>
  );
}
