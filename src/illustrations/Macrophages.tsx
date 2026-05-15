import { useId } from "react";

/**
 * Macrophage cluster in the top-left corner.
 *
 * Three cells arranged diagonally:
 *   A (small) — upper-left, center ~(96, 56), nearly touches the corner
 *   C (big, focal) — center of cluster, center ~(265, 200)
 *   B (small) — lower-right of diagonal, center ~(390, 316)
 *
 * Particles drift diagonally to the bottom-right where the vessel layer lives.
 * preserveAspectRatio="xMinYMin slice" anchors the left + top edges so the
 * cluster always sits in the top-left corner.
 */
export function Macrophages({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  const gBody    = `mc-body-${u}`;
  const gNuc     = `mc-nuc-${u}`;
  const gGlow    = `mc-glow-${u}`;
  const gBigGlow = `mc-bigglow-${u}`;

  // Speckles for focal cell C — original coords shifted (-24, -140) to center ~(265, 200)
  const speckles: Array<[number, number, number, number]> = [
    [251, 110, 1.4, 0.45], [271, 105, 1.8, 0.55], [296, 115, 1.4, 0.40],
    [321, 120, 1.6, 0.50], [246, 135, 1.6, 0.45], [274, 140, 2.0, 0.55],
    [301, 150, 1.4, 0.40], [326, 145, 1.8, 0.50], [241, 165, 1.4, 0.40],
    [271, 170, 1.6, 0.45], [301, 180, 2.0, 0.55], [331, 175, 1.4, 0.40],
    [251, 195, 1.8, 0.50], [281, 200, 1.4, 0.40], [311, 210, 1.8, 0.50],
    [261, 225, 1.6, 0.45], [291, 230, 1.4, 0.40], [321, 225, 1.6, 0.45],
    // softer dark cluster
    [286, 165, 2.6, 0.28], [306, 190, 2.4, 0.26], [266, 200, 2.6, 0.28],
  ];

  // Particles start near cluster (top-left) and fan out broadly toward the bottom-right corner
  const particles = [
    { cx: 100, cy:  80, dx: 1580, dy: 820, dur: 9.2, delay: 0.0 },
    { cx: 150, cy: 100, dx: 1480, dy: 790, dur: 9.6, delay: 0.4 },
    { cx: 200, cy:  85, dx: 1380, dy: 810, dur: 8.8, delay: 0.8 },
    { cx: 250, cy: 110, dx: 1280, dy: 790, dur: 9.2, delay: 1.2 },
    { cx: 120, cy: 160, dx: 1540, dy: 750, dur: 9.5, delay: 1.6 },
    { cx: 170, cy: 175, dx: 1440, dy: 730, dur: 8.9, delay: 2.0 },
    { cx: 230, cy: 170, dx: 1340, dy: 740, dur: 9.3, delay: 2.4 },
    { cx: 150, cy: 240, dx: 1500, dy: 670, dur: 9.6, delay: 0.6 },
    { cx: 200, cy: 250, dx: 1400, dy: 660, dur: 9.0, delay: 1.0 },
    { cx: 260, cy: 230, dx: 1300, dy: 690, dur: 9.4, delay: 1.4 },
    { cx:  80, cy: 190, dx: 1600, dy: 710, dur: 9.7, delay: 1.8 },
    { cx: 140, cy:  75, dx: 1520, dy: 840, dur: 9.0, delay: 2.2 },
    { cx: 320, cy: 300, dx: 1240, dy: 650, dur: 9.5, delay: 2.6 },
    { cx:  60, cy: 140, dx: 1650, dy: 780, dur: 9.8, delay: 3.0 },
    { cx: 350, cy: 170, dx: 1200, dy: 770, dur: 9.3, delay: 0.2 },
    { cx: 110, cy: 310, dx: 1560, dy: 620, dur: 8.7, delay: 1.5 },
  ];

  return (
    <svg
      viewBox="0 0 1800 1000"
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
        <radialGradient id={gBigGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7BC9E8" stopOpacity="0.32" />
          <stop offset="50%"  stopColor="#3FA3D1" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Blue atmospheric glow centered on the cluster */}
      <ellipse cx="220" cy="190" rx="380" ry="300" fill={`url(#${gBigGlow})`} />

      {/* === CELL A — small, upper-left of diagonal, nearly touches the corner === */}
      <g className="mc-cell mc-cell-1">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          d="M81,11 C111,9 136,19 146,41
             C156,59 151,83 136,95
             C116,111 88,111 71,99
             C51,86 44,61 54,41
             C61,26 71,13 81,11 Z"
        />
        <ellipse cx="96" cy="56" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL B — small, lower-right of diagonal, center ~(390, 316) === */}
      <g className="mc-cell mc-cell-2">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          d="M375,271 C405,269 430,281 438,303
             C448,326 440,346 422,357
             C400,371 375,369 358,355
             C342,341 335,319 345,301
             C350,286 365,273 375,271 Z"
        />
        <ellipse cx="390" cy="316" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL C — big focal, center of diagonal, center ~(265, 200) === */}
      <g className="mc-cell mc-cell-3">
        <path
          fill={`url(#${gBody})`}
          stroke="#9CD9F0"
          strokeOpacity="0.32"
          strokeWidth="1.4"
          d="M271,85
             C311,80  348,92  364,120
             C378,138 384,162 372,182
             C386,198 386,225 366,238
             C372,258 354,280 330,282
             C331,302 308,315 284,308
             C268,320 244,320 230,308
             C204,315 184,302 184,280
             C164,278 151,258 160,238
             C146,225 144,200 160,185
             C151,165 158,142 176,132
             C190,110 216,92  246,88
             C254,85  262,84  271,85 Z"
        />

        {/* Speckled cytoplasm */}
        <g fill="#1E5A8A">
          {speckles.map((s, i) => (
            <circle key={i} cx={s[0]} cy={s[1]} r={s[2]} opacity={s[3]} />
          ))}
        </g>
        <g fill="#B7E2F2">
          {speckles.slice(0, 11).map((s, i) => (
            <circle key={i} cx={s[0] + 2} cy={s[1] - 1.5} r={s[2] * 0.5} opacity={0.4} />
          ))}
        </g>

        {/* Kidney-bean nucleus */}
        <path
          fill={`url(#${gNuc})`}
          stroke="#0c2d4a"
          strokeOpacity="0.25"
          strokeWidth="1"
          d="M261,160
             C241,160 228,178 228,198
             C228,218 246,232 271,232
             C289,232 304,225 312,208
             C322,213 331,204 331,190
             C333,173 319,156 302,152
             C290,150 276,162 268,173
             C266,165 263,160 261,160 Z"
        />
      </g>

      {/* === PARTICLES — drift diagonally to bottom-right (vessel area) === */}
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
        .mc-cell   { transform-origin: center; transform-box: fill-box; }
        .mc-cell-1 { animation: mcBreathe 5.6s ease-in-out infinite;       }
        .mc-cell-2 { animation: mcBreathe 6.2s ease-in-out infinite 0.6s;  }
        .mc-cell-3 { animation: mcBreathe 7.4s ease-in-out infinite 1.1s;  }
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
          8%   {                                                    opacity: 1;  }
          75%  {                                                    opacity: 0.5;}
          100% { transform: translate(var(--mc-dx), var(--mc-dy));  opacity: 0;  }
        }
      `}</style>
    </svg>
  );
}
