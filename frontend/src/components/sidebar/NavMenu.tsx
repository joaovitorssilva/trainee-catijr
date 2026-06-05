import Button from "../ui/Button";

export function NavMenu() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-white text-xs font-bold transition-opacity duration-300">
          Sua Biblioteca
        </span>
        <Button variant="outline" >Criar Playlist</Button>
      </div>

      {/* <nav className="flex gap-2.5">
        <Button variant="primary" size="md" isActive={true}>Tudo</Button>
        <Button variant="primary" size="md">Playlists</Button>
        <Button variant="primary" size="md">Albuns</Button>
        <Button variant="primary" size="md">Artistas</Button>
      </nav> */}
    </div>
  )
}