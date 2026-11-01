/**
 * Flat SVG illustration of an official document with ruled lines.
 * Used in the hero alongside the Seal.
 */

interface DocumentIllustrationProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function DocumentIllustration({
  width = 220,
  height = 280,
  className = "",
}: DocumentIllustrationProps) {
  const pad  = 16;
  const lineSpacing = 18;
  const lineStart   = 64;
  const lineCount   = 9;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-label="Illustration of an official document"
      role="img"
      className={className}
      style={{ display: "block" }}
    >
      {/* Document body */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="#F8F9F7"
        stroke="#C9D0CA"
        strokeWidth="1.5"
      />

      {/* Header band */}
      <rect x="0" y="0" width={width} height="44" fill="#1F4D43" />

      {/* Header text placeholder lines */}
      <rect x={pad} y="14" width={width * 0.55} height="8" rx="1" fill="rgba(241,243,239,0.6)" />
      <rect x={pad} y="27" width={width * 0.35} height="5" rx="1" fill="rgba(241,243,239,0.35)" />

      {/* Reference number box */}
      <rect
        x={width - pad - 50}
        y="8"
        width="50"
        height="28"
        fill="none"
        stroke="rgba(241,243,239,0.4)"
        strokeWidth="1"
      />
      <rect x={width - pad - 44} y="14" width="38" height="5"  rx="1" fill="rgba(241,243,239,0.4)" />
      <rect x={width - pad - 40} y="23" width="28" height="4"  rx="1" fill="rgba(241,243,239,0.25)" />

      {/* Ruled lines — body text simulation */}
      {Array.from({ length: lineCount }).map((_, i) => {
        const y = lineStart + i * lineSpacing;
        const w = i % 3 === 2
          ? width - pad * 2 - 40   // shorter line every 3rd
          : width - pad * 2;
        return (
          <line
            key={i}
            x1={pad}
            y1={y}
            x2={pad + w}
            y2={y}
            stroke="#C9D0CA"
            strokeWidth="1"
          />
        );
      })}

      {/* Signature line */}
      <line
        x1={pad}
        y1={height - 52}
        x2={width * 0.5}
        y2={height - 52}
        stroke="#10231F"
        strokeWidth="1"
      />
      <rect x={pad} y={height - 48} width={60} height="4" rx="1" fill="#C9D0CA" />

      {/* Bottom rule */}
      <line
        x1="0"
        y1={height - 28}
        x2={width}
        y2={height - 28}
        stroke="#C9D0CA"
        strokeWidth="1"
      />

      {/* Footer reference text */}
      <rect x={pad} y={height - 20} width={30} height="4" rx="1" fill="#C9D0CA" />
      <rect x={pad + 38} y={height - 20} width={50} height="4" rx="1" fill="#C9D0CA" />
    </svg>
  );
}
