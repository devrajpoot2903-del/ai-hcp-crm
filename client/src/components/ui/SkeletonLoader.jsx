/** Skeleton loading shapes */

export function SkeletonLine({ className = '' }) {
  return <div className={`skeleton h-4 rounded-md ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3">
      <SkeletonLine className="w-1/3 h-3" />
      <SkeletonLine className="w-2/3 h-8" />
      <SkeletonLine className="w-1/2 h-3" />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 border-b border-gray-100">
      <SkeletonLine className="w-24 h-3" />
      <SkeletonLine className="w-32 h-3" />
      <SkeletonLine className="w-20 h-3" />
      <SkeletonLine className="w-16 h-5 rounded-full" />
      <SkeletonLine className="w-20 h-5 rounded-full" />
      <SkeletonLine className="w-20 h-3 ml-auto" />
    </div>
  )
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200">
        {['w-24','w-32','w-20','w-16','w-20','w-20'].map((w, i) => (
          <SkeletonLine key={i} className={`${w} h-3`} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => <SkeletonRow key={i} />)}
    </div>
  )
}

export default SkeletonCard
