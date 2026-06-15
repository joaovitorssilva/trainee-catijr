import { Outlet } from "react-router-dom";
import PlayerBar from "./components/layout/PlayerBar";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import { PlayerProvider } from "./context/PlayerContext";

export default function App() {
  return (
    <PlayerProvider>
      <div className="h-screen bg-bg flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 grid grid-cols-[auto_1fr_auto] gap-2 p-2 overflow-hidden min-h-0">
          <Sidebar />
          <div className="flex flex-col overflow-y-auto ">
            <Outlet />
          </div>
        </div>
        <PlayerBar />
      </div>
    </PlayerProvider>
  );
}