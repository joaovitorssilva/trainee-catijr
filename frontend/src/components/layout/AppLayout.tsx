import RecentlyPlayed from "../media/RecentlyPlayed";
import Button from "../ui/Button";
import PlayerBar from "./PlayerBar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {

  return (
    <div className="h-screen bg-bg flex flex-col justify-between ">
      <Topbar />

      <div className="grid grid-cols-[auto_1fr_auto] gap-2  relative">
        <Sidebar />

        <main className="flex flex-col gap-8 p-6 overflow-y-auto bg-bg-highlight rounded-lg">
          <nav className="flex gap-2">
            <Button variant="primary" size="md" isActive={true}>Home</Button>
            <Button variant="primary" size="md">Music</Button>
            <Button variant="primary" size="md">Playlist</Button>
          </nav>
          <RecentlyPlayed/>

          <span className="text-base font-bold text-white">
            Suas Playlists
          </span>
        </main>

        <aside className="rounded-lg">
          <h1 className="text-white  p-2 bg-bg-base h-full">side</h1>
        </aside>
      </div>

      <PlayerBar />
    </div>
  )
}