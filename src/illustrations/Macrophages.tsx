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

  // Speckles for focal cell C — shifted down +90 SVG units to clear nav bar
  const speckles: Array<[number, number, number, number]> = [
    [106, 115, 1.4, 0.45], [126, 110, 1.8, 0.55], [151, 120, 1.4, 0.40],
    [176, 125, 1.6, 0.50], [101, 140, 1.6, 0.45], [129, 145, 2.0, 0.55],
    [156, 155, 1.4, 0.40], [181, 150, 1.8, 0.50], [ 96, 170, 1.4, 0.40],
    [126, 175, 1.6, 0.45], [156, 185, 2.0, 0.55], [186, 180, 1.4, 0.40],
    [106, 200, 1.8, 0.50], [136, 205, 1.4, 0.40], [166, 215, 1.8, 0.50],
    [116, 230, 1.6, 0.45], [146, 235, 1.4, 0.40], [176, 230, 1.6, 0.45],
    // softer dark cluster
    [141, 170, 2.6, 0.28], [161, 195, 2.4, 0.26], [121, 205, 2.6, 0.28],
  ];

  // Particles fan from cluster (top-left) to bottom-right (vessel area) — cy shifted +90
  const particles = [
    { cx: 200, cy: 140, dx: 1450, dy: 790, dur: 9.2, delay: 0.0 },
    { cx: 150, cy: 170, dx: 1400, dy: 760, dur: 9.6, delay: 0.4 },
    { cx: 100, cy: 210, dx: 1480, dy: 730, dur: 8.8, delay: 0.8 },
    { cx: 250, cy: 160, dx: 1360, dy: 800, dur: 9.2, delay: 1.2 },
    { cx: 180, cy: 230, dx: 1420, dy: 710, dur: 9.5, delay: 1.6 },
    { cx: 120, cy: 270, dx: 1450, dy: 680, dur: 8.9, delay: 2.0 },
    { cx: 230, cy: 210, dx: 1320, dy: 750, dur: 9.3, delay: 2.4 },
    { cx:  80, cy: 310, dx: 1500, dy: 640, dur: 9.6, delay: 0.6 },
    { cx: 160, cy: 290, dx: 1400, dy: 670, dur: 9.0, delay: 1.0 },
    { cx: 270, cy: 240, dx: 1280, dy: 730, dur: 9.4, delay: 1.4 },
    { cx:  50, cy: 340, dx: 1550, dy: 610, dur: 9.7, delay: 1.8 },
    { cx: 190, cy: 120, dx: 1410, dy: 840, dur: 9.0, delay: 2.2 },
    { cx: 270, cy: 270, dx: 1260, dy: 700, dur: 9.5, delay: 2.6 },
    { cx:  70, cy: 240, dx: 1530, dy: 700, dur: 9.8, delay: 3.0 },
    { cx: 220, cy: 320, dx: 1300, dy: 650, dur: 9.3, delay: 0.2 },
    { cx: 120, cy: 340, dx: 1460, dy: 620, dur: 8.7, delay: 1.5 },
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
          <stop offset="0%"   stopColor="#7BC9E8" stopOpacity="0.62" />
          <stop offset="50%"  stopColor="#3FA3D1" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Blue corner glow — anchored to (0,0) matching VesselGrowth's orange glow style */}
      <circle cx="0" cy="0" r="520" fill={`url(#${gBigGlow})`} stroke="none" opacity="0.88" />

      {/* === CELL A — small, upper-right of C (overlaps C's upper-right body) === */}
      <g className="mc-cell mc-cell-1">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          d="M210,100 C240,98 265,108 275,130
             C285,148 280,172 265,184
             C245,200 217,200 200,188
             C180,175 173,150 183,130
             C190,115 200,102 210,100 Z"
        />
        <ellipse cx="225" cy="145" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL B — small, lower-left of C (overlaps C's lower-left body) === */}
      <g className="mc-cell mc-cell-2">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          d="M65,275 C95,273 120,285 128,307
             C138,330 130,350 112,361
             C90,375 65,373 48,359
             C32,345 25,323 35,305
             C40,290 55,277 65,275 Z"
        />
        <ellipse cx="80" cy="320" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL C — big focal, closest to corner, top at ~90 SVG units (below nav bar) === */}
      <g className="mc-cell mc-cell-3">
        <path
          fill={`url(#${gBody})`}
          stroke="#9CD9F0"
          strokeOpacity="0.32"
          strokeWidth="1.4"
          d="M126,90
             C166,85 203,97  219,125
             C233,143 239,167 227,187
             C241,203 241,230 221,243
             C227,263 209,285 185,287
             C186,307 163,320 139,313
             C123,325 99,325 85,313
             C59,320 39,307 39,285
             C19,283 6,263  15,243
             C1,230  -1,205 15,190
             C6,170  13,147 31,137
             C45,115 71,97  101,93
             C109,90 117,89 126,90 Z"
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
          d="M116,165
             C96,165 83,183 83,203
             C83,223 101,237 126,237
             C144,237 159,230 167,213
             C177,218 186,209 186,195
             C188,178 174,161 157,157
             C145,155 131,167 123,178
             C121,170 118,165 116,165 Z"
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
