import { motion } from "framer-motion";
import { Section } from "./Section";
import { fadeUp, stagger } from "../lib/motion";
import { HealingPhases } from "../illustrations/HealingPhases";
import { ExistingFallShort } from "../illustrations/ExistingFallShort";
import { ScrollCue } from "./ScrollCue";

/** Icon: 4 person silhouettes — first one accented (orange), rest muted. */
function FourPeopleIcon({ className = "" }: { className?: string }) {
  const person = (
    <g>
      <circle cx="20" cy="14" r="9" />
      <path d="M5,60 C5,44 11,32 20,32 C29,32 35,44 35,60 L35,72 L5,72 Z" />
    </g>
  );
  return (
    <svg
      viewBox="0 0 200 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="#F58A4B">
        <g transform="translate(0,0)">{person}</g>
      </g>
      <g fill="#5BB0DA" opacity="0.85">
        <g transform="translate(50,0)">{person}</g>
        <g transform="translate(100,0)">{person}</g>
        <g transform="translate(150,0)">{person}</g>
      </g>
    </svg>
  );
}

/** Icon: 3 ascending bars with an upward arrow and a dollar sign. */
function GrowthBarsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="30"  y="70" width="22" height="30" fill="#5BB0DA" />
      <rect x="68"  y="50" width="22" height="50" fill="#5BB0DA" />
      <rect x="106" y="28" width="22" height="72" fill="#5BB0DA" />
      <path
        d="M20,88 L60,68 L80,80 L100,52 L120,62 L160,22"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M148,18 L162,18 L162,32"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="158"
        y="86"
        fontSize="32"
        fontWeight="700"
        fill="#5BB0DA"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        $
      </text>
    </svg>
  );
}

export function Needs() {
  return (
    <Section id="needs" num="03" label="The Need">
      <motion.div
        variants={stagger(0.05, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl" 
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(42px,6vw,84px)] leading-[1.02] tracking-tightest font-semibold"
        >
          <span className="text-grad">Delayed</span> tissue regeneration causes
          <br />
          <span className="text-grad">high</span> failure chance for <span className="text-grad">skin grafts</span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={stagger(0.05, 0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-16" 
      >
        {/* LEFT — 160,000 Skin Grafts */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center text-center group"
        >
          <div className="h-[180px] flex items-center justify-center">
            <div className="font-display text-8xl md:text-9xl font-semibold text-angel-orange leading-none tracking-tighter">
              160k
            </div>
          </div>
          <div className="mt-8 font-display text-3xl md:text-4xl font-semibold text-grad-cool">
            Skin Grafts
          </div>
          <p className="mt-5 text-base md:text-lg text-bone-300 leading-relaxed max-w-[320px]">
            Performed annually in the US treating burns and chronic wounds.
          </p>
        </motion.div>

        {/* MIDDLE — 1 in 4 Fail */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center text-center group"
        >
          <div className="h-[180px] flex items-center justify-center">
            <FourPeopleIcon className="w-full max-w-[300px] h-auto" />
          </div>
          <div className="mt-8 font-display text-3xl md:text-4xl font-semibold text-angel-orange leading-none">
            1 in 4 Fail
          </div>
          <p className="mt-5 text-base md:text-lg text-bone-300 leading-relaxed max-w-[320px]">
            Procedures fail on average—leaving wounds open to chronic complications.
          </p>
        </motion.div>

        {/* RIGHT — $32 Billion Burden */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center text-center group"
        >
          <div className="h-[180px] flex items-center justify-center">
            <GrowthBarsIcon className="w-full max-w-[280px] h-auto" />
          </div>
          <div className="mt-8 font-display text-3xl md:text-4xl font-semibold text-angel-orange leading-none">
            $32B
          </div>
          <p className="mt-5 text-base md:text-lg text-bone-300 leading-relaxed max-w-[320px]">
            Annual economic burden in the US from failed graft procedures.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className="mt-20 rounded-3xl bg-white/[0.015] ring-1 ring-white/8 p-8 md:p-12"
      >
        <div className="mb-10">
          <h3 className="font-display text-2xl md:text-3xl font-semibold">
            Angiogenesis &amp; Why It&apos;s{" "}
            <span className="text-angel-orange">Delayed</span>
          </h3>
          <p className="mt-3 text-base text-bone-300 max-w-5x1">
            Angiogenesis is the process of new blood vessel formation, promoted by anti-inflammatory M2 macrophage signaling.
            Chronic inflammation prevents pro-inflammatory M1 macrophages to effectively differentiate into their pro-regenerative M2 state.
            When angiogenesis is prolonged, the risk of infection increases and likelihood of healing is decreases.
          </p>
        </div>
        <HealingPhases />
      </motion.div>

      <div className="mt-32">
        <div className="mb-10">
          <h3 className="font-display text-3xl md:text-4xl font-semibold">
            Various products are used for skin graft prep, but they{" "}
            <span className="text-grad">fall short</span> in:
          </h3>
        </div>
        <ExistingFallShort />
      </div>

      <div className="mt-24 flex justify-center">
        <ScrollCue label="Product" href="#product" />
      </div>
    </Section>
  );
}