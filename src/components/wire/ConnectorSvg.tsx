export function ConnectorSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="conn-plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a7d85" />
          <stop offset="100%" stopColor="#3d4047" />
        </linearGradient>
        <radialGradient id="conn-hole" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0%" stopColor="#1a1c1f" />
          <stop offset="80%" stopColor="#0a0a0a" />
        </radialGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="5"
        fill="url(#conn-plate)"
        stroke="#1a1c1f"
        strokeWidth="1"
      />
      <rect
        x="6"
        y="6"
        width="28"
        height="28"
        rx="3"
        fill="none"
        stroke="#9ca0a8"
        strokeOpacity="0.4"
        strokeWidth="0.8"
      />
      <circle cx="20" cy="20" r="9" fill="url(#conn-hole)" />
      <circle
        cx="20"
        cy="20"
        r="9"
        fill="none"
        stroke="#1a1c1f"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="20" r="5" fill="#b8860b" />
      <circle cx="20" cy="20" r="5" fill="url(#conn-hole)" fillOpacity="0.35" />
    </svg>
  )
}
