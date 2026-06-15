import PlaylistCover from "@/assets/playlist-cover.png"

interface PlaylistCardProps {
  id: string
  name: string
  onClick?: () => void
}

export default function PlaylistCard({ name, onClick }: PlaylistCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-2 cursor-pointer ">
      <div className="w-15 h-15 md:w-[132px] md:h-[132px]">
        <img src={PlaylistCover} className="w-full aspect-square object-cover rounded-xs " />
      </div>

      <div className="flex flex-col gap-1 overflow-hidden">
        <span className="text-white text-12-medium ">
          {name}
        </span>
        <span className="hidden md:block text-subdued text-10-medium">
          Playlist • Vitoria Tenorio
        </span>
      </div>
    </div>
  )

}