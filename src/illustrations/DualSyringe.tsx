import { useId } from "react";

/**
 * Dual-barrel syringe illustration — reference-matched.
 *
 * Two barrels sit flush side-by-side (touching, no gap).
 * A single unified thumb-pad plunger spans both barrels.
 * A single finger-flange plate spans both barrels at the back.
 * Both barrels taper together into one shared mixing-tip nozzle.
 * An animated droplet stream exits the tip.
 */
export function DualSyringe({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");

  // Barrel geometry
  const BL = 155;   // barrel left edge x
  const BW = 290;   // barrel width
  const BH = 72;    // single barrel height
  const GAP = 0;    // gap between barrels (0 = flush together)
  const TOP_Y = 90; // top barrel top edge y
  const BOT_Y = TOP_Y + BH + GAP; // bottom barrel top edge y (= 162)
  const TOTAL_H = BH * 2 + GAP;   // total stacked height = 144
  const CY = TOP_Y + TOTAL_H / 2; // vertical center = 162

  return (
    <svg
      viewBox="0 0 720 360"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Dual-barrel syringe"
    >
      <defs>
        {/* Barrel fills */}
        <linearGradient id={`ds-top-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#9DD9F0" stopOpacity="0.25" />
          <stop offset="50%"  stopColor="#5BB8DF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3A9DC4" stopOpacity="0.80" />
        </linearGradient>
        <linearGradient id={`ds-bot-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#F9A06A" stopOpacity="0.30" />
          <stop offset="50%"  stopColor="#F07535" stopOpacity="0.60" />
          <stop offset="100%" stopColor="#C85820" stopOpacity="0.85" />
        </linearGradient>
        {/* Shared outer shell (light grey-white plastic like reference) */}
        <linearGradient id={`ds-shell-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#d8dde6" />
          <stop offset="40%"  stopColor="#f0f2f5" />
          <stop offset="100%" stopColor="#b8bfc9" />
        </linearGradient>
        {/* Metal / dark plastic for plunger rod */}
        <linearGradient id={`ds-metal-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#4a5160" />
          <stop offset="50%"  stopColor="#7a8396" />
          <stop offset="100%" stopColor="#30363f" />
        </linearGradient>
        {/* Mixing-tip gradient */}
        <linearGradient id={`ds-mix-${u}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="#F07535" />
          <stop offset="100%" stopColor="#3FA3D1" />
        </linearGradient>
        {/* Tip / nozzle body */}
        <linearGradient id={`ds-tip-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#c8cdd6" />
          <stop offset="50%"  stopColor="#e8eaed" />
          <stop offset="100%" stopColor="#9aa0ab" />
        </linearGradient>
      </defs>

      {/* ── PLUNGER ASSEMBLY ─────────────────────────────────────── */}
      {/* Single unified thumb-pad — wide flat rectangle spanning both barrels */}
      <rect
        x="8" y={TOP_Y - 16}
        width="38" height={TOTAL_H + 32}
        rx="5"
        fill={`url(#ds-shell-${u})`}
        stroke="#9aa0ab" strokeWidth="1"
      />
      {/* Thumb-pad rim highlight */}
      <rect
        x="8" y={TOP_Y - 16}
        width="6" height={TOTAL_H + 32}
        rx="3"
        fill="white" fillOpacity="0.35"
      />

      {/* Two plunger rods — run from thumb pad to inside each barrel */}
      <rect x="46"  y={TOP_Y + 25}  width="110" height="18" rx="3" fill={`url(#ds-metal-${u})`} />
      <rect x="46"  y={BOT_Y + 25}  width="110" height="18" rx="3" fill={`url(#ds-metal-${u})`} />

      {/* ── FINGER FLANGE — single plate spanning both barrels ────── */}
      <rect
        x={BL - 14} y={TOP_Y - 18}
        width="18" height={TOTAL_H + 36}
        rx="4"
        fill={`url(#ds-shell-${u})`}
        stroke="#9aa0ab" strokeWidth="1"
      />
      {/* Flange highlight */}
      <rect
        x={BL - 14} y={TOP_Y - 18}
        width="5" height={TOTAL_H + 36}
        rx="3"
        fill="white" fillOpacity="0.30"
      />

      {/* ── BARRELS ─────────────────────────────────────────────── */}
      {/* Shared outer shell — one solid rect encompassing both barrels */}
      <rect
        x={BL} y={TOP_Y}
        width={BW} height={TOTAL_H}
        rx="8"
        fill={`url(#ds-shell-${u})`}
        stroke="#9aa0ab" strokeWidth="1.5"
      />

      {/* Divider line between the two barrels */}
      <line
        x1={BL + 6} y1={CY}
        x2={BL + BW - 6} y2={CY}
        stroke="#8a909c" strokeWidth="1.2" strokeOpacity="0.7"
      />

      {/* Top barrel fill (blue tint) */}
      <rect
        x={BL + 3} y={TOP_Y + 3}
        width={BW - 6} height={BH - 4}
        rx="5"
        fill={`url(#ds-top-${u})`}
      />
      {/* Bottom barrel fill (orange tint) */}
      <rect
        x={BL + 3} y={BOT_Y + 1}
        width={BW - 6} height={BH - 4}
        rx="5"
        fill={`url(#ds-bot-${u})`}
      />

      {/* Barrel tick marks — top */}
      <g stroke="#0a0d16" strokeOpacity="0.25" strokeWidth="1">
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i}
            x1={BL + 28 + i * 30} y1={TOP_Y + 4}
            x2={BL + 28 + i * 30} y2={TOP_Y + 16}
          />
        ))}
      </g>
      {/* Barrel tick marks — bottom */}
      <g stroke="#0a0d16" strokeOpacity="0.25" strokeWidth="1">
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i}
            x1={BL + 28 + i * 30} y1={BOT_Y + 4}
            x2={BL + 28 + i * 30} y2={BOT_Y + 16}
          />
        ))}
      </g>

      {/* Barrel highlight (top specular strip) */}
      <rect
        x={BL + 3} y={TOP_Y + 3}
        width={BW - 6} height="10"
        rx="4"
        fill="white" fillOpacity="0.18"
      />
      <rect
        x={BL + 3} y={BOT_Y + 3}
        width={BW - 6} height="10"
        rx="4"
        fill="white" fillOpacity="0.12"
      />

      {/* ── CONVERGENCE CONE — both barrels taper into one tip ─── */}
      {/* Top half of cone */}
      <path
        d={`M${BL + BW},${TOP_Y} L${BL + BW + 52},${CY - 10} L${BL + BW},${CY}`}
        fill={`url(#ds-top-${u})`}
        stroke="#9aa0ab" strokeWidth="1"
      />
      {/* Bottom half of cone */}
      <path
        d={`M${BL + BW},${CY} L${BL + BW + 52},${CY + 10} L${BL + BW},${TOP_Y + TOTAL_H}`}
        fill={`url(#ds-bot-${u})`}
        stroke="#9aa0ab" strokeWidth="1"
      />
      {/* Cone outer shell overlay */}
      <path
        d={`M${BL + BW},${TOP_Y + 4} L${BL + BW + 50},${CY - 10} L${BL + BW + 50},${CY + 10} L${BL + BW},${TOP_Y + TOTAL_H - 4}`}
        fill="none"
        stroke="#9aa0ab" strokeWidth="1.5"
      />

      {/* ── MIXING CHAMBER ──────────────────────────────────────── */}
      <rect
        x={BL + BW + 5} y={CY - 18}
        width="75" height="36"
        rx="4"
        fill={`url(#ds-mix-${u})`}
        opacity="0.80"
        stroke="#9aa0ab" strokeWidth="1"
      />

      {/* ── NEEDLE / MIXING TIP ─────────────────────────────────── */}
      {/* Nozzle body — tapered tube (like reference helical static mixer) */}
      <rect
        x={BL + BW + 80} y={CY - 11}
        width="140" height="22"
        rx="4"
        fill={`url(#ds-tip-${u})`}
        stroke="#8a909c" strokeWidth="1"
      />
      {/* Subtle helical line to suggest static mixer inside */}
      <path
        d={`M${BL + BW + 96},${CY - 5} Q${BL + BW + 112},${CY + 5} ${BL + BW + 128},${CY - 5}
           Q${BL + BW + 144},${CY + 5} ${BL + BW + 160},${CY - 5}
           Q${BL + BW + 176},${CY + 5} ${BL + BW + 192},${CY - 5}`}
        fill="none" stroke="#8a909c" strokeWidth="0.8" strokeOpacity="0.5"
      />
      {/* Tip point */}
      <polygon
        points={`${BL + BW + 220},${CY - 11} ${BL + BW + 242},${CY} ${BL + BW + 220},${CY + 11}`}
        fill="#a8aeb8"
      />

      {/* ── DROPLET STREAM ──────────────────────────────────────── */}
      <g>
        <circle className="ds-drop ds-d1" cx={BL + BW + 244} cy={CY} r="4"   fill={`url(#ds-mix-${u})`} />
        <circle className="ds-drop ds-d2" cx={BL + BW + 244} cy={CY} r="3.5" fill={`url(#ds-mix-${u})`} />
        <circle className="ds-drop ds-d3" cx={BL + BW + 244} cy={CY} r="3"   fill={`url(#ds-mix-${u})`} />
      </g>

      {/* ── LABELS ──────────────────────────────────────────────── */}
      <text
        x={BL + BW / 2} y={TOP_Y - 20}
        textAnchor="middle"
        fill="#7BC9E8" fontSize="25"
        fontFamily="JetBrains Mono, monospace" letterSpacing="2"
      >
        PEG-NHS Reagent
      </text>
      <text
        x={BL + BW / 1.8} y={TOP_Y + TOTAL_H + 45}
        textAnchor="middle"
        fill="#F58A4B" fontSize="25"
        fontFamily="JetBrains Mono, monospace" letterSpacing="2"
      >
        PLL + AN Factors Reagent
      </text>

      <style>{`
        .ds-drop { opacity: 0; animation: dsDrip 1.8s linear infinite; }
        .ds-d1 { animation-delay: 0s; }
        .ds-d2 { animation-delay: 0.6s; }
        .ds-d3 { animation-delay: 1.2s; }
        @keyframes dsDrip {
          0%   { transform: translate(0, 0);        opacity: 0; }
          15%  {                                     opacity: 1; }
          100% { transform: translate(28px, 0px);   opacity: 0; }
        }
      `}</style>
    </svg>
  );
}