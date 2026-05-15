import { useEffect, useId, useState } from "react";

/**
 * Blood-vessel regrowth illustration — v2, bottom-right origin.
 *
 * Preserves the exact tree shape from v2 (two main trunks, deliberate
 * bifurcation fork points, branch → capillary fan-out). The geometry is
 * drawn in a coordinate space where (0,0) is the top-left; the group
 * transform scale(-1,-1) translate(-1000,-600) mirrors it so the root
 * maps to the bottom-right corner of the 1000×600 viewBox.
 *
 * All coordinates fit within 0–980 (x) × 0–590 (y) so they stay inside
 * the viewport after the flip.
 */
type Props = {
  className?: string;
  origin?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

const CYCLE_MS = 22000;

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
    "top-right":    "scale(-1, 1) translate(-1000, 0)",
    "top-left":     "translate(0, 0)",
    "bottom-right": "scale(-1, -1) translate(-1000, -600)",
    "bottom-left":  "scale(1, -1) translate(0, -600)",
  }[origin];

  // Fork / tip points — same logical positions as v2 but scaled to fill
  // the wider 1000-wide canvas (original was 600-wide, ×1.55 horizontal,
  // ×0.95 vertical so the tree fans out wider without getting too tall).
  const F1 = { x: 310, y: 215 };   // first bifurcation on Trunk-A
  const F2 = { x: 510, y: 360 };   // second bifurcation on Trunk-A
  const F3 = { x: 255, y: 305 };   // bifurcation on Trunk-B
  const F4 = { x: 435, y: 458 };   // bifurcation on Trunk-A tip
  const T1 = { x: 660, y: 515 };   // tip of Trunk-A
  const T2 = { x: 385, y: 535 };   // tip of Trunk-B

  return (
    <svg
      viewBox="0 0 1000 600"
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
          <stop offset="0%"   stopColor="#F58A4B" stopOpacity="0.55" />
          <stop offset="55%"  stopColor="#F58A4B" stopOpacity="0.22" />
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
        {/* Corner glow — origin is (0,0) in this flipped space */}
        <circle cx="40" cy="40" r="260" fill={`url(#${gFade})`} stroke="none" opacity="0.9" />

        {/* ================================================================
            TRUNKS — two main arteries emerge from the corner (0,0)
            ================================================================ */}

        {/* Trunk A — sweeps diagonally outward, bifurcates at F1 then F2 */}
        <path className="vg-path vg-t1a" strokeWidth="6.2"
          d={`M40,40 C155,95 235,155 ${F1.x},${F1.y}`} />
        <path className="vg-path vg-t1b" strokeWidth="5.5"
          d={`M${F1.x},${F1.y} C385,278 455,322 ${F2.x},${F2.y}`} />
        <path className="vg-path vg-t1c" strokeWidth="4.7"
          d={`M${F2.x},${F2.y} C565,402 620,468 ${T1.x},${T1.y} C685,535 715,555 740,575`} />

        {/* Trunk B — shallower angle, bifurcates at F3 */}
        <path className="vg-path vg-t2a" strokeWidth="5.2"
          d={`M40,40 C105,135 185,238 ${F3.x},${F3.y}`} />
        <path className="vg-path vg-t2b" strokeWidth="4.2"
          d={`M${F3.x},${F3.y} C308,382 355,468 ${T2.x},${T2.y} C408,555 420,565 432,575`} />

        {/* ================================================================
            BRANCHES — sprout from each fork point
            ================================================================ */}

        {/* From F1 */}
        <path className="vg-path vg-b1" strokeWidth="3.3"
          d={`M${F1.x},${F1.y} C365,192 435,172 520,162`} />
        <path className="vg-path vg-b2" strokeWidth="2.9"
          d={`M${F1.x},${F1.y} C265,248 212,295 178,342`} />

        {/* From F2 */}
        <path className="vg-path vg-b3" strokeWidth="3.1"
          d={`M${F2.x},${F2.y} C578,352 622,352 685,342`} />
        <path className="vg-path vg-b4" strokeWidth="2.7"
          d={`M${F2.x},${F2.y} C462,410 435,448 ${F4.x},${F4.y}`} />

        {/* From F3 */}
        <path className="vg-path vg-b5" strokeWidth="2.9"
          d={`M${F3.x},${F3.y} C200,315 152,342 94,362`} />
        <path className="vg-path vg-b6" strokeWidth="2.7"
          d={`M${F3.x},${F3.y} C335,315 385,315 435,295`} />

        {/* From tip T1 — secondary spread */}
        <path className="vg-path vg-b7" strokeWidth="2.5"
          d={`M${T1.x},${T1.y} C705,475 718,448 730,418`} />

        {/* ================================================================
            CAPILLARIES — fine tips fanning from branch ends
            ================================================================ */}

        {/* B1 end ≈ (520,162) */}
        <path className="vg-path vg-c1" strokeWidth="1.4" d="M520,162 C565,152 608,142 648,132" />
        <path className="vg-path vg-c2" strokeWidth="1.2" d="M520,162 C556,172 590,192 622,202" />
        <path className="vg-path vg-c3" strokeWidth="1.0" d="M520,162 C532,132 555,112 578,92" />

        {/* B2 end ≈ (178,342) */}
        <path className="vg-path vg-c4" strokeWidth="1.3" d="M178,342 C154,382 142,420 130,468" />
        <path className="vg-path vg-c5" strokeWidth="1.1" d="M178,342 C130,342 94,362 58,382" />

        {/* B3 end ≈ (685,342) */}
        <path className="vg-path vg-c6" strokeWidth="1.2" d="M685,342 C708,362 718,382 724,410" />
        <path className="vg-path vg-c7" strokeWidth="1.0" d="M685,342 C708,322 718,302 724,272" />

        {/* B4 end → F4 (435,458) — splits again */}
        <path className="vg-path vg-c8"  strokeWidth="1.4" d="M435,458 C482,488 518,515 550,552" />
        <path className="vg-path vg-c9"  strokeWidth="1.2" d="M435,458 C408,495 384,532 372,572" />
        <path className="vg-path vg-c10" strokeWidth="1.0" d="M435,458 C470,448 505,448 538,438" />

        {/* B5 end ≈ (94,362) */}
        <path className="vg-path vg-c11" strokeWidth="1.1" d="M94,362 C58,382 32,410 10,448" />
        <path className="vg-path vg-c12" strokeWidth="1.0" d="M94,362 C82,400 82,428 94,468" />

        {/* B6 end ≈ (435,295) */}
        <path className="vg-path vg-c13" strokeWidth="1.2" d="M435,295 C482,295 518,305 552,315" />
        <path className="vg-path vg-c14" strokeWidth="1.0" d="M435,295 C470,275 494,265 528,255" />
      </g>

      <style>{`
        .vg-path {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          opacity: 0;
          animation: vgDraw 9s ease-in-out 1 forwards;
        }

        /* Trunks first */
        .vg-t1a { animation-delay: 6.0s; }
        .vg-t1b { animation-delay: 6.6s; }
        .vg-t1c { animation-delay: 7.2s; }
        .vg-t2a { animation-delay: 6.3s; }
        .vg-t2b { animation-delay: 6.9s; }

        /* Branches */
        .vg-b1 { animation-delay: 7.4s; }
        .vg-b2 { animation-delay: 7.5s; }
        .vg-b3 { animation-delay: 7.6s; }
        .vg-b4 { animation-delay: 7.7s; }
        .vg-b5 { animation-delay: 7.5s; }
        .vg-b6 { animation-delay: 7.6s; }
        .vg-b7 { animation-delay: 7.8s; }

        /* Capillaries */
        .vg-c1  { animation-delay: 8.2s; }
        .vg-c2  { animation-delay: 8.3s; }
        .vg-c3  { animation-delay: 8.4s; }
        .vg-c4  { animation-delay: 8.3s; }
        .vg-c5  { animation-delay: 8.4s; }
        .vg-c6  { animation-delay: 8.4s; }
        .vg-c7  { animation-delay: 8.5s; }
        .vg-c8  { animation-delay: 8.5s; }
        .vg-c9  { animation-delay: 8.6s; }
        .vg-c10 { animation-delay: 8.6s; }
        .vg-c11 { animation-delay: 8.5s; }
        .vg-c12 { animation-delay: 8.6s; }
        .vg-c13 { animation-delay: 8.6s; }
        .vg-c14 { animation-delay: 8.7s; }

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