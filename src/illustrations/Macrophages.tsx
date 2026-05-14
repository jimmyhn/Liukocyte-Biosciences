import { useId } from "react";

/**
 * Three blue M2 macrophages in the bottom-right corner of the hero,
 * releasing small white-with-blue-glow particles that drift upward —
 * visual metaphor for the cells triggering angiogenesis.
 *
 * Structure:
 *   - 3 organic blob shapes (paths) with a deeper-blue nucleus inside each
 *   - A swarm of ~16 particles distributed across the cells, each rising
 *     and fading in a CSS keyframe loop on its own delay
 *   - Each particle = bright inner dot + soft blue glow halo
 */
export function Macrophages({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  const gCell = `mc-cell-${u}`;
  const gNuc  = `mc-nuc-${u}`;
  const gGlow = `mc-glow-${u}`;

  // Particles: each is anchored near one of the 3 cells, with a unique
  // upward drift, delay, and duration so the swarm feels organic.
  const particles = [
    { cx: 360, cy: 380, dx:  -20, dy: -260, dur: 6.5, delay: 0.0 },
    { cx: 380, cy: 360, dx:   10, dy: -300, dur: 7.5, delay: 0.6 },
    { cx: 410, cy: 400, dx:  -40, dy: -250, dur: 6.0, delay: 1.2 },
    { cx: 440, cy: 370, dx:   20, dy: -330, dur: 7.0, delay: 1.8 },
    { cx: 460, cy: 410, dx:  -10, dy: -280, dur: 6.8, delay: 0.3 },
    { cx: 500, cy: 380, dx:   30, dy: -290, dur: 7.2, delay: 0.9 },
    { cx: 520, cy: 420, dx:    0, dy: -310, dur: 6.4, delay: 1.5 },
    { cx: 560, cy: 360, dx:  -25, dy: -270, dur: 7.6, delay: 2.1 },
    { cx: 540, cy: 400, dx:   15, dy: -300, dur: 6.6, delay: 0.4 },
    { cx: 590, cy: 410, dx:   -5, dy: -260, dur: 7.0, delay: 1.0 },
    { cx: 610, cy: 380, dx:   25, dy: -320, dur: 6.8, delay: 1.6 },
    { cx: 480, cy: 350, dx:    5, dy: -280, dur: 7.4, delay: 2.4 },
    { cx: 430, cy: 360, dx:   35, dy: -240, dur: 6.2, delay: 0.7 },
    { cx: 380, cy: 410, dx:  -30, dy: -290, dur: 7.3, delay: 1.3 },
    { cx: 560, cy: 420, dx:   10, dy: -260, dur: 6.7, delay: 1.9 },
    { cx: 600, cy: 350, dx:  -15, dy: -310, dur: 7.1, delay: 2.6 },
  ];

  return (
    <svg
      viewBox="0 0 700 600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Cell body — pale-to-mid blue */}
        <radialGradient id={gCell} cx="40%" cy="40%" r="65%">
          <stop offset="0%"   stopColor="#9CD9F0" stopOpacity="0.95" />
          <stop offset="60%"  stopColor="#5BB0DA" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0.85" />
        </radialGradient>
        {/* Nucleus — deeper blue */}
        <radialGradient id={gNuc} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#3FA3D1" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#10406b" stopOpacity="0.95" />
        </radialGradient>
        {/* Particle glow — soft blue halo */}
        <radialGradient id={gGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7BC9E8" stopOpacity="0.55" />
          <stop offset="60%"  stopColor="#3FA3D1" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* === Particles (rendered first so cells sit on top of their origin) === */}
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
            <circle cx={p.cx} cy={p.cy} r="6" fill={`url(#${gGlow})`} />
            {/* bright inner dot — off-white, not pure white so it stays soft */}
            <circle cx={p.cx} cy={p.cy} r="1.4" fill="#e6edf5" opacity="0.85" />
          </g>
        ))}
      </g>

      {/* === Macrophage 1 — back, smaller, upper === */}
      <g className="mc-cell mc-cell-1">
        <path
          fill={`url(#${gCell})`}
          stroke="#7BC9E8"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          d="M380,360
             C360,346 350,332 360,316
             C370,300 388,294 408,300
             C424,294 442,302 450,320
             C462,332 460,352 448,366
             C440,380 420,386 402,378
             C390,376 384,372 380,360 Z"
        />
        <ellipse cx="410" cy="334" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === Macrophage 2 — large, center === */}
      <g className="mc-cell mc-cell-2">
        <path
          fill={`url(#${gCell})`}
          stroke="#7BC9E8"
          strokeOpacity="0.4"
          strokeWidth="1.4"
          d="M460,470
             C432,468 412,452 408,428
             C402,398 420,372 446,360
             C470,348 502,348 526,360
             C552,370 568,392 568,420
             C570,448 552,476 524,488
             C498,498 472,494 460,470 Z"
        />
        <ellipse cx="488" cy="418" rx="22" ry="18" fill={`url(#${gNuc})`} />
      </g>

      {/* === Macrophage 3 — right, medium === */}
      <g className="mc-cell mc-cell-3">
        <path
          fill={`url(#${gCell})`}
          stroke="#7BC9E8"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          d="M600,440
             C580,438 564,422 562,400
             C560,380 574,360 594,354
             C614,346 638,354 650,372
             C664,386 666,408 654,424
             C644,440 624,450 606,446
             C604,446 602,442 600,440 Z"
        />
        <ellipse cx="610" cy="394" rx="16" ry="13" fill={`url(#${gNuc})`} />
      </g>

      <style>{`
        /* Subtle membrane breathing — slow scale pulse */
        .mc-cell { transform-origin: center; }
        .mc-cell-1 { animation: mcBreathe 5.5s ease-in-out infinite; }
        .mc-cell-2 { animation: mcBreathe 6.5s ease-in-out infinite 0.6s; }
        .mc-cell-3 { animation: mcBreathe 6.0s ease-in-out infinite 1.1s; }
        @keyframes mcBreathe {
          0%, 100% { transform: scale(1);    }
          50%      { transform: scale(1.03); }
        }

        /* Particles rise + fade in a loop. dx/dy are CSS vars set per particle. */
        .mc-p {
          opacity: 0;
          animation-name: mcParticle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out;
        }
        @keyframes mcParticle {
          0%   { transform: translate(0,0);                         opacity: 0; }
          10%  {                                                    opacity: 1; }
          70%  {                                                    opacity: 0.7; }
          100% { transform: translate(var(--mc-dx), var(--mc-dy));  opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
