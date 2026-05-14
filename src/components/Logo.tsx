type Props = { className?: string; showMark?: boolean };

/**
 * ANGel logo: a black circular mark filled with organic, blue curving "fiber"
 * lines (recreated in SVG to mimic the supplied symbol) followed by the
 * "ANGel" wordmark — orange "AN" + cool-blue gradient "Gel".
 */
export function Logo({ className = "", showMark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {showMark && (
        <svg
          viewBox="0 0 100 100"
          className="h-9 w-9"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lm-ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#9CD9F0" />
              <stop offset="100%" stopColor="#1E5A8A" />
            </linearGradient>
            <linearGradient id="lm-fiber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#7BC9E8" />
              <stop offset="100%" stopColor="#2a6a99" />
            </linearGradient>
            <clipPath id="lm-clip">
              <circle cx="50" cy="50" r="46" />
            </clipPath>
          </defs>

          {/* Black disc */}
          <circle cx="50" cy="50" r="46" fill="#020306" />

          {/* Organic curving fibers, clipped to the disc */}
          <g
            clipPath="url(#lm-clip)"
            fill="none"
            stroke="url(#lm-fiber)"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            {/* Upper-left sweep */}
            <path d="M2,18 C24,8 44,18 56,12" />
            <path d="M2,26 C26,16 46,28 62,20" />
            <path d="M2,34 C28,26 50,38 66,30" />
            <path d="M4,42 C30,34 52,46 70,40" />
            <path d="M6,50 C30,44 54,54 74,50" />

            {/* Center swooping curves */}
            <path d="M8,58 C28,54 52,60 76,60" />
            <path d="M10,64 C30,62 54,68 80,68" />
            <path d="M14,70 C32,68 56,76 84,76" />

            {/* Lower-right rising curves */}
            <path d="M22,82 C40,78 60,84 86,80" />
            <path d="M30,88 C46,84 62,90 88,86" />
            <path d="M40,94 C52,90 66,94 90,90" />

            {/* Diagonal accents bottom-left → upper-right */}
            <path d="M6,80 C20,70 40,52 60,38 C72,30 84,24 96,18" strokeWidth="1.4" />
            <path d="M10,90 C28,78 48,60 68,48 C80,40 90,34 98,30" strokeWidth="1.3" />

            {/* Right-side vertical-ish fibers */}
            <path d="M78,8  C84,30 80,52 86,72" strokeWidth="1.3" />
            <path d="M86,12 C92,32 90,54 94,74" strokeWidth="1.2" />

            {/* A couple of crossing accents for density */}
            <path d="M14,12 C24,30 18,52 30,72" strokeWidth="1.2" opacity="0.85" />
            <path d="M44,4  C50,24 42,46 50,68" strokeWidth="1.2" opacity="0.85" />

            {/* Small node dots scattered along fibers */}
            <g fill="url(#lm-fiber)" stroke="none">
              <circle cx="32" cy="34" r="1.1" />
              <circle cx="48" cy="22" r="0.9" />
              <circle cx="60" cy="42" r="1.0" />
              <circle cx="42" cy="58" r="0.9" />
              <circle cx="68" cy="62" r="1.0" />
              <circle cx="54" cy="76" r="0.9" />
              <circle cx="78" cy="50" r="0.9" />
            </g>
          </g>

          {/* Outer ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="url(#lm-ring)"
            strokeWidth="2.4"
          />
        </svg>
      )}
      <span className="font-display text-[22px] font-semibold tracking-tight">
        <span className="text-angel-orange">AN</span>
        <span className="text-grad-cool">Gel</span>
      </span>
    </span>
  );
}
