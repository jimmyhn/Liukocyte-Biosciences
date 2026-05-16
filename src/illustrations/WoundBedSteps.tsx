import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =================================================================
 * WoundBedSteps — animated 4-step "mini powerpoint" of the workflow.
 *
 *   STEP 1  Debridement & Sterilization (tweezers remove debris)
 *   STEP 2  ANGel Application (dual syringe ejects gel + AN factors)
 *   STEP 3  Non-Adherent Dressing applied
 *   STEP 4  Clear Film Dressing seals over everything
 *
 * Auto-advances every AUTOPLAY_MS; left/right arrows let user navigate.
 *
 * ─────────────────────────────────────────────────────────────────
 * MANUAL ADJUST CONTROLS
 * Each "whole illustration" (the tweezers as one unit, the syringe
 * with all its parts as one unit, etc.) is grouped under a named
 * <g transform=…>. The transform values are pulled from the
 * `adjustments` object below. Tweak any entry to nudge that whole
 * illustration:
 *   x:    pixels right (-) or left  (+ moves RIGHT in SVG space)
 *   y:    pixels down  (+) or up    (- moves UP)
 *   scale: 1 = no zoom, >1 = bigger, <1 = smaller
 * ================================================================= */

const AUTOPLAY_MS = 7000;

const adjustments = {
  tweezers:        { x: 0, y: 0, scale: 1 },   // Step 1
  debris:          { x: 0, y: 0, scale: 1 },   // Step 1 (the debris specks group)
  syringe:         { x: 0, y: 0, scale: 1 },   // Step 2
  gelFill:         { x: 0, y: 0, scale: 1 },   // Step 2 (the rising gel + AN factors)
  nonAdherent:     { x: 0, y: 0, scale: 1 },   // Step 3
  film:            { x: 0, y: 0, scale: 1 },   // Step 4
};

function adj(key: keyof typeof adjustments) {
  const a = adjustments[key];
  return `translate(${a.x}, ${a.y}) scale(${a.scale})`;
}

/* ── SHARED WOUND BED BASE ───────────────────────────────────────── */
function WoundBedBase({ fillGel = false, withDressing = false, withFilm = false }: {
  fillGel?: boolean;
  withDressing?: boolean;
  withFilm?: boolean;
}) {
  return (
    <g>
      <defs>
        <linearGradient id="wb-skin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#F2C4A8" />
          <stop offset="100%" stopColor="#D89372" />
        </linearGradient>
        <linearGradient id="wb-wound" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#8B2222" />
          <stop offset="100%" stopColor="#4A0F0F" />
        </linearGradient>
        <linearGradient id="wb-gel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#7BC9E8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Skin base */}
      <path
        d="M0,440 L0,720 L1280,720 L1280,440
           C1180,438 1080,442 980,440
           C920,438 880,442 840,442
           L780,560 L500,560 L440,442
           C400,440 360,442 300,440
           C200,438 100,442 0,440 Z"
        fill="url(#wb-skin)"
      />
      {/* Skin texture lines */}
      <g stroke="#A66C50" strokeWidth="2" strokeLinecap="round" opacity="0.5" fill="none">
        {[470, 500, 530, 560, 590, 620, 650, 680].map((y) => (
          <g key={y}>
            <path d={`M10,${y} C90,${y - 4} 200,${y + 3} 320,${y - 2} 400,${y + 2}`} />
            <path d={`M850,${y - 2} C950,${y + 3} 1060,${y - 4} 1180,${y + 2} 1270,${y - 1}`} />
          </g>
        ))}
      </g>
      {/* Wound depression */}
      <path
        d="M440,442 L500,560 L780,560 L840,442
           C820,448 800,450 780,448
           C700,452 600,452 520,450
           C480,448 460,448 440,442 Z"
        fill="url(#wb-wound)"
      />

      {fillGel && (
        <g transform={adj("gelFill")}>
          {/* Blue gel filling the wound */}
          <motion.path
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "640px 560px" }}
            d="M460,470 L510,558 L770,558 L820,470
               C780,478 740,482 700,484
               C640,486 580,486 540,484
               C510,482 480,478 460,470 Z"
            fill="url(#wb-gel)"
          />
          {/* Orange AN factor particles — fade in progressively */}
          <g fill="#F58A4B">
            {[
              { cx: 540, cy: 500, r: 4,   d: 1.2 },
              { cx: 580, cy: 520, r: 3.5, d: 1.4 },
              { cx: 620, cy: 495, r: 4.5, d: 1.0 },
              { cx: 660, cy: 515, r: 4,   d: 1.6 },
              { cx: 700, cy: 500, r: 3.5, d: 1.3 },
              { cx: 740, cy: 510, r: 4,   d: 1.5 },
              { cx: 560, cy: 540, r: 3,   d: 1.8 },
              { cx: 620, cy: 540, r: 3.5, d: 2.0 },
              { cx: 680, cy: 535, r: 3,   d: 1.9 },
              { cx: 720, cy: 540, r: 3,   d: 2.1 },
            ].map((p, i) => (
              <motion.circle
                key={i}
                cx={p.cx} cy={p.cy} r={p.r}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: p.d }}
              />
            ))}
          </g>
        </g>
      )}

      {withDressing && (
        <g transform={adj("nonAdherent")}>
          {/* Non-adherent dressing sitting on the wound */}
          <NonAdherentPad x={400} y={420} />
        </g>
      )}

      {withFilm && (
        <g transform={adj("film")}>
          <FilmDressing x={300} y={400} />
        </g>
      )}
    </g>
  );
}

