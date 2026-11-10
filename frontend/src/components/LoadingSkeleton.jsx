export function LoadingSkeleton({ className = '' }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-xl bg-line/70 dark:bg-white/10 ${className}`} />
}

export function StatSkeleton() {
  return (
    <div className="rounded-2xl border border-line bg-panel p-5">
      <LoadingSkeleton className="h-3 w-28" />
      <LoadingSkeleton className="mt-5 h-8 w-36" />
      <LoadingSkeleton className="mt-4 h-3 w-32" />
    </div>
  )
}
