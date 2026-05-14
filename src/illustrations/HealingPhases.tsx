/**
 * Healing-phases pipeline: Hemostasis → Inflammation → Proliferation → Maturation.
 * Inspired by the UROP poster's "stuck in inflammation" diagram.
 * The Inflammation node is highlighted in orange and labeled "STUCK HERE";
 * Proliferation gets an "ANGel reactivates" callout.
 */
const phases = [
  { name: "Hemostasis",    state: "done" },
  { name: "Inflammation",  state: "stuck" },
  { name: "Proliferation", state: "blocked", callout: "ANGel reactivates" },
  { name: "Maturation",    state: "blocked" },
] as const;

export function HealingPhases({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* connecting line */}
      <div className="absolute top-[34px] left-[8%] right-[8%] h-px bg-white/12">
        <div className="h-full w-[42%] bg-gradient-to-r from-angel-blue via-angel-orange to-white/0" />
      </div>

      <div className="relative grid grid-cols-4 gap-2 md:gap-4">
        {phases.map((p, i) => (
          <div key={p.name} className="flex flex-col items-center text-center">
            <div className="relative grid h-[68px] w-[68px] place-items-center">
              {/* outer ring */}
              <span
                className={`absolute inset-0 rounded-full ${
                  p.state === "done"
                    ? "bg-angel-blue/15 ring-1 ring-angel-blue/40"
                    : p.state === "stuck"
                    ? "bg-angel-orange/20 ring-1 ring-angel-orange"
                    : "bg-white/[0.04] ring-1 ring-white/10"
                }`}
              />
              {/* core dot */}
              <span
                className={`relative grid h-7 w-7 place-items-center rounded-full ${
                  p.state === "done"
                    ? "bg-angel-blue text-black"
                    : p.state === "stuck"
                    ? "bg-angel-orange text-black animate-pulse"
                    : "bg-white/10 text-bone-400"
                }`}
              >
                <span className="font-mono text-[10px] font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
            </div>
            <p className="mt-4 font-display text-sm font-medium">{p.name}</p>
            {p.state === "stuck" && (
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-angel-orange">
                Stuck here
              </p>
            )}
            {"callout" in p && (
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-angel-sky">
                {(p as { callout: string }).callout}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
