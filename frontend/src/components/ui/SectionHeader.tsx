interface SectionHeaderProps {
  title: string
  showAllLabel?: string
  className?: string
}

export default function SectionHeader({ title, showAllLabel = "Mostrar tudo", className }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className ?? ""}`}>
      <span className="text-white text-12-bold md:text-16-bold">
        {title}
      </span>
      <span className="text-subdued text-10-bold cursor-pointer">
        {showAllLabel}
      </span>
    </div>
  )
}
