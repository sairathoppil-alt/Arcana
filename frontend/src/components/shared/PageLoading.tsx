export function PageLoading() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-pulse rounded-full border-2 border-accent/20" />
          <div className="absolute inset-1 animate-spin rounded-full border-2 border-transparent border-t-accent" />
        </div>
        <p className="text-sm text-muted">Loading...</p>
      </div>
    </div>
  )
}
