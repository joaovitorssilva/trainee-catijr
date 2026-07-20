import { useSearch } from "@/hooks/useSearch"
import SearchIcon from "@/assets/icons/search-icon.svg"
import XIcon from "@/assets/icons/x.svg"
import SearchDropdown from "../Search/SearchDropdown"

export default function SearchBar() {
  const {
    query,
    status,
    recentSearches,
    handleFocus,
    handleBlur,
    handleChange,
    handleKeyDown,
    handleSelectRecent,
    removeRecent,
    clearQuery,
  } = useSearch()

  return (
    <div className="relative flex items-center md:w-full max-w-[355px] h-9 p-3.5 gap-2 rounded-full bg-bg-highlight focus-within:ring-2 focus-within:ring-white">
      <img
        src={SearchIcon}
        alt="Search Icon"
      />
      <div className="hidden md:flex flex-1">
        <input
          type="text"
          value={query}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="O que você quer ouvir?"
          className="w-full text-subdued text-sm border-none outline-none bg-transparent"
        />
        {query && (
          <button
            onMouseDown={e => e.preventDefault}
            onClick={clearQuery}
          >
            <img src={XIcon} alt="Clear Query" />
          </button>
        )}
      </div>

      <SearchDropdown
        status={status}
        recentSearches={recentSearches}
        onRemoveRecent={removeRecent}
        onSelectRecent={handleSelectRecent}
      />
    </ div>
  )
}
