import { useId } from "react";

/**
 * Macrophage cluster — top-left corner.
 *
 * Big cell C anchored closest to the corner (partially bleeds off the SVG
 * top-left edge for a true "coming from the corner" look).
 * Small cells A and B sit on the OTHER diagonal ("/") relative to C:
 *   A (small) — upper-right of C
 *   B (small) — lower-left of C
 * All three are scrunched together so A and B overlap C's body.
 *
 * preserveAspectRatio="xMinYMin slice" anchors the SVG top-left to the
 * viewport top-left so the cluster always bleeds into that corner.
 */
export function Macrophages({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  const gBody    = `mc-body-${u}`;
  const gNuc     = `mc-nuc-${u}`;
  const gGlow    = `mc-glow-${u}`;
  const gBigGlow = `mc-bigglow-${u}`;

  // Speckles for focal cell C — center visible at ~(120, 117), shift (-145,-85) from base
  const speckles: Array<[number, number, number, number]> = [
    [106,  25, 1.4, 0.45], [126,  20, 1.8, 0.55], [151,  30, 1.4, 0.40],
    [176,  35, 1.6, 0.50], [101,  50, 1.6, 0.45], [129,  55, 2.0, 0.55],
    [156,  65, 1.4, 0.40], [181,  60, 1.8, 0.50], [ 96,  80, 1.4, 0.40],
    [126,  85, 1.6, 0.45], [156,  95, 2.0, 0.55], [186,  90, 1.4, 0.40],
    [106, 110, 1.8, 0.50], [136, 115, 1.4, 0.40], [166, 125, 1.8, 0.50],
    [116, 140, 1.6, 0.45], [146, 145, 1.4, 0.40], [176, 140, 1.6, 0.45],
    // softer dark cluster
    [141,  80, 2.6, 0.28], [161, 105, 2.4, 0.26], [121, 115, 2.6, 0.28],
  ];

  // Particles fan from cluster (top-left) to bottom-right (vessel area)
  const particles = [
    { cx: 200, cy:  50, dx: 1450, dy: 790, dur: 9.2, delay: 0.0 },
    { cx: 150, cy:  80, dx: 1400, dy: 760, dur: 9.6, delay: 0.4 },
    { cx: 100, cy: 120, dx: 1480, dy: 730, dur: 8.8, delay: 0.8 },
    { cx: 250, cy:  70, dx: 1360, dy: 800, dur: 9.2, delay: 1.2 },
    { cx: 180, cy: 140, dx: 1420, dy: 710, dur: 9.5, delay: 1.6 },
    { cx: 120, cy: 180, dx: 1450, dy: 680, dur: 8.9, delay: 2.0 },
    { cx: 230, cy: 120, dx: 1320, dy: 750, dur: 9.3, delay: 2.4 },
    { cx:  80, cy: 220, dx: 1500, dy: 640, dur: 9.6, delay: 0.6 },
    { cx: 160, cy: 200, dx: 1400, dy: 670, dur: 9.0, delay: 1.0 },
    { cx: 270, cy: 150, dx: 1280, dy: 730, dur: 9.4, delay: 1.4 },
    { cx:  50, cy: 250, dx: 1550, dy: 610, dur: 9.7, delay: 1.8 },
    { cx: 190, cy:  30, dx: 1410, dy: 840, dur: 9.0, delay: 2.2 },
    { cx: 270, cy: 180, dx: 1260, dy: 700, dur: 9.5, delay: 2.6 },
    { cx:  70, cy: 150, dx: 1530, dy: 700, dur: 9.8, delay: 3.0 },
    { cx: 220, cy: 230, dx: 1300, dy: 650, dur: 9.3, delay: 0.2 },
    { cx: 120, cy: 250, dx: 1460, dy: 620, dur: 8.7, delay: 1.5 },
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

      {/* Blue atmospheric glow behind the cluster */}
      <ellipse cx="140" cy="130" rx="280" ry="260" fill={`url(#${gBigGlow})`} />

      {/* === CELL A — small, upper-right of C (overlaps C's upper-right body) === */}
      <g className="mc-cell mc-cell-1">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          d="M210,10 C240,8 265,18 275,40
             C285,58 280,82 265,94
             C245,110 217,110 200,98
             C180,85 173,60 183,40
             C190,25 200,12 210,10 Z"
        />
        <ellipse cx="225" cy="55" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL B — small, lower-left of C (overlaps C's lower-left body) === */}
      <g className="mc-cell mc-cell-2">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          d="M65,185 C95,183 120,195 128,217
             C138,240 130,260 112,271
             C90,285 65,283 48,269
             C32,255 25,233 35,215
             C40,200 55,187 65,185 Z"
        />
        <ellipse cx="80" cy="230" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL C — big focal, closest to corner, bleeds off the top-left edge === */}
      <g className="mc-cell mc-cell-3">
        <path
          fill={`url(#${gBody})`}
          stroke="#9CD9F0"
          strokeOpacity="0.32"
          strokeWidth="1.4"
          d="M126,0
             C166,-5 203,7  219,35
             C233,53 239,77 227,97
             C241,113 241,140 221,153
             C227,173 209,195 185,197
             C186,217 163,230 139,223
             C123,235 99,235 85,223
             C59,230 39,217 39,195
             C19,193 6,173  15,153
             C1,140  -1,115 15,100
             C6,80   13,57  31,47
             C45,25  71,7   101,3
             C109,0  117,-1 126,0 Z"
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
          d="M116,75
             C96,75  83,93  83,113
             C83,133 101,147 126,147
             C144,147 159,140 167,123
             C177,128 186,119 186,105
             C188,88 174,71 157,67
             C145,65 131,77 123,88
             C121,80 118,75 116,75 Z"
        />
      </g>

      {/* === PARTICLES — fan diagonally to bottom-right (vessel area) === */}
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
