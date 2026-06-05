import TrackCover from "@/assets/track-cover2.png"

interface RecentlyPlayedCardProps {
  title: string
}

export default function RecentlyPlayedCard({ title }: RecentlyPlayedCardProps) {
  return (
    <div className="flex items-center gap-2.5 bg-bg-elements rounded-sm cursor-pointer ">
      <img src={TrackCover} className="w-12 h-12 rounded-xs"/>
      <span className="text-white text-xs font-bold pr-2">
        {title}
      </span>
    </div>
  )
}