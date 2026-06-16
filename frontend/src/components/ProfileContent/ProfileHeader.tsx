import UserAvatar from "@/assets/user-avatar.png"

interface ProfileHeaderProps {
  followers: string;
}

export default function ProfileHeader({ followers }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-3 bg-linear-to-b from-[#938D8E] to-[#3E3939] rounded-lg pl-5 pb-4 pt-10">
      <div className="w-[60px] h-[60px] md:w-[175px] md:h-[175px] rounded-full drop-shadow overflow-hidden shrink-0">
        <img
          src={UserAvatar}
          alt="User Profile Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 md:gap-2.5">
        <span className="text-white text-10-medium ">
          Perfil
        </span>
        <h1 className="text-white text-18-bold md:text-64-black ">
          João Vitor
        </h1>
        <div className="flex gap-1">
          <span className="text-subdued text-10-medium">
            8 playlists públicas
          </span>
          <span className="text-subdued text-10-medium">
            • {followers} seguidores
          </span>
          <span className="text-subdued text-10-medium">
            • 2 seguindo
          </span>
        </div>
      </div>
    </div>
  )
}