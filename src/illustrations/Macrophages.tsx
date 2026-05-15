import { useId } from "react";

/**
 * Macrophage cluster + diagonal particle release.
 *
 * Just the top-left cluster now (the phagocytosis vignette is its own
 * component, Phagocytosis.tsx, anchored bottom-left).
 *
 * Layout (inside the 1800×1000 viewBox, viewport-ish aspect, anchored
 * top-left so the cluster ALWAYS sits in the upper-left of the hero):
 *   - Soft blue radial glow centered behind the cluster
 *   - 3 small bunched cells in the upper-left, the front one with
 *     speckled cytoplasm + nucleus
 *   - ~16 particles drifting diagonally to the bottom-right of the SVG
 *     where the vessel layer lives
 */
export function Macrophages({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  const gBody    = `mc-body-${u}`;
  const gNuc     = `mc-nuc-${u}`;
  const gGlow    = `mc-glow-${u}`;
  const gBigGlow = `mc-bigglow-${u}`;

  // Speckled granules for the front (focal) cell, centered around (300, 300).
  const speckles: Array<[number, number, number, number]> = [
    [275, 250, 1.4, 0.45], [295, 245, 1.8, 0.55], [320, 255, 1.4, 0.40],
    [345, 260, 1.6, 0.50], [270, 275, 1.6, 0.45], [298, 280, 2.0, 0.55],
    [325, 290, 1.4, 0.40], [350, 285, 1.8, 0.50], [265, 305, 1.4, 0.40],
    [295, 310, 1.6, 0.45], [325, 320, 2.0, 0.55], [355, 315, 1.4, 0.40],
    [275, 335, 1.8, 0.50], [305, 340, 1.4, 0.40], [335, 350, 1.8, 0.50],
    [285, 365, 1.6, 0.45], [315, 370, 1.4, 0.40], [345, 365, 1.6, 0.45],
    // softer dark cluster
    [310, 305, 2.6, 0.28], [330, 330, 2.4, 0.26], [290, 340, 2.6, 0.28],
  ];

  // Particles travel from cluster (≈ 200-400, 200-380) diagonally to the
  // bottom-right of the SVG (≈ 1500-1700, 800-950). dx, dy both positive.
  const particles = [
    { cx: 230, cy: 220, dx: 1380, dy: 700, dur: 9.2, delay: 0.0 },
    { cx: 280, cy: 240, dx: 1320, dy: 680, dur: 9.6, delay: 0.4 },
    { cx: 320, cy: 230, dx: 1280, dy: 700, dur: 8.8, delay: 0.8 },
    { cx: 360, cy: 250, dx: 1240, dy: 680, dur: 9.2, delay: 1.2 },
    { cx: 250, cy: 290, dx: 1350, dy: 640, dur: 9.5, delay: 1.6 },
    { cx: 300, cy: 305, dx: 1300, dy: 620, dur: 8.9, delay: 2.0 },
    { cx: 340, cy: 310, dx: 1260, dy: 630, dur: 9.3, delay: 2.4 },
    { cx: 280, cy: 360, dx: 1320, dy: 560, dur: 9.6, delay: 0.6 },
    { cx: 320, cy: 370, dx: 1280, dy: 550, dur: 9.0, delay: 1.0 },
    { cx: 360, cy: 350, dx: 1240, dy: 580, dur: 9.4, delay: 1.4 },
    { cx: 220, cy: 320, dx: 1380, dy: 590, dur: 9.7, delay: 1.8 },
    { cx: 260, cy: 195, dx: 1340, dy: 730, dur: 9.0, delay: 2.2 },
    { cx: 380, cy: 280, dx: 1220, dy: 660, dur: 9.5, delay: 2.6 },
    { cx: 200, cy: 245, dx: 1400, dy: 680, dur: 9.8, delay: 3.0 },
    { cx: 410, cy: 220, dx: 1190, dy: 720, dur: 9.3, delay: 0.2 },
    { cx: 240, cy: 380, dx: 1360, dy: 530, dur: 8.7, delay: 1.5 },
  ];

  return (
    <svg
      viewBox="0 0 1800 1000"
      preserveAspectRatio="xMinYMin meet"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: "visible" }}
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
        {/* Big blue atmospheric glow centered on the cluster */}
        <radialGradient id={gBigGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7BC9E8" stopOpacity="0.32" />
          <stop offset="50%"  stopColor="#3FA3D1" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* === BLUE GLOW behind the cluster, top-left === */}
      <ellipse cx="280" cy="280" rx="420" ry="340" fill={`url(#${gBigGlow})`} />

      {/* === CELL A — back-left, smaller === */}
      <g className="mc-cell mc-cell-1">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          d="M225,150
             C255,148 280,158 290,180
             C300,198 295,222 280,234
             C260,250 232,250 215,238
             C195,225 188,200 198,180
             C205,165 215,152 225,150 Z"
        />
        <ellipse cx="240" cy="195" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL B — back-right, smaller, overlaps A slightly === */}
      <g className="mc-cell mc-cell-2">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          d="M345,150
             C375,148 400,160 408,182
             C418,205 410,225 392,236
             C370,250 345,248 328,234
             C312,220 305,198 315,180
             C320,165 335,152 345,150 Z"
        />
        <ellipse cx="360" cy="195" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL C — FRONT focal, biggest, with speckles === */}
      <g className="mc-cell mc-cell-3">
        <path
          fill={`url(#${gBody})`}
          stroke="#9CD9F0"
          strokeOpacity="0.32"
          strokeWidth="1.4"
          d="M295,225
             C335,220 372,232 388,260
             C402,278 408,302 396,322
             C410,338 410,365 390,378
             C396,398 378,420 354,422
             C355,442 332,455 308,448
             C292,460 268,460 254,448
             C228,455 208,442 208,420
             C188,418 175,398 184,378
             C170,365 168,340 184,325
             C175,305 182,282 200,272
             C214,250 240,232 270,228
             C278,225 286,224 295,225 Z"
        />

        {/* Speckled cytoplasm */}
        <g fill="#1E5A8A">
          {speckles.map((s, i) => (
            <circle key={i} cx={s[0]} cy={s[1]} r={s[2]} opacity={s[3]} />
          ))}
        </g>
        {/* Highlight specks */}
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
          d="M285,300
             C265,300 252,318 252,338
             C252,358 270,372 295,372
             C313,372 328,365 336,348
             C346,353 355,344 355,330
             C357,313 343,296 326,292
             C314,290 300,302 292,313
             C290,305 287,300 285,300 Z"
        />
      </g>

      {/* === PARTICLES === */}
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
