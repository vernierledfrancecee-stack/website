interface LedxLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { fontSize: "1.25rem", diamondW: 10, diamondH: 14 },
  md: { fontSize: "1.6rem",  diamondW: 13, diamondH: 18 },
  lg: { fontSize: "2.2rem",  diamondW: 17, diamondH: 24 },
};

export default function LedxLogo({ variant = "light", size = "md", className = "" }: LedxLogoProps) {
  const color = variant === "light" ? "#ffffff" : "#0d1e3a";
  const { fontSize, diamondW, diamondH } = sizes[size];

  const style: React.CSSProperties = {
    fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
    fontWeight: 900,
    fontSize,
    letterSpacing: "-0.03em",
    lineHeight: 1,
    color,
    display: "inline-flex",
    alignItems: "center",
    userSelect: "none",
  };

  return (
    <span style={style} className={className} aria-label="LEDX E ÉNERGIE">
      {/* LED */}
      <span style={{ fontSize: fontSize, fontWeight: 900 }}>LED</span>

      {/* X avec losanges verts au centre */}
      <span style={{ position: "relative", display: "inline-block", fontSize: fontSize, fontWeight: 900 }}>
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
          {/* Losange supérieur */}
          <polygon points="6.5,0 13,9 6.5,9 0,9" fill="#2dc48d" />
          {/* Losange inférieur */}
          <polygon points="6.5,9 13,9 6.5,18 0,9" fill="#1a9e75" />
        </svg>
      </span>

      {/* Espace + ÉNERGIE */}
      <span style={{ marginLeft: "0.35em", fontSize: fontSize, fontWeight: 900 }}>ÉNERGIE</span>
    </span>
  );
}
