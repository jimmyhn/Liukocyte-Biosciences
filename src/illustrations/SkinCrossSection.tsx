import { useId } from "react";

/**
 * Skin cross-section showing wound bed receiving ANGel treatment.
 * Layers (top → bottom): wound + temporizing matrix → dermis → blood vessels → muscle.
 * Inspired by the UROP poster's "Product Design" anatomical diagram.
 */
export function SkinCrossSection({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 720 460"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Skin cross-section showing ANGel treatment in wound bed"
    >
      <defs>
        <linearGradient id={`sc-gel-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#3FA3D1" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`sc-derm-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#3a2a26" />
          <stop offset="100%" stopColor="#241915" />
        </linearGradient>
        <linearGradient id={`sc-muscle-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#5a1f1f" />
          <stop offset="100%" stopColor="#3a1414" />
        </linearGradient>
        <radialGradient id={`sc-wound-${u}`} cx="50%" cy="0%" r="80%">
          <stop offset="0%"  stopColor="#7BC9E8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Muscle (bottom) */}
      <rect x="0" y="340" width="720" height="120" fill={`url(#sc-muscle-${u})`} />
      {/* faint muscle fiber lines */}
      <g stroke="#7a2a2a" strokeOpacity="0.3" strokeWidth="1">
        <path d="M0,360 C180,355 360,365 540,355 720,360" fill="none" />
        <path d="M0,390 C180,385 360,395 540,385 720,390" fill="none" />
        <path d="M0,420 C180,415 360,425 540,415 720,420" fill="none" />
      </g>

      {/* Dermis */}
      <path
        d="M0,180 C180,170 360,190 540,170 C620,162 700,178 720,180 L720,340 L0,340 Z"
        fill={`url(#sc-derm-${u})`}
      />

      {/* Wound depression */}
      <path
        d="M180,180 C220,160 260,140 300,135 C340,130 380,140 420,160 C460,180 500,175 540,170 L540,180 C500,185 460,200 420,210 C380,215 340,205 300,180 C260,155 220,170 180,180 Z"
        fill="#0d0d0d"
      />

      {/* ANGel hydrogel filling the wound */}
      <path
        d="M200,175 C240,155 280,138 320,135 C360,132 400,142 440,160 C470,174 500,172 530,168 L530,176 C500,180 470,192 440,200 C400,210 360,202 320,180 C280,158 240,170 200,178 Z"
        fill={`url(#sc-gel-${u})`}
      />

      {/* AN factor sparkles in the gel */}
      <g fill="#F58A4B">
        <circle cx="260" cy="160" r="2" />
        <circle cx="320" cy="148" r="2.5" />
        <circle cx="380" cy="162" r="2" />
        <circle cx="430" cy="178" r="2.5" />
        <circle cx="290" cy="172" r="1.8" />
        <circle cx="360" cy="170" r="1.8" />
      </g>

      {/* New blood vessels growing into the dermis */}
      <g fill="none" stroke="#3FA3D1" strokeOpacity="0.85" strokeWidth="1.8" strokeLinecap="round">
        <path d="M280,210 C290,250 270,290 280,330" />
        <path d="M340,210 C350,250 330,290 340,330" />
        <path d="M400,215 C410,255 390,295 400,335" />
        {/* small branches */}
        <path d="M280,250 C260,265 250,270 240,275" strokeWidth="1.2" />
        <path d="M340,250 C360,265 370,270 380,275" strokeWidth="1.2" />
        <path d="M400,260 C420,275 430,280 440,290" strokeWidth="1.2" />
      </g>

      {/* Epidermis cap line */}
      <path
        d="M0,180 C180,170 360,190 540,170 C620,162 700,178 720,180"
        fill="none"
        stroke="#7BC9E8"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />

      {/* Labels */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.5">
        <text x="20" y="170" fill="#7BC9E8">EPIDERMIS</text>
        <text x="20" y="260" fill="#9aa3b2">DERMIS</text>
        <text x="20" y="400" fill="#9aa3b2">MUSCLE</text>
        <text x="380" y="100" fill="#F58A4B" textAnchor="middle">ANGel hydrogel + AN factor</text>
        <line x1="380" y1="105" x2="380" y2="135" stroke="#F58A4B" strokeWidth="0.5" />
        <text x="560" y="280" fill="#3FA3D1">new blood vessels</text>
        <line x1="555" y1="277" x2="445" y2="277" stroke="#3FA3D1" strokeWidth="0.5" />
      </g>

      {/* wound glow */}
      <rect x="0" y="60" width="720" height="180" fill={`url(#sc-wound-${u})`} pointerEvents="none" />
    </svg>
  );
}
