import { useState } from "react"
import type { CreditContributor } from "@/types/credits.types"
import FollowButton from "../ui/FollowButton"

export default function CreditRow({ contributor }: { contributor: CreditContributor }) {
  const [isFollowing, setIsFollowing] = useState(contributor.isFollowing ?? false)

  return (
    <div className="flex items-center justify-between py-1 rounded-sm hover:bg-textbox-bg hover:ring-8 ring-textbox-bg">
      <div className="flex flex-col gap-1">
        <span className="text-white text-12-medium">
          {contributor.name}
        </span>
        {contributor.roles.length > 0 && (
          <span className="text-subdued text-10-medium">
            {contributor.roles.join(" • ")}
          </span>
        )}
      </div>
      {contributor.isArtist && (
        <FollowButton
          isFollowing={isFollowing}
          onToggle={setIsFollowing}
        />
      )}
    </div>
  )
}