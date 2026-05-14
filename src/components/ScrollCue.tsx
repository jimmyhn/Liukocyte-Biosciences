import { ChevronDown } from "lucide-react";

type Props = {
  /** Short label shown above the chevron (e.g. next section name). */
  label: string;
  /** Anchor href, e.g. "#needs". */
  href: string;
  className?: string;
};

/**
 * Scroll cue: tiny uppercase label sitting just above a hopping
 * downward chevron. White at 40% opacity, brighter on hover.
 * Hop animation defined in index.css (`.animate-hop`).
 */
export function ScrollCue({ label, href, className = "" }: Props) {
  return (
    <a
      href={href}
      aria-label={`Scroll to ${label}`}
      className={`inline-flex flex-col items-center gap-1 text-white/40 transition-colors hover:text-white/75 ${className}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.28em]">
        {label}
      </span>
      <ChevronDown className="h-4 w-4 animate-hop" strokeWidth={1.6} />
    </a>
  );
}
