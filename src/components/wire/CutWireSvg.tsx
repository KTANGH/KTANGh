type Props = { color: string; className?: string }

export function CutWireSvg({ color, className }: Props) {
  const leftBody = "M 0 30 Q 80 32 180 40 Q 240 48 290 50"
  const leftHi = "M 0 26 Q 80 28 180 36 Q 240 44 290 46"
  const leftLo = "M 0 34 Q 80 36 180 44 Q 240 52 290 54"

  const rightBody = "M 510 50 Q 560 48 620 40 Q 720 32 800 30"
  const rightHi = "M 510 46 Q 560 44 620 36 Q 720 28 800 26"
  const rightLo = "M 510 54 Q 560 52 620 44 Q 720 36 800 34"

  return (
    <svg
      viewBox="0 0 800 60"
      preserveAspectRatio="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={leftBody}
        stroke={color}
        strokeWidth="22"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={leftHi}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={leftLo}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      <g stroke="#e6a85a" strokeWidth="1.5" strokeLinecap="round">
        <line x1="288" y1="50" x2="305" y2="46" />
        <line x1="288" y1="50" x2="307" y2="52" />
        <line x1="288" y1="50" x2="303" y2="58" />
        <line x1="288" y1="50" x2="296" y2="42" />
      </g>

      <path
        d={rightBody}
        stroke={color}
        strokeWidth="22"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={rightHi}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={rightLo}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      <g stroke="#e6a85a" strokeWidth="1.5" strokeLinecap="round">
        <line x1="512" y1="50" x2="495" y2="46" />
        <line x1="512" y1="50" x2="493" y2="52" />
        <line x1="512" y1="50" x2="497" y2="58" />
        <line x1="512" y1="50" x2="504" y2="42" />
      </g>
    </svg>
  )
}