/* ── TWEEZERS (whole illustration as a unit) ────────────────────── */
function Tweezers() {
  return (
    <g>
      {/* Two metal prongs meeting at a hinge near top */}
      <g fill="#C0C5CC" stroke="#1A1A1A" strokeWidth="2">
        <path d="M600,80 L596,440 L612,440 L620,90 Z" />
        <path d="M680,80 L684,440 L668,440 L660,90 Z" />
      </g>
      {/* Hinge */}
      <ellipse cx="640" cy="80" rx="46" ry="14" fill="#8C949F" stroke="#1A1A1A" strokeWidth="2" />
      <ellipse cx="640" cy="78" rx="46" ry="10" fill="#B0B5BC" />
      {/* Highlight strip on prongs */}
      <rect x="602" y="100" width="3" height="320" fill="#FFFFFF" opacity="0.5" />
      <rect x="675" y="100" width="3" height="320" fill="#FFFFFF" opacity="0.5" />
      {/* Pinch tip */}
      <path d="M608,440 L672,440 L668,452 L612,452 Z" fill="#8C949F" stroke="#1A1A1A" strokeWidth="2" />
    </g>
  );
}

/* ── DUAL SYRINGE (mini version, oriented top-down) ─────────────── */
function MiniDualSyringe() {
  return (
    <g>
      <defs>
        <linearGradient id="msTop" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9DD9F0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3A9DC4" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="msBot" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F9A06A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C85820" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="msShell" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d8dde6" />
          <stop offset="50%" stopColor="#f0f2f5" />
          <stop offset="100%" stopColor="#b8bfc9" />
        </linearGradient>
        <linearGradient id="msMix" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F07535" />
          <stop offset="100%" stopColor="#3FA3D1" />
        </linearGradient>
      </defs>
      {/* Rotated 90° so syringe points downward into wound */}
      <g transform="translate(640, 70) rotate(90)">
        {/* Thumb pad */}
        <rect x="-100" y="-40" width="20" height="80" rx="3" fill="url(#msShell)" stroke="#9aa0ab" strokeWidth="1" />
        {/* Plunger rods */}
        <rect x="-78" y="-25" width="60" height="14" rx="2" fill="#4a5160" />
        <rect x="-78" y="11"  width="60" height="14" rx="2" fill="#4a5160" />
        {/* Flange */}
        <rect x="-22" y="-46" width="14" height="92" rx="3" fill="url(#msShell)" stroke="#9aa0ab" strokeWidth="1" />
        {/* Barrels (shared shell) */}
        <rect x="-8" y="-38" width="160" height="76" rx="6" fill="url(#msShell)" stroke="#9aa0ab" strokeWidth="1.5" />
        {/* Divider line */}
        <line x1="0" y1="0" x2="148" y2="0" stroke="#8a909c" strokeWidth="1" strokeOpacity="0.7" />
        {/* Top barrel fill (blue) */}
        <rect x="-5" y="-35" width="155" height="34" rx="4" fill="url(#msTop)" />
        {/* Bottom barrel fill (orange) */}
        <rect x="-5" y="1" width="155" height="34" rx="4" fill="url(#msBot)" />
        {/* Tick marks */}
        <g stroke="#0a0d16" strokeOpacity="0.25" strokeWidth="1">
          {[0,1,2,3,4].map(i => (
            <g key={i}>
              <line x1={16 + i * 28} y1="-32" x2={16 + i * 28} y2="-24" />
              <line x1={16 + i * 28} y1="24"  x2={16 + i * 28} y2="32" />
            </g>
          ))}
        </g>
        {/* Convergence cone */}
        <path d="M152,-38 L184,-10 L184,10 L152,38 Z" fill="url(#msMix)" opacity="0.7" stroke="#9aa0ab" strokeWidth="1" />
        {/* Mixing chamber */}
        <rect x="184" y="-12" width="38" height="24" rx="3" fill="url(#msMix)" opacity="0.8" stroke="#9aa0ab" strokeWidth="1" />
        {/* Nozzle */}
        <rect x="222" y="-8" width="60" height="16" rx="3" fill="url(#msShell)" stroke="#8a909c" strokeWidth="1" />
        {/* Tip point */}
        <polygon points="282,-8 296,0 282,8" fill="#a8aeb8" />
      </g>
    </g>
  );
}

