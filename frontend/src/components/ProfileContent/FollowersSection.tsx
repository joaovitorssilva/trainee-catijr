import { useEffect, useState } from "react";
import FollowerCard from "./FollowerCard";
import { getUserFollowers } from "@/services/api";

interface FollowersSectionProps {
  showAll?: boolean
  visibleCount?: number
}

export default function FollowersSection({ showAll, visibleCount = 4 }: FollowersSectionProps) {
  const [followers, setFollowers] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    getUserFollowers().then(setFollowers)
  }, [])

  const displayedFollowers = showAll && !isExpanded
    ? followers.slice(0, visibleCount)
    : followers

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-white text-12-bold md:text-16-bold">
          Seguidores
        </span>
        {showAll && followers.length > visibleCount && (
          <span
            className="text-subdued text-10-bold hover:text-white transition-colors duration-150 cursor-pointer"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "Mostrar Menos" : "Mostrar Tudo"}
          </span>
        )}

      </div>
      <section className={showAll && isExpanded ? "grid grid-cols-3 md:grid-cols-5 gap-3" : "flex gap-3 overflow-hidden"}>
        {displayedFollowers.map((f, i) => (
          <FollowerCard
            key={i}
            name={f}
          />
        ))}
      </section>
    </section>
  )
}