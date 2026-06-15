import ArtistCover from "@/assets/artist-cover.png"

interface ArtistCardProps {
  id: string
  name: string
  onClick?: () => void
}

export default function ArtistCard({ name, onClick }: ArtistCardProps) {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col gap-2 cursor-pointer ">
      <div className="w-15 h-15 md:w-33 md:h-33">
        <img src={ArtistCover} alt="Artist Profile Image" className="rounded-full" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-white text-12-medium">
          {name}
        </span>
        <span className="hidden md:block text-subdued text-10-medium">
          Artista
        </span>
      </div>
    </div>
  )
}