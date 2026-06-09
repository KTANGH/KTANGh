"use client"

import { useEffect, useState } from "react"

type Method = "A" | "B" | "C" | "D"

const WORDS = [
  "CHAT",
  "CHIEN",
  "ARBRE",
  "MAISON",
  "VOITURE",
  "TABLE",
  "FENETRE",
  "LIVRE",
  "POMME",
  "ROUTE",
  "JARDIN",
  "ECOLE",
  "MONTAGNE",
  "RIVIERE",
  "NUAGE",
]

function shift(letter: string, by: number): string {
  const code = letter.charCodeAt(0) - 65
  const shifted = ((code + by) % 26 + 26) % 26
  return String.fromCharCode(shifted + 65)
}

function encode(word: string, method: Method): string {
  switch (method) {
    case "A":
      return word
        .split("")
        .map((l) => shift(l, 3))
        .join("")
    case "B":
      return word
        .split("")
        .map((l) => String.fromCharCode(90 - (l.charCodeAt(0) - 65)))
        .join("")
    case "C":
      return word.split("").reverse().join("")
    case "D":
      return word
        .split("")
        .map((l) => shift(l, -5))
        .join("")
  }
}

function pickPuzzle(): { word: string; method: Method; encoded: string } {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)]
  const method = (["A", "B", "C", "D"] as Method[])[Math.floor(Math.random() * 4)]
  return { word, method, encoded: encode(word, method) }
}

export function DecodingModule() {
  const [puzzle, setPuzzle] = useState<{
    word: string
    method: Method
    encoded: string
  } | null>(null)
  const [guess, setGuess] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "fail">("idle")

  useEffect(() => {
    setPuzzle(pickPuzzle())
  }, [])

  const submit = () => {
    if (!puzzle) return
    if (guess.trim().toUpperCase() === puzzle.word) setStatus("success")
    else setStatus("fail")
  }

  const regenerate = () => {
    setPuzzle(pickPuzzle())
    setGuess("")
    setStatus("idle")
  }

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
      <div
        className="px-8 py-5 rounded-md font-mono text-4xl tracking-[0.4em]"
        style={{
          background: "#0a0a0a",
          color: "#7cff9b",
          textShadow: "0 0 12px rgba(124,255,155,0.7)",
          border: "2px solid #000",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.8)",
          minWidth: 360,
          textAlign: "center",
          letterSpacing: "0.4em",
        }}
      >
        {puzzle?.encoded ?? "…"}
      </div>

      <div className="flex flex-col gap-3 w-full items-center">
        <input
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value)
            setStatus("idle")
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit()
          }}
          placeholder="Mot décodé"
          className="px-4 py-3 rounded-md font-mono text-2xl tracking-widest uppercase text-center bg-zinc-900 text-zinc-100 border border-zinc-700 focus:border-zinc-400 outline-none"
          style={{ width: 360, letterSpacing: "0.3em" }}
        />
        <div className="flex gap-3">
          <button
            onClick={submit}
            className="px-5 py-2 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-500 transition"
          >
            Valider
          </button>
          <button
            onClick={regenerate}
            className="px-5 py-2 rounded-md text-sm font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition"
          >
            ↻ Nouveau code
          </button>
        </div>
      </div>

      <div className="h-6 text-sm font-medium">
        {status === "success" && (
          <span className="text-emerald-400">✓ Désamorcé</span>
        )}
        {status === "fail" && (
          <span className="text-red-400">✗ Erreur — réessayez</span>
        )}
      </div>

      <details className="text-xs text-zinc-500 self-stretch">
        <summary className="cursor-pointer hover:text-zinc-300">
          Debug (réponse)
        </summary>
        <div className="mt-2 font-mono">
          Méthode : <span className="text-zinc-300">{puzzle?.method}</span> —
          Mot : <span className="text-zinc-300">{puzzle?.word}</span>
        </div>
      </details>
    </div>
  )
}
