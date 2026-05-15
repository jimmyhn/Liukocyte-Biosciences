import { useId } from "react";
import type { ReactNode } from "react";

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
        <linearGradient id={`sc-dark-${u}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="#5A5A5C" />
          <stop offset="100%" stopColor="#2F2F31" />
        </linearGradient>
        <linearGradient id={`sc-light-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D8DAE0" />
        </linearGradient>
        <pattern id={`sc-dots-${u}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.2" fill="#9aa3b2" opacity="0.55" />
        </pattern>
      </defs>

      {/* ── WOUND BED ─────────────────────────────────────────────── */}
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
      {/* Wound depression */}
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
      {/* White arrows pointing into the wound */}
      <g fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
        <path d="M560,430 C570,450 580,460 590,475" />
        <path d="M584,468 L592,478 L585,485" />
        <path d="M720,430 C710,450 700,460 690,475" />
        <path d="M696,468 L688,478 L695,485" />
      </g>

      {/* ── DRESSING STACK — only Sealing Membrane remains ────────── */}
      <g transform="translate(510, 220)">
        <path d="M-18,18 L268,18 L286,0 L0,0 Z" fill="#1F1F22" />
        <rect x="0" y="0" width="286" height="58" rx="8"
          fill={`url(#sc-dark-${u})`} stroke="#6B7280" strokeWidth="1.5" />
        <circle cx="260" cy="14" r="3" fill="#9aa0ab" />
      </g>

      {/* ── LEFT — Non-Adherent Dressing icon ─────────────────────── */}
      <g transform="translate(60, 90)">
        <ellipse cx="115" cy="55" rx="100" ry="45" fill="#C8AE96" stroke="#9CA3AF" strokeWidth="2" />
        <ellipse cx="110" cy="50" rx="100" ry="45" fill="#E8D4BD" stroke="#9CA3AF" strokeWidth="2" />
        <ellipse cx="105" cy="45" rx="100" ry="45" fill="#F5E5D2" stroke="#9CA3AF" strokeWidth="2.5" />
        <g fill="#A88860" opacity="0.55">
          {Array.from({ length: 60 }).map((_, i) => {
            const cx = 25 + (i % 12) * 14;
            const cy = 20 + Math.floor(i / 12) * 12;
            return <circle key={i} cx={cx} cy={cy} r="1.4" />;
          })}
        </g>
      </g>

      {/* ── RIGHT — Healing Factors petri dish + magnification ─────── */}
      <g transform="translate(950, 380)">
        <ellipse cx="40" cy="80" rx="55" ry="14" fill="#E6E8EB" stroke="#9CA3AF" strokeWidth="2" />
        <path d="M-15,80 L-15,55 C-15,47 5,40 40,40 C75,40 95,47 95,55 L95,80"
          fill="none" stroke="#9CA3AF" strokeWidth="2" />
        <ellipse cx="40" cy="55" rx="55" ry="13" fill="#F0F2F5" stroke="#9CA3AF" strokeWidth="1.5" opacity="0.7" />
        <g fill="#3FA3D1">
          <circle cx="20" cy="55" r="2.5" />
          <circle cx="35" cy="58" r="2" />
          <circle cx="50" cy="55" r="2.5" />
          <circle cx="60" cy="60" r="2" />
          <circle cx="40" cy="62" r="2" />
        </g>
        {/* Magnification connector lines — white */}
        <line x1="65" y1="48" x2="140" y2="-30" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <line x1="80" y1="60" x2="170" y2="20"  stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        {/* Magnified circle */}
        <circle cx="195" cy="-15" r="55" fill="#1E2430" stroke="#9CA3AF" strokeWidth="2" />
        <circle cx="195" cy="-15" r="55" fill={`url(#sc-dots-${u})`} />
        <g fill="#3FA3D1">
          <circle cx="175" cy="-30" r="3" />
          <circle cx="190" cy="-15" r="4" />
          <circle cx="210" cy="-25" r="3.5" />
          <circle cx="200" cy="0"  r="3" />
          <circle cx="180" cy="-5" r="3" />
          <circle cx="215" cy="-5" r="3" />
          <circle cx="195" cy="-35" r="2.5" />
        </g>
        <g fill="#1E5A8A" opacity="0.55">
          <circle cx="175" cy="-30" r="1.5" />
          <circle cx="190" cy="-15" r="2" />
          <circle cx="210" cy="-25" r="1.8" />
          <circle cx="200" cy="0"  r="1.5" />
          <circle cx="180" cy="-5" r="1.5" />
        </g>
      </g>

      {/* ── WHITE INDICATOR LINES ─────────────────────────────────── */}
      {/* Sealing Membrane label → dark gray layer center */}
      <line x1="920" y1="112" x2="796" y2="249"
        stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7" />
      {/* Non-Adherent Dressing label → oval pad */}
      <line x1="165" y1="210" x2="165" y2="185"
        stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7" />
      {/* Healing Factors label → wound gel (right edge) */}
      <line x1="1100" y1="362" x2="820" y2="505"
        stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7" />

      {/* ── LABELS ────────────────────────────────────────────────── */}
      <Label x={920} y={70} width={180} height={84}>
        <tspan x={1010} dy={0}>Sealing Membrane /</tspan>
        <tspan x={1010} dy={22}>Antimicrobial</tspan>
        <tspan x={1010} dy={22}>Layer</tspan>
      </Label>

      <Label x={80} y={210} width={170} height={60}>
        <tspan x={165} dy={0}>Non-Adherent</tspan>
        <tspan x={165} dy={22}>Dressing</tspan>
      </Label>

      <Label x={1100} y={310} width={140} height={60}>
        <tspan x={1170} dy={0}>Healing</tspan>
        <tspan x={1170} dy={22}>Factors</tspan>
      </Label>
    </svg>
  );
}

function Label({
  x, y, width, height, children,
}: {
  x: number; y: number; width: number; height: number;
  children: ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="14"
        fill="#E8F1FB" stroke="#9DBCDC" strokeWidth="1.5" />
      <text
        x={x + width / 2} y={y + 24}
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
