import { useEffect, useRef } from "react"
import type { TrackCredits } from "@/types/credits.types"
import CreditRow from "@/components/SongPanel/CreditsRow"
import XIcon from "@/assets/icons/x.svg"

interface CreditsPanelProps {
  isOpen: boolean
  onClose: () => void
  credits: TrackCredits
}

export default function CreditsModal({ isOpen, onClose, credits }: CreditsPanelProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        ref={ref}
        className="bg-bg-base rounded-lg w-82.5 max-h-[60vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-2 shrink-0">
          <div className="flex flex-col gap-1">
            <h2 className="text-white font-bold text-xl">Créditos</h2>
            <span className="text-white text-12-bold">{credits.trackName}</span>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer outline-none"
          >
            <img src={XIcon} className="w-4 h-4 "/>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex flex-col gap-6 px-6 py-4 overflow-y-auto scrollbar-none">
          {credits.sections.map(section => (
            <div key={section.title} className="flex flex-col gap-2">
              <h3 className="text-white font-bold text-base">
                {section.title}
              </h3>
              <div className="flex flex-col gap-3">
                {section.contributors.map(contributor => (
                  <CreditRow key={contributor.id} contributor={contributor} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}