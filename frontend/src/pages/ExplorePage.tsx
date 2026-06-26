import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ExploreEmptyState } from '@/components/explore/ExploreEmptyState'
import { ExploreFiltersPanel } from '@/components/explore/ExploreFiltersPanel'
import { ExplorePosterCard } from '@/components/explore/ExplorePosterCard'
import { ExploreSection } from '@/components/explore/ExploreSection'
import { ExploreSkeletonGrid } from '@/components/explore/ExploreSkeleton'
import { ExploreToolbar } from '@/components/explore/ExploreToolbar'
import { PageContainer } from '@/components/ui/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader'
import { exploreCatalog, getExploreManhwaBySection } from '@/data/mockExplore'
import {
  DEFAULT_EXPLORE_FILTERS,
  EXPLORE_SECTIONS,
  type ExploreSort,
} from '@/types/explore'
import { filterExploreManhwa, hasActiveExploreFilters } from '@/utils/exploreFilters'

const PAGE_SIZE = 6

export function ExplorePage() {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') ?? '')
  const [activeGenre, setActiveGenre] = useState('All')
  const [sort, setSort] = useState<ExploreSort>('trending')
  const [trendingOnly, setTrendingOnly] = useState(false)
  const [filters, setFilters] = useState(DEFAULT_EXPLORE_FILTERS)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const isFiltered = hasActiveExploreFilters(searchQuery, activeGenre, trendingOnly, filters)

  const filteredResults = useMemo(
    () =>
      filterExploreManhwa(exploreCatalog, {
        searchQuery,
        activeGenre,
        trendingOnly,
        filters,
        sort,
      }),
    [searchQuery, activeGenre, trendingOnly, filters, sort],
  )

  const visibleResults = filteredResults.slice(0, visibleCount)
  const hasMore = visibleCount < filteredResults.length

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [searchQuery, activeGenre, trendingOnly, filters, sort])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [searchQuery, activeGenre, trendingOnly, filters, sort])

  const handleAddToLibrary = useCallback((id: string) => {
    setAddedIds((prev) => new Set(prev).add(id))
  }, [])

  useEffect(() => {
    if (!isFiltered || !hasMore) return

    const node = loadMoreRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true)
          setTimeout(() => {
            setVisibleCount((c) => c + PAGE_SIZE)
            setIsLoadingMore(false)
          }, 600)
        }
      },
      { rootMargin: '120px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [isFiltered, hasMore, isLoadingMore, visibleCount])

  return (
    <PageContainer width="xl" className="space-y-8">
      <PageHeader title="Explore" description="Discover your next obsession." />

      <ExploreToolbar
        searchQuery={searchQuery}
        activeGenre={activeGenre}
        sort={sort}
        trendingOnly={trendingOnly}
        onSearchChange={setSearchQuery}
        onGenreChange={setActiveGenre}
        onSortChange={setSort}
        onTrendingToggle={() => setTrendingOnly((v) => !v)}
      />

      <details className="dashboard-card rounded-[var(--radius-lg)] border p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-medium text-foreground">Filters</summary>
        <div className="mt-4">
          <ExploreFiltersPanel
            filters={filters}
            onChange={setFilters}
            className="!border-0 !p-0 !shadow-none"
          />
        </div>
      </details>

      <div className="flex flex-col gap-8 lg:flex-row">
        <ExploreFiltersPanel
          filters={filters}
          onChange={setFilters}
          className="hidden w-full shrink-0 lg:block lg:w-64 xl:w-72"
        />

        <div className="min-w-0 flex-1 space-y-10">
          {isLoading ? (
            <ExploreSkeletonGrid count={6} />
          ) : isFiltered ? (
            <>
              {filteredResults.length === 0 ? (
                <ExploreEmptyState />
              ) : (
                <>
                  <motion.p
                    key={filteredResults.length}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-muted"
                  >
                    {filteredResults.length} result{filteredResults.length === 1 ? '' : 's'}
                  </motion.p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                      {visibleResults.map((manhwa, index) => (
                        <ExplorePosterCard
                          key={manhwa.id}
                          manhwa={manhwa}
                          index={index}
                          added={addedIds.has(manhwa.id)}
                          onAddToLibrary={handleAddToLibrary}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  {hasMore ? (
                    <div ref={loadMoreRef} className="py-4">
                      {isLoadingMore ? <ExploreSkeletonGrid count={3} /> : null}
                    </div>
                  ) : null}
                </>
              )}
            </>
          ) : (
            EXPLORE_SECTIONS.map((section, index) => (
              <ExploreSection
                key={section.id}
                title={section.title}
                items={getExploreManhwaBySection(section.id)}
                addedIds={addedIds}
                onAddToLibrary={handleAddToLibrary}
                delay={index * 0.06}
              />
            ))
          )}
        </div>
      </div>
    </PageContainer>
  )
}
