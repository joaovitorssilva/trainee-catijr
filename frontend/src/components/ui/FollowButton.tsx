interface FollowButtonProps {
  isFollowing?: boolean
  onToggle: (following: boolean) => void
}

export default function FollowButton({ isFollowing = false, onToggle }: FollowButtonProps) {

  const handleClick = () => {
    onToggle?.(!isFollowing);
  }

  const label = !isFollowing ? "Seguir" : "Seguindo"

  return (
    <button
      onClick={handleClick}
      className="rounded-full text-white text-10-medium font-bold px-3 py-1.5 border border-essential-subdued hover:border-white hover:border-2 transition-all duration-150 cursor-pointer"
    >
      {label}
    </button>
  )

}