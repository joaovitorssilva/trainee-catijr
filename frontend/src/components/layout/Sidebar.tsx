import { useEffect, useState } from "react"
import { getUserPlaylists } from "../../services/api"

import { LibraryItem } from "../sidebar/LibraryItem";
import { NavMenu } from "../sidebar/NavMenu";
import type { PlaylistNoMusicDTO } from "../../services/types"

export default function Sidebar() {
  const [playlists, setPlaylists] = useState<PlaylistNoMusicDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserPlaylists()
      .then(setPlaylists)
      .finally(() => setLoading(false))
  }, [])

  return (
    <aside className="h-full w-72 bg-bg-base flex flex-col p-4 shrink-0 rounded-lg">
      <div className="hidden md:flex md:flex-col">
        <NavMenu/>
      </div>

    
      {loading ? (
        <p className="text-white/50 text-xs mt-4">carregando...</p>
      ) : (
        <div className="mt-4 space-y-1">
          {playlists.map((p) => (
            <LibraryItem key={p.id} id={p.id} name={p.name} isActive={false} />
          ))}
        </div>
      )}
    </aside>
  )
}

