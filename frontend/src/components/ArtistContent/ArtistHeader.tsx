import ArtistBanner from "@/assets/artist-banner.png"
import ArtistVerifiedIcon from "@/assets/icons/artist-verified-icon.svg"

export default function ArtistHeader() {
  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-lg ">
      <img
        src={ArtistBanner}
        alt="Artist Banner Image"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 p-4">
        <div className="flex flex-col gap-2.5">
          <h1 className="text-white text-64-bold">Artista</h1>
          <div className="flex items-center gap-1">
            <img src={ArtistVerifiedIcon} alt="Verified" />
            <span className="text-white text-10-bold">
              Verified by Spotify
            </span>
          </div>
          <span className="text-white text-10-medium">
            115.719.455 ouvintes mensais
          </span>
        </div>
      </div>
    </div>
  )
}