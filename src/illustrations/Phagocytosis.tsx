import { useId } from "react";

/**
 * One macrophage engulfing a neutrophil — anchored to the bottom-left
 * corner of the hero, separate from the top-left cluster.
 *
 * Anatomy:
 *   - Soft blue glow behind the cell
 *   - Macrophage outer membrane: irregular blue amoeba
 *   - Phagocytic vacuole (lighter blue ellipse) inside the cell, almost
 *     fully surrounding the neutrophil — only a thin macrophage rim is
 *     visible around it on all sides, giving the "engulfed" read
 *   - Neutrophil: small semi-transparent white circle inside the vacuole,
 *     with a subtle pulse animation to suggest active digestion
 *   - The macrophage has its own off-center nucleus + a few speckles
 */
export function Phagocytosis({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  const gBody = `ph-body-${u}`;
  const gNuc  = `ph-nuc-${u}`;
  const gVac  = `ph-vac-${u}`;
  const gNeu  = `ph-neu-${u}`;
  const gGlow = `ph-glow-${u}`;

  return (
    <svg
      viewBox="0 0 500 400"
      preserveAspectRatio="xMinYMax meet"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gBody} cx="38%" cy="34%" r="68%">
          <stop offset="0%"   stopColor="#B7E2F2" stopOpacity="0.78" />
          <stop offset="55%"  stopColor="#5BB0DA" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0.68" />
        </radialGradient>
        <radialGradient id={gNuc} cx="40%" cy="32%" r="72%">
          <stop offset="0%"   stopColor="#3FA3D1" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#0c2d4a" stopOpacity="0.95" />
        </radialGradient>
        {/* Phagosome — slightly lighter blue cavity inside the macrophage */}
        <radialGradient id={gVac} cx="50%" cy="50%" r="60%">
          <stop offset="0%"   stopColor="#9CD9F0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3FA3D1" stopOpacity="0.30" />
        </radialGradient>
        <radialGradient id={gNeu} cx="40%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="60%"  stopColor="#dde6ee" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#a8b6c4" stopOpacity="0.40" />
        </radialGradient>
        {/* Soft blue ambient glow behind the cell */}
        <radialGradient id={gGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7BC9E8" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft blue ambient halo */}
      <ellipse cx="240" cy="220" rx="260" ry="200" fill={`url(#${gGlow})`} />

      <g className="ph-cell">
        {/* Macrophage body — irregular amoeba */}
        <path
          fill={`url(#${gBody})`}
          stroke="#9CD9F0"
          strokeOpacity="0.32"
          strokeWidth="1.4"
          d="M255,90
             C300,85 345,98 370,128
             C395,148 408,180 400,210
             C420,232 422,266 400,288
             C410,318 388,348 358,355
             C355,378 325,395 295,388
             C275,402 240,402 222,388
             C188,398 158,380 152,350
             C124,348 98,322 100,295
             C78,280 76,248 96,228
             C82,208 90,178 110,162
             C118,138 145,118 175,108
             C205,92 232,90 255,90 Z"
        />

        {/* Macrophage's own nucleus, off to the lower-left */}
        <ellipse cx="160" cy="290" rx="26" ry="20" fill={`url(#${gNuc})`} />

        {/* Speckles in the cytoplasm */}
        <g fill="#1E5A8A">
          <circle cx="135" cy="180" r="1.6" opacity="0.45" />
          <circle cx="160" cy="160" r="1.4" opacity="0.40" />
          <circle cx="190" cy="145" r="1.8" opacity="0.50" />
          <circle cx="220" cy="140" r="1.4" opacity="0.40" />
          <circle cx="250" cy="135" r="1.6" opacity="0.45" />
          <circle cx="115" cy="220" r="1.4" opacity="0.40" />
          <circle cx="135" cy="240" r="1.8" opacity="0.50" />
          <circle cx="115" cy="270" r="1.4" opacity="0.40" />
          <circle cx="200" cy="335" r="1.6" opacity="0.45" />
          <circle cx="240" cy="350" r="1.4" opacity="0.40" />
          <circle cx="280" cy="345" r="1.8" opacity="0.50" />
          <circle cx="320" cy="320" r="1.4" opacity="0.40" />
          <circle cx="355" cy="280" r="1.6" opacity="0.45" />
          <circle cx="375" cy="240" r="1.4" opacity="0.40" />
          <circle cx="370" cy="200" r="1.8" opacity="0.50" />
        </g>

        {/* Phagocytic vacuole — almost completely surrounds the neutrophil.
            Centered well inside the macrophage body so the cell membrane is
            visible all the way around the vacuole. */}
        <ellipse
          cx="280"
          cy="200"
          rx="58"
          ry="50"
          fill={`url(#${gVac})`}
          stroke="#7BC9E8"
          strokeOpacity="0.35"
          strokeWidth="1"
        />

        {/* Neutrophil being digested */}
        <g className="ph-neu">
          <circle cx="280" cy="200" r="34" fill={`url(#${gNeu})`} />
          {/* Multilobed nucleus hint (neutrophil-specific) */}
          <ellipse cx="270" cy="195" rx="9" ry="7" fill="#a8b6c4" opacity="0.55" />
          <ellipse cx="290" cy="208" rx="8" ry="6" fill="#a8b6c4" opacity="0.55" />
          <ellipse cx="282" cy="188" rx="6" ry="5" fill="#a8b6c4" opacity="0.45" />
          {/* Granules */}
          <circle cx="266" cy="210" r="1.8" fill="#fff" opacity="0.55" />
          <circle cx="296" cy="195" r="1.6" fill="#fff" opacity="0.50" />
          <circle cx="280" cy="220" r="1.4" fill="#fff" opacity="0.45" />
          <circle cx="275" cy="180" r="1.6" fill="#fff" opacity="0.55" />
        </g>
      </g>

      <style>{`
        .ph-cell {
          transform-origin: center;
          transform-box: fill-box;
          animation: phBreathe 7s ease-in-out infinite;
        }
        @keyframes phBreathe {
          0%, 100% { transform: scale(1);    }
          50%      { transform: scale(1.025);}
        }

        .ph-neu {
          transform-origin: center;
          transform-box: fill-box;
          animation: phNeu 4.2s ease-in-out infinite;
        }
        @keyframes phNeu {
          0%, 100% { opacity: 1;    transform: scale(1);    }
          50%      { opacity: 0.55; transform: scale(0.88); }
        }
      `}</style>
    </svg>
  );
}