/* ── NON-ADHERENT DRESSING PAD ──────────────────────────────────── */
function NonAdherentPad({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Pad body with cotton-pad texture */}
      <rect x="0" y="0" width="480" height="50" rx="10"
        fill="#F5E5D2" stroke="#9CA3AF" strokeWidth="2.5" />
      {/* Dotted texture */}
      <g fill="#A88860" opacity="0.55">
        {Array.from({ length: 80 }).map((_, i) => {
          const cx = 12 + (i % 20) * 24;
          const cy = 8 + Math.floor(i / 20) * 14;
          return <circle key={i} cx={cx} cy={cy} r="1.8" />;
        })}
      </g>
      {/* Subtle shading edge */}
      <rect x="0" y="42" width="480" height="8" rx="6" fill="#D8C4A8" opacity="0.6" />
    </g>
  );
}

/* ── CLEAR FILM DRESSING ────────────────────────────────────────── */
function FilmDressing({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Translucent film — extends past the non-adherent onto skin */}
      <rect x="0" y="0" width="680" height="90" rx="12"
        fill="#D0E8F5" opacity="0.4" stroke="#7BC9E8" strokeWidth="2" strokeDasharray="6 4" />
      {/* Highlight strip */}
      <rect x="20" y="8" width="640" height="14" rx="6" fill="#FFFFFF" opacity="0.35" />
    </g>
  );
}

/* ── DEBRIS SPECKS in wound (Step 1) ────────────────────────────── */
function DebrisSpecks() {
  const specks = [
    { cx: 520, cy: 500, r: 4 },
    { cx: 560, cy: 520, r: 5 },
    { cx: 610, cy: 495, r: 4 },
    { cx: 660, cy: 525, r: 6 },
    { cx: 700, cy: 510, r: 4 },
    { cx: 740, cy: 530, r: 5 },
    { cx: 580, cy: 545, r: 3 },
    { cx: 660, cy: 545, r: 4 },
    { cx: 720, cy: 545, r: 3 },
  ];
  return (
    <g>
      {specks.map((s, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 5, times: [0, 0.55, 0.8] }}
        >
          <circle cx={s.cx} cy={s.cy} r={s.r} fill="#2D1810" />
          <circle cx={s.cx - 1} cy={s.cy - 1} r={s.r * 0.4} fill="#4A2D1C" />
        </motion.g>
      ))}
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  STEP COMPONENTS
 * ═══════════════════════════════════════════════════════════════════ */

