import { formatDurationText } from "@/utils/FormatDuration"
import { coverUrl } from "@/utils/coverUrl"
import { useDominantColor } from "@/hooks/useDominantColor"
import AlbumCover from "@/assets/album-cover.png"
import ArtistCover from "@/assets/artist-cover.png"

interface AlbumHeaderProps {
  name: string
  musicQtd: number
  duration: number
  coverUrl?: string
  artistName: string
  artistCoverUrl?: string
}

export default function AlbumHeader({ name, musicQtd, duration, coverUrl: coverUrlProp, artistName, artistCoverUrl }: AlbumHeaderProps) {
  const gradient = useDominantColor(coverUrl(coverUrlProp));

  return (
    <div
      className="flex items-center gap-3 rounded-lg pl-5 pb-4 pt-10 transition-[background] duration-300 ease-in-out overflow-hidden min-w-0 linear-gradient"
      style={{ background: `linear-gradient(to bottom, ${gradient.top}, ${gradient.bottom})` }}
    >
      <div className="w-15 h-15 md:w-43.5 md:h-43.5 shrink-0">
        <img 
          src={coverUrl(coverUrlProp) ?? AlbumCover}
          className="rounded-sm w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 md:gap-2.5">
        <span className="text-10-medium text-white ">Álbum público</span>
        <h1 className="text-white text-18-bold line-clamp-1 md:text-64-black">
          {name}
        </h1>
        <div className="flex items-center gap-1 md:gap-2 ">
          <img 
            src={coverUrl(artistCoverUrl) ?? ArtistCover}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-white text-10-medium font-bold">{artistName}</span>
          <span className="text-subdued text-10-medium "> • {musicQtd} músicas,</span>
          <span className="text-subdued text-10-medium">{formatDurationText(duration)}</span>
        </div>
      </div>
    </div>
  )
}