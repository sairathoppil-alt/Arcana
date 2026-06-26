import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STATUS_LABELS, type ManhwaStatus } from '@/types/manhwa'
import type { ExploreFilters, PublicationStatus } from '@/types/explore'
import { exploreCatalog } from '@/data/mockExplore'
import { cn } from '@/utils/cn'

interface ExploreFiltersPanelProps {
  filters: ExploreFilters
  onChange: (filters: ExploreFilters) => void
  className?: string
}

const allGenres = [...new Set(exploreCatalog.flatMap((m) => m.genres))].sort()
const allYears = [...new Set(exploreCatalog.map((m) => m.publicationYear))].sort((a, b) => b - a)
const statusOptions: ManhwaStatus[] = ['reading', 'completed', 'on-hold', 'dropped', 'wishlist']
const publicationOptions: PublicationStatus[] = ['ongoing', 'completed']

function FilterGroup({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="border-b border-border/60 pb-4 last:border-b-0 last:pb-0">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-border accent-accent"
      />
      <span>{label}</span>
    </label>
  )
}

export function ExploreFiltersPanel({ filters, onChange, className }: ExploreFiltersPanelProps) {
  const toggleArray = <T,>(arr: T[], value: T): T[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={cn(
        'dashboard-card sticky top-6 space-y-4 rounded-[var(--radius-lg)] border p-5',
        className,
      )}
    >
      <h2 className="font-display text-base font-semibold text-foreground">Filters</h2>

      <FilterGroup title="Genres">
        {allGenres.map((genre) => (
          <CheckboxItem
            key={genre}
            label={genre}
            checked={filters.genres.includes(genre)}
            onChange={() =>
              onChange({ ...filters, genres: toggleArray(filters.genres, genre) })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Status">
        {statusOptions.map((status) => (
          <CheckboxItem
            key={status}
            label={STATUS_LABELS[status]}
            checked={filters.statuses.includes(status)}
            onChange={() =>
              onChange({ ...filters, statuses: toggleArray(filters.statuses, status) })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Rating">
        {[4, 3, 2, 1].map((rating) => (
          <CheckboxItem
            key={rating}
            label={`${rating}+ stars`}
            checked={filters.minRating === rating}
            onChange={() =>
              onChange({
                ...filters,
                minRating: filters.minRating === rating ? 0 : rating,
              })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Publication">
        <div className="max-h-32 space-y-2 overflow-y-auto scrollbar-hide">
          {allYears.map((year) => (
            <CheckboxItem
              key={year}
              label={String(year)}
              checked={filters.publicationYears.includes(year)}
              onChange={() =>
                onChange({
                  ...filters,
                  publicationYears: toggleArray(filters.publicationYears, year),
                })
              }
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Completed / Ongoing">
        {publicationOptions.map((status) => (
          <CheckboxItem
            key={status}
            label={status === 'completed' ? 'Completed' : 'Ongoing'}
            checked={filters.publicationStatus.includes(status)}
            onChange={() =>
              onChange({
                ...filters,
                publicationStatus: toggleArray(filters.publicationStatus, status),
              })
            }
          />
        ))}
      </FilterGroup>

      <AnimatePresence>
        {(filters.genres.length > 0 ||
          filters.statuses.length > 0 ||
          filters.minRating > 0 ||
          filters.publicationYears.length > 0 ||
          filters.publicationStatus.length > 0) && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
            onClick={() =>
              onChange({
                genres: [],
                statuses: [],
                minRating: 0,
                publicationYears: [],
                publicationStatus: [],
              })
            }
            className="w-full rounded-[var(--radius-md)] border border-border py-2 text-sm text-muted transition-colors hover:bg-secondary/50 hover:text-foreground"
          >
            Clear all filters
          </motion.button>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}
