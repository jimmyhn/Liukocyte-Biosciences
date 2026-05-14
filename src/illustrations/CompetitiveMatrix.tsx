import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { fadeUp, stagger } from "../lib/motion";

/**
 * Competitive matrix per the UROP poster.
 * Rows = the 5 factors that matter. Columns = competitors + ANGel.
 * ANGel column is highlighted (it's the only product that ticks all five).
 */
const competitors = [
  "Regranex",
  "Apligraf",
  "Aquacel",
  "UrgoStart",
  "Integra",
  "NovoSorb BTM",
];

const factors = [
  { label: "Inexpensive",                values: [0, 0, 1, 1, 0, 1], us: 1 },
  { label: "Infrequent application",     values: [0, 0, 0, 1, 1, 1], us: 1 },
  { label: "Active immune healing",      values: [1, 1, 0, 0, 0, 0], us: 1 },
  { label: "Rapid blood vessel growth",  values: [1, 1, 0, 0, 1, 1], us: 1 },
  { label: "Antimicrobial",              values: [0, 0, 0, 0, 0, 0], us: 1 },
];

function Cell({ on, us = false }: { on: 0 | 1; us?: boolean }) {
  return (
    <td className={`p-3 text-center ${us ? "bg-angel-blue/8" : ""}`}>
      {on ? (
        <Check className="mx-auto h-4 w-4 text-emerald-400" strokeWidth={2.5} />
      ) : (
        <X className="mx-auto h-4 w-4 text-rose-400/70" strokeWidth={2.5} />
      )}
    </td>
  );
}

export function CompetitiveMatrix({ className = "" }: { className?: string }) {
  return (
    <motion.div
      variants={stagger(0.05, 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`overflow-x-auto rounded-2xl ring-1 ring-white/8 bg-white/[0.015] ${className}`}
    >
      <motion.table variants={fadeUp} className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="hairline-b">
            <th className="p-4 text-left font-mono text-[10px] uppercase tracking-widest text-bone-400 font-normal">
              vs.
            </th>
            {competitors.map((c) => (
              <th
                key={c}
                className="p-4 text-center font-mono text-[10px] uppercase tracking-widest text-bone-400 font-normal"
              >
                {c}
              </th>
            ))}
            <th className="p-4 text-center bg-angel-blue/8">
              <span className="font-display text-base font-semibold text-grad">
                ANGel
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {factors.map((row) => (
            <tr key={row.label} className="hairline-b last:border-0">
              <th
                scope="row"
                className="p-4 text-left font-medium text-bone-100"
              >
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <Cell key={i} on={v as 0 | 1} />
              ))}
              <Cell on={row.us as 0 | 1} us />
            </tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
}
