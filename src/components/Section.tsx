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

export function Section({ id, className = "", children }: Props) {
  return (
    <section id={id} className={`relative py-12 md:py-20 ${className}`}>
      {/* No more backdrops here! */}
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        {children}
      </div>
    </section>
  );
}
