import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "../lib/motion";

type Props = {
  id?: string;
  num?: string;
  label?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, num, label, className = "", children }: Props) {
  return (
    <section
      id={id}
      className={`relative py-32 md:py-40 px-6 md:px-10 ${className}`}
    >
      {(num || label) && (
        <motion.div
          variants={stagger(0.05, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-16 max-w-7xl flex items-baseline gap-6"
        >
          {num && (
            <motion.span
              variants={fadeUp}
              className="font-mono text-xs text-bone-400 tracking-widest"
            >
              {num}
            </motion.span>
          )}
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.3em] text-angel-sky"
          >
            {label}
          </motion.span>
          <motion.div
            variants={fadeUp}
            className="flex-1 h-px bg-white/10"
          />
        </motion.div>
      )}
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
