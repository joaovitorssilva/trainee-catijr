import AlbumCover from "@/assets/album-cover.png"

interface AlbumCardProps {
  title: string,
  year: string
  onClick?: () => void
}

export default function AlbumCard({ title, year, onClick }: AlbumCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-2  cursor-pointer">
      <div className="w-15 md:w-33 h-15 md:h-33">
        <img
          src={AlbumCover}
          alt="Artist Image"
          className="w-full aspect-square object-cover rounded-xs "
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-white text-12-medium">
          {title}
        </span>
        <span className="hidden md:block text-subdued text-10-medium">
          {year} • Album
        </span>
      </div>
    </div>
  )
}