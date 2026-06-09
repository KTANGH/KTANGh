"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const MIN_FREQ = 88.0
const MAX_FREQ = 108.0
const STEP = 0.1

const KNOB_MIN_ANGLE = -135
const KNOB_MAX_ANGLE = 135

function freqToAngle(freq: number): number {
  const t = (freq - MIN_FREQ) / (MAX_FREQ - MIN_FREQ)
  return KNOB_MIN_ANGLE + t * (KNOB_MAX_ANGLE - KNOB_MIN_ANGLE)
}

function angleToFreq(angle: number): number {
  const clamped = Math.max(KNOB_MIN_ANGLE, Math.min(KNOB_MAX_ANGLE, angle))
  const t = (clamped - KNOB_MIN_ANGLE) / (KNOB_MAX_ANGLE - KNOB_MIN_ANGLE)
  const raw = MIN_FREQ + t * (MAX_FREQ - MIN_FREQ)
  return Math.round(raw / STEP) * STEP
}

export function RadioModule() {
  const [freq, setFreq] = useState(98.0)

  return (
    <div
      className="rounded-2xl border border-black/60 shadow-2xl flex flex-col items-center gap-6"
      style={{
        width: 560,
        padding: "32px",
        background:
          "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 50%, #232323 100%)",
      }}
    >
      <Oscilloscope freq={freq} />
      <FreqDisplay freq={freq} />
      <Knob freq={freq} onChange={setFreq} />
    </div>
  )
}

function Oscilloscope({ freq }: { freq: number }) {
  const width = 480
  const height = 160
  const amplitude = 38
  const midY = height / 2

  const [phase, setPhase] = useState(0)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const tick = (t: number) => {
      const last = lastTimeRef.current
      lastTimeRef.current = t
      if (last !== null) {
        const dt = (t - last) / 1000
        setPhase((p) => p + dt * 2 * Math.PI * 1.2)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      lastTimeRef.current = null
    }
  }, [])

  const cyclesPerWidth = 1 + ((freq - MIN_FREQ) / (MAX_FREQ - MIN_FREQ)) * 11

  const points: string[] = []
  const samples = 240
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * width
    const angle = (i / samples) * cyclesPerWidth * 2 * Math.PI + phase
    const y = midY + Math.sin(angle) * amplitude
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  const path = points.join(" ")

  return (
    <div
      className="rounded-lg border-2 border-black/80 overflow-hidden relative"
      style={{
        width,
        height,
        background:
          "radial-gradient(ellipse at center, #0a2a14 0%, #061a0c 70%, #030d06 100%)",
        boxShadow:
          "inset 0 0 40px rgba(0,0,0,0.8), inset 0 0 8px rgba(0,255,100,0.1)",
      }}
    >
      <svg width={width} height={height} className="absolute inset-0">
        <defs>
          <pattern
            id="osc-grid"
            width="32"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(80,200,120,0.18)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#osc-grid)" />
        <line
          x1="0"
          y1={midY}
          x2={width}
          y2={midY}
          stroke="rgba(80,200,120,0.35)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d={path}
          fill="none"
          stroke="#7cff9b"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.25"
          style={{ filter: "blur(6px)" }}
        />
        <path
          d={path}
          fill="none"
          stroke="#9aff95"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  )
}

function FreqDisplay({ freq }: { freq: number }) {
  return (
    <div
      className="px-6 py-3 rounded-md font-mono text-3xl tracking-widest"
      style={{
        background: "#1a0e08",
        color: "#ff8a2a",
        textShadow: "0 0 8px rgba(255,120,40,0.7)",
        border: "2px solid #000",
        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.8)",
        minWidth: 200,
        textAlign: "center",
      }}
    >
      {freq.toFixed(1)} MHz
    </div>
  )
}

function Knob({
  freq,
  onChange,
}: {
  freq: number
  onChange: (f: number) => void
}) {
  const knobRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{
    centerX: number
    centerY: number
    lastPointerAngle: number
    virtualAngle: number
  } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const angle = freqToAngle(freq)

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      const dx = e.clientX - drag.centerX
      const dy = e.clientY - drag.centerY
      const pointerAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90

      let delta = pointerAngle - drag.lastPointerAngle
      if (delta > 180) delta -= 360
      if (delta < -180) delta += 360

      const next = Math.max(
        KNOB_MIN_ANGLE,
        Math.min(KNOB_MAX_ANGLE, drag.virtualAngle + delta),
      )
      drag.virtualAngle = next
      drag.lastPointerAngle = pointerAngle
      onChange(angleToFreq(next))
    },
    [onChange],
  )

  const onPointerUp = useCallback(() => {
    dragRef.current = null
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (!isDragging) return
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [isDragging, onPointerMove, onPointerUp])

  const onPointerDown = (e: React.PointerEvent) => {
    const rect = knobRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const pointerAngle =
      (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 90
    dragRef.current = {
      centerX: cx,
      centerY: cy,
      lastPointerAngle: pointerAngle,
      virtualAngle: freqToAngle(freq),
    }
    setIsDragging(true)
    e.preventDefault()
  }

  const onWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY > 0 ? -STEP : STEP
    const next = Math.max(MIN_FREQ, Math.min(MAX_FREQ, freq + delta))
    onChange(Math.round(next / STEP) * STEP)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={knobRef}
        onPointerDown={onPointerDown}
        onWheel={onWheel}
        className="relative cursor-grab active:cursor-grabbing select-none"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, #6a6a6a 0%, #3a3a3a 55%, #1a1a1a 100%)",
          boxShadow:
            "0 6px 12px rgba(0,0,0,0.6), inset 0 -4px 8px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.15)",
          touchAction: "none",
        }}
      >
        <div
          className="absolute inset-2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #8a8a8a 0%, #4a4a4a 60%, #2a2a2a 100%)",
            transform: `rotate(${angle}deg)`,
            transition: isDragging ? "none" : "transform 0.08s ease-out",
          }}
        >
          <div
            className="absolute"
            style={{
              top: 8,
              left: "50%",
              width: 6,
              height: 30,
              marginLeft: -3,
              borderRadius: 3,
              background:
                "linear-gradient(180deg, #f0c419 0%, #c8941a 100%)",
              boxShadow: "0 0 6px rgba(255,200,60,0.7)",
            }}
          />
        </div>
        {[...Array(11)].map((_, i) => {
          const a = KNOB_MIN_ANGLE + (i / 10) * (KNOB_MAX_ANGLE - KNOB_MIN_ANGLE)
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                width: 2,
                height: 8,
                marginLeft: -1,
                marginTop: -75,
                background: "rgba(255,255,255,0.4)",
                transformOrigin: "1px 75px",
                transform: `rotate(${a}deg)`,
              }}
            />
          )
        })}
      </div>
      <span className="text-zinc-400 text-xs">
        Drag ou molette — {MIN_FREQ.toFixed(1)} à {MAX_FREQ.toFixed(1)} MHz
      </span>
    </div>
  )
}
