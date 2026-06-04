import { useNavigate } from "react-router-dom";

import SpotifyLogo from "../../assets/spotify-logo.svg";
import HomeIcon from "../../assets/icons/home-icon.svg";
import BellIcon from "../../assets/icons/bell-icon.svg";
import SearchBar from "../ui/SearchBar";
import { User } from "lucide-react";

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 flex items-center gap-2 px-4 py-3 select-none z-50">
      <img src={SpotifyLogo} alt="Spotify" className="h-7 w-7" />

      <div className="flex flex-1 items-center justify-center gap-2 min-w-0">
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-bg-highlight border-none cursor-pointer">
          <img src={HomeIcon} alt="Home" className="w-4 h-4" />
        </button>

        <SearchBar />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-bg-highlight transition ease-out duration-300 cursor-pointer"
        >
          <img src={BellIcon} alt="Notifications" />
        </button>

        <button
          className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden cursor-pointer"
        >
          <span className="flex items-center justify-center w-full h-full text-[13px] font-bold bg-bg-highlight">
            <User className="text-subdued w-4 h-4" />
          </span>
        </button>
      </div>
    </header>
  );
}
