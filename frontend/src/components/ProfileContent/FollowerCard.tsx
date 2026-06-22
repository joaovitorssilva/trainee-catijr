import UserAvatar2 from "@/assets/user-avatar-2.png"

interface FollowerCardProps {
  name: string
}

export default function FollowerCard({ name }: FollowerCardProps) {
  return (
    <div className="flex flex-col justify-cener gap-2">
      <div className="w-15 h-15 md:w-33 md:h-33">
        <img
          src={UserAvatar2}
          alt="Profile Image"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-white text-12-medium truncate max-w-15 md:max-w-[132px]">
          {name}
        </span>
        <span className="hidden md:block text-subdued text-10-medium">
          Perfil
        </span>
      </div>
    </div>
  )
}