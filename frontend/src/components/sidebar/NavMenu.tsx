import Button from "../ui/Button";
import LibrarySearchBar from "../ui/LibrarySearchBar";

interface NavMenuProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function NavMenu({ activeFilter, onFilterChange }: NavMenuProps) {
  const filters = ["Tudo", "Playlists", "Albuns", "Artistas"]

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex items-center justify-between ">
        <span className="text-white text-xs font-bold transition duration-150">
          Sua Biblioteca
        </span>
        <Button variant="outline" size="sm">Criar Playlist</Button>
      </div>

      <nav className="flex gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant="primary"
            size="md"
            isActive={activeFilter === filter}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </Button>
        ))}
      </nav>

      <LibrarySearchBar/>

    </div>
  )
}