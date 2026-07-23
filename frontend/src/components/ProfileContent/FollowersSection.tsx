import { useEffect, useState } from "react";
import { getUserFollowers } from "@/api";
import FollowerCard from "./FollowerCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Carousel from "@/components/ui/Carousel";

export default function FollowersSection() {
  const [followers, setFollowers] = useState<string[]>([])

  useEffect(() => {
    getUserFollowers().then(setFollowers)
  }, [])

  return (
    <section className="flex flex-col gap-2">
      <SectionHeader title="Seguidores" showAllLabel="Mostrar mais" />
      <Carousel>
        {followers.map((f, i) => (
          <FollowerCard
            key={i}
            name={f}
          />
        ))}
      </Carousel>
    </section>
  )
}