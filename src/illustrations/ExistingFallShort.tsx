import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";

/* ===== Icon components — flat illustration style matching reference ===== */

function MoneyBagIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Bag body */}
      <path
        d="M52,104 C48,78 60,56 76,50 C84,47 100,46 100,46 C100,46 116,47 124,50 C140,56 152,78 148,104 C144,136 128,170 100,170 C72,170 56,136 52,104 Z"
        fill="#F5DAB0"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Neck — cinched area */}
      <path
        d="M78,50 C82,44 82,38 88,36 L112,36 C118,38 118,44 122,50 C114,54 86,54 78,50 Z"
        fill="#F2C48A"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Tie band across neck */}
      <path
        d="M76,48 C82,43 118,43 124,48 C122,53 118,55 100,55 C82,55 78,53 76,48 Z"
        fill="#E8A835"
        stroke="#1A1A1A"
        strokeWidth="2.5"
      />
      {/* Top flap — gathered fabric above tie, properly closed */}
      <path
        d="M88,36 C88,30 90,24 100,22 C110,24 112,30 112,36 L100,38 Z"
        fill="#F2C48A"
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Knot bow loops — left */}
      <path
        d="M80,45 C70,40 62,42 64,48 C66,54 78,52 80,47"
        fill="#E8A835"
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Knot bow loops — right */}
      <path
        d="M120,45 C130,40 138,42 136,48 C134,54 122,52 120,47"
        fill="#E8A835"
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Knot center */}
      <ellipse cx="100" cy="47" rx="6" ry="5" fill="#C8880A" stroke="#1A1A1A" strokeWidth="2" />
      {/* Dollar sign */}
      <text
        x="100"
        y="138"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="78"
        fontWeight="800"
        fill="#2E8B57"
      >
        $
      </text>
    </svg>
  );
}

function CalendarClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Spiral rings at top */}
      {[44, 76, 108, 140].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="24" rx="6" ry="9" fill="none" stroke="#1A1A1A" strokeWidth="2.5" />
          <line x1={cx} y1="14" x2={cx} y2="44" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      {/* Calendar body */}
      <rect x="22" y="34" width="148" height="130" rx="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
      {/* Red header */}
      <path
        d="M22,40 C22,36 25,34 28,34 L164,34 C167,34 170,36 170,40 L170,64 L22,64 Z"
        fill="#D9352C"
        stroke="#1A1A1A"
        strokeWidth="3"
      />
      {/* Date grid */}
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
      {/* Clock — overlays bottom-right */}
      <circle cx="138" cy="138" r="34" fill="#FFFFFF" stroke="#3FA3D1" strokeWidth="6" />
      <circle cx="138" cy="138" r="30" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
      <line x1="138" y1="138" x2="138" y2="118" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
      <line x1="138" y1="138" x2="155" y2="146" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="138" cy="138" r="3" fill="#1A1A1A" />
    </svg>
  );
}

function BandageRollIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Main roll body */}
      <path
        d="M40,48 L130,48 C140,48 148,56 148,66 L148,158 C148,168 140,176 130,176 L40,176 C30,176 22,168 22,158 L22,66 C22,56 30,48 40,48 Z"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Top ellipse — roll opening */}
      <ellipse cx="85" cy="48" rx="63" ry="14" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3.5" />
      {/* Inner ring */}
      <ellipse cx="85" cy="48" rx="34" ry="7" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="2" />
      {/* Red cross */}
      <g transform="translate(85, 112)">
        <rect x="-10" y="-30" width="20" height="60" fill="#D9352C" stroke="#1A1A1A" strokeWidth="2.5" />
        <rect x="-30" y="-10" width="60" height="20" fill="#D9352C" stroke="#1A1A1A" strokeWidth="2.5" />
      </g>
      {/* Trailing gauze strip */}
      <path
        d="M148,80 C162,82 174,86 178,94 L172,108 L182,118 L170,128 L180,140 L168,150 L178,162 L162,170 C156,164 150,158 148,150 Z"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PoorVascularizationIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

/* ============================================================== */

const items = [
  {
    name: "High Cost",
    detail: "Up to $10,000 per unit for active wound healing dressing.",
    Icon: MoneyBagIcon,
  },
  {
    name: "Long Wait Times",
    detail: "Frequent re-application and slow vascularization.",
    Icon: CalendarClockIcon,
  },
  {
    name: "Passive Healing",
    detail: "Covers the wound but doesn't activate repair biology.",
    Icon: BandageRollIcon,
  },
  {
    name: "Poor Vascularization",
    detail: "Delays patient from getting skin grafting done.",
    Icon: PoorVascularizationIcon,
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
      {items.map(({ name, detail, Icon }) => (
        <motion.div
          key={name}
          variants={fadeUp}
          className="flex flex-col items-center text-center"
        >
          {/* Blue circle container around each icon */}
          <div className="flex items-center justify-center w-[168px] h-[168px] rounded-full bg-angel-blue/20 ring-2 ring-angel-blue/40">
            <Icon className="w-[120px] h-[120px]" />
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
