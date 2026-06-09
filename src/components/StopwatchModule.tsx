"use client"

import { useEffect, useRef, useState } from "react"

type LedColor = "red" | "green" | "orange" | "blue" | "white"

const LED_HEX: Record<LedColor, string> = {
  red: "#ff3a3a",
  green: "#3aff6a",
  orange: "#ff9a2a",
  blue: "#3a9aff",
  white: "#f5f5f5",
}

const LED_LABEL: Record<LedColor, string> = {
  red: "Rouge",
  green: "Verte",
  orange: "Orange",
  blue: "Bleue",
  white: "Blanche",
}

const COLORS: LedColor[] = ["red", "green", "orange", "blue", "white"]

export function StopwatchModule() {
  const [led, setLed] = useState<LedColor | null>(null)
  const [running, setRunning] = useState(true)
  const [seconds, setSeconds] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    setLed(COLORS[Math.floor(Math.random() * COLORS.length)])
  }, [])

  useEffect(() => {
    if (!running) return
    startTimeRef.current = performance.now() - seconds * 1000
    const tick = (t: number) => {
      const elapsed = (t - (startTimeRef.current ?? t)) / 1000
      setSeconds(elapsed % 60)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [running])

  const reset = () => {
    setLed(COLORS[Math.floor(Math.random() * COLORS.length)])
    setSeconds(0)
    setRunning(true)
  }

  const angle = (seconds / 60) * 360 - 90

  return (
    <div
      className="rounded-2xl border border-black/60 shadow-2xl flex flex-col items-center gap-6"
      style={{
        width: 460,
        padding: "32px",
        background:
          "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 50%, #232323 100%)",
      }}
    >
      <div className="flex items-center gap-6">
        <Dial angle={angle} />
        {led && <Led color={led} />}
      </div>

      <div
        className="px-5 py-2 rounded-md font-mono text-2xl tracking-widest"
        style={{
          background: "#1a0e08",
          color: "#ff8a2a",
          textShadow: "0 0 8px rgba(255,120,40,0.7)",
          border: "2px solid #000",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.8)",
          minWidth: 160,
          textAlign: "center",
        }}
      >
        {seconds.toFixed(2)}s
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setRunning(false)}
          disabled={!running}
          className="px-5 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-500 disabled:bg-zinc-700 disabled:text-zinc-500 transition"
        >
          Stop
        </button>
        <button
          onClick={reset}
          className="px-5 py-2 rounded-md text-sm font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition"
        >
          ↻ Reset
        </button>
      </div>

      {led && (
        <p className="text-zinc-400 text-xs">
          Diode : <span className="text-zinc-200">{LED_LABEL[led]}</span>
        </p>
      )}
    </div>
  )
}

function Dial({ angle }: { angle: number }) {
  const size = 240
  const r = size / 2 - 4
  const cx = size / 2
  const cy = size / 2

  return (
    <div
      className="relative rounded-full"
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 30% 25%, #f8f4e8 0%, #e0d8c2 60%, #8a8276 100%)",
        boxShadow:
          "inset 0 -6px 14px rgba(0,0,0,0.45), inset 0 4px 10px rgba(255,255,255,0.6), 0 6px 14px rgba(0,0,0,0.6)",
        border: "4px solid #1a1a1a",
      }}
    >
      <svg width={size} height={size} className="absolute inset-0">
        {[...Array(60)].map((_, i) => {
          const a = (i / 60) * 2 * Math.PI - Math.PI / 2
          const major = i % 5 === 0
          const x1 = cx + Math.cos(a) * (r - (major ? 16 : 8))
          const y1 = cy + Math.sin(a) * (r - (major ? 16 : 8))
          const x2 = cx + Math.cos(a) * (r - 2)
          const y2 = cy + Math.sin(a) * (r - 2)
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#1a1a1a"
              strokeWidth={major ? 2 : 1}
            />
          )
        })}
        {[0, 15, 30, 45].map((s, i) => {
          const a = (s / 60) * 2 * Math.PI - Math.PI / 2
          const x = cx + Math.cos(a) * (r - 28)
          const y = cy + Math.sin(a) * (r - 28)
          return (
            <text
              key={i}
              x={x}
              y={y + 5}
              textAnchor="middle"
              fontSize="14"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#1a1a1a"
            >
              {s}
            </text>
          )
        })}
      </svg>
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: 4,
          height: r - 12,
          marginLeft: -2,
          marginTop: -(r - 12) + 6,
          background: "linear-gradient(180deg, #c83030 0%, #8a1a1a 100%)",
          transformOrigin: "50% calc(100% - 6px)",
          transform: `rotate(${angle + 90}deg)`,
          borderRadius: 2,
          boxShadow: "0 0 4px rgba(0,0,0,0.5)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: 14,
          height: 14,
          marginLeft: -7,
          marginTop: -7,
          background:
            "radial-gradient(circle at 30% 30%, #6a6a6a 0%, #1a1a1a 100%)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.7)",
        }}
      />
    </div>
  )
}

function Led({ color }: { color: LedColor }) {
  const hex = LED_HEX[color]
  return (
    <div
      className="rounded-full"
      style={{
        width: 36,
        height: 36,
        background: `radial-gradient(circle at 30% 30%, ${hex} 0%, ${hex} 40%, #1a1a1a 100%)`,
        boxShadow: `0 0 18px ${hex}, inset 0 -3px 6px rgba(0,0,0,0.5)`,
        border: "3px solid #0a0a0a",
      }}
    />
  )
}
