import type { SearchFilterTab } from "@/types/index.types";
import Button from "../ui/Button";

const filters: { label: string; value: SearchFilterTab }[] = [
  { label: "Tudo", value: "tudo" },
  { label: "Músicas", value: "musicas" },
  { label: "Álbuns", value: "albuns" },
  { label: "Artistas", value: "artistas" },
  { label: "Playlists", value: "playlists" }
]

interface SearchFilterTabProps {
  active: SearchFilterTab
  onChange: (filter: SearchFilterTab) => void
}

export default function SearchFilterTabs({ active, onChange }: SearchFilterTabProps) {
  return (
    <div className="flex items-center gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          isActive={filter.value === active}
          variant="primary"
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}