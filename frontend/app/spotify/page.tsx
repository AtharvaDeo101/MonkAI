import { SpotifyIntegration } from "@/components/spotify-integration"
import Navbar from "@/components/navbar"

export default function SpotifyPage() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased">
      <Navbar />
      <SpotifyIntegration />
    </main>
  )
}
