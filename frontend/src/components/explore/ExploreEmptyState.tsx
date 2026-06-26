import { EmptyState } from '@/components/shared/EmptyState'

export function ExploreEmptyState() {
  return (
    <EmptyState
      variant="search"
      title="No manhwa found"
      description="Try adjusting your search, genre chips, or sidebar filters to discover more titles."
    />
  )
}
