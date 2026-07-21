import { useEffect, useState } from "react";
import { getUserFollowers, getUserPlaylists } from "@/api";
import ProfileHeader from "@/components/ProfileContent/ProfileHeader";
import TopArtists from "@/components/ProfileContent/TopArtists";
import FollowersSection from "@/components/ProfileContent/FollowersSection";
import TopTracks from "@/components/ProfileContent/TopTracks";
import PlaylistSection from "@/components/MainContent/PlaylistSection/PlaylistSection";
import type { PlaylistNoMusicDTO } from "@/types/index.types";

export default function ProfilePage() {
  const [user, setUser] = useState<string[]>([])
  const [playlists, setPlaylists] = useState<PlaylistNoMusicDTO[]>([])

  useEffect(() => {
    getUserFollowers().then(setUser)
    getUserPlaylists().then(setPlaylists)
  }, [])

  return (
    <div className="flex flex-col gap-8 bg-home-bg-gradient-variant pb-10 rounded-lg ">
      <ProfileHeader
        followers={String(user.length)}
        playlistCount={String(playlists.length)}
      />
      <div className="flex flex-col gap-6 px-2 md:px-4">
        <TopArtists />
        <TopTracks />
        <PlaylistSection/>
        <FollowersSection/>
      </div>
    </div>
  )
}