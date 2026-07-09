import { Outlet } from "react-router-dom";
import PlayerBar from "./PlayerBar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { PlayerProvider } from "@/context/PlayerContext";
import { MenuProvider } from "@/context/useMenuContext";
import OptionsMenuRenderer from "../OptionsMenuContent/OptionsMenuRenderer";

export default function App() {
  return (
    <PlayerProvider>
      <MenuProvider>
        <div className="h-screen bg-bg flex flex-col overflow-hidden">
          <Topbar />
          <div className="flex-1 grid grid-cols-[auto_1fr_auto] gap-2 p-2 overflow-hidden min-h-0">
            <Sidebar />
            <div className="flex flex-col overflow-y-auto min-h-0 min-w-0 flex-1">
              <Outlet />
            </div>
          </div>
          <PlayerBar />
        </div>

        <OptionsMenuRenderer/>
      </MenuProvider>
    </PlayerProvider>
  );
}