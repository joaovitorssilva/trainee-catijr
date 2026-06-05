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
      <div className="w-[132px] h-[132px]">
        <img src={AlbumCover} alt="Artist Image" className="w-full aspect-square object-cover rounded-xs " />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-white font-medium">
          {title}
        </span>
        <span className="text-subdued text-10-medium">
          {year} • Albumwwww
        </span>
      </div>
    </div>
  )
}