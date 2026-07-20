import { type RecentSearch } from "@/types/index.types"
import RecentSearches from "./RecentSearches/RecentSearch"
import SearchSkeleton from "./SearchSkeleton/SearchSkeleton"

interface SearchDropdownProps {
  status: "closed" | "loading" | "recent"
  recentSearches: RecentSearch[]
  onRemoveRecent: (id: string) => void
  onSelectRecent: (name: string) => void
}

export default function SearchDropdown({
  status,
  recentSearches,
  onRemoveRecent,
  onSelectRecent,
}: SearchDropdownProps) {
  if (status === "closed") return null

  return (
    <div className="absolute top-full mt-2 left-0 w-full bg-bg-divider rounded-sm z-50 overflow-hidden max-h-[355px] overflow-y-auto scrollbar-none">
      {status === "loading" && (
        <SearchSkeleton rows={6} />
      )}

      <RecentSearches
        items={recentSearches}
        onRemove={onRemoveRecent}
        onSelect={onSelectRecent}
      />
    </div>
  )
}
