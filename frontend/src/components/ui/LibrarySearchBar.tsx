import SearchIcon from "@/assets/icons/search-icon.svg"
import XIcon from "@/assets/icons/x.svg"

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
        className="flex-1 text-subdued text-10-medium font-normal border-none outline-none"
      />

      {value && (
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => onChange("")}
          className="cursor-pointer outline-none"
        >
          <img
            src={XIcon}
            alt="Clear"
            className="w-2.5 h-2.5"
          />
        </button>
      )}
    </div>
  )
}
