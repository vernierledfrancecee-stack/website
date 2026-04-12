interface RenovHabitatLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { mainSize: "1.1rem",  subSize: "0.52rem", letterSpacing: "0.16em", diamondW: 9,  diamondH: 13, gap: 2 },
  md: { mainSize: "1.45rem", subSize: "0.65rem", letterSpacing: "0.18em", diamondW: 11, diamondH: 16, gap: 3 },
  lg: { mainSize: "2rem",    subSize: "0.85rem", letterSpacing: "0.2em",  diamondW: 15, diamondH: 21, gap: 4 },
};

export default function RenovHabitatLogo({
  variant = "light",
  size = "md",
  className = "",
}: RenovHabitatLogoProps) {
  const mainColor  = variant === "light" ? "#ffffff"           : "#0d1e3a";
  const subColor   = variant === "light" ? "rgba(255,255,255,0.65)" : "rgba(13,30,58,0.55)";
  const lineColor  = variant === "light" ? "rgba(26,158,117,0.5)"  : "rgba(26,158,117,0.4)";

  const { mainSize, subSize, letterSpacing, diamondW, diamondH, gap } = sizes[size];

  return (
    <span
      style={{ display: "inline-flex", flexDirection: "column", userSelect: "none" }}
      className={className}
      aria-label="LEDX Rénov'Habitat"
    >
      {/* ── Première ligne : LEDX avec le X losange ── */}
      <span
        style={{
          fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 900,
          fontSize: mainSize,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: mainColor,
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <span>LED</span>

        {/* X avec losanges verts superposés */}
        <span style={{ position: "relative", display: "inline-block" }}>
          X
          <svg
            width={diamondW}
            height={diamondH}
            viewBox="0 0 13 18"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -46%)",
              pointerEvents: "none",
            }}
          >
            <polygon points="6.5,0 13,9 6.5,9 0,9" fill="#2dc48d" />
            <polygon points="6.5,9 13,9 6.5,18 0,9" fill="#1a9e75" />
          </svg>
        </span>
      </span>

      {/* ── Séparateur vert ── */}
      <span
        aria-hidden="true"
        style={{
          display: "block",
          height: "1px",
          background: lineColor,
          marginTop: `${gap}px`,
          marginBottom: `${gap}px`,
        }}
      />

      {/* ── Deuxième ligne : RÉNOV'HABITAT ── */}
      <span
        style={{
          fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
          fontWeight: 700,
          fontSize: subSize,
          letterSpacing,
          textTransform: "uppercase",
          color: subColor,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        Rénov&apos;Habitat
      </span>
    </span>
  );
}
