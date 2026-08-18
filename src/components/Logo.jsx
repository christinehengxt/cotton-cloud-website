export default function Logo({ width = 32, height = 48, stroke = '#8a6c5e', opacity = 1, style }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 60"
      fill="none"
      opacity={opacity}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 56 C20 48 20 40 20 32 C20 24 20 16 20 8"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 46 C13 43 8 38 10 32 C14 36 18 41 20 46Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 46 C27 43 32 38 30 32 C26 36 22 41 20 46Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 34 C14 31 9 26 11 20 C15 24 18 29 20 34Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 34 C26 31 31 26 29 20 C25 24 22 29 20 34Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 22 C15 19 12 15 14 10 C17 13 19 18 20 22Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 22 C25 19 28 15 26 10 C23 13 21 18 20 22Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 10 C18 7 18 4 20 2 C22 4 22 7 20 10Z"
        fill="none"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