function Step1Debridement() {
  return (
    <svg viewBox="0 0 1280 720" className="w-full h-full" aria-label="Step 1: Debridement">
      <WoundBedBase />
      <g transform={adj("debris")}>
        <DebrisSpecks />
      </g>
      <motion.g
        transform={adj("tweezers")}
        initial={{ y: -160 }}
        animate={{ y: [-160, 30, 50, 30, -50] }}
        transition={{ duration: 5, times: [0, 0.3, 0.5, 0.7, 1], ease: "easeInOut" }}
      >
        <Tweezers />
      </motion.g>
    </svg>
  );
}

function Step2Application() {
  return (
    <svg viewBox="0 0 1280 720" className="w-full h-full" aria-label="Step 2: Application">
      <WoundBedBase fillGel />
      <motion.g
        transform={adj("syringe")}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: [0, 1, 1, 0.4], y: [-40, 0, 0, -20] }}
        transition={{ duration: 5, times: [0, 0.2, 0.7, 1] }}
      >
        <MiniDualSyringe />
      </motion.g>
    </svg>
  );
}

function Step3Dressing() {
  return (
    <svg viewBox="0 0 1280 720" className="w-full h-full" aria-label="Step 3: Non-Adherent Dressing">
      <WoundBedBase fillGel />
      <motion.g
        initial={{ y: -400, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <g transform={adj("nonAdherent")}>
          <NonAdherentPad x={400} y={420} />
        </g>
      </motion.g>
    </svg>
  );
}

function Step4Film() {
  return (
    <svg viewBox="0 0 1280 720" className="w-full h-full" aria-label="Step 4: Film Dressing">
      <WoundBedBase fillGel />
      {/* Non-adherent already in place */}
      <g transform={adj("nonAdherent")}>
        <NonAdherentPad x={400} y={420} />
      </g>
      {/* Film descends onto everything */}
      <motion.g
        initial={{ y: -400, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <g transform={adj("film")}>
          <FilmDressing x={300} y={400} />
        </g>
      </motion.g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  MAIN COMPONENT — slideshow shell with auto-advance + arrows
 * ═══════════════════════════════════════════════════════════════════ */

const captions = [
  "Step 1 — Debridement & Sterilization: surgical tweezers remove debris and contamination from the wound bed.",
  "Step 2 — ANGel Application: the dual-syringe ejects mixed PEG-NHS + PLL hydrogel; AN factors disperse into the gel as it fills the wound.",
  "Step 3 — Non-Adherent Dressing: a protective layer is placed directly over the hydrogel.",
  "Step 4 — Film Dressing: a clear sealing film is applied over the dressing and surrounding healthy tissue.",
];

const steps = [Step1Debridement, Step2Application, Step3Dressing, Step4Film];

export function WoundBedSteps({ className = "" }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [autoplayTick, setAutoplayTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplayTick]);

  const goTo = (i: number) => {
    setStep(((i % 4) + 4) % 4);
    setAutoplayTick((t) => t + 1); // reset autoplay timer
  };
  const next = () => goTo(step + 1);
  const prev = () => goTo(step - 1);

  const StepComponent = steps[step];

  return (
    <div className={className}>
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white/[0.02] ring-1 ring-white/8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>

        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous step"
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 ring-1 ring-white/20 hover:ring-angel-sky/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next step"
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 ring-1 ring-white/20 hover:ring-angel-sky/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Step indicator dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to step ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-8 bg-angel-orange" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Caption */}
      <p className="mt-5 text-center text-base md:text-lg text-bone-300 leading-relaxed max-w-3xl mx-auto">
        {captions[step]}
      </p>
    </div>
  );
}
