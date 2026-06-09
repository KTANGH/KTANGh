"use client"

import { useEffect, useState } from "react"

export function SwitchesModule() {
  const [count, setCount] = useState(5)
  const [states, setStates] = useState<boolean[] | null>(null)

  useEffect(() => {
    setStates(Array(count).fill(false))
  }, [count])

  const toggle = (i: number) => {
    setStates((prev) =>
      prev ? prev.map((s, j) => (j === i ? !s : s)) : prev,
    )
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2">
        {[4, 5, 6].map((n) => (
          <button
            key={n}
            onClick={() => setCount(n)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              count === n
                ? "bg-white text-black"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {n} interrupteurs
          </button>
        ))}
        <button
          onClick={() => setStates(Array(count).fill(false))}
          className="px-4 py-2 rounded-md text-sm font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        >
          ↻ Reset
        </button>
      </div>

      <div
        className="rounded-2xl border border-black/60 shadow-2xl flex justify-center items-center gap-6"
        style={{
          padding: "40px 32px",
          minWidth: 560,
          background:
            "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 50%, #232323 100%)",
        }}
      >
        {states?.map((on, i) => (
          <Switch key={i} index={i + 1} on={on} onToggle={() => toggle(i)} />
        ))}
      </div>
    </div>
  )
}

function Switch({
  index,
  on,
  onToggle,
}: {
  index: number
  on: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className="relative flex flex-col items-center gap-2 cursor-pointer select-none group"
    >
      <span
        className="text-xs font-mono"
        style={{
          color: on ? "#ff8a2a" : "#666",
          textShadow: on ? "0 0 6px rgba(255,138,42,0.7)" : "none",
        }}
      >
        ON
      </span>

      <div
        className="relative rounded-md"
        style={{
          width: 48,
          height: 120,
          background:
            "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)",
          border: "2px solid #050505",
          boxShadow:
            "inset 0 4px 8px rgba(0,0,0,0.7), inset 0 -2px 4px rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="absolute left-1/2"
          style={{
            width: 22,
            height: 60,
            marginLeft: -11,
            top: on ? 4 : 56,
            background:
              "linear-gradient(180deg, #d8d8d8 0%, #9a9a9a 50%, #4a4a4a 100%)",
            borderRadius: 4,
            boxShadow:
              "0 3px 6px rgba(0,0,0,0.7), inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -2px 3px rgba(0,0,0,0.4)",
            transition: "top 0.18s cubic-bezier(0.5, 0, 0.5, 1.4)",
          }}
        >
          <div
            className="absolute left-1/2"
            style={{
              width: 16,
              height: 8,
              marginLeft: -8,
              top: on ? 0 : 52,
              background:
                "radial-gradient(ellipse at center, #f0f0f0 0%, #8a8a8a 100%)",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>

      <span
        className="text-xs font-mono"
        style={{
          color: !on ? "#3a9aff" : "#666",
          textShadow: !on ? "0 0 6px rgba(58,154,255,0.7)" : "none",
        }}
      >
        OFF
      </span>

      <span className="text-zinc-400 text-xs font-mono mt-1">
        #{index}
      </span>
    </button>
  )
}
