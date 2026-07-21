import { useEffect, useState } from "react";
import { getUserFollowers } from "@/api";
import FollowerCard from "./FollowerCard";

export default function FollowersSection() {
  const [followers, setFollowers] = useState<string[]>([])

  useEffect(() => {
    getUserFollowers().then(setFollowers)
  }, [])

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-white text-12-bold md:text-16-bold">
          Seguidores
        </span>
      </div>
      <section className="flex gap-3">
        {followers.map((f, i) => (
          <FollowerCard
            key={i}
            name={f}
          />
        ))}
      </section>
    </section>
  )
}