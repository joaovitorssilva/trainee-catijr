import SkeletonBlock from "./SkeletonBlock"

export default function SkeletonRow() {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <SkeletonBlock className="w-9 h-9 shrink-0 rounded-xs" />
      <div className="flex flex-col gap-1 flex-1">
        <SkeletonBlock className="h-3 w-3/4" />
        <SkeletonBlock className="h-2 w-1/2" />
      </div>
    </div>
  )
}
