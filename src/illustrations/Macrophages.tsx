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

  // Big cell occupies x∈[270,530], y∈[620,860] — roughly 260×240 px,
  // which is ~1.7× the small cells (each ≈ 140×130). Speckles, nucleus,
  // and origin particles are all positioned inside that box.
  const speckles: Array<[number, number, number, number]> = [
    [300, 670, 1.6, 0.50], [330, 660, 1.2, 0.40], [360, 680, 2.0, 0.55],
    [390, 660, 1.4, 0.45], [420, 680, 1.8, 0.50], [450, 670, 1.2, 0.40],
    [480, 690, 1.6, 0.45], [510, 680, 1.4, 0.40], [285, 700, 1.8, 0.50],
    [320, 720, 1.6, 0.45], [355, 710, 1.2, 0.40], [385, 730, 2.2, 0.55],
    [415, 720, 1.4, 0.45], [445, 710, 1.6, 0.45], [475, 720, 1.2, 0.40],
    [505, 720, 1.8, 0.50], [295, 750, 1.4, 0.40], [330, 760, 2.0, 0.55],
    [365, 770, 1.6, 0.45], [395, 780, 1.2, 0.40], [430, 770, 1.8, 0.50],
    [465, 760, 1.4, 0.45], [495, 770, 2.0, 0.55], [520, 760, 1.2, 0.40],
    [310, 800, 1.6, 0.45], [345, 810, 1.4, 0.40], [380, 820, 2.0, 0.55],
    [415, 810, 1.6, 0.45], [445, 820, 1.2, 0.40], [475, 810, 1.8, 0.50],
    [505, 800, 1.4, 0.40],
    // darker softer cluster
    [350, 740, 2.6, 0.28], [400, 750, 2.8, 0.30], [445, 730, 2.4, 0.26],
    [380, 790, 2.8, 0.30], [430, 790, 2.4, 0.28],
  ];

  const particles = [
    // From big center cell (concentrated here)
    { cx: 340, cy: 700, dx: -15, dy: -650, dur: 8.5, delay: 0.0 },
    { cx: 380, cy: 720, dx:  25, dy: -700, dur: 9.0, delay: 0.5 },
    { cx: 420, cy: 700, dx: -10, dy: -660, dur: 8.4, delay: 1.0 },
    { cx: 460, cy: 720, dx:  20, dy: -700, dur: 9.2, delay: 1.5 },
    { cx: 360, cy: 760, dx: -20, dy: -730, dur: 8.7, delay: 2.0 },
    { cx: 400, cy: 780, dx:  10, dy: -760, dur: 9.4, delay: 2.5 },
    { cx: 440, cy: 770, dx: -25, dy: -740, dur: 8.6, delay: 3.0 },
    { cx: 480, cy: 750, dx:   5, dy: -720, dur: 9.6, delay: 0.8 },
    { cx: 320, cy: 800, dx:  15, dy: -780, dur: 8.8, delay: 1.3 },
    { cx: 380, cy: 820, dx: -10, dy: -800, dur: 9.0, delay: 1.8 },
    { cx: 440, cy: 830, dx:  20, dy: -810, dur: 8.5, delay: 2.3 },
    { cx: 500, cy: 810, dx:  -5, dy: -790, dur: 9.2, delay: 2.8 },
    // From left small flanker (≈170,888)
    { cx: 150, cy: 880, dx:  10, dy: -850, dur: 9.0, delay: 0.7 },
    { cx: 180, cy: 900, dx: -10, dy: -880, dur: 9.4, delay: 1.7 },
    { cx: 210, cy: 880, dx:  20, dy: -850, dur: 8.6, delay: 2.6 },
    // From right small flanker (≈625,884)
    { cx: 600, cy: 880, dx: -15, dy: -850, dur: 9.2, delay: 0.6 },
    { cx: 640, cy: 900, dx:   5, dy: -870, dur: 8.8, delay: 1.6 },
    { cx: 670, cy: 880, dx: -20, dy: -850, dur: 9.5, delay: 2.5 },
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

      {/* === BIG CENTER MACROPHAGE — ~1.7× the small flankers === */}
      <g className="mc-cell mc-cell-main">
        {/* Outer membrane — irregular lobed amoeba, ~260×240 px */}
        <path
          fill={`url(#${gBody})`}
          stroke="#9CD9F0"
          strokeOpacity="0.32"
          strokeWidth="1.4"
          d="M400,620
             C440,612 480,624 504,648
             C530,664 540,690 528,710
             C548,724 552,752 540,772
             C552,792 540,822 514,830
             C512,852 484,864 460,852
             C448,872 420,876 400,860
             C376,876 348,868 340,846
             C314,860 286,850 282,824
             C258,820 248,792 264,772
             C246,760 246,732 268,720
             C254,704 264,676 290,668
             C294,644 320,624 352,628
             C368,618 384,616 400,620 Z"
        />

        {/* Speckled cytoplasm granules */}
        <g fill="#1E5A8A">
          {speckles.map((s, i) => (
            <circle key={i} cx={s[0]} cy={s[1]} r={s[2]} opacity={s[3]} />
          ))}
        </g>

        {/* Brighter highlight specks */}
        <g fill="#B7E2F2">
          {speckles.slice(0, 12).map((s, i) => (
            <circle key={i} cx={s[0] + 3} cy={s[1] - 2} r={s[2] * 0.5} opacity={0.4} />
          ))}
        </g>

        {/* Kidney-bean nucleus, off-center */}
        <path
          fill={`url(#${gNuc})`}
          stroke="#0c2d4a"
          strokeOpacity="0.25"
          strokeWidth="1"
          d="M380,720
             C355,720 340,738 340,760
             C340,784 360,800 388,800
             C410,800 428,795 438,778
             C450,784 462,776 462,762
             C464,746 452,730 436,724
             C424,720 410,732 400,742
             C394,732 388,720 380,720 Z"
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
