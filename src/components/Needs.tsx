import { motion } from "framer-motion";
import { Section } from "./Section";
import { fadeUp, stagger } from "../lib/motion";
import { HealingPhases } from "../illustrations/HealingPhases";
import { ExistingFallShort } from "../illustrations/ExistingFallShort";
import { ScrollCue } from "./ScrollCue";

/** Icon: 4 person silhouettes — first one accented (orange), rest muted. */
function FourPeopleIcon({ className = "" }: { className?: string }) {
  // Single person silhouette path (head + body)
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
      {/* Baseline */}
      <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Three orange bars, ascending */}
      <rect x="30"  y="70" width="22" height="30" fill="#5BB0DA" />
      <rect x="68"  y="50" width="22" height="50" fill="#5BB0DA" />
      <rect x="106" y="28" width="22" height="72" fill="#5BB0DA" />
      {/* Upward arrow trending across the bars */}
      <path
        d="M20,88 L60,68 L80,80 L100,52 L120,62 L160,22"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrowhead */}
      <path
        d="M148,18 L162,18 L162,32"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dollar sign — top-left, signifying rising cost */}
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
        className="max-w-4xl"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(36px,5vw,72px)] leading-[1.02] tracking-tightest font-semibold"
        >
          <span className="text-grad">Delayed</span> tissue regeneration causes
          <br />
          <span className="text-grad">high</span> failure chance for <span className="text-grad">skin grafts</span>
        </motion.h2>
      </motion.div>

      {/* Stats — spacing between heading and stats controlled by mt-14 below */}
      <motion.div
        variants={stagger(0.05, 0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* LEFT — 160,000 Skin Grafts (text-only) */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl bg-white/[0.02] p-8 transition-transform hover:-translate-y-1 flex flex-col"
        >
          <div className="font-display text-5xl md:text-6xl font-semibold text-angel-orange leading-none">
            160,000
          </div>
          <div className="mt-3 font-display text-2xl md:text-3xl font-semibold text-bone-100">
            Skin Grafts
          </div>
          <p className="mt-4 text-sm md:text-base text-bone-300 leading-relaxed">
            Performed annually in the US treating burns, chronic wounds,
            traumatic injuries, and post-surgical defects.
          </p>
        </motion.div>

        {/* MIDDLE — 1 in 4 with 4-people graphic */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl bg-white/[0.02] p-8 transition-transform hover:-translate-y-1 flex flex-col items-center text-center"
        >
          <FourPeopleIcon className="w-full max-w-[220px] h-auto" />
          <div className="mt-5 font-display text-4xl md:text-5xl font-semibold text-angel-orange leading-none">
            1 in 4
          </div>
          <p className="mt-4 text-sm md:text-base text-bone-300 leading-relaxed">
            Skin graft procedures fail on average — leaving wounds open to
            chronic complications.
          </p>
        </motion.div>

        {/* RIGHT — $32 Billion with growth bars */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl bg-white/[0.02] p-8 transition-transform hover:-translate-y-1 flex flex-col items-center text-center text-bone-100"
        >
          <GrowthBarsIcon className="w-full max-w-[220px] h-auto" />
          <div className="mt-5 font-display text-4xl md:text-5xl font-semibold text-angel-orange leading-none">
            $32 Billion
          </div>
          <p className="mt-4 text-sm md:text-base text-bone-300 leading-relaxed">
            Annual economic burden in the US from chronic wounds and failed
            graft procedures.
          </p>
        </motion.div>
      </motion.div>

      {/* Healing phase pipeline */}
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
          <p className="mt-3 text-base text-bone-300 max-w-2xl">
            Wound healing follows four sequential phases. When macrophages fail to
            shift from the inflammatory M1 state to the regenerative M2 state,
            the process stalls — new blood vessels never form, and the graft
            has no foundation to take hold.
          </p>
        </div>
        <HealingPhases />
      </motion.div>

      {/* Existing solutions fall short */}
      <div className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <h3 className="font-display text-2xl md:text-3xl font-semibold">
            Existing products <span className="text-grad">fall short.</span>
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-bone-400">
            What's missing today
          </p>
        </div>
        <ExistingFallShort />
      </div>

      <div className="mt-16 flex justify-center">
        <ScrollCue label="Product" href="#product" />
      </div>
    </Section>
  );
}