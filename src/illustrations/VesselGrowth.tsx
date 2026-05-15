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

  // Waypoints redesigned for maximum spread: wide horizontal fan reaching
  // into the hero text area, plus clear vertical angle diversity so branches
  // don't clump. High x = left on screen after the bottom-right rotation.
  const F1 = { x: 185, y:  88 };  // trunk-A first fork
  const F2 = { x: 345, y: 105 };  // trunk-A second fork
  const F3 = { x: 135, y: 188 };  // trunk-B fork (angled upward)
  const F4 = { x: 295, y:  58 };  // trunk-C fork (very horizontal)
  const F5 = { x:  80, y: 268 };  // trunk-D fork (steeper upward)
  const T1 = { x: 485, y: 128 };  // trunk-A tip — reaches into text area
  const T2 = { x: 220, y: 308 };  // trunk-B tip
  const T3 = { x: 540, y:  72 };  // trunk-C tip — very horizontal, deep in text area
  const T4 = { x: 145, y: 382 };  // trunk-D tip — moderate height (below logo zone)

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

        {/* === TRUNKS — 7 arteries with wide angle diversity from the corner === */}
        <path className="vg-path vg-t1" strokeWidth="6.5"
          d={`M40,40 C82,52 130,68 ${F1.x},${F1.y}`} />
        <path className="vg-path vg-t2" strokeWidth="5.8"
          d={`M${F1.x},${F1.y} C248,95 298,100 ${F2.x},${F2.y}`} />
        <path className="vg-path vg-t3" strokeWidth="4.8"
          d={`M${F2.x},${F2.y} C398,112 442,118 ${T1.x},${T1.y}`} />
        <path className="vg-path vg-t4" strokeWidth="5.4"
          d={`M40,40 C58,95 92,140 ${F3.x},${F3.y}`} />
        <path className="vg-path vg-t5" strokeWidth="4.4"
          d={`M${F3.x},${F3.y} C172,232 198,268 ${T2.x},${T2.y}`} />
        <path className="vg-path vg-t6" strokeWidth="5.6"
          d={`M40,40 C110,44 195,50 ${F4.x},${F4.y} C382,62 458,66 ${T3.x},${T3.y}`} />
        <path className="vg-path vg-t7" strokeWidth="4.8"
          d={`M40,40 C45,125 58,192 ${F5.x},${F5.y} C100,310 122,348 ${T4.x},${T4.y}`} />

        {/* === BRANCHES — each pair from a fork fans in clearly different
              directions to avoid clumping. Some reach deep into the text area. === */}
        {/* From F1 — one horizontal, one steep upward */}
        <path className="vg-path vg-b1" strokeWidth="3.4"
          d={`M${F1.x},${F1.y} C222,68 252,55 282,48`} />
        <path className="vg-path vg-b2" strokeWidth="3.0"
          d={`M${F1.x},${F1.y} C152,148 135,182 122,215`} />

        {/* From F2 — one sweeping horizontal, one going upward at 45° */}
        <path className="vg-path vg-b3" strokeWidth="3.2"
          d={`M${F2.x},${F2.y} C392,82 422,68 445,60`} />
        <path className="vg-path vg-b4" strokeWidth="2.8"
          d={`M${F2.x},${F2.y} C335,175 330,208 325,242`} />

        {/* From F3 — one nearly horizontal, one heading steeply upward */}
        <path className="vg-path vg-b5" strokeWidth="2.8"
          d={`M${F3.x},${F3.y} C192,178 228,168 262,162`} />
        <path className="vg-path vg-b6" strokeWidth="2.6"
          d={`M${F3.x},${F3.y} C112,238 92,268 78,298`} />

        {/* From F4 — one very flat (far across bottom), one angling up */}
        <path className="vg-path vg-b7" strokeWidth="3.0"
          d={`M${F4.x},${F4.y} C345,38 375,25 408,18`} />
        <path className="vg-path vg-b8" strokeWidth="2.6"
          d={`M${F4.x},${F4.y} C275,112 255,148 242,182`} />

        {/* From F5 — one continuing upward, one spreading horizontally */}
        <path className="vg-path vg-b9" strokeWidth="2.6"
          d={`M${F5.x},${F5.y} C62,318 48,352 38,388`} />
        <path className="vg-path vg-b10" strokeWidth="2.4"
          d={`M${F5.x},${F5.y} C148,255 188,242 228,235`} />

        {/* From trunk tips — continuing horizontal AND heading upward */}
        <path className="vg-path vg-b11" strokeWidth="2.8"
          d={`M${T1.x},${T1.y} C518,138 542,142 562,148`} />
        <path className="vg-path vg-b12" strokeWidth="2.6"
          d={`M${T1.x},${T1.y} C475,188 468,218 462,252`} />
        <path className="vg-path vg-b13" strokeWidth="2.6"
          d={`M${T2.x},${T2.y} C235,352 242,368 248,385`} />
        <path className="vg-path vg-b14" strokeWidth="2.4"
          d={`M${T3.x},${T3.y} C558,95 572,105 582,112`} />
        {/* b15: upward from T3 — sweeps into the text area at height */}
        <path className="vg-path vg-b15" strokeWidth="2.4"
          d={`M${T3.x},${T3.y} C542,138 545,165 548,198`} />

        {/* === CAPILLARIES — wide-angle fans from each branch tip === */}
        {/* B1 tip ≈ (282, 48) */}
        <path className="vg-path vg-c1"  strokeWidth="1.4" d="M282,48 C322,35 362,24 402,15" />
        <path className="vg-path vg-c2"  strokeWidth="1.2" d="M282,48 C308,72 332,92 358,110" />
        <path className="vg-path vg-c3"  strokeWidth="1.0" d="M282,48 C302,28 328,14 358,6" />

        {/* B2 tip ≈ (122, 215) */}
        <path className="vg-path vg-c4"  strokeWidth="1.3" d="M122,215 C92,248 75,272 58,305" />
        <path className="vg-path vg-c5"  strokeWidth="1.1" d="M122,215 C85,222 55,232 28,240" />
        <path className="vg-path vg-c6"  strokeWidth="1.0" d="M122,215 C138,248 150,272 158,305" />

        {/* B3 tip ≈ (445, 60) */}
        <path className="vg-path vg-c7"  strokeWidth="1.3" d="M445,60 C482,48 520,36 558,26" />
        <path className="vg-path vg-c8"  strokeWidth="1.1" d="M445,60 C468,82 490,102 512,120" />
        <path className="vg-path vg-c9"  strokeWidth="1.0" d="M445,60 C462,38 484,20 508,10" />

        {/* B4 tip ≈ (325, 242) */}
        <path className="vg-path vg-c10" strokeWidth="1.3" d="M325,242 C330,282 328,312 322,345" />
        <path className="vg-path vg-c11" strokeWidth="1.1" d="M325,242 C355,258 378,270 405,282" />
        <path className="vg-path vg-c12" strokeWidth="1.0" d="M325,242 C298,258 275,272 250,285" />

        {/* B6 tip ≈ (78, 298) */}
        <path className="vg-path vg-c13" strokeWidth="1.2" d="M78,298 C52,332 38,358 24,392" />
        <path className="vg-path vg-c14" strokeWidth="1.0" d="M78,298 C45,306 18,318 -4,325" />
        <path className="vg-path vg-c15" strokeWidth="1.0" d="M78,298 C95,330 105,355 112,385" />

        {/* B7 tip ≈ (408, 18) */}
        <path className="vg-path vg-c16" strokeWidth="1.2" d="M408,18 C448,10 490,6 532,4" />
        <path className="vg-path vg-c17" strokeWidth="1.0" d="M408,18 C432,40 452,56 472,72" />

        {/* B11 tip ≈ (562, 148) — deep in text area */}
        <path className="vg-path vg-c18" strokeWidth="1.1" d="M562,148 C580,158 592,172 596,192" />
        <path className="vg-path vg-c19" strokeWidth="1.0" d="M562,148 C576,128 585,112 590,94" />

        {/* B12 tip ≈ (462, 252) */}
        <path className="vg-path vg-c20" strokeWidth="1.1" d="M462,252 C482,275 498,295 512,318" />
        <path className="vg-path vg-c21" strokeWidth="1.0" d="M462,252 C448,278 435,298 418,322" />

        {/* B13 tip ≈ (248, 385) — below logo zone */}
        <path className="vg-path vg-c22" strokeWidth="1.0" d="M248,385 C252,393 255,397 258,400" />

        {/* B14 tip ≈ (582, 112) — far into text area */}
        <path className="vg-path vg-c23" strokeWidth="1.0" d="M582,112 C592,122 596,135 596,150" />
        <path className="vg-path vg-c24" strokeWidth="1.0" d="M582,112 C588,92 592,75 594,58" />

        {/* B15 tip ≈ (548, 198) — crosses text area at mid-height */}
        <path className="vg-path vg-c25" strokeWidth="1.0" d="M548,198 C568,210 580,225 588,245" />
        <path className="vg-path vg-c26" strokeWidth="1.0" d="M548,198 C558,175 562,155 565,135" />
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
        .vg-b15 { animation-delay: 8.2s; }
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
        .vg-c23 { animation-delay: 9.4s; }
        .vg-c24 { animation-delay: 9.5s; }
        .vg-c25 { animation-delay: 9.5s; }
        .vg-c26 { animation-delay: 9.6s; }
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
