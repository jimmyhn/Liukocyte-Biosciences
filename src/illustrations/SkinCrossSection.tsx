import { useId } from "react";

/**
 * ANGel wound-bed scaffold illustration.
 *
 * Recreates the exploded-stack reference: wound cross-section at the
 * bottom, dressing layers floating above (Sealing Membrane / Hydrogel
 * with AN factor / supporting layer), with a Non-Adherent Dressing
 * icon on the left and a Healing Factors petri-dish callout on the
 * right. Blue gel fills the wound base; orange dots represent the
 * biologic AN factors being released.
 */
export function SkinCrossSection({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 1280 720"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ANGel scaffold supporting the wound bed"
    >
      <defs>
        {/* Wound bed gradients */}
        <linearGradient id={`sc-skin-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#F2C4A8" />
          <stop offset="100%" stopColor="#D89372" />
        </linearGradient>
        <linearGradient id={`sc-wound-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#8B2222" />
          <stop offset="100%" stopColor="#4A0F0F" />
        </linearGradient>
        <linearGradient id={`sc-gel-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#7BC9E8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0.9" />
        </linearGradient>
        {/* Layer fills */}
        <linearGradient id={`sc-dark-${u}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="#5A5A5C" />
          <stop offset="100%" stopColor="#2F2F31" />
        </linearGradient>
        <linearGradient id={`sc-light-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D8DAE0" />
        </linearGradient>
        {/* Dot pattern for hydrogel layer */}
        <pattern id={`sc-dots-${u}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.2" fill="#9aa3b2" opacity="0.55" />
        </pattern>
      </defs>

      {/* ════════════════════════════════════════════════════════════
         WOUND BED — bottom cross-section
         ═════════════════════════════════════════════════════════════ */}
      <g>
        {/* Skin base — left and right of wound */}
        <path
          d="M0,440 L0,720 L1280,720 L1280,440
             C1180,438 1080,442 980,440
             C920,438 880,442 840,442
             L780,560 L500,560 L440,442
             C400,440 360,442 300,440
             C200,438 100,442 0,440 Z"
          fill={`url(#sc-skin-${u})`}
        />
        {/* Horizontal skin texture lines */}
        <g stroke="#A66C50" strokeWidth="2" strokeLinecap="round" opacity="0.55" fill="none">
          {[470, 500, 530, 560, 590, 620, 650, 680].map((y) => (
            <g key={y}>
              <path d={`M10,${y} C90,${y - 4} 200,${y + 3} 320,${y - 2} 400,${y + 2}`} />
              <path d={`M850,${y - 2} C950,${y + 3} 1060,${y - 4} 1180,${y + 2} 1270,${y - 1}`} />
            </g>
          ))}
        </g>

        {/* Wound depression — dark red */}
        <path
          d="M440,442 L500,560 L780,560 L840,442
             C820,448 800,450 780,448
             C700,452 600,452 520,450
             C480,448 460,448 440,442 Z"
          fill={`url(#sc-wound-${u})`}
        />

        {/* Blue gel filling lower portion of wound */}
        <path
          d="M460,470 L510,558 L770,558 L820,470
             C780,478 740,482 700,484
             C640,486 580,486 540,484
             C510,482 480,478 460,470 Z"
          fill={`url(#sc-gel-${u})`}
        />

        {/* Orange AN factor dots in the gel */}
        <g fill="#F58A4B">
          <circle cx="540" cy="500" r="4" />
          <circle cx="580" cy="520" r="3.5" />
          <circle cx="620" cy="495" r="4.5" />
          <circle cx="660" cy="515" r="4" />
          <circle cx="700" cy="500" r="3.5" />
          <circle cx="740" cy="510" r="4" />
          <circle cx="560" cy="540" r="3" />
          <circle cx="620" cy="540" r="3.5" />
          <circle cx="680" cy="535" r="3" />
          <circle cx="720" cy="540" r="3" />
        </g>
        {/* Animated falling dots between the dressing and the wound */}
        <g fill="#F58A4B">
          <circle className={`sc-fall sc-f1-${u}`} cx="600" cy="380" r="3.5" />
          <circle className={`sc-fall sc-f2-${u}`} cx="640" cy="380" r="3" />
          <circle className={`sc-fall sc-f3-${u}`} cx="680" cy="380" r="3.5" />
          <circle className={`sc-fall sc-f4-${u}`} cx="660" cy="380" r="2.8" />
        </g>

        {/* Two black arrows pointing into the wound */}
        <g fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M560,430 C570,450 580,460 590,475" />
          <path d="M584,468 L592,478 L585,485" />
          <path d="M720,430 C710,450 700,460 690,475" />
          <path d="M696,468 L688,478 L695,485" />
        </g>
      </g>

      {/* ════════════════════════════════════════════════════════════
         EXPLODED DRESSING STACK (center, above wound)
         ═════════════════════════════════════════════════════════════ */}
      <g>
        {/* Bottom layer — light gray (closest to wound) */}
        <g transform="translate(540, 360)">
          <path
            d="M-12,12 L210,12 L222,0 L0,0 Z"
            fill="#B8BBC2"
          />
          <rect x="0" y="0" width="222" height="22" rx="6" fill={`url(#sc-light-${u})`} stroke="#9aa0ab" strokeWidth="1" />
        </g>

        {/* Middle layer — white with dot pattern (Hydrogel/AN Factor Dressing) */}
        <g transform="translate(525, 305)">
          <path
            d="M-15,15 L235,15 L250,0 L0,0 Z"
            fill="#A8ACB4"
          />
          <rect x="0" y="0" width="250" height="32" rx="6" fill={`url(#sc-light-${u})`} stroke="#9aa0ab" strokeWidth="1.5" />
          <rect x="6" y="4" width="238" height="24" rx="4" fill={`url(#sc-dots-${u})`} />
        </g>

        {/* Top layer — dark gray (Sealing Membrane / Antimicrobial Layer) */}
        <g transform="translate(510, 220)">
          <path
            d="M-18,18 L268,18 L286,0 L0,0 Z"
            fill="#1F1F22"
          />
          <rect x="0" y="0" width="286" height="58" rx="8" fill={`url(#sc-dark-${u})`} stroke="#1A1A1A" strokeWidth="1.5" />
          {/* Small notch / hole indicator on top-right */}
          <circle cx="260" cy="14" r="3" fill="#9aa0ab" />
        </g>
      </g>

      {/* ════════════════════════════════════════════════════════════
         LEFT — Non-Adherent Dressing icon (stacked oval pads)
         ═════════════════════════════════════════════════════════════ */}
      <g transform="translate(60, 90)">
        {/* Back pads (offset) */}
        <ellipse cx="115" cy="55" rx="100" ry="45" fill="#C8AE96" stroke="#1A1A1A" strokeWidth="2" />
        <ellipse cx="110" cy="50" rx="100" ry="45" fill="#E8D4BD" stroke="#1A1A1A" strokeWidth="2" />
        {/* Front pad with texture */}
        <ellipse cx="105" cy="45" rx="100" ry="45" fill="#F5E5D2" stroke="#1A1A1A" strokeWidth="2.5" />
        {/* Dot pattern texture */}
        <g fill="#A88860" opacity="0.55">
          {Array.from({ length: 60 }).map((_, i) => {
            const cx = 25 + (i % 12) * 14;
            const cy = 20 + Math.floor(i / 12) * 12;
            return <circle key={i} cx={cx} cy={cy} r="1.4" />;
          })}
        </g>
      </g>

      {/* ════════════════════════════════════════════════════════════
         RIGHT — Healing Factors petri dish + magnification
         ═════════════════════════════════════════════════════════════ */}
      <g transform="translate(950, 380)">
        {/* Petri dish (small, transparent-ish) */}
        <ellipse cx="40" cy="80" rx="55" ry="14" fill="#E6E8EB" stroke="#1A1A1A" strokeWidth="2" />
        <path
          d="M-15,80 L-15,55 C-15,47 5,40 40,40 C75,40 95,47 95,55 L95,80"
          fill="none" stroke="#1A1A1A" strokeWidth="2"
        />
        <ellipse cx="40" cy="55" rx="55" ry="13" fill="#F0F2F5" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.7" />
        {/* Dotted contents inside dish */}
        <g fill="#3FA3D1">
          <circle cx="20" cy="55" r="2.5" />
          <circle cx="35" cy="58" r="2" />
          <circle cx="50" cy="55" r="2.5" />
          <circle cx="60" cy="60" r="2" />
          <circle cx="40" cy="62" r="2" />
        </g>

        {/* Magnification connector lines */}
        <line x1="65" y1="48" x2="140" y2="-30" stroke="#9aa3b2" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="80" y1="60" x2="170" y2="20" stroke="#9aa3b2" strokeWidth="1" strokeDasharray="3 3" />

        {/* Magnified circle */}
        <circle cx="195" cy="-15" r="55" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
        <circle cx="195" cy="-15" r="55" fill={`url(#sc-dots-${u})`} />
        {/* Cell-like contents */}
        <g fill="#3FA3D1">
          <circle cx="175" cy="-30" r="3" />
          <circle cx="190" cy="-15" r="4" />
          <circle cx="210" cy="-25" r="3.5" />
          <circle cx="200" cy="0" r="3" />
          <circle cx="180" cy="-5" r="3" />
          <circle cx="215" cy="-5" r="3" />
          <circle cx="195" cy="-35" r="2.5" />
        </g>
        <g fill="#1E5A8A" opacity="0.55">
          <circle cx="175" cy="-30" r="1.5" />
          <circle cx="190" cy="-15" r="2" />
          <circle cx="210" cy="-25" r="1.8" />
          <circle cx="200" cy="0" r="1.5" />
          <circle cx="180" cy="-5" r="1.5" />
        </g>
      </g>

      {/* ════════════════════════════════════════════════════════════
         LABELS — light blue rounded chips
         ═════════════════════════════════════════════════════════════ */}
      {/* Sealing Membrane / Antimicrobial Layer (top right) */}
      <Label x={920} y={70} width={180} height={84}>
        <tspan x={1010} dy={0}>Sealing Membrane /</tspan>
        <tspan x={1010} dy={22}>Antimicrobial</tspan>
        <tspan x={1010} dy={22}>Layer</tspan>
      </Label>

      {/* Non-Adherent Dressing (left, under the oval pads) */}
      <Label x={80} y={210} width={170} height={60}>
        <tspan x={165} dy={0}>Non-Adherent</tspan>
        <tspan x={165} dy={22}>Dressing</tspan>
      </Label>

      {/* Hydrogel/AN Factor Dressing (mid-left, pointing to stack) */}
      <Label x={300} y={395} width={180} height={60}>
        <tspan x={390} dy={0}>Hydrogel/AN</tspan>
        <tspan x={390} dy={22}>Factor Dressing</tspan>
      </Label>

      {/* Healing Factors (right, near petri dish) */}
      <Label x={1100} y={330} width={140} height={60}>
        <tspan x={1170} dy={0}>Healing</tspan>
        <tspan x={1170} dy={22}>Factors</tspan>
      </Label>

      <style>{`
        @keyframes scFall-${u} {
          0%   { transform: translateY(0);     opacity: 0; }
          15%  {                                opacity: 1; }
          85%  {                                opacity: 1; }
          100% { transform: translateY(110px); opacity: 0; }
        }
        .sc-fall { animation: scFall-${u} 3s ease-in infinite; }
        .sc-f1-${u} { animation-delay: 0s;   }
        .sc-f2-${u} { animation-delay: 0.6s; }
        .sc-f3-${u} { animation-delay: 1.2s; }
        .sc-f4-${u} { animation-delay: 1.8s; }
      `}</style>
    </svg>
  );
}

/** Light-blue rounded label chip used throughout the diagram. */
function Label({
  x, y, width, height, children,
}: {
  x: number; y: number; width: number; height: number;
  children: React.ReactNode;
}) {
  return (
    <g>
      <rect
        x={x} y={y} width={width} height={height}
        rx="14"
        fill="#E8F1FB"
        stroke="#9DBCDC"
        strokeWidth="1.5"
      />
      <text
        x={x + width / 2}
        y={y + 24}
        textAnchor="middle"
        fill="#1F2937"
        fontSize="15"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="500"
      >
        {children}
      </text>
    </g>
  );
}
