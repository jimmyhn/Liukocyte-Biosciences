import { useId } from "react";

/**
 * Dual-barrel syringe illustration.
 * Two side-by-side barrels — top (cyan/blue) = hydrogel base,
 * bottom (orange) = AN factor. Converge into a mixing chamber and needle.
 * An animated droplet stream exits the tip.
 */
export function DualSyringe({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 720 360"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Dual-barrel syringe"
    >
      <defs>
        <linearGradient id={`ds-top-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#7BC9E8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3FA3D1" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`ds-bot-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#F58A4B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#d56a2a" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`ds-mix-${u}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"  stopColor="#F58A4B" />
          <stop offset="100%" stopColor="#3FA3D1" />
        </linearGradient>
        <linearGradient id={`ds-metal-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#3a4150" />
          <stop offset="50%" stopColor="#6b7585" />
          <stop offset="100%" stopColor="#2a313d" />
        </linearGradient>
      </defs>

      {/* Plungers */}
      <rect x="20"  y="80"  width="22" height="80" rx="3" fill={`url(#ds-metal-${u})`} />
      <rect x="20"  y="200" width="22" height="80" rx="3" fill={`url(#ds-metal-${u})`} />
      <rect x="0"   y="85"  width="22" height="20"        fill={`url(#ds-metal-${u})`} />
      <rect x="0"   y="255" width="22" height="20"        fill={`url(#ds-metal-${u})`} />

      {/* Plunger shafts */}
      <rect x="42"  y="110" width="98" height="20" fill="#52596a" />
      <rect x="42"  y="230" width="98" height="20" fill="#52596a" />

      {/* Finger flanges */}
      <rect x="140" y="60"  width="14" height="80"  rx="3" fill="#52596a" />
      <rect x="140" y="220" width="14" height="80"  rx="3" fill="#52596a" />

      {/* Top barrel — hydrogel base (blue) */}
      <rect x="154" y="80"  width="290" height="80" rx="6" fill={`url(#ds-top-${u})`} stroke="#7BC9E8" strokeOpacity="0.6" strokeWidth="1.2" />
      <g stroke="#0a0d16" strokeOpacity="0.4" strokeWidth="1">
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i} x1={186 + i*32} y1="80" x2={186 + i*32} y2="95" />
        ))}
      </g>

      {/* Bottom barrel — AN factor (orange) */}
      <rect x="154" y="200" width="290" height="80" rx="6" fill={`url(#ds-bot-${u})`} stroke="#F58A4B" strokeOpacity="0.6" strokeWidth="1.2" />
      <g stroke="#0a0d16" strokeOpacity="0.4" strokeWidth="1">
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i} x1={186 + i*32} y1="200" x2={186 + i*32} y2="215" />
        ))}
      </g>

      {/* Convergence triangles */}
      <path d="M444,80 L490,150 L444,160 Z"   fill={`url(#ds-top-${u})`} stroke="#7BC9E8" strokeOpacity="0.6" strokeWidth="1.2" />
      <path d="M444,200 L490,210 L444,280 Z"  fill={`url(#ds-bot-${u})`} stroke="#F58A4B" strokeOpacity="0.6" strokeWidth="1.2" />

      {/* Mixing chamber */}
      <rect x="490" y="150" width="60" height="60" rx="4" fill={`url(#ds-mix-${u})`} opacity="0.85" />

      {/* Needle */}
      <rect x="550" y="172" width="120" height="16" fill={`url(#ds-metal-${u})`} />
      <polygon points="670,172 700,180 670,188" fill="#9aa3b2" />

      {/* Droplet stream */}
      <g>
        <circle className="ds-drop ds-d1" cx="700" cy="180" r="4" fill={`url(#ds-mix-${u})`} />
        <circle className="ds-drop ds-d2" cx="700" cy="180" r="3.5" fill={`url(#ds-mix-${u})`} />
        <circle className="ds-drop ds-d3" cx="700" cy="180" r="3" fill={`url(#ds-mix-${u})`} />
      </g>

      {/* Labels */}
      <text x="299" y="60" textAnchor="middle" fill="#7BC9E8" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
        HYDROGEL
      </text>
      <text x="299" y="320" textAnchor="middle" fill="#F58A4B" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
        AN FACTOR
      </text>

      <style>{`
        .ds-drop { opacity: 0; animation: dsDrip 1.8s linear infinite; }
        .ds-d1 { animation-delay: 0s; }
        .ds-d2 { animation-delay: 0.6s; }
        .ds-d3 { animation-delay: 1.2s; }
        @keyframes dsDrip {
          0%   { transform: translate(0,0);    opacity: 0; }
          15%  {                                opacity: 1; }
          100% { transform: translate(40px, 60px); opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
