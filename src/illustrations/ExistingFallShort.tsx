import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";

/* ===== Icon components — flat illustration style matching reference ===== */

function MoneyBagIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Tie / rope at top */}
      <path
        d="M70,38 C82,28 118,28 130,38 C124,46 110,50 100,50 C90,50 76,46 70,38 Z"
        fill="#F2C078"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M88,30 C92,22 108,22 112,30" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      {/* Bag body */}
      <path
        d="M70,42 C58,68 36,98 36,130 C36,166 64,184 100,184 C136,184 164,166 164,130 C164,98 142,68 130,42 C118,52 82,52 70,42 Z"
        fill="#F5DAB0"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Dollar sign */}
      <text
        x="100"
        y="142"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="86"
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
          // Highlight a couple of cells red
          const red = (row === 0 && col === 0) || (row === 1 && col === 0);
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width="22"
              height="20"
              rx="2"
              fill={red ? "#D9352C" : "#D9D9D9"}
            />
          );
        })
      )}
      {/* Clock — overlays bottom-right of calendar */}
      <circle cx="138" cy="138" r="34" fill="#FFFFFF" stroke="#3FA3D1" strokeWidth="6" />
      <circle cx="138" cy="138" r="30" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
      {/* Clock hands */}
      <line x1="138" y1="138" x2="138" y2="118" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
      <line x1="138" y1="138" x2="155" y2="146" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="138" cy="138" r="3" fill="#1A1A1A" />
    </svg>
  );
}

function BandageRollIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Main roll body (front-facing rounded rectangle) */}
      <path
        d="M40,48 L130,48 C140,48 148,56 148,66 L148,158 C148,168 140,176 130,176 L40,176 C30,176 22,168 22,158 L22,66 C22,56 30,48 40,48 Z"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Top ellipse — roll opening */}
      <ellipse cx="85" cy="48" rx="63" ry="14" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3.5" />
      {/* Inner ring of roll */}
      <ellipse cx="85" cy="48" rx="34" ry="7" fill="#E8E8E8" stroke="#1A1A1A" strokeWidth="2" />
      {/* Red cross */}
      <g transform="translate(85, 112)">
        <rect x="-10" y="-30" width="20" height="60" fill="#D9352C" stroke="#1A1A1A" strokeWidth="2.5" />
        <rect x="-30" y="-10" width="60" height="20" fill="#D9352C" stroke="#1A1A1A" strokeWidth="2.5" />
      </g>
      {/* Trailing gauze strip on right side */}
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
      {/* Peach/orange skin circle */}
      <circle cx="100" cy="100" r="86" fill="#F5B58A" stroke="#1A1A1A" strokeWidth="3" />
      {/* Inner shading */}
      <circle cx="100" cy="100" r="86" fill="url(#vasc-shade)" />
      <defs>
        <radialGradient id="vasc-shade" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFD4B0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D88752" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      {/* Sparse, broken vessel branches in dark red — emphasizing "poor" */}
      <g fill="none" stroke="#8B2A2A" strokeLinecap="round" strokeLinejoin="round">
        {/* Main trunk */}
        <path d="M60,70 C72,85 86,95 100,108 C112,118 124,128 138,140" strokeWidth="4" />
        {/* Branch up-right */}
        <path d="M100,108 C108,98 118,92 132,86" strokeWidth="3" />
        <path d="M132,86 C140,84 148,80 152,72" strokeWidth="2.2" />
        <path d="M132,86 C140,90 146,98 150,108" strokeWidth="2" />
        {/* Branch off main */}
        <path d="M86,95 C82,82 78,70 74,58" strokeWidth="2.5" />
        <path d="M74,58 C70,52 64,48 56,46" strokeWidth="2" />
        {/* Lower branch */}
        <path d="M124,128 C134,128 142,132 148,138" strokeWidth="2.5" />
        <path d="M112,118 C116,128 120,138 122,150" strokeWidth="2.2" />
        {/* Small capillary stubs (broken/incomplete look) */}
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
    detail: "Up to $10,000 per unit for leading biologics.",
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
    detail: "Wound bed stays starved of new blood vessels.",
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
          <Icon className="w-full max-w-[160px] h-auto" />
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
