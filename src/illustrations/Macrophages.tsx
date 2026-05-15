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

  // Speckles for focal cell C — shifted down +115 SVG units to clear nav bar
  const speckles: Array<[number, number, number, number]> = [
    [106, 140, 1.4, 0.45], [126, 135, 1.8, 0.55], [151, 145, 1.4, 0.40],
    [176, 150, 1.6, 0.50], [101, 165, 1.6, 0.45], [129, 170, 2.0, 0.55],
    [156, 180, 1.4, 0.40], [181, 175, 1.8, 0.50], [ 96, 195, 1.4, 0.40],
    [126, 200, 1.6, 0.45], [156, 210, 2.0, 0.55], [186, 205, 1.4, 0.40],
    [106, 225, 1.8, 0.50], [136, 230, 1.4, 0.40], [166, 240, 1.8, 0.50],
    [116, 255, 1.6, 0.45], [146, 260, 1.4, 0.40], [176, 255, 1.6, 0.45],
    // softer dark cluster
    [141, 195, 2.6, 0.28], [161, 220, 2.4, 0.26], [121, 230, 2.6, 0.28],
  ];

  // Particles fan from cluster (top-left) to bottom-right (vessel area).
  // cy shifted +115 to match cell shift. ~28 particles for a denser stream
  // toward the bottom-right corner.
  const particles = [
    { cx: 200, cy: 165, dx: 1450, dy: 790, dur: 9.2, delay: 0.0 },
    { cx: 150, cy: 195, dx: 1400, dy: 760, dur: 9.6, delay: 0.4 },
    { cx: 100, cy: 235, dx: 1480, dy: 730, dur: 8.8, delay: 0.8 },
    { cx: 250, cy: 185, dx: 1360, dy: 800, dur: 9.2, delay: 1.2 },
    { cx: 180, cy: 255, dx: 1420, dy: 710, dur: 9.5, delay: 1.6 },
    { cx: 120, cy: 295, dx: 1450, dy: 680, dur: 8.9, delay: 2.0 },
    { cx: 230, cy: 235, dx: 1320, dy: 750, dur: 9.3, delay: 2.4 },
    { cx:  80, cy: 335, dx: 1500, dy: 640, dur: 9.6, delay: 0.6 },
    { cx: 160, cy: 315, dx: 1400, dy: 670, dur: 9.0, delay: 1.0 },
    { cx: 270, cy: 265, dx: 1280, dy: 730, dur: 9.4, delay: 1.4 },
    { cx:  50, cy: 365, dx: 1550, dy: 610, dur: 9.7, delay: 1.8 },
    { cx: 190, cy: 145, dx: 1410, dy: 840, dur: 9.0, delay: 2.2 },
    { cx: 270, cy: 295, dx: 1260, dy: 700, dur: 9.5, delay: 2.6 },
    { cx:  70, cy: 265, dx: 1530, dy: 700, dur: 9.8, delay: 3.0 },
    { cx: 220, cy: 345, dx: 1300, dy: 650, dur: 9.3, delay: 0.2 },
    { cx: 120, cy: 365, dx: 1460, dy: 620, dur: 8.7, delay: 1.5 },
    // Extra particles for a denser stream toward the bottom-right corner.
    { cx: 220, cy: 205, dx: 1380, dy: 770, dur: 9.1, delay: 0.3 },
    { cx:  95, cy: 295, dx: 1500, dy: 660, dur: 9.5, delay: 0.7 },
    { cx: 175, cy: 325, dx: 1410, dy: 640, dur: 8.8, delay: 1.1 },
    { cx: 245, cy: 225, dx: 1340, dy: 740, dur: 9.4, delay: 1.5 },
    { cx:  60, cy: 220, dx: 1530, dy: 720, dur: 9.7, delay: 1.9 },
    { cx: 290, cy: 305, dx: 1270, dy: 690, dur: 9.0, delay: 2.3 },
    { cx: 140, cy: 405, dx: 1430, dy: 580, dur: 8.9, delay: 2.7 },
    { cx:  30, cy: 315, dx: 1570, dy: 660, dur: 9.6, delay: 0.5 },
    { cx: 210, cy: 385, dx: 1310, dy: 600, dur: 9.2, delay: 1.3 },
    { cx: 100, cy: 180, dx: 1490, dy: 800, dur: 9.4, delay: 1.7 },
    { cx: 260, cy: 155, dx: 1340, dy: 830, dur: 9.0, delay: 2.1 },
    { cx:  40, cy: 405, dx: 1560, dy: 580, dur: 9.5, delay: 2.5 },
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
          d="M210,125 C240,123 265,133 275,155
             C285,173 280,197 265,209
             C245,225 217,225 200,213
             C180,200 173,175 183,155
             C190,140 200,127 210,125 Z"
        />
        <ellipse cx="225" cy="170" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL B — small, lower-left of C (overlaps C's lower-left body) === */}
      <g className="mc-cell mc-cell-2">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          d="M65,300 C95,298 120,310 128,332
             C138,355 130,375 112,386
             C90,400 65,398 48,384
             C32,370 25,348 35,330
             C40,315 55,302 65,300 Z"
        />
        <ellipse cx="80" cy="345" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL C — big focal, closest to corner, top at ~115 SVG units (well below nav) === */}
      <g className="mc-cell mc-cell-3">
        <path
          fill={`url(#${gBody})`}
          stroke="#9CD9F0"
          strokeOpacity="0.32"
          strokeWidth="1.4"
          d="M126,115
             C166,110 203,122 219,150
             C233,168 239,192 227,212
             C241,228 241,255 221,268
             C227,288 209,310 185,312
             C186,332 163,345 139,338
             C123,350 99,350 85,338
             C59,345 39,332 39,310
             C19,308 6,288  15,268
             C1,255  -1,230 15,215
             C6,195  13,172 31,162
             C45,140 71,122 101,118
             C109,115 117,114 126,115 Z"
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
          d="M116,190
             C96,190 83,208 83,228
             C83,248 101,262 126,262
             C144,262 159,255 167,238
             C177,243 186,234 186,220
             C188,203 174,186 157,182
             C145,180 131,192 123,203
             C121,195 118,190 116,190 Z"
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
