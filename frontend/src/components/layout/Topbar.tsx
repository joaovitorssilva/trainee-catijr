import { useNavigate } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";
import SpotifyLogo from "@/assets/spotify-logo.svg";
import HomeIcon from "@/assets/icons/home-icon.svg";
import BellIcon from "@/assets/icons/bell-icon.svg";
import DownloadIcon from "@/assets/icons/download-icon.svg"
import UserAvatar from "@/assets/user-avatar.png"

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between gap-2 p-3 sticky top-0 z-50">
      <img src={SpotifyLogo} alt="Spotify" className="hidden md:block h-7 w-7" />

      <div className="flex flex-1 items-center md:justify-center gap-1">
        <Button
          variant="icon"
          size="md"
          onClick={() => navigate("/")}
          className="w-9 h-9 rounded-full bg-bg-highlight cursor-pointer">
          <img
            src={HomeIcon}
            alt="Home Icon"
            className="w-4 h-4" />
        </Button>
        <SearchBar />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden md:flex gap-1.5">
          <img
            src={DownloadIcon}
            alt="Download Icon"
          />
          <span className="text-subdued text-10-bold">
            Instalar Aplicativo
          </span>
        </div>

        <div className="hidden md:block">
          <Button variant="icon" size="sm">
            <img src={BellIcon} alt="Notifications" />
          </Button>
        </div>

        <Button variant="icon" size="sm" onClick={() => navigate("/profile")}>
          <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden  bg-bg-highlight cursor-pointer border-4 border-bg-highlight">
            <img
              src={UserAvatar}
              alt="Profile Image"
            />
          </div>
        </Button>
      </div>
    </header>
  );
}
