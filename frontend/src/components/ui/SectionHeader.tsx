interface SectionHeaderProps {
  title: string
  className?: string
}

export default function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className ?? ""}`}>
      <span className="text-white text-12-bold md:text-16-bold">
        {title}
      </span>
    </div>
  )
}
