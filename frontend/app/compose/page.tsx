import { AdvancedComposer } from "@/components/advanced-composer"
import Navbar from "@/components/navbar"

export default function ComposePage() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased">
      <Navbar />
      <AdvancedComposer />
    </main>
  )
}
