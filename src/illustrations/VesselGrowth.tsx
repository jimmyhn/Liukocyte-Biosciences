import { useEffect, useId, useState } from "react";

/**
 * Blood-vessel regrowth illustration.
 *
 * viewBox is 800×600 (wider than the old 600×600). With the max-w-[1100px]
 * wrapper this makes the SVG height-bound (scale ≈ 1.5) so the full width
 * is visible and branches with high path-x (≥ 600) map to viewport x ≤ 500,
 * crossing into the hero text column. The wider coordinate space also gives
 * cleaner angle diversity between branches.
 *
 * High x in path coords = LEFT on screen (after scale(-1,-1) translate).
 * High y in path coords = HIGH on screen (toward viewport top).
 *
 * Logo-zone constraint (≈ viewport x 350–650, viewport y 30–80):
 * path x ≈ [410–530], path y ≈ [545–570] at 1440-wide viewport.
 * All branch endpoints stay below y=460 so they never hit the logo.
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
    "top-right":    "scale(-1, 1) translate(-800, 0)",
    "top-left":     "translate(0, 0)",
    "bottom-right": "scale(-1, -1) translate(-800, -600)",
    "bottom-left":  "scale(1, -1) translate(0, -600)",
  }[origin];

  // Waypoints — wider x range now possible with 800-wide viewBox.
  // px=630 → viewport x≈495 (in text area at 1440 screen).
  // px=698 → viewport x≈393 (past left edge of text column).
  const F1 = { x: 220, y: 105 };  // trunk-A first fork
  const F2 = { x: 400, y: 128 };  // trunk-A second fork
  const F3 = { x: 165, y: 210 };  // trunk-B fork (angled upward)
  const F4 = { x: 360, y:  68 };  // trunk-C fork (very horizontal)
  const F5 = { x: 100, y: 312 };  // trunk-D fork (steep upward)
  const T1 = { x: 560, y: 152 };  // trunk-A tip — reaches into text area
  const T2 = { x: 280, y: 355 };  // trunk-B tip
  const T3 = { x: 630, y:  88 };  // trunk-C tip — deepest horizontal reach
  const T4 = { x: 180, y: 438 };  // trunk-D tip — highest upward reach

  return (
    <svg
      viewBox="0 0 800 600"
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
        {/* Corner glow */}
        <circle cx="40" cy="40" r="280" fill={`url(#${gFade})`} stroke="none" opacity="0.97" />

        {/* === TRUNKS — 7 arteries fanning from the corner with wide angles === */}
        <path className="vg-path vg-t1" strokeWidth="6.5"
          d={`M40,40 C100,62 158,82 ${F1.x},${F1.y}`} />
        <path className="vg-path vg-t2" strokeWidth="5.8"
          d={`M${F1.x},${F1.y} C298,115 350,122 ${F2.x},${F2.y}`} />
        <path className="vg-path vg-t3" strokeWidth="4.8"
          d={`M${F2.x},${F2.y} C468,138 515,145 ${T1.x},${T1.y}`} />
        <path className="vg-path vg-t4" strokeWidth="5.4"
          d={`M40,40 C70,115 112,162 ${F3.x},${F3.y}`} />
        <path className="vg-path vg-t5" strokeWidth="4.4"
          d={`M${F3.x},${F3.y} C210,268 248,310 ${T2.x},${T2.y}`} />
        <path className="vg-path vg-t6" strokeWidth="5.6"
          d={`M40,40 C138,55 248,62 ${F4.x},${F4.y} C458,75 542,82 ${T3.x},${T3.y}`} />
        <path className="vg-path vg-t7" strokeWidth="4.8"
          d={`M40,40 C55,148 72,228 ${F5.x},${F5.y} C128,368 155,405 ${T4.x},${T4.y}`} />

        {/* === BRANCHES — each fork pair fans in clearly different directions === */}
        {/* From F1 — one horizontal, one steep upward */}
        <path className="vg-path vg-b1" strokeWidth="3.4"
          d={`M${F1.x},${F1.y} C268,75 298,58 328,48`} />
        <path className="vg-path vg-b2" strokeWidth="3.0"
          d={`M${F1.x},${F1.y} C178,158 162,195 148,255`} />

        {/* From F2 — horizontal extension vs upward arc */}
        <path className="vg-path vg-b3" strokeWidth="3.2"
          d={`M${F2.x},${F2.y} C452,98 480,88 510,78`} />
        <path className="vg-path vg-b4" strokeWidth="2.8"
          d={`M${F2.x},${F2.y} C392,195 390,235 386,278`} />

        {/* From F3 — horizontal spread vs steep climb */}
        <path className="vg-path vg-b5" strokeWidth="2.8"
          d={`M${F3.x},${F3.y} C218,192 255,185 295,182`} />
        <path className="vg-path vg-b6" strokeWidth="2.6"
          d={`M${F3.x},${F3.y} C135,268 118,305 108,350`} />

        {/* From F4 — very flat sweep vs angled upward */}
        <path className="vg-path vg-b7" strokeWidth="3.0"
          d={`M${F4.x},${F4.y} C415,42 452,28 490,18`} />
        <path className="vg-path vg-b8" strokeWidth="2.6"
          d={`M${F4.x},${F4.y} C328,128 312,172 295,212`} />

        {/* From F5 — continuing upward vs horizontal spread */}
        <path className="vg-path vg-b9" strokeWidth="2.6"
          d={`M${F5.x},${F5.y} C72,360 58,398 45,442`} />
        <path className="vg-path vg-b10" strokeWidth="2.4"
          d={`M${F5.x},${F5.y} C158,285 198,272 240,262`} />

        {/* From T1 — continue horizontal (deep into text area) vs go upward */}
        <path className="vg-path vg-b11" strokeWidth="2.8"
          d={`M${T1.x},${T1.y} C598,165 622,172 648,182`} />
        <path className="vg-path vg-b12" strokeWidth="2.6"
          d={`M${T1.x},${T1.y} C548,218 542,255 538,292`} />

        {/* From T2 — upward continuation */}
        <path className="vg-path vg-b13" strokeWidth="2.6"
          d={`M${T2.x},${T2.y} C298,408 308,428 318,445`} />

        {/* From T3 — horizontal continuation + upward arc into text area */}
        <path className="vg-path vg-b14" strokeWidth="2.4"
          d={`M${T3.x},${T3.y} C658,105 678,115 698,125`} />
        <path className="vg-path vg-b15" strokeWidth="2.4"
          d={`M${T3.x},${T3.y} C638,168 642,208 648,248`} />

        {/* === CAPILLARIES — fine tips fanning from each branch end === */}
        {/* B1 tip ≈ (328, 48) */}
        <path className="vg-path vg-c1"  strokeWidth="1.4" d="M328,48 C368,35 408,22 448,12" />
        <path className="vg-path vg-c2"  strokeWidth="1.2" d="M328,48 C352,75 375,98 400,115" />
        <path className="vg-path vg-c3"  strokeWidth="1.0" d="M328,48 C355,28 388,12 420,4" />

        {/* B2 tip ≈ (148, 255) */}
        <path className="vg-path vg-c4"  strokeWidth="1.3" d="M148,255 C118,292 98,322 78,358" />
        <path className="vg-path vg-c5"  strokeWidth="1.1" d="M148,255 C112,260 80,268 48,272" />
        <path className="vg-path vg-c6"  strokeWidth="1.0" d="M148,255 C165,295 175,325 182,358" />

        {/* B3 tip ≈ (510, 78) */}
        <path className="vg-path vg-c7"  strokeWidth="1.3" d="M510,78 C548,62 582,48 618,35" />
        <path className="vg-path vg-c8"  strokeWidth="1.1" d="M510,78 C530,105 548,128 562,152" />
        <path className="vg-path vg-c9"  strokeWidth="1.0" d="M510,78 C535,55 562,35 590,18" />

        {/* B4 tip ≈ (386, 278) */}
        <path className="vg-path vg-c10" strokeWidth="1.3" d="M386,278 C392,332 392,368 388,405" />
        <path className="vg-path vg-c11" strokeWidth="1.1" d="M386,278 C418,298 445,315 472,330" />
        <path className="vg-path vg-c12" strokeWidth="1.0" d="M386,278 C358,298 335,315 312,330" />

        {/* B6 tip ≈ (108, 350) */}
        <path className="vg-path vg-c13" strokeWidth="1.2" d="M108,350 C80,390 62,418 42,455" />
        <path className="vg-path vg-c14" strokeWidth="1.0" d="M108,350 C72,358 42,368 12,375" />
        <path className="vg-path vg-c15" strokeWidth="1.0" d="M108,350 C122,385 130,412 135,445" />

        {/* B7 tip ≈ (490, 18) */}
        <path className="vg-path vg-c16" strokeWidth="1.2" d="M490,18 C535,8 575,4 615,2" />
        <path className="vg-path vg-c17" strokeWidth="1.0" d="M490,18 C515,45 535,65 552,88" />

        {/* B11 tip ≈ (648, 182) — viewport x≈480 at 1440, inside text area */}
        <path className="vg-path vg-c18" strokeWidth="1.1" d="M648,182 C672,198 688,218 698,242" />
        <path className="vg-path vg-c19" strokeWidth="1.0" d="M648,182 C662,158 670,135 672,112" />

        {/* B12 tip ≈ (538, 292) */}
        <path className="vg-path vg-c20" strokeWidth="1.1" d="M538,292 C558,322 572,348 582,378" />
        <path className="vg-path vg-c21" strokeWidth="1.0" d="M538,292 C518,322 500,348 478,372" />

        {/* B13 tip ≈ (318, 445) */}
        <path className="vg-path vg-c22" strokeWidth="1.0" d="M318,445 C325,455 328,460 330,465" />

        {/* B14 tip ≈ (698, 125) — viewport x≈393 at 1440, deep in text area */}
        <path className="vg-path vg-c23" strokeWidth="1.1" d="M698,125 C718,142 728,162 732,182" />
        <path className="vg-path vg-c24" strokeWidth="1.0" d="M698,125 C712,102 718,80 720,58" />

        {/* B15 tip ≈ (648, 248) — viewport x≈480, y≈528 — middle of text height */}
        <path className="vg-path vg-c25" strokeWidth="1.1" d="M648,248 C668,268 680,292 688,318" />
        <path className="vg-path vg-c26" strokeWidth="1.0" d="M648,248 C658,222 662,198 662,172" />
      </g>

      <style>{`
        .vg-path {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          opacity: 0;
          animation: vgDraw 9s ease-in-out 1 forwards;
        }
        .vg-t1 { animation-delay: 6.0s; }
        .vg-t2 { animation-delay: 6.4s; }
        .vg-t3 { animation-delay: 6.8s; }
        .vg-t4 { animation-delay: 6.3s; }
        .vg-t5 { animation-delay: 6.7s; }
        .vg-t6 { animation-delay: 6.5s; }
        .vg-t7 { animation-delay: 6.9s; }
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
        .vg-b15 { animation-delay: 8.2s; }
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
        .vg-c23 { animation-delay: 9.4s; }
        .vg-c24 { animation-delay: 9.5s; }
        .vg-c25 { animation-delay: 9.5s; }
        .vg-c26 { animation-delay: 9.6s; }

        @keyframes vgDraw {
          0%   { stroke-dashoffset: 1200; opacity: 0;    }
          6%   {                          opacity: 1;    }
          50%  { stroke-dashoffset: 0;    opacity: 1;    }
          78%  { stroke-dashoffset: 0;    opacity: 0.95; }
          100% { stroke-dashoffset: 0;    opacity: 0;    }
        }
      `}</style>
    </svg>
  );
}
