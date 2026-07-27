import { useState } from "react"
import type { TrackCredits } from "@/types/credits.types"
import CreditRow from "./CreditsRow"
import CreditsModal from "@/components/ui/CreditsModal"

interface SongPanelCreditsCardProps {
  credits: TrackCredits
}

export default function SongPanelCreditsCard({ credits }: SongPanelCreditsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const allContributors = credits.sections.flatMap(s => s.contributors)

  return (
    <>
      <div className="flex flex-col gap-3 bg-bg-highlight rounded-lg p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-12-bold">Créditos</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-subdued text-10-bold cursor-pointer transition-colors outline-none hover:underline hover:text-white"
          >
            Mostrar tudo
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {allContributors.slice(0, 3).map(contributor => (
            <CreditRow 
              key={contributor.id}
              contributor={contributor} 
            />
          ))}
        </div>
      </div>

      <CreditsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        credits={credits}
      />
    </>
  )
}