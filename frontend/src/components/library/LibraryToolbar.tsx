import { motion } from 'framer-motion'
import {
  FilterIcon,
  GridViewIcon,
  SortIcon,
  TableViewIcon,
} from '@/components/icons'
import { SearchInput } from '@/components/ui/SearchInput'
import { FILTER_TABS, type LibraryFilterTab } from '@/types/manhwa'
import { cn } from '@/utils/cn'

export type LibraryViewMode = 'grid' | 'table'

interface LibraryToolbarProps {
  activeTab: LibraryFilterTab
  tabCounts: Record<LibraryFilterTab, number>
  viewMode: LibraryViewMode
  searchQuery: string
  onTabChange: (tab: LibraryFilterTab) => void
  onViewModeChange: (mode: LibraryViewMode) => void
  onSearchChange: (query: string) => void
  tabUnderlineId?: string
}

export function LibraryToolbar({
  activeTab,
  tabCounts,
  viewMode,
  searchQuery,
  onTabChange,
  onViewModeChange,
  onSearchChange,
  tabUnderlineId = 'library-tab-underline',
}: LibraryToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
      className="space-y-4"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="flex gap-1 overflow-x-auto border-b border-border pb-px scrollbar-hide"
          role="tablist"
          aria-label="Library filters"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id
            const count = tabCounts[tab.id]

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'relative shrink-0 px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'text-foreground' : 'text-muted hover:text-foreground',
                )}
              >
                {tab.label}
                <span className="ml-1 text-xs text-muted">({count})</span>
                {isActive ? (
                  <motion.span
                    layoutId={tabUnderlineId}
                    className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            inputSize="sm"
            label="Search library"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="min-w-0 flex-1 sm:w-48 sm:flex-none"
          />

          <ToolbarIconButton label="Filter options" icon={FilterIcon} disabled />
          <ToolbarIconButton label="Sort options" icon={SortIcon} disabled />
          <ToolbarIconButton
            label="Grid view"
            icon={GridViewIcon}
            active={viewMode === 'grid'}
            onClick={() => onViewModeChange('grid')}
          />
          <ToolbarIconButton
            label="Table view"
            icon={TableViewIcon}
            active={viewMode === 'table'}
            onClick={() => onViewModeChange('table')}
          />
        </div>
      </div>
    </motion.div>
  )
}

function ToolbarIconButton({
  label,
  icon: Icon,
  active = false,
  disabled = false,
  onClick,
}: {
  label: string
  icon: typeof FilterIcon
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={onClick ? active : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border transition-colors',
        active
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-border bg-card text-muted hover:bg-secondary/70 hover:text-foreground dark:bg-secondary/40',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}
