export default function LlosaLogo({ size = 220, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} viewBox="0 0 260 130" fill={color} xmlns="http://www.w3.org/2000/svg">
      {/* Pillar 1 */}
      <rect x="0" y="0" width="22" height="86" rx="2" />
      {/* Pillar 2 */}
      <rect x="30" y="16" width="22" height="70" rx="2" />
      {/* Base plate */}
      <rect x="0" y="87" width="52" height="5" rx="1" />
      {/* "osa" */}
      <text
        x="60" y="88"
        fontSize="72" fontWeight="800"
        fontFamily="Manrope, Arial, sans-serif"
        letterSpacing="-3"
        fill={color}
      >osa</text>
      {/* EDIFICACIONES */}
      <text
        x="1" y="118"
        fontSize="13" fontWeight="600"
        fontFamily="Manrope, Arial, sans-serif"
        letterSpacing="5.5"
        fill={color}
        opacity="0.7"
      >EDIFICACIONES</text>
    </svg>
  );
}
