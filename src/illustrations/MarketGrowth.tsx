import { useId } from "react";

/**
 * Market growth illustration: rising area chart from 2024 to 2030 reaching $10B,
 * plus an overlay $32B chronic-wound-burden marker.
 * Per UROP poster's "Market Analysis" graphic.
 */
const data = [
  { year: "2024", v: 0.46 },
  { year: "2025", v: 0.54 },
  { year: "2026", v: 0.63 },
  { year: "2027", v: 0.72 },
  { year: "2028", v: 0.82 },
  { year: "2029", v: 0.91 },
  { year: "2030", v: 1.00 },
];

const W = 720;
const H = 320;
const PAD = { top: 40, right: 60, bottom: 50, left: 60 };
const innerW = W - PAD.left - PAD.right;
const innerH = H - PAD.top - PAD.bottom;

function point(i: number, v: number) {
  const x = PAD.left + (i / (data.length - 1)) * innerW;
  const y = PAD.top + (1 - v) * innerH;
  return { x, y };
}

export function MarketGrowth({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");

  // Build area + line paths
  const pts = data.map((d, i) => point(i, d.v));
  const line = pts
    .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
    .join(" ");
  const area =
    `M${pts[0].x},${PAD.top + innerH} ` +
    pts.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${pts[pts.length - 1].x},${PAD.top + innerH} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Wound care market growth to $10B by 2030"
    >
      <defs>
        <linearGradient id={`mg-fill-${u}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#3FA3D1" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3FA3D1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`mg-line-${u}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"  stopColor="#7BC9E8" />
          <stop offset="100%" stopColor="#F58A4B" />
        </linearGradient>
      </defs>

      {/* y-axis ticks */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = PAD.top + (1 - t) * innerH;
        return (
          <g key={t}>
            <line
              x1={PAD.left}
              y1={y}
              x2={W - PAD.right}
              y2={y}
              stroke="white"
              strokeOpacity="0.05"
              strokeDasharray="2 4"
            />
            <text
              x={PAD.left - 12}
              y={y + 4}
              textAnchor="end"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              fill="#6e7884"
            >
              ${Math.round(t * 10)}B
            </text>
          </g>
        );
      })}

      {/* area + line */}
      <path d={area} fill={`url(#mg-fill-${u})`} />
      <path
        d={line}
        fill="none"
        stroke={`url(#mg-line-${u})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* points */}
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === pts.length - 1 ? 5 : 2.5}
          fill={i === pts.length - 1 ? "#F58A4B" : "#7BC9E8"}
          stroke={i === pts.length - 1 ? "#000" : "none"}
          strokeWidth={i === pts.length - 1 ? 2 : 0}
        />
      ))}

      {/* x-axis labels */}
      {data.map((d, i) => {
        const p = point(i, 0);
        return (
          <text
            key={d.year}
            x={p.x}
            y={H - PAD.bottom + 22}
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="10"
            fill="#6e7884"
          >
            {d.year}
          </text>
        );
      })}

      {/* end-of-line callout */}
      <g transform={`translate(${pts[pts.length - 1].x - 80}, ${pts[pts.length - 1].y - 36})`}>
        <rect
          x="0"
          y="0"
          width="80"
          height="26"
          rx="13"
          fill="#F58A4B"
          fillOpacity="0.15"
          stroke="#F58A4B"
          strokeWidth="1"
        />
        <text
          x="40"
          y="17"
          textAnchor="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="12"
          fontWeight="600"
          fill="#F58A4B"
        >
          $10B · 2030
        </text>
      </g>

      {/* $32B burden marker (top-left of chart) */}
      <g transform={`translate(${PAD.left}, ${PAD.top - 20})`}>
        <text
          fontFamily="Space Grotesk, sans-serif"
          fontSize="11"
          fill="#6e7884"
          letterSpacing="1.5"
        >
          U.S. CHRONIC WOUND BURDEN ·{" "}
          <tspan fill="#F58A4B" fontWeight="700">$32B / yr</tspan>
        </text>
      </g>
    </svg>
  );
}
