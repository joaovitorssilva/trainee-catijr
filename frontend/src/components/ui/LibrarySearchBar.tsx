import { useRef } from "react"
import SearchIcon from "@/assets/icons/search-icon.svg"

export default function LibrarySearchBar() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center px-2 py-1 gap-2 rounded-xs bg-bg-elements" >
      <div className="w-2.5 h-2.5">
        <img src={SearchIcon} />
      </div>

      <input
        ref={inputRef}
        type="search"
        placeholder="Buscar em Sua Biblioteca"
        className="text-subdued text-10-medium font-normal border-none outline-none"
      />
    </div>
  )
}