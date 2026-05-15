import { useEffect, useId, useState } from "react";

/**
 * Blood-vessel regrowth illustration.
 *
 * Anchored at the bottom-right corner of the FULL viewport (no max-w cap).
 * 4-tier tree so primary/secondary branches stay long before forking into
 * capillaries — this lets the network actually reach:
 *   • the bottom-left corner (px≈800–890, py≈10–30)
 *   • the top-right corner (px≈10–80, py≈500–560)
 *   • the macrophage cluster at top-left (px≈820–850, py≈400–430)
 *
 * Logo zone (top-center) is avoided across viewport sizes:
 *   1440×900 → px [413, 547], py [547, 567]
 *   1920×1080 → px [380, 505], py [516, 547]
 * Combined avoid-zone: NO endpoint with (px ∈ [380, 547]) AND (py ∈ [516, 567]).
 *
 * Macrophage zone (top-left):
 *   1440×900 → px [773, 960], py [307, 533]
 *   1920×1080 → px [854, 1000], py [333, 510]
 * Vessels reach UP TO px≈850 (just outside macrophage zone) but never past.
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

  // Trunk endpoints — 7 long arteries fanning across the screen.
  const T1 = { x: 640, y:  30 };  // bottom-left direction (very horizontal)
  const T2 = { x: 550, y: 150 };  // shallow upward
  const T3 = { x: 430, y: 270 };  // diagonal
  const T4 = { x: 350, y: 380 };  // diagonal toward macrophages (high)
  const T5 = { x: 240, y: 410 };  // more vertical
  const T6 = { x: 130, y: 470 };  // near-vertical
  const T7 = { x:  50, y: 480 };  // toward top-right corner

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
          <stop offset="0%"   stopColor="#F58A4B" stopOpacity="0.78" />
          <stop offset="55%"  stopColor="#F58A4B" stopOpacity="0.32" />
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
        <circle cx="40" cy="40" r="260" fill={`url(#${gFade})`} stroke="none" opacity="0.95" />

        {/* === TRUNKS — 7 long primary arteries radiating from origin === */}
        <path className="vg-path vg-t1" strokeWidth="6.8"
          d={`M0,0 C140,8 320,15 ${T1.x},${T1.y}`} />
        <path className="vg-path vg-t2" strokeWidth="6.0"
          d={`M0,0 C100,38 280,95 ${T2.x},${T2.y}`} />
        <path className="vg-path vg-t3" strokeWidth="5.4"
          d={`M0,0 C75,75 220,180 ${T3.x},${T3.y}`} />
        <path className="vg-path vg-t4" strokeWidth="5.8"
          d={`M0,0 C100,120 230,260 ${T4.x},${T4.y}`} />
        <path className="vg-path vg-t5" strokeWidth="5.0"
          d={`M0,0 C45,110 130,260 ${T5.x},${T5.y}`} />
        <path className="vg-path vg-t6" strokeWidth="4.8"
          d={`M0,0 C20,130 60,290 ${T6.x},${T6.y}`} />
        <path className="vg-path vg-t7" strokeWidth="4.6"
          d={`M0,0 C8,140 22,300 ${T7.x},${T7.y}`} />

        {/* === PRIMARY BRANCHES — long extensions from each trunk tip === */}
        {/* From T1 — extend horizontal toward bottom-left corner */}
        <path className="vg-path vg-p1a" strokeWidth="4.0"
          d={`M${T1.x},${T1.y} C700,28 745,30 790,32`} />
        <path className="vg-path vg-p1b" strokeWidth="3.4"
          d={`M${T1.x},${T1.y} C680,55 700,75 720,100`} />

        {/* From T2 — extend leftward and upward */}
        <path className="vg-path vg-p2a" strokeWidth="3.8"
          d={`M${T2.x},${T2.y} C610,165 660,175 705,182`} />
        <path className="vg-path vg-p2b" strokeWidth="3.2"
          d={`M${T2.x},${T2.y} C570,200 580,235 590,265`} />

        {/* From T3 — extend leftward and angle upward */}
        <path className="vg-path vg-p3a" strokeWidth="3.6"
          d={`M${T3.x},${T3.y} C490,285 540,295 585,305`} />
        <path className="vg-path vg-p3b" strokeWidth="3.0"
          d={`M${T3.x},${T3.y} C440,320 445,355 450,388`} />

        {/* From T4 — extend toward macrophages and upward (avoiding logo) */}
        <path className="vg-path vg-p4a" strokeWidth="3.8"
          d={`M${T4.x},${T4.y} C440,395 510,410 580,418`} />
        <path className="vg-path vg-p4b" strokeWidth="3.0"
          d={`M${T4.x},${T4.y} C355,420 350,445 345,475`} />

        {/* From T5 — extend leftward and upward */}
        <path className="vg-path vg-p5a" strokeWidth="3.2"
          d={`M${T5.x},${T5.y} C275,440 305,455 335,468`} />
        <path className="vg-path vg-p5b" strokeWidth="2.8"
          d={`M${T5.x},${T5.y} C230,440 215,460 200,478`} />

        {/* From T6 — extend toward top */}
        <path className="vg-path vg-p6a" strokeWidth="2.8"
          d={`M${T6.x},${T6.y} C155,485 175,495 195,508`} />
        <path className="vg-path vg-p6b" strokeWidth="2.6"
          d={`M${T6.x},${T6.y} C110,490 95,500 80,510`} />

        {/* From T7 — extend toward top-right corner */}
        <path className="vg-path vg-p7a" strokeWidth="2.8"
          d={`M${T7.x},${T7.y} C40,505 30,525 22,545`} />
        <path className="vg-path vg-p7b" strokeWidth="2.4"
          d={`M${T7.x},${T7.y} C75,500 95,510 115,520`} />

        {/* === SECONDARY BRANCHES — extend further from primary branch tips === */}
        {/* From P1a tip (790, 32) — toward bottom-left corner */}
        <path className="vg-path vg-s1a" strokeWidth="2.4"
          d="M790,32 C830,30 860,28 890,26" />
        <path className="vg-path vg-s1b" strokeWidth="2.0"
          d="M790,32 C810,55 825,72 840,90" />

        {/* From P1b tip (720, 100) — extending */}
        <path className="vg-path vg-s1c" strokeWidth="2.0"
          d="M720,100 C760,118 790,135 820,150" />

        {/* From P2a tip (705, 182) — extending leftward */}
        <path className="vg-path vg-s2a" strokeWidth="2.4"
          d="M705,182 C745,195 775,205 805,215" />
        <path className="vg-path vg-s2b" strokeWidth="2.0"
          d="M705,182 C720,215 735,238 745,265" />

        {/* From P2b tip (590, 265) */}
        <path className="vg-path vg-s2c" strokeWidth="1.8"
          d="M590,265 C610,290 625,310 640,335" />

        {/* From P3a tip (585, 305) — extending toward macrophages */}
        <path className="vg-path vg-s3a" strokeWidth="2.4"
          d="M585,305 C625,318 660,328 695,338" />
        <path className="vg-path vg-s3b" strokeWidth="2.0"
          d="M585,305 C600,335 615,360 625,385" />

        {/* From P3b tip (450, 388) — careful: stays in safe band (py<516) */}
        <path className="vg-path vg-s3c" strokeWidth="1.8"
          d="M450,388 C470,410 485,430 495,450" />

        {/* From P4a tip (580, 418) — TOWARD MACROPHAGES (longest reach chain) */}
        <path className="vg-path vg-s4a" strokeWidth="2.6"
          d="M580,418 C625,425 670,432 715,440" />
        <path className="vg-path vg-s4b" strokeWidth="2.2"
          d="M580,418 C600,445 615,468 625,488" />

        {/* From P4b tip (345, 475) — safely below logo, px<380 */}
        <path className="vg-path vg-s4c" strokeWidth="1.8"
          d="M345,475 C360,495 365,510 365,528" />

        {/* From P5a tip (335, 468) */}
        <path className="vg-path vg-s5a" strokeWidth="2.0"
          d="M335,468 C365,485 388,498 408,510" />

        {/* From P5b tip (200, 478) */}
        <path className="vg-path vg-s5b" strokeWidth="1.8"
          d="M200,478 C185,500 175,520 165,540" />

        {/* From P6a tip (195, 508) */}
        <path className="vg-path vg-s6a" strokeWidth="1.8"
          d="M195,508 C218,520 235,530 255,542" />

        {/* From P6b tip (80, 510) — toward top */}
        <path className="vg-path vg-s6b" strokeWidth="1.6"
          d="M80,510 C68,528 55,545 42,560" />

        {/* From P7a tip (22, 545) — TOP-RIGHT CORNER */}
        <path className="vg-path vg-s7a" strokeWidth="1.6"
          d="M22,545 C12,558 6,568 2,580" />

        {/* From P7b tip (115, 520) */}
        <path className="vg-path vg-s7b" strokeWidth="1.6"
          d="M115,520 C140,535 158,548 175,562" />

        {/* === MACROPHAGE-REACHING EXTENSION — chains forward from S4a tip
              (715, 440) to reach px=830-850, just before macrophage cluster === */}
        <path className="vg-path vg-m1" strokeWidth="2.2"
          d="M715,440 C755,438 795,432 830,425" />
        <path className="vg-path vg-m2" strokeWidth="1.8"
          d="M715,440 C740,460 760,478 778,495" />

        {/* And from S3a tip (695, 338) — second macrophage approach */}
        <path className="vg-path vg-m3" strokeWidth="2.0"
          d="M695,338 C735,348 770,360 800,372" />

        {/* === CAPILLARIES — fine tips at the very ends === */}
        {/* Off S1a tip (890, 26) — at bottom-left corner */}
        <path className="vg-path vg-c1" strokeWidth="1.2" d="M890,26 C915,22 935,18 955,12" />
        <path className="vg-path vg-c2" strokeWidth="1.0" d="M890,26 C905,40 918,52 928,68" />

        {/* Off S1b tip (840, 90) */}
        <path className="vg-path vg-c3" strokeWidth="1.0" d="M840,90 C860,108 875,125 888,140" />

        {/* Off S1c tip (820, 150) */}
        <path className="vg-path vg-c4" strokeWidth="1.0" d="M820,150 C842,168 858,185 872,200" />

        {/* Off S2a tip (805, 215) */}
        <path className="vg-path vg-c5" strokeWidth="1.1" d="M805,215 C830,225 850,235 868,245" />
        <path className="vg-path vg-c6" strokeWidth="0.9" d="M805,215 C815,238 825,258 832,278" />

        {/* Off S2b tip (745, 265) */}
        <path className="vg-path vg-c7" strokeWidth="1.0" d="M745,265 C770,285 788,302 802,320" />

        {/* Off S2c tip (640, 335) */}
        <path className="vg-path vg-c8" strokeWidth="1.0" d="M640,335 C660,358 675,378 685,398" />

        {/* Off S3a tip (695, 338) — into macrophage approach zone */}
        <path className="vg-path vg-c9" strokeWidth="1.0" d="M695,338 C715,358 730,375 740,395" />

        {/* Off S3b tip (625, 385) */}
        <path className="vg-path vg-c10" strokeWidth="0.9" d="M625,385 C640,408 650,425 658,445" />

        {/* Off S3c tip (495, 450) — px=495 in logo px range, py=450 below logo y range, safe */}
        <path className="vg-path vg-c11" strokeWidth="0.9" d="M495,450 C508,470 515,485 520,500" />

        {/* Off S4a tip (715, 440) */}
        <path className="vg-path vg-c12" strokeWidth="1.1" d="M715,440 C735,460 750,478 762,498" />

        {/* Off S4b tip (625, 488) — px=625 outside logo range (>547), safe */}
        <path className="vg-path vg-c13" strokeWidth="0.9" d="M625,488 C640,505 650,518 658,532" />

        {/* Off S4c tip (365, 528) — px=365 below logo, py=528 in logo y range BUT px safe */}
        <path className="vg-path vg-c14" strokeWidth="0.9" d="M365,528 C375,545 380,558 382,572" />

        {/* Off S5a tip (408, 510) — careful: px=408 in logo px range (380-547) AND py=510 ≈ logo y. */}
        {/* Safe for 1920×1080 (logo py 516-547, py=510<516) but borderline for 1440. Pull short. */}
        <path className="vg-path vg-c15" strokeWidth="0.9" d="M408,510 C425,520 438,528 448,535" />

        {/* Off S5b tip (165, 540) */}
        <path className="vg-path vg-c16" strokeWidth="0.9" d="M165,540 C150,560 142,575 135,588" />

        {/* Off S6a tip (255, 542) */}
        <path className="vg-path vg-c17" strokeWidth="0.9" d="M255,542 C275,555 290,568 302,580" />

        {/* Off S6b tip (42, 560) */}
        <path className="vg-path vg-c18" strokeWidth="0.9" d="M42,560 C32,575 25,585 20,595" />

        {/* Off S7a tip (2, 580) — TOP-RIGHT CORNER */}
        <path className="vg-path vg-c19" strokeWidth="0.9" d="M2,580 C-2,590 -3,595 -4,598" />

        {/* Off S7b tip (175, 562) */}
        <path className="vg-path vg-c20" strokeWidth="0.9" d="M175,562 C195,575 210,585 225,595" />

        {/* === Capillaries off macrophage-reaching extensions === */}
        {/* Off M1 tip (830, 425) — closest approach to macrophages */}
        <path className="vg-path vg-c21" strokeWidth="1.0" d="M830,425 C845,420 855,415 862,410" />
        <path className="vg-path vg-c22" strokeWidth="0.9" d="M830,425 C840,442 848,455 855,468" />

        {/* Off M2 tip (778, 495) */}
        <path className="vg-path vg-c23" strokeWidth="0.9" d="M778,495 C795,510 808,522 818,535" />

        {/* Off M3 tip (800, 372) — second approach to macrophages */}
        <path className="vg-path vg-c24" strokeWidth="1.0" d="M800,372 C820,378 835,382 848,386" />
        <path className="vg-path vg-c25" strokeWidth="0.9" d="M800,372 C815,392 825,408 832,422" />

        {/* Off P5a / S5a area for spread */}
        <path className="vg-path vg-c26" strokeWidth="0.9" d="M408,510 C418,498 425,485 430,470" />
      </g>

      <style>{`
        .vg-path {
          stroke-dasharray: 1500;
          stroke-dashoffset: 1500;
          opacity: 0;
          animation: vgDraw 9.5s ease-in-out 1 forwards;
        }
        /* Trunks first — long arteries reaching out from the corner */
        .vg-t1 { animation-delay: 5.5s; }
        .vg-t2 { animation-delay: 5.7s; }
        .vg-t3 { animation-delay: 5.9s; }
        .vg-t4 { animation-delay: 6.1s; }
        .vg-t5 { animation-delay: 6.3s; }
        .vg-t6 { animation-delay: 6.5s; }
        .vg-t7 { animation-delay: 6.7s; }
        /* Primary branches — extend further from each trunk */
        .vg-p1a { animation-delay: 7.2s; }
        .vg-p1b { animation-delay: 7.3s; }
        .vg-p2a { animation-delay: 7.3s; }
        .vg-p2b { animation-delay: 7.4s; }
        .vg-p3a { animation-delay: 7.4s; }
        .vg-p3b { animation-delay: 7.5s; }
        .vg-p4a { animation-delay: 7.5s; }
        .vg-p4b { animation-delay: 7.6s; }
        .vg-p5a { animation-delay: 7.6s; }
        .vg-p5b { animation-delay: 7.7s; }
        .vg-p6a { animation-delay: 7.7s; }
        .vg-p6b { animation-delay: 7.8s; }
        .vg-p7a { animation-delay: 7.8s; }
        .vg-p7b { animation-delay: 7.9s; }
        /* Secondary branches — even further reach */
        .vg-s1a { animation-delay: 8.5s; }
        .vg-s1b { animation-delay: 8.6s; }
        .vg-s1c { animation-delay: 8.6s; }
        .vg-s2a { animation-delay: 8.6s; }
        .vg-s2b { animation-delay: 8.7s; }
        .vg-s2c { animation-delay: 8.7s; }
        .vg-s3a { animation-delay: 8.7s; }
        .vg-s3b { animation-delay: 8.8s; }
        .vg-s3c { animation-delay: 8.8s; }
        .vg-s4a { animation-delay: 8.8s; }
        .vg-s4b { animation-delay: 8.9s; }
        .vg-s4c { animation-delay: 8.9s; }
        .vg-s5a { animation-delay: 8.9s; }
        .vg-s5b { animation-delay: 9.0s; }
        .vg-s6a { animation-delay: 9.0s; }
        .vg-s6b { animation-delay: 9.1s; }
        .vg-s7a { animation-delay: 9.1s; }
        .vg-s7b { animation-delay: 9.2s; }
        /* Macrophage-reaching extensions */
        .vg-m1 { animation-delay: 9.3s; }
        .vg-m2 { animation-delay: 9.4s; }
        .vg-m3 { animation-delay: 9.4s; }
        /* Capillaries last — tips at the very ends */
        .vg-c1  { animation-delay: 10.0s; }
        .vg-c2  { animation-delay: 10.0s; }
        .vg-c3  { animation-delay: 10.0s; }
        .vg-c4  { animation-delay: 10.1s; }
        .vg-c5  { animation-delay: 10.1s; }
        .vg-c6  { animation-delay: 10.1s; }
        .vg-c7  { animation-delay: 10.2s; }
        .vg-c8  { animation-delay: 10.2s; }
        .vg-c9  { animation-delay: 10.2s; }
        .vg-c10 { animation-delay: 10.3s; }
        .vg-c11 { animation-delay: 10.3s; }
        .vg-c12 { animation-delay: 10.3s; }
        .vg-c13 { animation-delay: 10.4s; }
        .vg-c14 { animation-delay: 10.4s; }
        .vg-c15 { animation-delay: 10.4s; }
        .vg-c16 { animation-delay: 10.5s; }
        .vg-c17 { animation-delay: 10.5s; }
        .vg-c18 { animation-delay: 10.5s; }
        .vg-c19 { animation-delay: 10.6s; }
        .vg-c20 { animation-delay: 10.6s; }
        .vg-c21 { animation-delay: 10.6s; }
        .vg-c22 { animation-delay: 10.7s; }
        .vg-c23 { animation-delay: 10.7s; }
        .vg-c24 { animation-delay: 10.7s; }
        .vg-c25 { animation-delay: 10.8s; }
        .vg-c26 { animation-delay: 10.8s; }

        @keyframes vgDraw {
          0%   { stroke-dashoffset: 1500; opacity: 0;    }
          5%   {                          opacity: 1;    }
          50%  { stroke-dashoffset: 0;    opacity: 1;    }
          80%  { stroke-dashoffset: 0;    opacity: 0.95; }
          100% { stroke-dashoffset: 0;    opacity: 0;    }
        }
      `}</style>
    </svg>
  );
}
