import SearchIcon from "@/assets/icons/search-icon.svg"

interface LibrarySearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function LibrarySearchBar({ value, onChange }: LibrarySearchBarProps) {
  return (
    <div className="flex items-center px-2 py-1 gap-2 rounded-xs bg-bg-elements" >
      <div className="w-2.5 h-2.5">
        <img src={SearchIcon} />
      </div>

      <input
        type="text"
        placeholder="Buscar em Sua Biblioteca"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-subdued text-10-medium font-normal border-none outline-none"
      />
    </div>
  )
}
