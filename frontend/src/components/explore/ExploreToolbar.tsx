import { motion } from 'framer-motion'
import { GENRE_CHIPS, SORT_OPTIONS, type ExploreSort } from '@/types/explore'
import { SearchInput } from '@/components/ui/SearchInput'
import { cn } from '@/utils/cn'

interface ExploreToolbarProps {
  searchQuery: string
  activeGenre: string
  sort: ExploreSort
  trendingOnly: boolean
  onSearchChange: (query: string) => void
  onGenreChange: (genre: string) => void
  onSortChange: (sort: ExploreSort) => void
  onTrendingToggle: () => void
}

export function ExploreToolbar({
  searchQuery,
  activeGenre,
  sort,
  trendingOnly,
  onSearchChange,
  onGenreChange,
  onSortChange,
  onTrendingToggle,
}: ExploreToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-4"
    >
      <SearchInput
        inputSize="lg"
        label="Discover manhwa"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Discover manhwa, genres, and hidden gems..."
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" role="tablist" aria-label="Genre filters">
          {GENRE_CHIPS.map((genre) => {
            const isActive = activeGenre === genre
            return (
              <motion.button
                key={genre}
                type="button"
                role="tab"
                aria-selected={isActive}
                whileTap={{ scale: 0.96 }}
                onClick={() => onGenreChange(genre)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-white dark:text-[var(--accent-foreground)]'
                    : 'border border-border bg-card text-muted hover:text-foreground dark:bg-secondary/40',
                )}
              >
                {genre}
              </motion.button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onTrendingToggle}
            aria-pressed={trendingOnly}
            className={cn(
              'inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] border px-4 text-sm font-medium transition-colors',
              trendingOnly
                ? 'border-[var(--gold)]/50 bg-[var(--gold)]/15 text-[var(--gold)]'
                : 'border-border bg-card text-muted hover:text-foreground dark:bg-secondary/40',
            )}
          >
            <span aria-hidden="true">🔥</span>
            Trending
          </button>

          <label className="sr-only" htmlFor="explore-sort">
            Sort by
          </label>
          <select
            id="explore-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as ExploreSort)}
            className={cn(
              'h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-sm text-foreground',
              'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25',
              'dark:bg-secondary/40 dark:backdrop-blur-sm',
            )}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  )
}
