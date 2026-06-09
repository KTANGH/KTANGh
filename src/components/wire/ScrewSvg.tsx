export function ScrewSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="screw-body" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#f4d678" />
          <stop offset="55%" stopColor="#c89a3a" />
          <stop offset="100%" stopColor="#6e4f1a" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="rgba(0,0,0,0.5)" />
      <circle cx="16" cy="16" r="13" fill="url(#screw-body)" />
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="none"
        stroke="#3a2a0a"
        strokeWidth="0.8"
      />
      <path
        d="M 7 16 L 25 16 M 16 7 L 16 25"
        stroke="#2a1d05"
        strokeWidth="2.2"
        strokeLinecap="round"
        transform="rotate(28 16 16)"
      />
      <path
        d="M 7 16 L 25 16 M 16 7 L 16 25"
        stroke="rgba(255,230,150,0.4)"
        strokeWidth="0.8"
        strokeLinecap="round"
        transform="rotate(28 16 16) translate(-0.5,-0.5)"
      />
    </svg>
  )
}
