import { useRef } from "react";

import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center w-full max-w-[355px] h-9 px-3.5 gap-2 rounded-full bg-bg-highlight" >
      <SearchIcon className="text-subdued" />

      <input
        ref={inputRef}
        type="search"
        placeholder="O que você quer ouvir?"
        className="text-subdued text-sm border-none outline-none"
      />
    </div>
  )
}


