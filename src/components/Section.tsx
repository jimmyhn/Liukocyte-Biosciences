import type { ReactNode } from "react";

type Props = {
  id?: string;
  /** Kept for API compatibility; no longer rendered. */
  num?: string;
  label?: string;
  className?: string;
  /** Renders the gradient fade taper above this section. Only pass true on
   *  the first content section (immediately below the hero). */
  fadeTop?: boolean;
  children: ReactNode;
};

export function Section({ id, className = "", fadeTop = false, children }: Props) {
  return (
    <section
      id={id}
      className={`relative py-8 md:py-10 ${className}`}
    >
      {/* Gradient transition band — only rendered on the first content section
          (hero → section boundary). Taller and darker for a more dramatic taper. */}
      {fadeTop && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 -translate-y-full"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.92) 100%)" }}
        />
      )}
      {/* Semi-transparent backdrop with blur — mirrors the nav-bar glassmorphism
          so the illustrated background bleeds through while content stays readable. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/55 backdrop-blur-sm"
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">{children}</div>
    </section>
  );
}