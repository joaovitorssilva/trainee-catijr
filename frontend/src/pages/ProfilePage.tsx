import { useEffect, useState } from "react";
import { getUserFollowers } from "@/api";
import ProfileHeader from "@/components/ProfileContent/ProfileHeader";
import TopArtists from "@/components/ProfileContent/TopArtists";
// import TopTracks from "@/components/ProfileContent/TopTracks";

export default function ProfilePage() {
  const [user, setUser] = useState<string[]>([])

  useEffect(() => {
    getUserFollowers().then(setUser)
  }, [])

  return (
    <div className="flex flex-col gap-3 bg-home-bg-gradient-variant pb-10 rounded-lg ">
      <ProfileHeader
        followers={String(user.length)}
      />
      <div className="flex flex-col gap-6 px-4">
        <TopArtists />
        {/* <TopTracks /> */}
      </div>
    </div>
  )
}