type Props = { className?: string; showMark?: boolean };

export function Logo({ className = "", showMark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {showMark && (
        <svg
          viewBox="0 0 64 64"
          className="h-8 w-8"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoMark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7BC9E8" />
              <stop offset="100%" stopColor="#1E5A8A" />
            </linearGradient>
          </defs>
          <circle
            cx="32"
            cy="32"
            r="29"
            fill="none"
            stroke="url(#logoMark)"
            strokeWidth="2"
          />
          <g
            stroke="url(#logoMark)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          >
            <path d="M14,40 C20,30 22,22 30,16" />
            <path d="M18,46 C24,36 26,26 34,18" />
            <path d="M22,50 C28,40 30,30 38,22" />
            <path d="M28,52 C34,42 36,32 44,24" />
            <path d="M34,52 C40,42 42,32 48,28" />
            <path d="M40,48 C44,40 46,34 50,32" />
          </g>
        </svg>
      )}
      <span className="font-display text-[22px] font-semibold tracking-tight">
        <span className="text-angel-orange">AN</span>
        <span className="text-grad-cool">Gel</span>
      </span>
    </span>
  );
}
