import { useRef } from "react";
import SearchIcon from "@/assets/icons/search-icon.svg"

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center md:w-full max-w-[355px] h-9 p-3.5 gap-2 rounded-full bg-bg-highlight" >
      <img
        src={SearchIcon}
        alt="Search Icon"
      />
      <div className="hidden md:block">
        <input
          ref={inputRef}
          type="search"
          placeholder="O que você quer ouvir?"
          className="text-subdued text-sm border-none outline-none"
        />
      </div>
    </div>
  )
}


