import SkeletonRow from "./SkeletonRow";

interface SearchSkeletonProps {
  rows: number
}

export default function SearchSkeleton({ rows }: SearchSkeletonProps) {
  return (
    <div className="flex flex-col py-2">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  )
}