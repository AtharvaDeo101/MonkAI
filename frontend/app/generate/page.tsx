import { SimpleGenerator } from "@/components/simple-generator"
import Navbar from "@/components/navbar"

export default function GeneratePage() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased">
      <Navbar />
      <SimpleGenerator />
    </main>
  )
}
