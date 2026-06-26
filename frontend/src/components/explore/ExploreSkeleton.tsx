import { cn } from '@/utils/cn'

export function ExploreCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'dashboard-card overflow-hidden rounded-[var(--radius-lg)] border animate-pulse',
        className,
      )}
    >
      <div className="aspect-[2/3] bg-secondary/80" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-secondary/80" />
        <div className="h-3 w-1/2 rounded bg-secondary/60" />
        <div className="flex gap-2">
          <div className="h-5 w-14 rounded-full bg-secondary/60" />
          <div className="h-5 w-14 rounded-full bg-secondary/60" />
        </div>
        <div className="h-8 w-full rounded bg-secondary/60" />
        <div className="h-9 w-full rounded-[var(--radius-md)] bg-secondary/80" />
      </div>
    </div>
  )
}

export function ExploreSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <ExploreCardSkeleton key={i} />
      ))}
    </div>
  )
}
