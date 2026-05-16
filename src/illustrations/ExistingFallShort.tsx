import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";
import type { CSSProperties } from "react";

/* =================================================================
 * MoneyBag — matches reference: gathered fabric top + double rope tie
 * ================================================================= */
function MoneyBagIcon({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Bag body - rounded sack */}
      <path
        d="M40,92 C30,128 38,168 60,184 C80,196 120,196 140,184 C162,168 170,128 160,92
           C150,76 130,68 100,68 C70,68 50,76 40,92 Z"
        fill="#F5DAB0"
        stroke="#1A1A1A"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Subtle bag body shading */}
      <path
        d="M48,100 C42,140 50,170 65,180 C70,178 68,150 62,120 C60,108 55,102 48,100 Z"
        fill="#E8C99A" opacity="0.55"
      />
      <path
        d="M152,100 C158,140 150,170 135,180 C130,178 132,150 138,120 C140,108 145,102 152,100 Z"
        fill="#D8B888" opacity="0.45"
      />

      {/* Gathered fabric top — 5 puff/petal shapes emerging from the rope */}
      <g fill="#F2C48A" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M52,68 C46,42 52,22 60,16 C68,28 70,52 76,68 Z" />
        <path d="M76,68 C74,32 82,10 90,8 C96,22 94,50 98,68 Z" />
        <path d="M98,68 C100,30 106,18 112,18 C116,26 114,52 116,68 Z" />
        <path d="M116,68 C118,30 128,8 134,10 C136,32 130,54 132,68 Z" />
        <path d="M132,68 C136,38 144,28 150,30 C148,50 144,60 148,68 Z" />
      </g>

      {/* Rope tie — top band */}
      <rect x="42" y="66" width="116" height="11" rx="4"
        fill="#F2C48A" stroke="#1A1A1A" strokeWidth="2.5" />
      {/* Twist pattern on top band */}
      <g stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={i} x1={48 + i * 9} y1="68" x2={52 + i * 9} y2="75" />
        ))}
      </g>

      {/* Rope tie — bottom band */}
      <rect x="38" y="80" width="124" height="11" rx="4"
        fill="#F2C48A" stroke="#1A1A1A" strokeWidth="2.5" />
      {/* Twist pattern on bottom band */}
      <g stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={44 + i * 9} y1="82" x2={48 + i * 9} y2="89" />
        ))}
      </g>

      {/* Dollar sign */}
      <text
        x="100"
        y="158"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="68"
        fontWeight="900"
        fill="#1A1A1A"
      >
        $
      </text>
    </svg>
  );
}

/* =================================================================
 * Calendar + Clock — Long Wait Times
 * ================================================================= */
function CalendarClockIcon({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[44, 76, 108, 140].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="24" rx="6" ry="9" fill="none" stroke="#1A1A1A" strokeWidth="2.5" />
          <line x1={cx} y1="14" x2={cx} y2="44" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      <rect x="22" y="34" width="148" height="130" rx="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
      <path
        d="M22,40 C22,36 25,34 28,34 L164,34 C167,34 170,36 170,40 L170,64 L22,64 Z"
        fill="#D9352C" stroke="#1A1A1A" strokeWidth="3"
      />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4].map((col) => {
          const x = 30 + col * 28;
          const y = 76 + row * 26;
          const red = (row === 0 && col === 0) || (row === 1 && col === 0);
          return (
            <rect key={`${row}-${col}`} x={x} y={y} width="22" height="20" rx="2"
              fill={red ? "#D9352C" : "#D9D9D9"} />
          );
        })
      )}
      <circle cx="138" cy="138" r="34" fill="#FFFFFF" stroke="#3FA3D1" strokeWidth="6" />
      <circle cx="138" cy="138" r="30" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
      <line x1="138" y1="138" x2="138" y2="118" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
      <line x1="138" y1="138" x2="155" y2="146" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="138" cy="138" r="3" fill="#1A1A1A" />
    </svg>
  );
}

/* =================================================================
 * Bandage Roll — Passive Healing
 * ================================================================= */
