import { useId } from "react";

/**
 * Macrophage cluster in the top-left, plus a phagocytosis vignette below.
 *
 * Layout (inside the 1200×1000 viewBox, anchored top-left):
 *   - Soft blue radial glow centered behind the cluster
 *   - 3 cells bunched in the upper-left, overlapping slightly
 *   - 1 larger phagocytosis macrophage below them, engulfing a small
 *     semi-transparent white neutrophil at its right edge
 *   - ~20 particles emanating from the cluster, drifting DIAGONALLY
 *     down + right toward the bottom-right of the SVG (where the vessel
 *     orange glow lives, in the other SVG layer)
 */
export function Macrophages({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  const gBody    = `mc-body-${u}`;
  const gNuc     = `mc-nuc-${u}`;
  const gGlow    = `mc-glow-${u}`;
  const gBigGlow = `mc-bigglow-${u}`;
  const gNeu     = `mc-neu-${u}`;

  // Speckled cytoplasm granules for the focal (front) cell.
  // Cell is centered around (340, 360); these stay within its bounds.
  const speckles: Array<[number, number, number, number]> = [
    [300, 290, 1.6, 0.45], [330, 280, 2.0, 0.55], [365, 295, 1.4, 0.40],
    [395, 305, 1.8, 0.50], [285, 325, 1.4, 0.40], [320, 330, 2.4, 0.60],
    [355, 340, 1.6, 0.45], [385, 335, 2.0, 0.55], [415, 345, 1.4, 0.40],
    [275, 365, 1.8, 0.50], [310, 370, 1.4, 0.40], [345, 375, 2.0, 0.55],
    [380, 380, 1.6, 0.45], [410, 380, 1.4, 0.40], [290, 400, 2.2, 0.55],
    [325, 405, 1.6, 0.45], [360, 415, 1.4, 0.40], [395, 410, 1.8, 0.50],
    [305, 440, 1.4, 0.40], [340, 445, 2.0, 0.55], [375, 440, 1.6, 0.45],
    [320, 470, 1.4, 0.40], [355, 465, 1.8, 0.50],
    // softer, larger dark cluster
    [340, 360, 3.2, 0.28], [370, 390, 2.8, 0.26], [320, 410, 3.0, 0.28],
    [355, 425, 2.6, 0.26],
  ];

  // Particles travel from the top-left cluster down + right toward the
  // bottom-right of the SVG (≈ 1100, 900). Distance ~700-900 px diagonal.
  // dx > 0 (right), dy > 0 (down). Per-particle stagger keeps it organic.
  const particles = [
    { cx: 300, cy: 280, dx: 780, dy: 600, dur: 9.0, delay: 0.0 },
    { cx: 340, cy: 300, dx: 760, dy: 600, dur: 9.4, delay: 0.4 },
    { cx: 380, cy: 320, dx: 720, dy: 590, dur: 8.8, delay: 0.8 },
    { cx: 410, cy: 295, dx: 700, dy: 620, dur: 9.2, delay: 1.2 },
    { cx: 320, cy: 350, dx: 770, dy: 570, dur: 9.6, delay: 1.6 },
    { cx: 360, cy: 370, dx: 730, dy: 580, dur: 8.6, delay: 2.0 },
    { cx: 400, cy: 360, dx: 690, dy: 600, dur: 9.0, delay: 2.4 },
    { cx: 280, cy: 410, dx: 800, dy: 540, dur: 9.4, delay: 0.6 },
    { cx: 330, cy: 425, dx: 760, dy: 540, dur: 8.8, delay: 1.0 },
    { cx: 380, cy: 415, dx: 720, dy: 560, dur: 9.2, delay: 1.4 },
    { cx: 420, cy: 400, dx: 680, dy: 580, dur: 9.6, delay: 1.8 },
    { cx: 300, cy: 470, dx: 790, dy: 480, dur: 8.6, delay: 2.2 },
    { cx: 350, cy: 460, dx: 740, dy: 500, dur: 9.0, delay: 2.6 },
    { cx: 400, cy: 450, dx: 690, dy: 520, dur: 9.4, delay: 3.0 },
    { cx: 260, cy: 250, dx: 820, dy: 660, dur: 9.8, delay: 0.2 },
    { cx: 290, cy: 220, dx: 810, dy: 700, dur: 9.6, delay: 1.4 },
    { cx: 440, cy: 270, dx: 660, dy: 620, dur: 9.2, delay: 2.4 },
    // a few from the phagocytosis cell (≈ 200, 620)
    { cx: 200, cy: 590, dx: 880, dy: 280, dur: 9.0, delay: 1.6 },
    { cx: 240, cy: 620, dx: 850, dy: 250, dur: 9.4, delay: 2.6 },
    { cx: 180, cy: 640, dx: 890, dy: 230, dur: 9.6, delay: 0.8 },
  ];

  return (
    <svg
      viewBox="0 0 1200 1000"
      preserveAspectRatio="xMinYMin slice"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gBody} cx="40%" cy="36%" r="68%">
          <stop offset="0%"   stopColor="#B7E2F2" stopOpacity="0.80" />
          <stop offset="55%"  stopColor="#5BB0DA" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0.70" />
        </radialGradient>
        <radialGradient id={gNuc} cx="38%" cy="32%" r="72%">
          <stop offset="0%"   stopColor="#3FA3D1" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#0c2d4a" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id={gGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7BC9E8" stopOpacity="0.55" />
          <stop offset="60%"  stopColor="#3FA3D1" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
        {/* Big blue atmospheric glow behind the cluster — top-left corner */}
        <radialGradient id={gBigGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7BC9E8" stopOpacity="0.30" />
          <stop offset="50%"  stopColor="#3FA3D1" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
        {/* Neutrophil — slightly opaque white with a faint internal blush */}
        <radialGradient id={gNeu} cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="60%"  stopColor="#dde6ee" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a8b6c4" stopOpacity="0.30" />
        </radialGradient>
      </defs>

      {/* === BLUE GLOW behind the cluster === */}
      <ellipse cx="320" cy="340" rx="520" ry="430" fill={`url(#${gBigGlow})`} />

      {/* === CELL A — back-left, smaller === */}
      <g className="mc-cell mc-cell-1">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.2"
          d="M250,160
             C290,154 330,162 350,185
             C370,200 380,228 370,255
             C360,285 330,300 295,300
             C260,302 222,288 210,260
             C195,232 200,195 220,175
             C228,165 240,160 250,160 Z"
        />
        <ellipse cx="280" cy="220" rx="24" ry="20" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL B — back-right, slightly smaller, overlaps A === */}
      <g className="mc-cell mc-cell-2">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.2"
          d="M430,170
             C470,162 510,176 525,210
             C540,238 535,275 510,295
             C485,318 445,322 415,308
             C385,292 370,260 380,228
             C390,200 410,180 425,172
             C427,171 428,170 430,170 Z"
        />
        <ellipse cx="455" cy="230" rx="22" ry="18" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL C — FRONT (focal), big, with speckled cytoplasm === */}
      <g className="mc-cell mc-cell-3">
        <path
          fill={`url(#${gBody})`}
          stroke="#9CD9F0"
          strokeOpacity="0.32"
          strokeWidth="1.5"
          d="M335,260
             C385,252 440,268 470,300
             C500,322 510,358 498,388
             C520,408 522,448 500,470
             C508,500 488,532 458,540
             C460,570 430,592 395,590
             C375,610 340,612 320,595
             C280,608 250,590 245,555
             C215,558 188,540 188,510
             C170,498 170,470 188,450
             C170,428 178,395 198,380
             C190,348 210,318 240,302
             C264,278 300,262 335,260 Z"
        />

        {/* Speckled cytoplasm */}
        <g fill="#1E5A8A">
          {speckles.map((s, i) => (
            <circle key={i} cx={s[0]} cy={s[1]} r={s[2]} opacity={s[3]} />
          ))}
        </g>
        {/* Brighter highlight specks */}
        <g fill="#B7E2F2">
          {speckles.slice(0, 14).map((s, i) => (
            <circle key={i} cx={s[0] + 3} cy={s[1] - 2} r={s[2] * 0.5} opacity={0.4} />
          ))}
        </g>

        {/* Kidney-bean nucleus, off-center */}
        <path
          fill={`url(#${gNuc})`}
          stroke="#0c2d4a"
          strokeOpacity="0.25"
          strokeWidth="1"
          d="M330,360
             C300,360 280,382 280,410
             C280,438 305,460 340,460
             C365,460 388,448 400,425
             C413,432 425,420 425,402
             C428,378 408,354 385,348
             C370,346 350,360 340,375
             C336,365 332,360 330,360 Z"
        />
      </g>

      {/* === PHAGOCYTOSIS — macrophage just below the cluster, engulfing a neutrophil === */}
      <g className="mc-cell mc-cell-phago">
        {/* Macrophage body */}
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.25"
          strokeWidth="1.3"
          d="M200,530
             C235,522 270,532 290,560
             C310,580 318,612 308,635
             C320,650 318,675 295,690
             C300,715 270,735 240,735
             C220,755 180,758 160,738
             C130,748 100,732 92,700
             C70,690 65,660 80,640
             C68,620 78,592 100,580
             C115,558 140,540 175,532
             C183,530 192,530 200,530 Z"
        />
        {/* Macrophage nucleus */}
        <ellipse cx="170" cy="635" rx="26" ry="20" fill={`url(#${gNuc})`} />

        {/* Neutrophil being engulfed at the right edge */}
        <g className="mc-neutrophil">
          {/* outer membrane (semi-transparent white) */}
          <circle cx="295" cy="600" r="32" fill={`url(#${gNeu})`} />
          {/* inner granular dot */}
          <circle cx="297" cy="598" r="9" fill="#ffffff" opacity="0.4" />
          {/* small granules */}
          <circle cx="285" cy="608" r="2" fill="#fff" opacity="0.55" />
          <circle cx="302" cy="612" r="1.6" fill="#fff" opacity="0.5" />
          <circle cx="290" cy="592" r="1.4" fill="#fff" opacity="0.45" />
          <circle cx="305" cy="588" r="1.6" fill="#fff" opacity="0.55" />
        </g>
      </g>

      {/* === PARTICLES (above the cells in z-order) === */}
      <g>
        {particles.map((p, i) => (
          <g
            key={i}
            className="mc-p"
            style={
              {
                "--mc-dx": `${p.dx}px`,
                "--mc-dy": `${p.dy}px`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              } as React.CSSProperties
            }
          >
            <circle cx={p.cx} cy={p.cy} r="7"   fill={`url(#${gGlow})`} />
            <circle cx={p.cx} cy={p.cy} r="1.6" fill="#e6edf5" opacity="0.88" />
          </g>
        ))}
      </g>

      <style>{`
        .mc-cell        { transform-origin: center; transform-box: fill-box; }
        .mc-cell-1      { animation: mcBreathe 5.6s ease-in-out infinite;       }
        .mc-cell-2      { animation: mcBreathe 6.2s ease-in-out infinite 0.6s;  }
        .mc-cell-3      { animation: mcBreathe 7.4s ease-in-out infinite 1.1s;  }
        .mc-cell-phago  { animation: mcBreathe 6.8s ease-in-out infinite 0.3s;  }
        @keyframes mcBreathe {
          0%, 100% { transform: scale(1);    }
          50%      { transform: scale(1.02); }
        }

        .mc-neutrophil { transform-origin: center; transform-box: fill-box; }
        /* Faint pulse on the neutrophil so the phagocytosis reads as active */
        .mc-neutrophil { animation: mcNeu 4.5s ease-in-out infinite; }
        @keyframes mcNeu {
          0%, 100% { opacity: 0.85; transform: scale(1);    }
          50%      { opacity: 0.55; transform: scale(0.92); }
        }

        .mc-p {
          opacity: 0;
          animation-name: mcParticle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out;
        }
        @keyframes mcParticle {
          0%   { transform: translate(0,0);                         opacity: 0;  }
          8%   {                                                    opacity: 1;  }
          75%  {                                                    opacity: 0.5;}
          100% { transform: translate(var(--mc-dx), var(--mc-dy));  opacity: 0;  }
        }
      `}</style>
    </svg>
  );
}
