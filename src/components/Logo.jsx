export default function Logo({ width = 44, height = 32, stroke = '#8a6c5e', bg = '#f7f3ee', opacity = 1, style }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 68 50"
      fill="none"
      opacity={opacity}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 10H16.74A8 8 0 1 0 9 20H18A5 5 0 0 0 18 10Z"
        transform="translate(22,2) scale(1.63)"
        fill="none"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 10H16.74A8 8 0 1 0 9 20H18A5 5 0 0 0 18 10Z"
        transform="translate(4,12) scale(1.65)"
        fill={bg}
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
