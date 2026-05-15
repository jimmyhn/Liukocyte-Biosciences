/**
 * Four-phase healing pipeline — chevron/arrow chain.
 * 01 HEMOSTASIS (dark navy), 02 INFLAMMATION (orange),
 * 03 PROLIFERATION (medium blue), 04 MATURATION (light blue)
 */
const phases = [
  { num: "01", label: "Hemostasis",     fill: "#2C3E6B", text: "#FFFFFF" },
  { num: "02", label: "Inflammation",   fill: "#F58A4B", text: "#FFFFFF" },
  { num: "03", label: "Proliferation",  fill: "#4A72B0", text: "#FFFFFF" },
  { num: "04", label: "Maturation",     fill: "#7EC8E3", text: "#0D1B2A" },
] as const;

// Chevron geometry: each arrow is a parallelogram with a right-pointing point.
// viewBox per arrow: 220 wide × 80 tall. Overlap between adjacent arrows: 20px.
const W = 220;  // full width of one chevron cell
const H = 80;   // height
const TIP = 24; // horizontal depth of the arrow tip/notch
const GAP = -20; // negative gap = overlap so arrows interlock

export function HealingPhases({ className = "" }: { className?: string }) {
  const n = phases.length;
  // Total SVG width: n arrows each W wide, overlapping by |GAP| between them
  const totalW = n * W + (n - 1) * GAP;

  // Chevron polygon points for position i
  // Left edge: vertical for i===0, notched for i>0
  // Right edge: always arrow point
  function chevronPoints(i: number): string {
    const x = i * (W + GAP);
    const isFirst = i === 0;
    if (isFirst) {
      // Flat left edge
      return [
        `${x},0`,
        `${x + W - TIP},0`,
        `${x + W},${H / 2}`,
        `${x + W - TIP},${H}`,
        `${x},${H}`,
      ].join(" ");
    }
    // Left side has an inward notch matching the previous arrow's tip
    return [
      `${x},0`,
      `${x + W - TIP},0`,
      `${x + W},${H / 2}`,
      `${x + W - TIP},${H}`,
      `${x},${H}`,
      `${x + TIP},${H / 2}`,
    ].join(" ");
  }

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <svg
        viewBox={`0 0 ${totalW} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Four phases of wound healing"
        className="w-full h-auto min-w-[480px]"
      >
        {phases.map((p, i) => {
          const x = i * (W + GAP);
          const cx = x + W / 2 + (i > 0 ? TIP / 2 : 0);
          return (
            <g key={p.num}>
              <polygon
                points={chevronPoints(i)}
                fill={p.fill}
              />
              {/* Number */}
              <text
                x={cx}
                y={H * 0.36}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={p.text}
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="600"
                opacity="0.75"
              >
                {p.num}
              </text>
              {/* Phase name */}
              <text
                x={cx}
                y={H * 0.65}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={p.text}
                fontSize="12"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                fontWeight="700"
                letterSpacing="0.04em"
              >
                {p.label.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
