import { useId } from "react";

/**
 * Macrophage cluster in the top-right corner.
 *
 * Three cells arranged diagonally:
 *   A (small) — upper-left of diagonal, center ~(1570, 108)
 *   C (big, focal) — center of cluster, center ~(1700, 215)
 *   B (small) — lower-right of diagonal, center ~(1790, 305), partially bleeds past right edge
 *
 * Particles drift downward from the cluster toward the vessel area (bottom-right).
 * preserveAspectRatio="xMaxYMin slice" anchors the right edge + top edge to the
 * viewport corner so the cluster always sits in the top-right.
 */
export function Macrophages({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  const gBody    = `mc-body-${u}`;
  const gNuc     = `mc-nuc-${u}`;
  const gGlow    = `mc-glow-${u}`;
  const gBigGlow = `mc-bigglow-${u}`;

  // Speckles for focal cell C — original coords shifted (+1411, -125) to center ~(1700, 215)
  const speckles: Array<[number, number, number, number]> = [
    [1686, 125, 1.4, 0.45], [1706, 120, 1.8, 0.55], [1731, 130, 1.4, 0.40],
    [1756, 135, 1.6, 0.50], [1681, 150, 1.6, 0.45], [1709, 155, 2.0, 0.55],
    [1736, 165, 1.4, 0.40], [1761, 160, 1.8, 0.50], [1676, 180, 1.4, 0.40],
    [1706, 185, 1.6, 0.45], [1736, 195, 2.0, 0.55], [1766, 190, 1.4, 0.40],
    [1686, 210, 1.8, 0.50], [1716, 215, 1.4, 0.40], [1746, 225, 1.8, 0.50],
    [1696, 240, 1.6, 0.45], [1726, 245, 1.4, 0.40], [1756, 240, 1.6, 0.45],
    // softer dark cluster
    [1721, 180, 2.6, 0.28], [1741, 205, 2.4, 0.26], [1701, 215, 2.6, 0.28],
  ];

  // Particles start near cluster (top-right) and drift downward toward vessel area
  const particles = [
    { cx: 1630, cy: 120, dx: -50,  dy: 780, dur: 9.2, delay: 0.0 },
    { cx: 1680, cy: 140, dx: -30,  dy: 800, dur: 9.6, delay: 0.4 },
    { cx: 1720, cy: 115, dx:  20,  dy: 790, dur: 8.8, delay: 0.8 },
    { cx: 1760, cy: 140, dx:  30,  dy: 780, dur: 9.2, delay: 1.2 },
    { cx: 1650, cy: 200, dx: -80,  dy: 730, dur: 9.5, delay: 1.6 },
    { cx: 1700, cy: 215, dx: -30,  dy: 760, dur: 8.9, delay: 2.0 },
    { cx: 1750, cy: 200, dx:  10,  dy: 780, dur: 9.3, delay: 2.4 },
    { cx: 1660, cy: 290, dx: -60,  dy: 680, dur: 9.6, delay: 0.6 },
    { cx: 1710, cy: 300, dx: -10,  dy: 670, dur: 9.0, delay: 1.0 },
    { cx: 1770, cy: 280, dx:  20,  dy: 690, dur: 9.4, delay: 1.4 },
    { cx: 1610, cy: 180, dx: -100, dy: 740, dur: 9.7, delay: 1.8 },
    { cx: 1660, cy: 110, dx: -20,  dy: 800, dur: 9.0, delay: 2.2 },
    { cx: 1790, cy: 260, dx:  10,  dy: 720, dur: 9.5, delay: 2.6 },
    { cx: 1600, cy: 240, dx: -120, dy: 700, dur: 9.8, delay: 3.0 },
    { cx: 1800, cy: 170, dx:   0,  dy: 780, dur: 9.3, delay: 0.2 },
    { cx: 1640, cy: 340, dx: -40,  dy: 620, dur: 8.7, delay: 1.5 },
  ];

  return (
    <svg
      viewBox="0 0 1800 1000"
      preserveAspectRatio="xMaxYMin slice"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gBody} cx="40%" cy="36%" r="68%">
          <stop offset="0%"   stopColor="#B7E2F2" stopOpacity="0.80" />
          <stop offset="55%"  stopColor="#5BB0DA" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0.70" />
        </radialGradient>
        <radialGradient id={gNuc} cx="38%" cy="32%" r="72%">
          <stop offset="0%"   stopColor="#3FA3D1" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#0c2d4a" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id={gGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7BC9E8" stopOpacity="0.55" />
          <stop offset="60%"  stopColor="#3FA3D1" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={gBigGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7BC9E8" stopOpacity="0.32" />
          <stop offset="50%"  stopColor="#3FA3D1" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1E5A8A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Blue atmospheric glow centered on the cluster */}
      <ellipse cx="1700" cy="210" rx="420" ry="340" fill={`url(#${gBigGlow})`} />

      {/* === CELL A — small, upper-left of diagonal, center ~(1566, 104) === */}
      <g className="mc-cell mc-cell-1">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          d="M1551,59 C1581,57 1606,67 1616,89
             C1626,107 1621,131 1606,143
             C1586,159 1558,159 1541,147
             C1521,134 1514,109 1524,89
             C1531,74 1541,61 1551,59 Z"
        />
        <ellipse cx="1566" cy="104" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL B — small, lower-right of diagonal, center ~(1790, 301)
              Intentionally extends past x=1800 so it bleeds into the right corner. === */}
      <g className="mc-cell mc-cell-2">
        <path
          fill={`url(#${gBody})`}
          stroke="#7BC9E8"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          d="M1775,256 C1805,254 1830,266 1838,288
             C1848,311 1840,331 1822,342
             C1800,356 1775,354 1758,340
             C1742,326 1735,304 1745,286
             C1750,271 1765,258 1775,256 Z"
        />
        <ellipse cx="1790" cy="301" rx="14" ry="11" fill={`url(#${gNuc})`} />
      </g>

      {/* === CELL C — big focal, center of diagonal, center ~(1700, 215) === */}
      <g className="mc-cell mc-cell-3">
        <path
          fill={`url(#${gBody})`}
          stroke="#9CD9F0"
          strokeOpacity="0.32"
          strokeWidth="1.4"
          d="M1706,100
             C1746,95  1783,107 1799,135
             C1813,153 1819,177 1807,197
             C1821,213 1821,240 1801,253
             C1807,273 1789,295 1765,297
             C1766,317 1743,330 1719,323
             C1703,335 1679,335 1665,323
             C1639,330 1619,317 1619,295
             C1599,293 1586,273 1595,253
             C1581,240 1579,215 1595,200
             C1586,180 1593,157 1611,147
             C1625,125 1651,107 1681,103
             C1689,100 1697,99  1706,100 Z"
        />

        {/* Speckled cytoplasm */}
        <g fill="#1E5A8A">
          {speckles.map((s, i) => (
            <circle key={i} cx={s[0]} cy={s[1]} r={s[2]} opacity={s[3]} />
          ))}
        </g>
        <g fill="#B7E2F2">
          {speckles.slice(0, 11).map((s, i) => (
            <circle key={i} cx={s[0] + 2} cy={s[1] - 1.5} r={s[2] * 0.5} opacity={0.4} />
          ))}
        </g>

        {/* Kidney-bean nucleus */}
        <path
          fill={`url(#${gNuc})`}
          stroke="#0c2d4a"
          strokeOpacity="0.25"
          strokeWidth="1"
          d="M1696,175
             C1676,175 1663,193 1663,213
             C1663,233 1681,247 1706,247
             C1724,247 1739,240 1747,223
             C1757,228 1766,219 1766,205
             C1768,188 1754,171 1737,167
             C1725,165 1711,177 1703,188
             C1701,180 1698,175 1696,175 Z"
        />
      </g>

      {/* === PARTICLES — drift downward from cluster toward vessel area === */}
      <g>
        {particles.map((p, i) => (
          <g
            key={i}
            className="mc-p"
            style={
              {
                "--mc-dx": `${p.dx}px`,
                "--mc-dy": `${p.dy}px`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              } as React.CSSProperties
            }
          >
            <circle cx={p.cx} cy={p.cy} r="7"   fill={`url(#${gGlow})`} />
            <circle cx={p.cx} cy={p.cy} r="1.6" fill="#e6edf5" opacity="0.88" />
          </g>
        ))}
      </g>

      <style>{`
        .mc-cell   { transform-origin: center; transform-box: fill-box; }
        .mc-cell-1 { animation: mcBreathe 5.6s ease-in-out infinite;       }
        .mc-cell-2 { animation: mcBreathe 6.2s ease-in-out infinite 0.6s;  }
        .mc-cell-3 { animation: mcBreathe 7.4s ease-in-out infinite 1.1s;  }
        @keyframes mcBreathe {
          0%, 100% { transform: scale(1);    }
          50%      { transform: scale(1.02); }
        }

        .mc-p {
          opacity: 0;
          animation-name: mcParticle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out;
        }
        @keyframes mcParticle {
          0%   { transform: translate(0,0);                         opacity: 0;  }
          8%   {                                                    opacity: 1;  }
          75%  {                                                    opacity: 0.5;}
          100% { transform: translate(var(--mc-dx), var(--mc-dy));  opacity: 0;  }
        }
      `}</style>
    </svg>
  );
}
