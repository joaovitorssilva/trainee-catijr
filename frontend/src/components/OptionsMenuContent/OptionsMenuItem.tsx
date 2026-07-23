
interface OptionsMenuItemProps {
  label: string
  icon?: string
  rightIcon?: string
  onClick?: () => void
  isActive?: boolean
}

export default function OptionsMenuItem({ onClick, label, icon, rightIcon, isActive }: OptionsMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between gap-2.5 px-3 py-2 rounded-sm hover:bg-bg-highlight w-full cursor-pointer outline-none ${isActive ? "bg-bg-highlight" : ""}`}
    >
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="w-4 h-4 flex items-center justify-center shrink-0">
            <img
              src={icon}
              className="text-subdued w-3.5 h-3.5"
            />
          </span>
        )}
        <span className="text-subdued text-10-medium">
          {label}
        </span>
      </div>
      {rightIcon && (
        <span className="flex items-center justify-center shrink-0">
          <img
            src={rightIcon}
            className="text-subdued w-2 h-3. 5"
          />
        </span>
      )}
    </button>
  )
}