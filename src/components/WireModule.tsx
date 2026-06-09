"use client"

import { useEffect, useState } from "react"
import { WireSvg } from "./wire/WireSvg"
import { CutWireSvg } from "./wire/CutWireSvg"
import { ConnectorSvg } from "./wire/ConnectorSvg"
import { ScrewSvg } from "./wire/ScrewSvg"

type WireColor = "white" | "red" | "blue" | "green" | "yellow"

const COLOR_HEX: Record<WireColor, string> = {
  white: "#f1efe7",
  red: "#d63440",
  blue: "#3b8ad9",
  green: "#36c25a",
  yellow: "#f0c419",
}

const ALL_COLORS: WireColor[] = ["white", "red", "blue", "green", "yellow"]

function randomWires(count: number): WireColor[] {
  return Array.from({ length: count }, () =>
    ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)],
  )
}

export function WireModule() {
  const [count, setCount] = useState(4)
  const [wires, setWires] = useState<WireColor[] | null>(null)
  const [cut, setCut] = useState<boolean[]>(() => Array(4).fill(false))

  useEffect(() => {
    setWires(randomWires(count))
    setCut(Array(count).fill(false))
  }, [count])

  const regenerate = (n: number) => {
    if (n === count) {
      setWires(randomWires(n))
      setCut(Array(n).fill(false))
    } else {
      setCount(n)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2">
        {[3, 4, 5, 6].map((n) => (
          <button
            key={n}
            onClick={() => regenerate(n)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              count === n
                ? "bg-white text-black"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {n} fils
          </button>
        ))}
        <button
          onClick={() => regenerate(count)}
          className="px-4 py-2 rounded-md text-sm font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        >
          ↻ Regénérer
        </button>
      </div>

      <div
        className="relative rounded-2xl border border-black/60 shadow-2xl"
        style={{
          width: 760,
          padding: "56px 24px",
          background:
            "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 50%, #232323 100%)",
        }}
      >
        <ScrewSvg className="absolute top-2 left-2 w-7 h-7" />
        <ScrewSvg className="absolute top-2 right-2 w-7 h-7" />
        <ScrewSvg className="absolute bottom-2 left-2 w-7 h-7" />
        <ScrewSvg className="absolute bottom-2 right-2 w-7 h-7" />

        <div className="flex flex-col gap-5" style={{ minHeight: count * 60 }}>
          {wires?.map((color, i) => (
            <Wire
              key={i}
              color={color}
              cut={cut[i]}
              onClick={() =>
                setCut((prev) => prev.map((c, j) => (j === i ? !c : c)))
              }
            />
          ))}
        </div>
      </div>

      <p className="text-zinc-400 text-sm">
        Clique sur un fil pour le couper / le réparer.
      </p>
    </div>
  )
}

function Wire({
  color,
  cut,
  onClick,
}: {
  color: WireColor
  cut: boolean
  onClick: () => void
}) {
  const hex = COLOR_HEX[color]
  return (
    <button
      onClick={onClick}
      className="relative flex items-center w-full cursor-pointer group h-12"
    >
      <ConnectorSvg className="w-10 h-10 shrink-0 relative z-10" />
      <div className="relative flex-1 h-full -mx-2">
        {cut ? (
          <CutWireSvg color={hex} className="absolute inset-0 w-full h-full" />
        ) : (
          <WireSvg color={hex} className="absolute inset-0 w-full h-full" />
        )}
      </div>
      <ConnectorSvg className="w-10 h-10 shrink-0 relative z-10" />
      <span className="absolute inset-y-0 left-10 right-10 rounded group-hover:bg-white/5 pointer-events-none" />
    </button>
  )
}
