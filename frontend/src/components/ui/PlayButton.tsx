import PlayIcon from "@/assets/icons/play-icon.svg"
import PauseIcon from "@/assets/icons/pause-icon.svg"

interface PlayButtonProps {
  isPlaying?: boolean
  onToggle: (e: React.MouseEvent) => void
}

export default function PlayButton({ isPlaying, onToggle }: PlayButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="bg-primary w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full p-2.5 hover:bg-accent transition-all ease-out duration-300 select-none cursor-pointer outline-none">
      {isPlaying ? (
        <img src={PauseIcon} className="brightness-0" />
      ) : (
        <img src={PlayIcon} className="brightness-0" />
      )}
    </button>
  )
}