function BandageRollIcon({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M40,48 L130,48 C140,48 148,56 148,66 L148,158 C148,168 140,176 130,176 L40,176 C30,176 22,168 22,158 L22,66 C22,56 30,48 40,48 Z"
        fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3.5" strokeLinejoin="round"
      />
      <ellipse cx="85" cy="48" rx="63" ry="14" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3.5" />
      <ellipse cx="85" cy="48" rx="34" ry="7" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="2" />
      <g transform="translate(85, 112)">
        <rect x="-10" y="-30" width="20" height="60" fill="#D9352C" stroke="#1A1A1A" strokeWidth="2.5" />
        <rect x="-30" y="-10" width="60" height="20" fill="#D9352C" stroke="#1A1A1A" strokeWidth="2.5" />
      </g>
      <path
        d="M148,80 C162,82 174,86 178,94 L172,108 L182,118 L170,128 L180,140 L168,150 L178,162 L162,170 C156,164 150,158 148,150 Z"
        fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round"
      />
    </svg>
  );
}

/* =================================================================
 * Poor Vascularization — skin disc with sparse vessels
 * ================================================================= */
function PoorVascularizationIcon({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="vasc-shade" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFD4B0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D88752" stopOpacity="0.3" />
        </radialGradient>
        <clipPath id="vasc-clip">
          <circle cx="100" cy="100" r="84" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="84" fill="#F5B58A" stroke="#1A1A1A" strokeWidth="3" />
      <circle cx="100" cy="100" r="84" fill="url(#vasc-shade)" />
      <g fill="none" stroke="#8B2A2A" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#vasc-clip)">
        <path d="M60,70 C72,85 86,95 100,108 C112,118 124,128 138,140" strokeWidth="4" />
        <path d="M100,108 C108,98 118,92 132,86" strokeWidth="3" />
        <path d="M132,86 C140,84 148,80 152,72" strokeWidth="2.2" />
        <path d="M132,86 C140,90 146,98 150,108" strokeWidth="2" />
        <path d="M86,95 C82,82 78,70 74,58" strokeWidth="2.5" />
        <path d="M74,58 C70,52 64,48 56,46" strokeWidth="2" />
        <path d="M124,128 C134,128 142,132 148,138" strokeWidth="2.5" />
        <path d="M112,118 C116,128 120,138 122,150" strokeWidth="2.2" />
        <path d="M60,70 C56,76 52,82 50,90" strokeWidth="1.8" />
        <path d="M138,140 C144,144 148,150 150,156" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

/* =================================================================
 * MANUAL CROP CONTROLS — tweak each illustration's framing here.
 *
 *   x:    positive = move icon RIGHT, negative = LEFT   (in %)
 *   y:    positive = move icon DOWN,  negative = UP     (in %)
 *   zoom: 1 = no zoom; >1 zooms IN (icon bigger); <1 zooms OUT
 *
 * The values combine, so { x: 5, y: -3, zoom: 1.1 } shifts the icon
 * right by 5%, up by 3%, and zooms in 10%.
 * ================================================================= */
const items = [
  {
    name: "High Cost",
    detail: "Up to $10,000 per unit for active wound healing dressing.",
    Icon: MoneyBagIcon,
    adjust: { x: 0, y: 0, zoom: 1 },
  },
  {
    name: "Long Wait Times",
    detail: "Frequent re-application and slow vascularization.",
    Icon: CalendarClockIcon,
    adjust: { x: 0, y: 0, zoom: 1 },
  },
  {
    name: "Passive Healing",
    detail: "Covers the wound but doesn't activate repair biology.",
    Icon: BandageRollIcon,
    adjust: { x: 0, y: 0, zoom: 1 },
  },
  {
    name: "Poor Vascularization",
    detail: "Delays patient from getting skin grafting done.",
    Icon: PoorVascularizationIcon,
    adjust: { x: 0, y: 0, zoom: 1 },
  },
];

export function ExistingFallShort({ className = "" }: { className?: string }) {
  return (
    <motion.div
      variants={stagger(0.05, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 ${className}`}
    >
      {items.map(({ name, detail, Icon, adjust }) => (
        <motion.div
          key={name}
          variants={fadeUp}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center justify-center w-[168px] h-[168px] rounded-full bg-angel-blue/20 ring-2 ring-angel-blue/40 overflow-hidden">
            <Icon
              className="w-[120px] h-[120px]"
              style={{
                transform: `translate(${adjust.x}%, ${adjust.y}%) scale(${adjust.zoom})`,
              }}
            />
          </div>
          <p className="mt-5 font-display text-xl md:text-2xl font-semibold text-angel-orange">
            {name}
          </p>
          <p className="mt-2 text-sm md:text-base text-bone-300 leading-snug max-w-[220px]">
            {detail}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
