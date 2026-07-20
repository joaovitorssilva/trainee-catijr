import type { RecentSearch } from "@/types/index.types"
import RecentSearchRow from "./RecentSearchRow"

interface RecentSearchProps {
  items: RecentSearch[]
  onRemove: (id: string) => void
  onSelect: (name: string) => void
}

export default function RecentSearches({ items, onRemove, onSelect }: RecentSearchProps) {
  if (items.length === 0) {
    return (
      <p className="text-subdued text-12-bold px-3.5 py-6">
        Nenhuma busca recente.
      </p>
    )
  }

  return (
    <div className="flex flex-col py-2">
      <p className="text-white text-12-bold px-3.5 pb-1.5">
        Buscas recentes
      </p>
      {items.map(item => (
        <RecentSearchRow
          key={item.id}
          item={item}
          onRemove={onRemove}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}