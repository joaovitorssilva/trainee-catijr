import { useEffect, useRef, useState } from "react"

interface OptionsMenuContainerProps {
  x: number
  y: number
  onClose: () => void
  children: React.ReactNode
}

export default function OptionsMenuContainer({ x, y, onClose, children }: OptionsMenuContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x, y })

  useEffect(() => {
    if (!ref.current) return

    const { offsetWidth, offsetHeight } = ref.current
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const padding = 8    // min distance from viewport edge

    setPosition({
      x: Math.min(x, viewportWidth - offsetWidth - padding),
      y: Math.min(y, viewportHeight - offsetHeight - padding),
    })
  }, [x, y])

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [onClose])

  // close on esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <div
      ref={ref}
      style={{ top: position.y, left: position.x }}
      className="fixed z-50 min-w-[212px] bg-bg-popup rounded-sm"
    >
      {children}
    </div>
  )
}