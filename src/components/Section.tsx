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
      {/* Semi-transparent backdrop — lets the fixed illustrated background
          bleed through with its blues and oranges while keeping content
          readable. Adjust opacity here to tune "how much background shows." */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/60"
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">{children}</div>
    </section>
  );
}
