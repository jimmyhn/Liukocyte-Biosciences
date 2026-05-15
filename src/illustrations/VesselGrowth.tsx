import { useId } from "react";

/**
 * Blood-vessel regrowth illustration — v2.
 *
 * Tree-like angiogenesis: two main trunks emerge from the corner, each
 * bifurcates into branches at deliberate fork points, and every branch tip
 * fans out into 2–3 fine capillaries. Each child path's start point matches
 * the parent's end point so the network reads as a single growing organism
 * rather than disconnected lines.
 *
 * Animation:
 *   - Each path animates its stroke from 0% → 100% drawn, then fades out
 *   - Children are delayed so trunks → branches → capillaries grow in order
 *   - +6 s base offset so macrophage particles ascend first on each loop
 */
type Props = {
  className?: string;
  origin?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

export function VesselGrowth({ className = "", origin = "top-right" }: Props) {
  const uid = useId().replace(/:/g, "");
  const gOrange = `vg-o-${uid}`;
  const gFade   = `vg-f-${uid}`;

  const rotation = {
    "top-right":    "scale(-1, 1) translate(-600, 0)",
    "top-left":     "translate(0, 0)",
    "bottom-right": "scale(-1, -1) translate(-600, -600)",
    "bottom-left":  "scale(1, -1) translate(0, -600)",
  }[origin];

  // Fork points are reused across paths so the tree connects cleanly.
  const F1 = { x: 260, y: 230 };   // first bifurcation on Trunk-A
  const F2 = { x: 420, y: 380 };   // second bifurcation on Trunk-A
  const F3 = { x: 220, y: 320 };   // bifurcation on Trunk-B
  const F4 = { x: 360, y: 480 };   // bifurcation on Trunk-A tip
  const T1 = { x: 540, y: 540 };   // tip of Trunk-A
  const T2 = { x: 320, y: 560 };   // tip of Trunk-B

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gOrange} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#F58A4B" />
          <stop offset="60%"  stopColor="#F39966" />
          <stop offset="100%" stopColor="#d56a2a" />
        </linearGradient>
        <radialGradient id={gFade} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#F58A4B" stopOpacity="0.40" />
          <stop offset="100%" stopColor="#F58A4B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g
        transform={rotation}
        fill="none"
        stroke={`url(#${gOrange})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Soft glow at the origin */}
        <circle cx="40" cy="40" r="240" fill={`url(#${gFade})`} stroke="none" opacity="0.7" />

        {/* === TRUNKS — emerge from the corner, sweep diagonally === */}
        <path
          className="vg-path vg-trunk"
          strokeWidth="6"
          d={`M40,40 C130,100 200,160 ${F1.x},${F1.y}`}
        />
        <path
          className="vg-path vg-trunk"
          strokeWidth="5.4"
          d={`M${F1.x},${F1.y} C320,290 380,340 ${F2.x},${F2.y}`}
        />
        <path
          className="vg-path vg-trunk"
          strokeWidth="4.6"
          d={`M${F2.x},${F2.y} C460,420 510,490 ${T1.x},${T1.y} C560,560 585,580 600,600`}
        />

        <path
          className="vg-path vg-trunk"
          strokeWidth="5"
          d={`M40,40 C90,140 160,250 ${F3.x},${F3.y}`}
        />
        <path
          className="vg-path vg-trunk"
          strokeWidth="4"
          d={`M${F3.x},${F3.y} C260,400 300,490 ${T2.x},${T2.y} C340,580 350,590 360,600`}
        />

        {/* === BRANCHES — sprout from each bifurcation === */}
        {/* From F1 */}
        <path
          className="vg-path vg-branch"
          strokeWidth="3.2"
          d={`M${F1.x},${F1.y} C300,200 360,180 430,170`}
        />
        <path
          className="vg-path vg-branch"
          strokeWidth="2.8"
          d={`M${F1.x},${F1.y} C220,260 180,310 150,360`}
        />

        {/* From F2 */}
        <path
          className="vg-path vg-branch"
          strokeWidth="3"
          d={`M${F2.x},${F2.y} C470,370 510,370 560,360`}
        />
        <path
          className="vg-path vg-branch"
          strokeWidth="2.6"
          d={`M${F2.x},${F2.y} C380,430 360,470 ${F4.x},${F4.y}`}
        />

        {/* From F3 */}
        <path
          className="vg-path vg-branch"
          strokeWidth="2.8"
          d={`M${F3.x},${F3.y} C170,330 130,360 80,380`}
        />
        <path
          className="vg-path vg-branch"
          strokeWidth="2.6"
          d={`M${F3.x},${F3.y} C280,330 320,330 360,310`}
        />

        {/* From tip T1 — secondary spread */}
        <path
          className="vg-path vg-branch"
          strokeWidth="2.4"
          d={`M${T1.x},${T1.y} C580,500 590,470 600,440`}
        />

        {/* === CAPILLARIES — fan out from branch tips === */}
        {/* B1 end ≈ (430,170) */}
        <path className="vg-path vg-cap" strokeWidth="1.4" d="M430,170 C470,160 510,150 540,140" />
        <path className="vg-path vg-cap" strokeWidth="1.2" d="M430,170 C460,180 490,200 520,210" />
        <path className="vg-path vg-cap" strokeWidth="1.0" d="M430,170 C440,140 460,120 480,100" />

        {/* B2 end ≈ (150,360) */}
        <path className="vg-path vg-cap" strokeWidth="1.3" d="M150,360 C130,400 120,440 110,490" />
        <path className="vg-path vg-cap" strokeWidth="1.1" d="M150,360 C110,360 80,380 50,400" />

        {/* B3 end ≈ (560,360) */}
        <path className="vg-path vg-cap" strokeWidth="1.2" d="M560,360 C580,380 590,400 595,430" />
        <path className="vg-path vg-cap" strokeWidth="1.0" d="M560,360 C580,340 590,320 595,290" />

        {/* B4 end → F4 (360,480) — splits again */}
        <path className="vg-path vg-cap"  strokeWidth="1.4" d="M360,480 C400,510 430,540 460,580" />
        <path className="vg-path vg-cap"  strokeWidth="1.2" d="M360,480 C340,520 320,560 310,600" />
        <path className="vg-path vg-cap" strokeWidth="1.0" d="M360,480 C390,470 420,470 450,460" />

        {/* B5 end ≈ (80,380) */}
        <path className="vg-path vg-cap" strokeWidth="1.1" d="M80,380 C50,400 30,430 10,470" />
        <path className="vg-path vg-cap" strokeWidth="1.0" d="M80,380 C70,420 70,450 80,490" />

        {/* B6 end ≈ (360,310) */}
        <path className="vg-path vg-cap" strokeWidth="1.2" d="M360,310 C400,310 430,320 460,330" />
        <path className="vg-path vg-cap" strokeWidth="1.0" d="M360,310 C390,290 410,280 440,270" />
      </g>

      <style>{`
        /* Shared 14 s cycle. All three tiers have the same duration, so
           every cycle ends with every path invisible at 100% and the whole
           network restarts together at 0%. Tier timing is encoded inside
           the keyframes — no animation-delay, so cycles never drift. */
        .vg-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          opacity: 0;
        }
        .vg-trunk  { animation: vgTrunk  14s ease-in-out infinite; }
        .vg-branch { animation: vgBranch 14s ease-in-out infinite; }
        .vg-cap    { animation: vgCap    14s ease-in-out infinite; }

        @keyframes vgTrunk {
          0%, 30%   { stroke-dashoffset: 1000; opacity: 0; }
          34%       {                          opacity: 1; }
          46%       { stroke-dashoffset: 0;    opacity: 1; }
          85%       { stroke-dashoffset: 0;    opacity: 1; }
          98%, 100% { stroke-dashoffset: 0;    opacity: 0; }
        }
        @keyframes vgBranch {
          0%, 42%   { stroke-dashoffset: 1000; opacity: 0; }
          45%       {                          opacity: 1; }
          56%       { stroke-dashoffset: 0;    opacity: 1; }
          85%       { stroke-dashoffset: 0;    opacity: 1; }
          98%, 100% { stroke-dashoffset: 0;    opacity: 0; }
        }
        @keyframes vgCap {
          0%, 54%   { stroke-dashoffset: 1000; opacity: 0; }
          57%       {                          opacity: 1; }
          66%       { stroke-dashoffset: 0;    opacity: 1; }
          85%       { stroke-dashoffset: 0;    opacity: 1; }
          98%, 100% { stroke-dashoffset: 0;    opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
