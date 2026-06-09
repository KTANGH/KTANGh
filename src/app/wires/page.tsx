import { WireModule } from "@/components/WireModule"

export default function WiresPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 py-16 px-4">
      <h1 className="text-zinc-100 text-2xl font-semibold mb-8">
        Module — Coupe-fils
      </h1>
      <WireModule />
    </main>
  )
}
