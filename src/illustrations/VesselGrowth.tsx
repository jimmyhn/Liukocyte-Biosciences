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

  // Shared waypoints (fork / tip coords). Reused for parent endpoints +
  // child start points so the tree always connects cleanly.
  const F1 = { x: 180, y: 160 };  // trunk-A first fork
  const F2 = { x: 320, y: 230 };  // trunk-A second fork
  const F3 = { x: 180, y: 280 };  // trunk-B fork
  const F4 = { x: 280, y: 120 };  // trunk-C fork
  const F5 = { x: 120, y: 200 };  // trunk-D fork
  const T1 = { x: 440, y: 280 };  // trunk-A tip
  const T2 = { x: 320, y: 380 };  // trunk-B tip
  const T3 = { x: 520, y: 180 };  // trunk-C tip
  const T4 = { x: 180, y: 440 };  // trunk-D tip

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

        {/* === TRUNKS — 7 main arteries radiating from the corner === */}
        <path className="vg-path vg-t1" strokeWidth="6.5"
          d={`M40,40 C100,90 140,140 ${F1.x},${F1.y}`} />
        <path className="vg-path vg-t2" strokeWidth="5.8"
          d={`M${F1.x},${F1.y} C240,180 290,210 ${F2.x},${F2.y}`} />
        <path className="vg-path vg-t3" strokeWidth="4.8"
          d={`M${F2.x},${F2.y} C370,250 410,270 ${T1.x},${T1.y}`} />
        <path className="vg-path vg-t4" strokeWidth="5.4"
          d={`M40,40 C80,140 140,220 ${F3.x},${F3.y}`} />
        <path className="vg-path vg-t5" strokeWidth="4.4"
          d={`M${F3.x},${F3.y} C220,320 280,350 ${T2.x},${T2.y}`} />
        <path className="vg-path vg-t6" strokeWidth="5.6"
          d={`M40,40 C140,70 220,90 ${F4.x},${F4.y} C380,140 460,160 ${T3.x},${T3.y}`} />
        <path className="vg-path vg-t7" strokeWidth="4.8"
          d={`M40,40 C60,120 90,160 ${F5.x},${F5.y} C140,260 170,360 ${T4.x},${T4.y}`} />

        {/* === BRANCHES — sprout from fork points and trunk tips === */}
        {/* From F1 */}
        <path className="vg-path vg-b1" strokeWidth="3.4"
          d={`M${F1.x},${F1.y} C220,120 270,90 320,80`} />
        <path className="vg-path vg-b2" strokeWidth="3.0"
          d={`M${F1.x},${F1.y} C160,220 140,250 130,290`} />

        {/* From F2 */}
        <path className="vg-path vg-b3" strokeWidth="3.2"
          d={`M${F2.x},${F2.y} C380,180 430,160 480,140`} />
        <path className="vg-path vg-b4" strokeWidth="2.8"
          d={`M${F2.x},${F2.y} C300,290 290,330 280,370`} />

        {/* From F3 */}
        <path className="vg-path vg-b5" strokeWidth="2.8"
          d={`M${F3.x},${F3.y} C220,260 250,240 290,230`} />
        <path className="vg-path vg-b6" strokeWidth="2.6"
          d={`M${F3.x},${F3.y} C160,340 140,390 130,430`} />

        {/* From F4 */}
        <path className="vg-path vg-b7" strokeWidth="3.0"
          d={`M${F4.x},${F4.y} C330,90 380,60 430,40`} />
        <path className="vg-path vg-b8" strokeWidth="2.6"
          d={`M${F4.x},${F4.y} C260,170 230,200 200,220`} />

        {/* From F5 */}
        <path className="vg-path vg-b9" strokeWidth="2.6"
          d={`M${F5.x},${F5.y} C90,260 80,300 70,340`} />
        <path className="vg-path vg-b10" strokeWidth="2.4"
          d={`M${F5.x},${F5.y} C170,180 200,170 240,150`} />

        {/* From trunk tips */}
        <path className="vg-path vg-b11" strokeWidth="2.8"
          d={`M${T1.x},${T1.y} C490,260 530,250 570,240`} />
        <path className="vg-path vg-b12" strokeWidth="2.6"
          d={`M${T1.x},${T1.y} C450,330 460,370 460,410`} />
        <path className="vg-path vg-b13" strokeWidth="2.6"
          d={`M${T2.x},${T2.y} C360,420 390,450 400,490`} />
        <path className="vg-path vg-b14" strokeWidth="2.4"
          d={`M${T3.x},${T3.y} C560,210 580,240 590,280`} />

        {/* === CAPILLARIES — fan out from each branch tip === */}
        {/* B1 tip ≈ (320, 80) */}
        <path className="vg-path vg-c1"  strokeWidth="1.4" d="M320,80 C360,70 400,60 440,50" />
        <path className="vg-path vg-c2"  strokeWidth="1.2" d="M320,80 C350,100 380,120 420,130" />
        <path className="vg-path vg-c3"  strokeWidth="1.0" d="M320,80 C330,50 350,30 380,20" />

        {/* B2 tip ≈ (130, 290) */}
        <path className="vg-path vg-c4"  strokeWidth="1.3" d="M130,290 C110,330 100,360 90,400" />
        <path className="vg-path vg-c5"  strokeWidth="1.1" d="M130,290 C90,300 60,320 30,330" />
        <path className="vg-path vg-c6"  strokeWidth="1.0" d="M130,290 C150,320 170,340 180,370" />

        {/* B3 tip ≈ (480, 140) */}
        <path className="vg-path vg-c7"  strokeWidth="1.3" d="M480,140 C520,130 560,120 590,110" />
        <path className="vg-path vg-c8"  strokeWidth="1.1" d="M480,140 C510,160 530,180 555,200" />
        <path className="vg-path vg-c9"  strokeWidth="1.0" d="M480,140 C490,110 510,90 530,70" />

        {/* B4 tip ≈ (280, 370) */}
        <path className="vg-path vg-c10" strokeWidth="1.3" d="M280,370 C290,410 290,440 290,480" />
        <path className="vg-path vg-c11" strokeWidth="1.1" d="M280,370 C310,400 330,420 350,450" />
        <path className="vg-path vg-c12" strokeWidth="1.0" d="M280,370 C250,400 230,420 210,450" />

        {/* B6 tip ≈ (130, 430) */}
        <path className="vg-path vg-c13" strokeWidth="1.2" d="M130,430 C110,470 100,500 90,540" />
        <path className="vg-path vg-c14" strokeWidth="1.0" d="M130,430 C90,440 60,460 30,470" />
        <path className="vg-path vg-c15" strokeWidth="1.0" d="M130,430 C160,460 180,480 200,510" />

        {/* B7 tip ≈ (430, 40) */}
        <path className="vg-path vg-c16" strokeWidth="1.2" d="M430,40 C470,30 510,30 550,30" />
        <path className="vg-path vg-c17" strokeWidth="1.0" d="M430,40 C460,60 490,70 510,90" />

        {/* B11 tip ≈ (570, 240) */}
        <path className="vg-path vg-c18" strokeWidth="1.1" d="M570,240 C590,260 595,290 595,320" />
        <path className="vg-path vg-c19" strokeWidth="1.0" d="M570,240 C585,210 590,200 595,180" />

        {/* B12 tip ≈ (460, 410) */}
        <path className="vg-path vg-c20" strokeWidth="1.1" d="M460,410 C490,440 510,470 530,500" />
        <path className="vg-path vg-c21" strokeWidth="1.0" d="M460,410 C440,450 430,480 420,520" />

        {/* B13 tip ≈ (400, 490) — pulled back so it doesn't cross the logo at hero top-center */}
        <path className="vg-path vg-c22" strokeWidth="1.0" d="M400,490 C415,505 425,515 432,525" />

        {/* === MACROPHAGE-REACHING BRANCHES — extend up-left toward the
              macrophage cluster at the hero's top-left corner.
              Endpoints intentionally exceed the original x+y<800 constraint. === */}
        <path className="vg-path vg-bm1" strokeWidth="2.6"
          d={`M${T3.x},${T3.y} C540,260 555,360 565,440`} />
        <path className="vg-path vg-bm2" strokeWidth="2.2"
          d={`M${T1.x},${T1.y} C480,350 520,420 545,485`} />
        {/* Capillary tips off the macrophage-reaching branches */}
        <path className="vg-path vg-bm3" strokeWidth="1.2"
          d="M565,440 C575,460 580,475 585,490" />
        <path className="vg-path vg-bm4" strokeWidth="1.0"
          d="M545,485 C560,495 568,505 575,510" />
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
        /* Macrophage-reaching branches grow with the upper branches, tips at the end */
        .vg-bm1 { animation-delay: 8.2s; }
        .vg-bm2 { animation-delay: 8.4s; }
        .vg-bm3 { animation-delay: 9.4s; }
        .vg-bm4 { animation-delay: 9.6s; }

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
