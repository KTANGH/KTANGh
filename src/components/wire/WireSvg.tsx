type Props = { color: string; className?: string }

export function WireSvg({ color, className }: Props) {
  return (
    <svg
      viewBox="0 0 800 60"
      preserveAspectRatio="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 0 30 Q 200 18 400 28 T 800 30"
        stroke={color}
        strokeWidth="22"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 0 26 Q 200 14 400 24 T 800 26"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 0 35 Q 200 23 400 33 T 800 35"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
