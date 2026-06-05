import { useCallback, useRef, useState } from "react"

interface ProgressBarProps {
  progress: number
  onChange?: (value: number) => void
}

export default function ProgressBar({ progress, onChange }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [hover, setHover] = useState(false)

  const clamp = (v: number) => Math.min(1, Math.max(0, v))

  const valueFromClient = useCallback(
    (clientX: number) => {
      if (!barRef.current) return progress
      const rect = barRef.current.getBoundingClientRect()
      return clamp((clientX - rect.left) / rect.width)
    },
    [progress],
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      setDragging(true)
      const val = valueFromClient(e.clientX)
      onChange?.(val)

      const onMove = (ev: PointerEvent) => {
        const v = valueFromClient(ev.clientX)
        onChange?.(v)
      }

      const onUp = () => {
        setDragging(false)
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("pointerup", onUp)
      }

      window.addEventListener("pointermove", onMove)
      window.addEventListener("pointerup", onUp)
    },
    [onChange, valueFromClient],
  )

  const pct = `${Math.round(clamp(progress) * 100)}%`

  return (
    <div
      ref={barRef}
      role="slider"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={1}
      tabIndex={0}
      className="group relative h-1 w-full cursor-pointer rounded-full bg-[#4d4d4d]"
      onPointerDown={handlePointerDown}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => !dragging && setHover(false)}
    >
      <div
        className="h-full rounded-full transition-colors duration-100 pointer-events-none"
        style={{
          width: pct,
          backgroundColor: dragging || hover ? "#1db954" : "#ffffff",
        }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md pointer-events-none
                   transition-opacity duration-100"
        style={{
          left: `calc(${pct} - 6px)`,
          width: 12,
          height: 12,
          opacity: dragging || hover ? 1 : 0,
        }}
      />
    </div>
  )
}