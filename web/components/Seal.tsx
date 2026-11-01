/**
 * <Seal /> — circular notary-style seal, flat brass on paper.
 *
 * stamp={true}  → applies the one-time press-in animation (home hero only).
 * size           → diameter in px (default 160).
 * text           → circular path label (default "ClearTrack · Verified ·").
 */

interface SealProps {
  stamp?: boolean;
  size?: number;
  text?: string;
  className?: string;
}

export default function Seal({
  stamp = false,
  size = 160,
  text = "ClearTrack · Document Clearing ·",
  className = "",
}: SealProps) {
  const r = size / 2;
  const outerR = r - 4;
  const innerR = r - 14;
  const textR = r - 10; // radius of the text arc

  // SVG text-on-path arc: full circle
  const pathId = `seal-text-path-${size}`;
  // Start at top: M cx, cy - textR, arc back to same point
  const cx = r;
  const cy = r;
  const d = `
    M ${cx},${cy - textR}
    A ${textR},${textR} 0 1 1 ${cx - 0.01},${cy - textR}
  `;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label="ClearTrack official seal"
      role="img"
      className={`${stamp ? "seal-stamp" : ""} ${className}`}
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke="#B28A2E"
        strokeWidth="2.5"
      />

      {/* Inner ring */}
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="none"
        stroke="#B28A2E"
        strokeWidth="1.5"
      />

      {/* Text on circular path */}
      <defs>
        <path id={pathId} d={d} />
      </defs>
      <text
        fontSize={size < 100 ? "7" : "9"}
        fill="#B28A2E"
        fontFamily="var(--font-sans)"
        letterSpacing="2"
      >
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>

      {/* Centre mark — compass star */}
      <g fill="#B28A2E">
        {/* Crosshairs */}
        <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} stroke="#B28A2E" strokeWidth="1" />
        <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} stroke="#B28A2E" strokeWidth="1" />
        {/* Small diamond */}
        <polygon
          points={`${cx},${cy - 6} ${cx + 4},${cy} ${cx},${cy + 6} ${cx - 4},${cy}`}
          fill="#B28A2E"
        />
        {/* Centre dot */}
        <circle cx={cx} cy={cy} r="2" fill="#F1F3EF" />
      </g>
    </svg>
  );
}
