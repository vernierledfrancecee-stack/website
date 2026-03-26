interface LedxLogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function LedxLogo({ variant = "light", className = "" }: LedxLogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#0d1e3a";

  return (
    <span
      className={`inline-flex items-baseline select-none ${className}`}
      style={{
        fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
        fontWeight: 900,
        fontSize: "1.5rem",
        letterSpacing: "-0.03em",
        lineHeight: 1,
      }}
      aria-label="LEDX Énergie"
    >
      <span style={{ color: textColor }}>LED</span>
      <span style={{ color: "#1a9e75" }}>X</span>
      <span style={{ color: textColor }}>NERGIE</span>
    </span>
  );
}
