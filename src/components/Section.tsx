import type { ReactNode } from "react";

type Props = {
  id?: string;
  /** Kept for API compatibility; no longer rendered. */
  num?: string;
  label?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className = "", children }: Props) {
  return (
    <section
      id={id}
      className={`relative py-8 md:py-10 ${className}`}
    >
      {/* Gradient transition band — sits above the section, fades in the
          backdrop so the transition from the hero matches the nav-bar style
          (blur + gradient fade, not an abrupt edge). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 -translate-y-full"
        style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 100%)" }}
      />
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
