import { useEffect, useId, useState } from "react";

/**
 * Blood-vessel regrowth illustration.
 *
 * Tree-like angiogenesis with ~40 paths growing in three tiers: 7 trunks
 * emerging from the corner, 14 branches sprouting from fork points along
 * those trunks, and 22 capillaries fanning out from each branch tip.
 *
 * Path endpoints are constrained to NOT reach the (top-left in screen
 * space) — that's the macrophage corner — by keeping endpoints below the
 * line x + y < 800 in path coords (after the bottom-right rotation this
 * carves out the top-left ~third of the SVG for the macrophages).
 *
 * Animation: each path plays its 9 s draw-then-fade exactly once per cycle
 * (iteration-count: 1, fill-mode: forwards). A JS interval bumps a `cycle`
 * key every 20 s, which remounts the inner <g> so all paths restart in
 * perfect sync after the slowest one (delay 9.6 s + 9 s = 18.6 s) has
 * fully disappeared. Defs / gradients stay stable so the glow doesn't
 * flicker on restart.
 */
type Props = {
  className?: string;
  origin?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

const CYCLE_MS = 20000;

export function VesselGrowth({ className = "", origin = "bottom-right" }: Props) {
  const uid = useId().replace(/:/g, "");
  const gOrange = `vg-o-${uid}`;
  const gFade   = `vg-f-${uid}`;

  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const rotation = {
    "top-right":    "scale(-1, 1) translate(-600, 0)",
    "top-left":     "translate(0, 0)",
    "bottom-right": "scale(-1, -1) translate(-600, -600)",
    "bottom-left":  "scale(1, -1) translate(0, -600)",
  }[origin];

  // Waypoints redesigned for a wide HORIZONTAL fan spreading left across the
  // screen — vessels expand primarily leftward with only moderate upward reach.
  // High x in path coords = left on screen (after the bottom-right rotation).
  const F1 = { x: 200, y: 100 };  // trunk-A first fork
  const F2 = { x: 350, y: 120 };  // trunk-A second fork
  const F3 = { x: 155, y: 200 };  // trunk-B fork
  const F4 = { x: 310, y:  70 };  // trunk-C fork (very horizontal)
  const F5 = { x:  95, y: 275 };  // trunk-D fork (modest height)
  const T1 = { x: 490, y: 150 };  // trunk-A tip
  const T2 = { x: 275, y: 295 };  // trunk-B tip
  const T3 = { x: 525, y:  90 };  // trunk-C tip (very horizontal)
  const T4 = { x: 170, y: 370 };  // trunk-D tip (moderate height only)

  return (
    <svg
      viewBox="0 0 600 600"
      preserveAspectRatio="xMaxYMax slice"
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
          <stop offset="0%"   stopColor="#F58A4B" stopOpacity="0.78" />
          <stop offset="55%"  stopColor="#F58A4B" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F58A4B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g
        key={cycle}
        transform={rotation}
        fill="none"
        stroke={`url(#${gOrange})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Big orange glow at the origin corner */}
        <circle cx="40" cy="40" r="320" fill={`url(#${gFade})`} stroke="none" opacity="0.97" />

        {/* === TRUNKS — 7 main arteries radiating from the corner in a wide
              horizontal fan. High x in path coords = left on screen. === */}
        <path className="vg-path vg-t1" strokeWidth="6.5"
          d={`M40,40 C90,55 145,75 ${F1.x},${F1.y}`} />
        <path className="vg-path vg-t2" strokeWidth="5.8"
          d={`M${F1.x},${F1.y} C260,108 305,115 ${F2.x},${F2.y}`} />
        <path className="vg-path vg-t3" strokeWidth="4.8"
          d={`M${F2.x},${F2.y} C410,130 452,140 ${T1.x},${T1.y}`} />
        <path className="vg-path vg-t4" strokeWidth="5.4"
          d={`M40,40 C65,100 105,148 ${F3.x},${F3.y}`} />
        <path className="vg-path vg-t5" strokeWidth="4.4"
          d={`M${F3.x},${F3.y} C195,238 238,265 ${T2.x},${T2.y}`} />
        <path className="vg-path vg-t6" strokeWidth="5.6"
          d={`M40,40 C120,48 215,55 ${F4.x},${F4.y} C385,72 455,80 ${T3.x},${T3.y}`} />
        <path className="vg-path vg-t7" strokeWidth="4.8"
          d={`M40,40 C48,130 68,200 ${F5.x},${F5.y} C112,315 142,342 ${T4.x},${T4.y}`} />

        {/* === BRANCHES — spread wide and low, only modest upward climb === */}
        {/* From F1 */}
        <path className="vg-path vg-b1" strokeWidth="3.4"
          d={`M${F1.x},${F1.y} C225,72 255,62 285,55`} />
        <path className="vg-path vg-b2" strokeWidth="3.0"
          d={`M${F1.x},${F1.y} C172,158 155,198 140,228`} />

        {/* From F2 */}
        <path className="vg-path vg-b3" strokeWidth="3.2"
          d={`M${F2.x},${F2.y} C392,88 425,78 455,68`} />
        <path className="vg-path vg-b4" strokeWidth="2.8"
          d={`M${F2.x},${F2.y} C345,188 338,220 330,252`} />

        {/* From F3 */}
        <path className="vg-path vg-b5" strokeWidth="2.8"
          d={`M${F3.x},${F3.y} C198,188 235,182 268,178`} />
        <path className="vg-path vg-b6" strokeWidth="2.6"
          d={`M${F3.x},${F3.y} C132,248 110,278 90,310`} />

        {/* From F4 */}
        <path className="vg-path vg-b7" strokeWidth="3.0"
          d={`M${F4.x},${F4.y} C348,44 378,34 408,28`} />
        <path className="vg-path vg-b8" strokeWidth="2.6"
          d={`M${F4.x},${F4.y} C295,118 272,158 252,188`} />

        {/* From F5 */}
        <path className="vg-path vg-b9" strokeWidth="2.6"
          d={`M${F5.x},${F5.y} C72,325 62,358 52,390`} />
        <path className="vg-path vg-b10" strokeWidth="2.4"
          d={`M${F5.x},${F5.y} C155,262 195,252 232,242`} />

        {/* From trunk tips */}
        <path className="vg-path vg-b11" strokeWidth="2.8"
          d={`M${T1.x},${T1.y} C522,155 548,160 572,165`} />
        <path className="vg-path vg-b12" strokeWidth="2.6"
          d={`M${T1.x},${T1.y} C482,198 476,228 472,258`} />
        <path className="vg-path vg-b13" strokeWidth="2.6"
          d={`M${T2.x},${T2.y} C278,345 285,368 288,385`} />
        <path className="vg-path vg-b14" strokeWidth="2.4"
          d={`M${T3.x},${T3.y} C552,98 572,108 588,115`} />

        {/* === CAPILLARIES — fine tips fanning from branch ends === */}
        {/* B1 tip ≈ (285, 55) */}
        <path className="vg-path vg-c1"  strokeWidth="1.4" d="M285,55 C320,45 358,38 395,32" />
        <path className="vg-path vg-c2"  strokeWidth="1.2" d="M285,55 C308,78 335,98 362,112" />
        <path className="vg-path vg-c3"  strokeWidth="1.0" d="M285,55 C298,35 318,20 345,12" />

        {/* B2 tip ≈ (140, 228) */}
        <path className="vg-path vg-c4"  strokeWidth="1.3" d="M140,228 C112,258 95,282 78,312" />
        <path className="vg-path vg-c5"  strokeWidth="1.1" d="M140,228 C102,235 72,248 42,255" />
        <path className="vg-path vg-c6"  strokeWidth="1.0" d="M140,228 C158,255 172,275 182,302" />

        {/* B3 tip ≈ (455, 68) */}
        <path className="vg-path vg-c7"  strokeWidth="1.3" d="M455,68 C492,58 530,48 565,40" />
        <path className="vg-path vg-c8"  strokeWidth="1.1" d="M455,68 C478,88 498,108 518,125" />
        <path className="vg-path vg-c9"  strokeWidth="1.0" d="M455,68 C468,48 488,32 508,22" />

        {/* B4 tip ≈ (330, 252) */}
        <path className="vg-path vg-c10" strokeWidth="1.3" d="M330,252 C335,288 335,315 332,345" />
        <path className="vg-path vg-c11" strokeWidth="1.1" d="M330,252 C358,268 378,280 402,292" />
        <path className="vg-path vg-c12" strokeWidth="1.0" d="M330,252 C302,268 280,282 258,295" />

        {/* B6 tip ≈ (90, 310) */}
        <path className="vg-path vg-c13" strokeWidth="1.2" d="M90,310 C68,342 55,368 42,398" />
        <path className="vg-path vg-c14" strokeWidth="1.0" d="M90,310 C58,318 32,330 10,338" />
        <path className="vg-path vg-c15" strokeWidth="1.0" d="M90,310 C108,338 120,360 130,388" />

        {/* B7 tip ≈ (408, 28) */}
        <path className="vg-path vg-c16" strokeWidth="1.2" d="M408,28 C448,20 488,16 528,14" />
        <path className="vg-path vg-c17" strokeWidth="1.0" d="M408,28 C435,48 458,62 478,78" />

        {/* B11 tip ≈ (572, 165) */}
        <path className="vg-path vg-c18" strokeWidth="1.1" d="M572,165 C588,180 595,198 596,218" />
        <path className="vg-path vg-c19" strokeWidth="1.0" d="M572,165 C584,145 590,128 594,110" />

        {/* B12 tip ≈ (472, 258) */}
        <path className="vg-path vg-c20" strokeWidth="1.1" d="M472,258 C492,278 508,298 522,318" />
        <path className="vg-path vg-c21" strokeWidth="1.0" d="M472,258 C458,282 448,302 435,325" />

        {/* B13 tip ≈ (288, 385) — kept well below logo zone (y < 398) */}
        <path className="vg-path vg-c22" strokeWidth="1.0" d="M288,385 C295,392 298,396 300,400" />
      </g>

      <style>{`
        /* Each path animates once per cycle (iteration-count: 1) and stays
           at opacity 0 thanks to fill-mode: forwards. The whole tree restarts
           together when JS bumps the React key. No drift over time. */
        .vg-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          opacity: 0;
          animation: vgDraw 9s ease-in-out 1 forwards;
        }
        /* Trunks come in first after the 6s particle-ascent window */
        .vg-t1 { animation-delay: 6.0s; }
        .vg-t2 { animation-delay: 6.4s; }
        .vg-t3 { animation-delay: 6.8s; }
        .vg-t4 { animation-delay: 6.3s; }
        .vg-t5 { animation-delay: 6.7s; }
        .vg-t6 { animation-delay: 6.5s; }
        .vg-t7 { animation-delay: 6.9s; }
        /* Branches */
        .vg-b1  { animation-delay: 7.4s; }
        .vg-b2  { animation-delay: 7.5s; }
        .vg-b3  { animation-delay: 7.5s; }
        .vg-b4  { animation-delay: 7.6s; }
        .vg-b5  { animation-delay: 7.5s; }
        .vg-b6  { animation-delay: 7.7s; }
        .vg-b7  { animation-delay: 7.6s; }
        .vg-b8  { animation-delay: 7.7s; }
        .vg-b9  { animation-delay: 7.8s; }
        .vg-b10 { animation-delay: 7.7s; }
        .vg-b11 { animation-delay: 7.9s; }
        .vg-b12 { animation-delay: 8.0s; }
        .vg-b13 { animation-delay: 8.0s; }
        .vg-b14 { animation-delay: 8.1s; }
        /* Capillaries */
        .vg-c1  { animation-delay: 8.6s; }
        .vg-c2  { animation-delay: 8.7s; }
        .vg-c3  { animation-delay: 8.8s; }
        .vg-c4  { animation-delay: 8.7s; }
        .vg-c5  { animation-delay: 8.8s; }
        .vg-c6  { animation-delay: 8.8s; }
        .vg-c7  { animation-delay: 8.7s; }
        .vg-c8  { animation-delay: 8.8s; }
        .vg-c9  { animation-delay: 8.9s; }
        .vg-c10 { animation-delay: 8.9s; }
        .vg-c11 { animation-delay: 9.0s; }
        .vg-c12 { animation-delay: 9.0s; }
        .vg-c13 { animation-delay: 9.1s; }
        .vg-c14 { animation-delay: 9.1s; }
        .vg-c15 { animation-delay: 9.2s; }
        .vg-c16 { animation-delay: 9.2s; }
        .vg-c17 { animation-delay: 9.3s; }
        .vg-c18 { animation-delay: 9.3s; }
        .vg-c19 { animation-delay: 9.4s; }
        .vg-c20 { animation-delay: 9.4s; }
        .vg-c21 { animation-delay: 9.5s; }
        .vg-c22 { animation-delay: 9.6s; }
        @keyframes vgDraw {
          0%   { stroke-dashoffset: 1000; opacity: 0;    }
          6%   {                          opacity: 1;    }
          50%  { stroke-dashoffset: 0;    opacity: 1;    }
          78%  { stroke-dashoffset: 0;    opacity: 0.95; }
          100% { stroke-dashoffset: 0;    opacity: 0;    }
        }
      `}</style>
    </svg>
  );
}
