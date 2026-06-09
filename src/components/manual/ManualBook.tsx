"use client"

import { useState } from "react"
import { manual } from "@/data/manual"
import type { Trial } from "@/types/manual"

const PAGE_W = 560
const PAGE_H = 780

// ─── Page primitives ──────────────────────────────────────────────────────────

function LeftPage({ trial }: { trial: Trial }) {
  return (
    <div
      style={{ width: PAGE_W, height: PAGE_H, borderRight: "1px solid rgba(180,140,80,0.25)" }}
      className="bg-[#fdf6e3] flex flex-col p-7 gap-4"
    >
      <p className="text-[10px] font-mono tracking-[0.2em] text-amber-700/40 uppercase">
        Module {String(trial.id).padStart(2, "0")}
      </p>
      <h2 className="text-xl font-bold text-amber-950 leading-tight">{trial.title}</h2>
      <div className="flex-1 rounded border-2 border-dashed border-amber-300/50 bg-amber-50/60 flex items-center justify-center">
        {trial.imagePath ? (
          <img
            src={trial.imagePath}
            alt={trial.title}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <span className="text-amber-400/40 text-xs tracking-wider">Image à venir</span>
        )}
      </div>
    </div>
  )
}

function RightPage({ trial }: { trial: Trial }) {
  const { instructions } = trial
  return (
    <div
      style={{ width: PAGE_W, height: PAGE_H }}
      className="bg-[#fdf6e3] flex flex-col p-7 gap-3 overflow-hidden"
    >
      {instructions.intro && (
        <p className="text-[11px] italic text-amber-800/55 leading-relaxed border-b border-amber-200 pb-3 shrink-0">
          {instructions.intro}
        </p>
      )}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto min-h-0">
        {instructions.steps.map((step) => (
          <div key={step.step} className="flex flex-col gap-1">
            <p className="text-[12px] font-semibold text-amber-950">
              {step.step}. {step.text}
            </p>
            {step.subSteps && (
              <ul className="flex flex-col gap-0.5 ml-3 mt-0.5">
                {step.subSteps.map((sub, i) => (
                  <li key={i} className="flex gap-2 text-[11px] text-amber-900/65 leading-snug">
                    <span className="text-amber-400/60 shrink-0 mt-px">—</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {instructions.warnings && instructions.warnings.length > 0 && (
        <div className="shrink-0 border-t border-amber-200 pt-2 flex flex-col gap-1">
          {instructions.warnings.map((w, i) => (
            <p key={i} className="text-[10px] text-red-700/60 flex gap-1.5 leading-snug">
              <span className="shrink-0">⚠</span>
              <span>{w}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Cover ────────────────────────────────────────────────────────────────────

function Cover({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-950">
      <button
        onClick={onOpen}
        className="group select-none cursor-pointer"
        style={{ width: PAGE_W, height: PAGE_H }}
      >
        <div
          className="w-full h-full flex flex-col items-center justify-center relative transition-transform duration-200 group-hover:scale-[1.01]"
          style={{
            background: "linear-gradient(150deg, #2e1a0e 0%, #4a2810 55%, #2e1a0e 100%)",
            boxShadow: "8px 12px 60px rgba(0,0,0,0.85), 20px 20px 80px rgba(0,0,0,0.5), inset -6px 0 20px rgba(0,0,0,0.45)",
            borderRadius: "0 4px 4px 0",
          }}
        >
          <div className="absolute inset-[14px] border border-amber-800/25 rounded-sm pointer-events-none" />
          <div className="absolute inset-[20px] border border-amber-800/15 rounded-sm pointer-events-none" />

          <div
            className="z-10 text-center px-10 py-5 mx-10"
            style={{ borderTop: "1px solid #7a5230", borderBottom: "1px solid #7a5230" }}
          >
            <p className="text-amber-300/25 text-[8px] tracking-[0.35em] uppercase mb-5">
              Keep Talking and Nobody Explodes
            </p>
            <h1 className="text-amber-100 text-[28px] font-bold tracking-widest leading-tight">
              Manuel
            </h1>
            <h1 className="text-amber-100 text-[28px] font-bold tracking-widest leading-tight">
              de l'Expert
            </h1>
          </div>

          <p className="z-10 text-amber-300/20 text-[8px] tracking-[0.3em] uppercase mt-10 transition-opacity group-hover:text-amber-300/50">
            Cliquez pour ouvrir
          </p>
        </div>
      </button>
    </div>
  )
}

// ─── Open book ────────────────────────────────────────────────────────────────

type AnimState = { dir: "next" | "prev"; target: number } | null

function OpenBook() {
  const [spreadIndex, setSpreadIndex] = useState(0)
  const [anim, setAnim] = useState<AnimState>(null)

  function navigate(dir: "next" | "prev") {
    if (anim) return
    const target = dir === "next" ? spreadIndex + 1 : spreadIndex - 1
    if (target < 0 || target >= manual.trials.length) return
    setAnim({ dir, target })
    setTimeout(() => {
      setSpreadIndex(target)
      setAnim(null)
    }, 700)
  }

  const current = manual.trials[spreadIndex]
  const targetTrial = anim ? manual.trials[anim.target] : null

  // Background pages shown beneath the flipping page during animation
  const bgLeft = anim?.dir === "prev" ? targetTrial! : current
  const bgRight = anim?.dir === "next" ? targetTrial! : current

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-950">
      <div className="flex items-center gap-8">

        {/* Prev arrow */}
        <button
          onClick={() => navigate("prev")}
          disabled={spreadIndex === 0 || !!anim}
          className="text-4xl text-amber-200/30 hover:text-amber-200/70 disabled:opacity-0 transition-all select-none w-8"
        >
          ‹
        </button>

        {/* Book */}
        <div
          style={{
            width: PAGE_W * 2,
            height: PAGE_H,
            position: "relative",
            perspective: "2500px",
            boxShadow: "0 40px 100px rgba(0,0,0,0.9), 0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Background left page */}
          <div style={{ position: "absolute", left: 0, top: 0, zIndex: 1 }}>
            <LeftPage trial={bgLeft} />
          </div>

          {/* Background right page */}
          <div style={{ position: "absolute", left: PAGE_W, top: 0, zIndex: 1 }}>
            <RightPage trial={bgRight} />
          </div>

          {/* Flipping page */}
          {anim && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: anim.dir === "next" ? PAGE_W : 0,
                width: PAGE_W,
                height: PAGE_H,
                transformStyle: "preserve-3d",
                transformOrigin: anim.dir === "next" ? "left center" : "right center",
                animation: `${anim.dir === "next" ? "pageFlipNext" : "pageFlipPrev"} 0.65s cubic-bezier(0.645,0.045,0.355,1.000) forwards`,
                zIndex: 3,
              }}
            >
              {/* Front face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {anim.dir === "next"
                  ? <RightPage trial={current} />
                  : <LeftPage trial={current} />
                }
              </div>
              {/* Back face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {anim.dir === "next"
                  ? <LeftPage trial={targetTrial!} />
                  : <RightPage trial={targetTrial!} />
                }
              </div>
            </div>
          )}

          {/* Spine shadow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 4,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.03) 0%, transparent 8%, transparent 42%, rgba(0,0,0,0.07) 46%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.07) 54%, transparent 58%, transparent 92%, rgba(0,0,0,0.03) 100%)",
            }}
          />
        </div>

        {/* Next arrow */}
        <button
          onClick={() => navigate("next")}
          disabled={spreadIndex === manual.trials.length - 1 || !!anim}
          className="text-4xl text-amber-200/30 hover:text-amber-200/70 disabled:opacity-0 transition-all select-none w-8"
        >
          ›
        </button>
      </div>

      {/* Page indicators */}
      <div className="absolute bottom-8 flex gap-2">
        {manual.trials.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === spreadIndex
                ? "w-4 h-1.5 bg-amber-300/60"
                : "w-1.5 h-1.5 bg-amber-300/20"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Entry point ──────────────────────────────────────────────────────────────

export default function ManualBook() {
  const [isOpen, setIsOpen] = useState(false)
  if (!isOpen) return <Cover onOpen={() => setIsOpen(true)} />
  return <OpenBook />
}
