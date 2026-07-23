import { useRef, useState, useEffect, useCallback, type ReactNode } from "react"
import CarouselScrollButton from "./CarouselScrollButton"
import AngleLeftIcon from "@/assets/icons/angle-left-icon.svg"
import AngleRightIcon from "@/assets/icons/angle-right-icon.svg"

interface CarouselProps {
  children: ReactNode
  className?: string
}

export default function Carousel({ children, className }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return

    setCanScrollLeft(el.scrollLeft > 1)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    updateScrollState()

    el.addEventListener("scroll", updateScrollState, { passive: true })

    // ResizeObserver watches for legth update
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(el)

    return () => {
      el.removeEventListener("scroll", updateScrollState)
      observer.disconnect()
    }
  }, [updateScrollState])

  const handleScroll = (direction: "left" | "right") => {
    const el = trackRef.current
    if (!el) return

    const scrollAmout = el.clientWidth * 0.8
    const distance = direction === "left" ? -scrollAmout : scrollAmout
    el.scrollBy({ left: distance, behavior: "smooth" })
  }

  return (
    <div className={`relative group ${className ?? ""}`}>
      <CarouselScrollButton
        direction="left"
        disabled={!canScrollLeft}
        onClick={() => handleScroll("left")}
      >
        <img
          src={AngleLeftIcon}
          className="brightness-0 invert w-4 h-4"
        />
      </CarouselScrollButton>

      <CarouselScrollButton
        direction="right"
        disabled={!canScrollRight}
        onClick={() => handleScroll("right")}
      >
        <img
          src={AngleRightIcon}
          className="brightness-0 invert w-4 h-4"
        />
      </CarouselScrollButton>

      <div
        ref={trackRef}
        className="carousel-track flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {children}
      </div>
    </div>
  )
}
