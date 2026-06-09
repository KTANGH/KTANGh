import { DecodingModule } from "@/components/DecodingModule"

export default function DecodingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 py-16 px-4">
      <h1 className="text-zinc-100 text-2xl font-semibold mb-8">
        Module — Décodage
      </h1>
      <DecodingModule />
    </main>
  )
}
