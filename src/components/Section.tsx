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
      className={`relative bg-ink-950 py-8 md:py-10 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">{children}</div>
    </section>
  );
}
