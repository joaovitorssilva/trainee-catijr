import { coverUrl } from "@/utils/coverUrl"
import ArtistBanner from "@/assets/artist-banner.png"
import ArtistVerifiedIcon from "@/assets/icons/artist-verified-icon.svg"

interface ArtistHeaderProps {
  artistName?: string | null
  listeners?: number
  coverUrl?: string
}

export default function ArtistHeader({ artistName, listeners, coverUrl: coverUrlProp }: ArtistHeaderProps) {
  return (
    <div className="relative w-full h-30 md:h-75 overflow-hidden rounded-lg">
      <img
        src={coverUrl(coverUrlProp) ?? ArtistBanner}
        alt="Artist Banner Image"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 p-4">
        <div className="flex flex-col gap-2.5">
          <h1 className="text-white text-18-bold md:text-64-bold">
            {artistName || "Artista"}
          </h1>
          <div className="flex items-center gap-1">
            <img src={ArtistVerifiedIcon} alt="Verified" />
            <span className="text-white text-10-bold">
              Verified by Spotify
            </span>
          </div>
          <span className="text-white text-10-medium">
            {listeners?.toLocaleString("pt-BR") || "—"} ouvintes mensais
          </span>
        </div>
      </div>
    </div>
  )
}