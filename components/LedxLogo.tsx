interface LedxLogoProps {
  /** "light" = texte blanc (sur fond sombre), "dark" = texte navy (sur fond clair) */
  variant?: "light" | "dark";
  className?: string;
}

export default function LedxLogo({ variant = "light", className = "" }: LedxLogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#0d1e3a";

  return (
    <span
      className={`inline-flex items-center select-none ${className}`}
      style={{ fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif", fontWeight: 900 }}
      aria-label="LEDX Énergie"
    >
      {/* LED */}
      <span style={{ color: textColor, fontSize: "1.45em", letterSpacing: "-0.03em", lineHeight: 1 }}>
        LED
      </span>

      {/* X */}
      <span style={{ color: textColor, fontSize: "1.45em", letterSpacing: "-0.03em", lineHeight: 1 }}>
        X
      </span>

      {/* Green chevron element */}
      <svg
        width="18"
        height="26"
        viewBox="0 0 18 26"
        fill="none"
        aria-hidden="true"
        style={{ margin: "0 1px", flexShrink: 0 }}
      >
        {/* Left chevron */}
        <path d="M1 2 L8 13 L1 24" stroke="#1a9e75" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Right chevron */}
        <path d="M8 2 L15 13 L8 24" stroke="#2dc48d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      {/* NERGIE */}
      <span style={{ color: textColor, fontSize: "1.45em", letterSpacing: "-0.03em", lineHeight: 1 }}>
        NERGIE
      </span>
    </span>
  );
}
