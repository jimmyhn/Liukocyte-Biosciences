import { useId } from "react";

/**
 * M2 macrophages occupying the right-center of the hero, releasing small
 * white-with-blue-glow particles that rise all the way to the top of the
 * SVG (which is sized to span the full height of the hero). The particles'
 * ascent is what visually triggers the angiogenesis above.
 *
 * Structure:
 *   - 1 large central macrophage + 2 smaller flanking cells, all blue,
 *     low-opacity so they read as background atmosphere rather than
 *     foreground subject.
 *   - Each cell has a slow membrane "breathe" pulse.
 *   - 18 particles distributed across the cluster, each travelling far
 *     up the SVG (≈ 800-1000 px) on per-particle delays/durations.
 */
export function Macrophages({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  const gCell = `mc-cell-${u}`;
  const gNuc  = `mc-nuc-${u}`;
  const gGlow = `mc-glow-${u}`;

  // Cells are placed in the bottom-middle of the SVG; particles travel
  // from there up through the full viewBox height (1200 px).
  const particles = [
    { cx: 300, cy: 900,  dx:  -20, dy: -820, dur: 8.5, delay: 0.0 },
    { cx: 360, cy: 920,  dx:   30, dy: -870, dur: 9.0, delay: 0.6 },
    { cx: 420, cy: 880,  dx:  -10, dy: -800, dur: 8.0, delay: 1.2 },
    { cx: 480, cy: 940,  dx:   20, dy: -880, dur: 9.5, delay: 1.8 },
    { cx: 540, cy: 900,  dx:  -25, dy: -830, dur: 8.8, delay: 0.3 },
    { cx: 600, cy: 940,  dx:   35, dy: -900, dur: 9.2, delay: 0.9 },
    { cx: 360, cy: 980,  dx:   10, dy: -880, dur: 8.4, delay: 1.5 },
    { cx: 440, cy: 1020, dx:  -30, dy: -940, dur: 9.6, delay: 2.1 },
    { cx: 540, cy: 1000, dx:    5, dy: -920, dur: 8.6, delay: 0.4 },
    { cx: 600, cy: 1050, dx:  -10, dy: -960, dur: 9.0, delay: 1.0 },
    { cx: 480, cy: 1060, dx:   25, dy: -990, dur: 8.8, delay: 1.6 },
    { cx: 280, cy: 1000, dx:   15, dy: -920, dur: 9.4, delay: 2.4 },
    { cx: 420, cy: 1100, dx:    0, dy:-1020, dur: 9.2, delay: 0.7 },
    { cx: 540, cy: 1080, dx:   30, dy:-1000, dur: 8.6, delay: 1.3 },
    { cx: 380, cy: 1050, dx:  -20, dy: -970, dur: 9.3, delay: 1.9 },
    { cx: 460, cy: 980,  dx:   10, dy: -900, dur: 8.7, delay: 2.6 },
    { cx: 320, cy: 940,  dx:   40, dy: -860, dur: 9.1, delay: 3.0 },
    { cx: 580, cy: 1020, dx:  -15, dy: -940, dur: 8.9, delay: 3.3 },
  ];

  return (
    <svg
      viewBox="0 0 700 1200"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Cell body — pale-to-mid blue, intentionally low opacity */}
        <radialGradient id={gCell} cx="40%" cy="40%" r="65%">
          <stop offset="0%"   stopColor="#9CD9F0" stopOpacity="0.55" />
          <stop offset="60%"  stopColor="#5BB0DA" stopOpacity="0.40" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0.35" />
        </radialGradient>
        {/* Nucleus — deeper blue but still soft */}
        <radialGradient id={gNuc} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#3FA3D1" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#10406b" stopOpacity="0.60" />
        </radialGradient>
        {/* Particle glow — soft blue halo */}
        <radialGradient id={gGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7BC9E8" stopOpacity="0.55" />
          <stop offset="60%"  stopColor="#3FA3D1" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* === Cells (drawn first, particles overlay them) === */}
      {/* Left smaller cell */}
      <g className="mc-cell mc-cell-1">
        <path
          fill={`url(#${gCell})`}
          stroke="#7BC9E8"
          strokeOpacity="0.18"
          strokeWidth="1.2"
          d="M260,1100
             C230,1090 210,1064 214,1034
             C218,1000 246,978 280,978
             C312,968 350,984 362,1016
             C376,1038 372,1070 350,1090
             C328,1108 290,1110 260,1100 Z"
        />
        <ellipse cx="294" cy="1024" rx="22" ry="18" fill={`url(#${gNuc})`} />
      </g>

      {/* Large central macrophage — the focal cell, in the right-middle of the SVG */}
      <g className="mc-cell mc-cell-2">
        <path
          fill={`url(#${gCell})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.6"
          d="M480,1140
             C432,1132 392,1100 384,1052
             C374,1000 404,948 452,924
             C496,902 558,902 598,924
             C642,944 668,988 670,1036
             C672,1086 642,1136 596,1158
             C552,1174 510,1166 480,1140 Z"
        />
        <ellipse cx="528" cy="1030" rx="36" ry="30" fill={`url(#${gNuc})`} />
      </g>

      {/* Right smaller cell */}
      <g className="mc-cell mc-cell-3">
        <path
          fill={`url(#${gCell})`}
          stroke="#7BC9E8"
          strokeOpacity="0.18"
          strokeWidth="1.2"
          d="M168,1010
             C146,1000 132,978 134,956
             C136,932 156,914 180,910
             C204,902 232,914 244,936
             C258,952 258,978 244,994
             C232,1010 208,1018 184,1014
             C180,1014 172,1012 168,1010 Z"
        />
        <ellipse cx="186" cy="958" rx="20" ry="16" fill={`url(#${gNuc})`} />
      </g>

      {/* === Particles === */}
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
            {/* glow halo */}
            <circle cx={p.cx} cy={p.cy} r="7" fill={`url(#${gGlow})`} />
            {/* bright inner dot — off-white, intentionally soft */}
            <circle cx={p.cx} cy={p.cy} r="1.6" fill="#e6edf5" opacity="0.85" />
          </g>
        ))}
      </g>

      <style>{`
        /* Subtle membrane breathing — slow scale pulse */
        .mc-cell { transform-origin: center; }
        .mc-cell-1 { animation: mcBreathe 5.5s ease-in-out infinite;        }
        .mc-cell-2 { animation: mcBreathe 6.5s ease-in-out infinite 0.6s;   }
        .mc-cell-3 { animation: mcBreathe 6.0s ease-in-out infinite 1.1s;   }
        @keyframes mcBreathe {
          0%, 100% { transform: scale(1);    }
          50%      { transform: scale(1.025);}
        }

        /* Particles ascend the full SVG height + fade. The per-particle
           CSS vars --mc-dx/--mc-dy set the travel distance. */
        .mc-p {
          opacity: 0;
          animation-name: mcParticle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out;
        }
        @keyframes mcParticle {
          0%   { transform: translate(0,0);                         opacity: 0; }
          8%   {                                                    opacity: 1; }
          80%  {                                                    opacity: 0.7;}
          100% { transform: translate(var(--mc-dx), var(--mc-dy));  opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
