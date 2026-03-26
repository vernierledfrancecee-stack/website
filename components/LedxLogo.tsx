interface LedxLogoProps {
  variant?: "light" | "dark";
  className?: string;
  height?: number;
}

export default function LedxLogo({ variant = "light", className = "", height = 40 }: LedxLogoProps) {
  const navy = variant === "light" ? "#ffffff" : "#0d1e3a";
  const green1 = "#2dc48d";
  const green2 = "#1a9e75";

  // Proportions calées sur le logo réel : LED|X+losanges|NERGIE
  // Viewbox totale : 500 × 72
  return (
    <svg
      viewBox="0 0 500 72"
      height={height}
      width={(height * 500) / 72}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LEDX Énergie"
      className={className}
      role="img"
    >
      {/* ── LED ── ultra-bold, condensé */}
      <text
        x="0"
        y="58"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="66"
        letterSpacing="-1"
        fill={navy}
      >
        LED
      </text>

      {/* ── X ── navy, 4 bras qui s'arrêtent avant le centre */}
      {/* Bras haut-gauche */}
      <line x1="206" y1="4"  x2="226" y2="31" stroke={navy} strokeWidth="11" strokeLinecap="round"/>
      {/* Bras bas-droite */}
      <line x1="233" y1="42" x2="253" y2="69" stroke={navy} strokeWidth="11" strokeLinecap="round"/>
      {/* Bras haut-droite */}
      <line x1="253" y1="4"  x2="233" y2="31" stroke={navy} strokeWidth="11" strokeLinecap="round"/>
      {/* Bras bas-gauche */}
      <line x1="226" y1="42" x2="206" y2="69" stroke={navy} strokeWidth="11" strokeLinecap="round"/>

      {/* ── Losanges verts au centre du X ── */}
      {/* Losange supérieur */}
      <polygon points="229,24  236,36  229,37  222,36" fill={green1}/>
      {/* Losange inférieur */}
      <polygon points="229,37  236,36  229,48  222,36" fill={green2}/>

      {/* ── NERGIE ── bold standard */}
      <text
        x="262"
        y="58"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize="62"
        letterSpacing="-1"
        fill={navy}
      >
        NERGIE
      </text>
    </svg>
  );
}
