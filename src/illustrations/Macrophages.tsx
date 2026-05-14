import { useId } from "react";

/**
 * One large M2 macrophage anchored in the center of the right-side panel,
 * flanked by two smaller cells. Inspired by the textbook amoeba reference:
 * irregular lobed perimeter, kidney-bean nucleus, and dense speckled cytoplasm.
 * Particles ascend from all three cells up the full height of the SVG.
 */
export function Macrophages({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  const gBody = `mc-body-${u}`;
  const gNuc  = `mc-nuc-${u}`;
  const gGlow = `mc-glow-${u}`;

  // Speckled granules inside the big cell. Hard-coded so the layout is stable
  // across renders. Each entry: [cx, cy, r, opacity].
  const speckles: Array<[number, number, number, number]> = [
    [310, 480, 2.2, 0.55], [340, 510, 1.6, 0.45], [380, 470, 2.4, 0.6],
    [420, 500, 1.8, 0.5],  [460, 480, 2.0, 0.55], [500, 510, 1.4, 0.4],
    [290, 540, 1.8, 0.5],  [330, 560, 2.6, 0.65], [370, 590, 1.6, 0.45],
    [410, 570, 2.0, 0.55], [450, 600, 1.4, 0.4],  [490, 580, 2.2, 0.55],
    [530, 540, 1.6, 0.45], [560, 570, 2.0, 0.55], [310, 620, 1.8, 0.5],
    [350, 650, 2.4, 0.6],  [390, 640, 1.4, 0.4],  [430, 670, 2.0, 0.55],
    [470, 660, 1.6, 0.45], [510, 630, 1.8, 0.5],  [540, 660, 2.2, 0.55],
    [280, 690, 1.4, 0.4],  [320, 710, 2.0, 0.55], [360, 720, 1.6, 0.45],
    [400, 740, 2.4, 0.6],  [440, 720, 1.8, 0.5],  [480, 730, 2.0, 0.55],
    [520, 700, 1.4, 0.4],  [560, 720, 1.6, 0.45], [300, 780, 2.0, 0.5],
    [340, 800, 1.6, 0.4],  [380, 820, 1.8, 0.5],  [420, 800, 2.2, 0.55],
    [460, 820, 1.4, 0.4],  [500, 790, 1.8, 0.5],  [540, 790, 1.6, 0.45],
    [310, 460, 1.2, 0.35], [430, 460, 1.2, 0.35], [510, 460, 1.4, 0.4],
    [260, 600, 1.6, 0.4],  [580, 600, 1.6, 0.4],  [270, 700, 1.4, 0.35],
    [580, 690, 1.8, 0.45], [280, 770, 1.6, 0.4],  [560, 770, 1.4, 0.35],
    // small darker cluster (lower opacity, slightly bigger)
    [340, 580, 3.0, 0.3],  [350, 600, 2.6, 0.28], [400, 680, 3.2, 0.32],
    [450, 640, 2.8, 0.3],  [490, 720, 3.0, 0.3],
  ];

  // Particles rise from all three cells. Travel ~750-1000 px up the SVG.
  const particles = [
    // From big cell
    { cx: 360, cy: 770, dx: -10, dy: -740, dur: 8.5, delay: 0.0 },
    { cx: 400, cy: 800, dx:  20, dy: -780, dur: 9.0, delay: 0.4 },
    { cx: 450, cy: 760, dx: -25, dy: -720, dur: 8.2, delay: 0.9 },
    { cx: 500, cy: 800, dx:  30, dy: -800, dur: 9.4, delay: 1.4 },
    { cx: 340, cy: 820, dx: -15, dy: -780, dur: 8.7, delay: 1.9 },
    { cx: 420, cy: 840, dx:  10, dy: -820, dur: 9.2, delay: 2.4 },
    { cx: 480, cy: 830, dx: -20, dy: -800, dur: 8.4, delay: 2.9 },
    { cx: 370, cy: 870, dx:   5, dy: -860, dur: 9.6, delay: 3.4 },
    { cx: 440, cy: 880, dx:  25, dy: -870, dur: 9.0, delay: 0.7 },
    { cx: 520, cy: 870, dx: -10, dy: -850, dur: 8.8, delay: 1.2 },
    { cx: 400, cy: 730, dx:  15, dy: -700, dur: 8.5, delay: 1.7 },
    { cx: 470, cy: 700, dx:  -5, dy: -680, dur: 8.3, delay: 2.2 },
    // From left small cell
    { cx: 150, cy: 920, dx:  15, dy: -890, dur: 9.0, delay: 0.6 },
    { cx: 180, cy: 950, dx:  -5, dy: -930, dur: 9.4, delay: 1.6 },
    { cx: 210, cy: 920, dx:  25, dy: -890, dur: 8.6, delay: 2.6 },
    // From right small cell
    { cx: 600, cy: 920, dx: -15, dy: -880, dur: 9.2, delay: 0.5 },
    { cx: 640, cy: 940, dx:   5, dy: -910, dur: 8.8, delay: 1.5 },
    { cx: 670, cy: 910, dx: -25, dy: -880, dur: 9.5, delay: 2.5 },
  ];

  return (
    <svg
      viewBox="0 0 800 1100"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Cell body — light blue cytoplasm */}
        <radialGradient id={gBody} cx="42%" cy="38%" r="68%">
          <stop offset="0%"   stopColor="#B7E2F2" stopOpacity="0.78" />
          <stop offset="55%"  stopColor="#5BB0DA" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0.68" />
        </radialGradient>
        {/* Nucleus — deeper, denser blue */}
        <radialGradient id={gNuc} cx="35%" cy="32%" r="72%">
          <stop offset="0%"   stopColor="#3FA3D1" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#0c2d4a" stopOpacity="0.95" />
        </radialGradient>
        {/* Particle glow */}
        <radialGradient id={gGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7BC9E8" stopOpacity="0.55" />
          <stop offset="60%"  stopColor="#3FA3D1" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* === LEFT small flanker === */}
      <g className="mc-cell mc-cell-left">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.2"
          d="M120,940
             C100,925 90,895 100,870
             C115,840 150,825 180,835
             C215,840 240,865 240,895
             C250,925 235,955 205,965
             C175,975 145,965 120,940 Z"
        />
        <ellipse cx="170" cy="888" rx="20" ry="16" fill={`url(#${gNuc})`} />
      </g>

      {/* === RIGHT small flanker === */}
      <g className="mc-cell mc-cell-right">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.2"
          d="M580,940
             C555,920 545,890 560,860
             C580,830 620,820 650,840
             C685,855 700,890 690,920
             C680,955 645,975 615,965
             C600,960 590,952 580,940 Z"
        />
        <ellipse cx="625" cy="884" rx="22" ry="17" fill={`url(#${gNuc})`} />
      </g>

      {/* === BIG CENTER MACROPHAGE === */}
      <g className="mc-cell mc-cell-main">
        {/* Outer membrane — irregular lobed amoeba shape */}
        <path
          fill={`url(#${gBody})`}
          stroke="#9CD9F0"
          strokeOpacity="0.32"
          strokeWidth="1.6"
          d="M400,420
             C470,410 540,430 580,470
             C625,500 640,545 620,585
             C660,610 680,650 660,690
             C685,720 680,770 650,800
             C660,840 635,880 590,890
             C575,920 535,935 495,920
             C470,945 425,950 395,925
             C355,945 310,930 295,895
             C255,895 220,860 230,820
             C200,795 190,750 215,720
             C190,690 195,640 230,615
             C215,575 235,530 280,510
             C290,460 340,425 400,420 Z"
        />

        {/* Speckled cytoplasm granules */}
        <g fill="#1E5A8A">
          {speckles.map((s, i) => (
            <circle key={i} cx={s[0]} cy={s[1]} r={s[2]} opacity={s[3]} />
          ))}
        </g>

        {/* Brighter highlight specks */}
        <g fill="#B7E2F2">
          {speckles.slice(0, 14).map((s, i) => (
            <circle key={i} cx={s[0] + 4} cy={s[1] - 2} r={s[2] * 0.5} opacity={0.4} />
          ))}
        </g>

        {/* Kidney-bean nucleus, off-center */}
        <path
          fill={`url(#${gNuc})`}
          stroke="#0c2d4a"
          strokeOpacity="0.25"
          strokeWidth="1"
          d="M360,620
             C320,620 295,650 295,690
             C295,735 330,765 380,765
             C420,765 450,755 470,725
             C490,735 510,720 510,695
             C512,665 490,635 460,625
             C440,620 415,640 400,655
             C385,640 375,620 360,620 Z"
        />
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
        .mc-cell      { transform-origin: center; transform-box: fill-box; }
        .mc-cell-main { animation: mcBreathe 7.5s ease-in-out infinite;        }
        .mc-cell-left { animation: mcBreathe 6.0s ease-in-out infinite 0.6s;   }
        .mc-cell-right{ animation: mcBreathe 6.6s ease-in-out infinite 1.1s;   }
        @keyframes mcBreathe {
          0%, 100% { transform: scale(1);    }
          50%      { transform: scale(1.02); }
        }

        .mc-p {
          opacity: 0;
          animation-name: mcParticle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out;
        }
        @keyframes mcParticle {
          0%   { transform: translate(0,0);                         opacity: 0;  }
          7%   {                                                    opacity: 1;  }
          80%  {                                                    opacity: 0.7;}
          100% { transform: translate(var(--mc-dx), var(--mc-dy));  opacity: 0;  }
        }
      `}</style>
    </svg>
  );
}
