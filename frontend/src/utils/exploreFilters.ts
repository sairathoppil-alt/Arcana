import type { ExploreFilters, ExploreManhwa, ExploreSort } from '@/types/explore'

export function filterExploreManhwa(
  catalog: ExploreManhwa[],
  options: {
    searchQuery: string
    activeGenre: string
    trendingOnly: boolean
    filters: ExploreFilters
    sort: ExploreSort
  },
): ExploreManhwa[] {
  let results = [...catalog]

  if (options.searchQuery.trim()) {
    const q = options.searchQuery.toLowerCase()
    results = results.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.genres.some((g) => g.toLowerCase().includes(q)),
    )
  }

  if (options.activeGenre !== 'All') {
    results = results.filter((m) => m.genres.includes(options.activeGenre))
  }

  if (options.trendingOnly) {
    results = results.filter((m) => m.isTrending)
  }

  if (options.filters.genres.length > 0) {
    results = results.filter((m) => options.filters.genres.some((g) => m.genres.includes(g)))
  }

  if (options.filters.statuses.length > 0) {
    results = results.filter((m) => options.filters.statuses.includes(m.status))
  }

  if (options.filters.minRating > 0) {
    results = results.filter((m) => m.rating >= options.filters.minRating)
  }

  if (options.filters.publicationYears.length > 0) {
    results = results.filter((m) => options.filters.publicationYears.includes(m.publicationYear))
  }

  if (options.filters.publicationStatus.length > 0) {
    results = results.filter((m) => options.filters.publicationStatus.includes(m.publicationStatus))
  }

  switch (options.sort) {
    case 'rating':
      results.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      results.sort((a, b) => b.publicationYear - a.publicationYear)
      break
    case 'title':
      results.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'trending':
    default:
      results.sort((a, b) => Number(b.isTrending) - Number(a.isTrending) || b.rating - a.rating)
      break
  }

  return results
}

export function hasActiveExploreFilters(
  searchQuery: string,
  activeGenre: string,
  trendingOnly: boolean,
  filters: ExploreFilters,
): boolean {
  return (
    searchQuery.trim().length > 0 ||
    activeGenre !== 'All' ||
    trendingOnly ||
    filters.genres.length > 0 ||
    filters.statuses.length > 0 ||
    filters.minRating > 0 ||
    filters.publicationYears.length > 0 ||
    filters.publicationStatus.length > 0
  )
}
