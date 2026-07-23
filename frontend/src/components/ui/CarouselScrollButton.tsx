import type { ReactNode } from "react"

interface CarouselButtonProps {
  direction: "left" | "right"
  disabled: boolean
  onClick: () => void
  children: ReactNode
}

export default function CarouselScrollButton({
  direction,
  disabled,
  onClick,
  children,
}: CarouselButtonProps) {
  const positionClass = direction === "left" ? "left-2" : "right-2"

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Scroll ${direction}`}
      className={`
        absolute top-1/2 -translate-y-1/2 z-10
        w-8 h-8 flex items-center justify-center
        rounded-full bg-bg/60
        hover:bg-bg/80 transition-all duration-200 cursor-pointer outline-none
        disabled:opacity-0 disabled:pointer-events-none
        group-hover:enabled:opacity-100 opacity-0
        ${positionClass}
      `}
    >
      {children}
    </button>
  )
}