
export default function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={`bg-linear-loading rounded-md animate-pulse ${className}`} />
  )
}
