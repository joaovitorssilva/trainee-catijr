
interface OptionsMenuItemProps {
  label: string
  icon: string
  onClick?: () => void
}

export default function OptionsMenuItem({ onClick, label, icon }: OptionsMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 px-3 py-2 rounded-sm hover:bg-bg-highlight w-full cursor-pointer"
    >
      <span className="w-4 h-4 flex items-center justify-center shrink-0">
        <img src={icon} className="text-subdued w-3.5 h-3.5" />
      </span>
      <span className="text-subdued text-10-medium">{label}</span>
    </button>
  )
}