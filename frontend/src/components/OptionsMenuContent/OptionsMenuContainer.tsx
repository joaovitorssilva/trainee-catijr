import { useLayoutEffect, useRef, useState, useCallback } from "react"

interface OptionsMenuContainerProps {
  x: number
  y: number
  onClose: () => void
  children: React.ReactNode
}

const PADDING = 8
const OFFSET = 6

export default function OptionsMenuContainer({ x, y, onClose, children }: OptionsMenuContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x, y })

  const updatePosition = useCallback(() => {
    if (!ref.current) return

    const { width, height } = ref.current.getBoundingClientRect()
    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window

    const posX = x + width + OFFSET + PADDING > viewportWidth ? x - width - OFFSET : x + OFFSET
    const posY = y + height + OFFSET + PADDING > viewportHeight ? y - height - OFFSET : y + OFFSET

    const clampedX = Math.max(PADDING, Math.min(posX, viewportWidth - width - PADDING))
    const clampedY = Math.max(PADDING, Math.min(posY, viewportHeight - height - PADDING))

    setPosition({ x: clampedX, y: clampedY })
  }, [x, y])

  useLayoutEffect(() => {
    updatePosition()

    const windowResizeHandler = () => updatePosition()
    window.addEventListener("resize", windowResizeHandler)

    const resizeObserver = new ResizeObserver(updatePosition)
    if (ref.current) resizeObserver.observe(ref.current)

    return () => {
      window.removeEventListener("resize", windowResizeHandler)
      resizeObserver.disconnect()
    }
  }, [updatePosition])

  useLayoutEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className="fixed top-0 left-0 z-50 min-w-53 bg-bg-popup rounded-sm"
    >
      {children}
    </div>
  )
}