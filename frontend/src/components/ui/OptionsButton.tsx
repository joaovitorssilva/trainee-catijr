import { useState } from "react"
import OptionsIcon from "@/assets/icons/options-icon.svg"
import OptionsIconHovered from "@/assets/icons/options-icon-hovered.svg"

interface OptionsButtonProps {
  onClick: (e: React.MouseEvent) => void
}

export default function OptionsButton({ onClick }: OptionsButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="px-1.5 py-3 cursor-pointer outline-none transition ease-out duration-300"
    >
      <img src={isHovered ? OptionsIconHovered : OptionsIcon} />
    </button>
  )
}
