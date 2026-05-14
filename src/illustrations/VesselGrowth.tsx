import { useId } from "react";

/**
 * Animated blood-vessel regrowth illustration.
 * Inspired by https://youtu.be/jZ9Q-Hw_mdA?t=25 — vessels extend and branch
 * outward from a central node, looping continuously.
 *
 * Visual logic:
 *   - One main "trunk" emerges from the corner
 *   - Several "branch" arteries extend outward at staggered times
 *   - Fine capillaries fan off each branch
 *   - All paths use stroke-dasharray + stroke-dashoffset to "draw" themselves
 *   - The whole tree loops by fading out then redrawing (CSS animation below)
 */
type Props = {
  className?: string;
  /** Where the vessels emerge from. */
  origin?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

export function VesselGrowth({ className = "", origin = "top-right" }: Props) {
  const uid = useId().replace(/:/g, "");
  const gOrange = `vg-orange-${uid}`;
  const gBlue = `vg-blue-${uid}`;
  const gFade = `vg-fade-${uid}`;

  // Each path is drawn from origin (0,0 in viewBox after transform)
  // We transform the whole group so the same path data works for any corner.
  const rotation = {
    "top-right": "scale(-1, 1) translate(-600, 0)",
    "top-left": "translate(0, 0)",
    "bottom-right": "scale(-1, -1) translate(-600, -600)",
    "bottom-left": "scale(1, -1) translate(0, -600)",
  }[origin];

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* gradient used by the main trunks (orange → coral, like arterial color) */}
        <linearGradient id={gOrange} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F58A4B" />
          <stop offset="100%" stopColor="#F39966" />
        </linearGradient>
        {/* gradient for veins / cool capillaries */}
        <linearGradient id={gBlue} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7BC9E8" />
          <stop offset="100%" stopColor="#1E5A8A" />
        </linearGradient>
        {/* radial fade-out at the tip so vessels appear to taper into nothing */}
        <radialGradient id={gFade} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F58A4B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F58A4B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g transform={rotation}>
        {/* soft glow behind the origin point */}
        <circle cx="40" cy="40" r="220" fill={`url(#${gFade})`} opacity="0.6" />

        {/* === Main trunk vessels (thick, drawn first) === */}
        <g
          fill="none"
          stroke={`url(#${gOrange})`}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="vg-path vg-trunk-1"
            strokeWidth="6"
            d="M40,40 C120,70 180,160 260,220 C340,280 420,360 520,420"
          />
          <path
            className="vg-path vg-trunk-2"
            strokeWidth="5"
            d="M40,40 C80,140 160,200 240,300 C320,400 360,460 400,560"
          />
          <path
            className="vg-path vg-trunk-3"
            strokeWidth="5"
            d="M40,40 C140,80 220,80 320,100 C420,120 500,160 580,200"
          />
        </g>

        {/* === Mid branches (medium, drawn next) === */}
        <g
          fill="none"
          stroke={`url(#${gOrange})`}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="vg-path vg-branch-1"
            strokeWidth="3"
            d="M260,220 C300,200 340,180 400,170"
          />
          <path
            className="vg-path vg-branch-2"
            strokeWidth="3"
            d="M260,220 C280,260 310,310 350,360"
          />
          <path
            className="vg-path vg-branch-3"
            strokeWidth="3"
            d="M240,300 C220,340 200,380 180,420"
          />
          <path
            className="vg-path vg-branch-4"
            strokeWidth="3"
            d="M320,100 C360,140 380,180 400,220"
          />
          <path
            className="vg-path vg-branch-5"
            strokeWidth="3"
            d="M420,360 C460,380 500,410 540,460"
          />
          <path
            className="vg-path vg-branch-6"
            strokeWidth="2.5"
            d="M320,100 C300,140 280,180 270,220"
          />
        </g>

        {/* === Fine capillaries (thin, drawn last, blue tinted) === */}
        <g
          fill="none"
          stroke={`url(#${gOrange})`}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="vg-path vg-cap-1"
            strokeWidth="1.4"
            d="M400,170 C440,160 480,170 520,160"
          />
          <path
            className="vg-path vg-cap-2"
            strokeWidth="1.2"
            d="M400,170 C410,200 430,220 460,240"
          />
          <path
            className="vg-path vg-cap-3"
            strokeWidth="1.2"
            d="M350,360 C390,380 420,420 440,460"
          />
          <path
            className="vg-path vg-cap-4"
            strokeWidth="1.1"
            d="M180,420 C200,460 220,500 240,540"
          />
          <path
            className="vg-path vg-cap-5"
            strokeWidth="1.1"
            d="M180,420 C140,440 110,480 80,520"
          />
          <path
            className="vg-path vg-cap-6"
            strokeWidth="1"
            d="M400,220 C440,250 480,270 520,290"
          />
          <path
            className="vg-path vg-cap-7"
            strokeWidth="1"
            d="M540,460 C570,490 580,520 590,560"
          />
          <path
            className="vg-path vg-cap-8"
            strokeWidth="1"
            d="M270,220 C240,240 220,260 200,290"
          />
          <path
            className="vg-path vg-cap-9"
            strokeWidth="0.9"
            d="M460,240 C490,260 520,260 550,260"
          />
          <path
            className="vg-path vg-cap-10"
            strokeWidth="0.9"
            d="M240,540 C260,560 280,575 310,590"
          />
        </g>

        {/* Pulsing dots at branch nodes — represent blood cells at junctions */}
        <g fill="#F58A4B">
          <circle className="vg-node vg-node-1" cx="260" cy="220" r="3" />
          <circle className="vg-node vg-node-2" cx="320" cy="100" r="2.5" />
          <circle className="vg-node vg-node-3" cx="240" cy="300" r="2.5" />
          <circle className="vg-node vg-node-4" cx="420" cy="360" r="2.5" />
          <circle className="vg-node vg-node-5" cx="180" cy="420" r="2" />
        </g>
      </g>

      <style>{`
        /* Each path animates its own stroke-draw, on a loop.
           Different delays so vessels grow in waves, not all at once. */
        .vg-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: vgDraw 7s ease-in-out infinite;
        }
        .vg-trunk-1  { animation-delay: 0s;   }
        .vg-trunk-2  { animation-delay: 0.4s; }
        .vg-trunk-3  { animation-delay: 0.6s; }
        .vg-branch-1 { animation-delay: 1.2s; }
        .vg-branch-2 { animation-delay: 1.3s; }
        .vg-branch-3 { animation-delay: 1.4s; }
        .vg-branch-4 { animation-delay: 1.5s; }
        .vg-branch-5 { animation-delay: 1.6s; }
        .vg-branch-6 { animation-delay: 1.7s; }
        .vg-cap-1    { animation-delay: 2.2s; }
        .vg-cap-2    { animation-delay: 2.3s; }
        .vg-cap-3    { animation-delay: 2.4s; }
        .vg-cap-4    { animation-delay: 2.5s; }
        .vg-cap-5    { animation-delay: 2.6s; }
        .vg-cap-6    { animation-delay: 2.7s; }
        .vg-cap-7    { animation-delay: 2.8s; }
        .vg-cap-8    { animation-delay: 2.9s; }
        .vg-cap-9    { animation-delay: 3.0s; }
        .vg-cap-10   { animation-delay: 3.1s; }

        @keyframes vgDraw {
          0%   { stroke-dashoffset: 1000; opacity: 0;   }
          8%   {                          opacity: 1;   }
          55%  { stroke-dashoffset: 0;    opacity: 1;   }
          80%  { stroke-dashoffset: 0;    opacity: 0.95;}
          100% { stroke-dashoffset: 0;    opacity: 0;   }
        }

        .vg-node {
          opacity: 0;
          animation: vgPulse 7s ease-in-out infinite;
          transform-origin: center;
        }
        .vg-node-1 { animation-delay: 1.5s; }
        .vg-node-2 { animation-delay: 1.8s; }
        .vg-node-3 { animation-delay: 2.1s; }
        .vg-node-4 { animation-delay: 2.4s; }
        .vg-node-5 { animation-delay: 2.7s; }
        @keyframes vgPulse {
          0%, 100% { opacity: 0; }
          20%      { opacity: 0; }
          40%, 70% { opacity: 1; }
          85%      { opacity: 0.5; }
        }
      `}</style>
    </svg>
  );
}
