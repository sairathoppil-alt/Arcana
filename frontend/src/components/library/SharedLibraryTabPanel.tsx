import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getTabCounts } from '@/api/libraries'
import { LibraryEmptyState } from '@/components/library/LibraryEmptyState'
import { LibraryToolbar, type LibraryViewMode } from '@/components/library/LibraryToolbar'
import { ManhwaGridCard } from '@/components/library/ManhwaGridCard'
import { ManhwaTableView } from '@/components/library/ManhwaTableView'
import type { LibraryEntry, LibraryFilterTab } from '@/types/manhwa'

interface SharedLibraryTabPanelProps {
  entries: LibraryEntry[]
}

export function SharedLibraryTabPanel({ entries }: SharedLibraryTabPanelProps) {
  const [activeTab, setActiveTab] = useState<LibraryFilterTab>('all')
  const [viewMode, setViewMode] = useState<LibraryViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const tabCounts = useMemo(() => getTabCounts(entries), [entries])

  const filteredEntries = useMemo(() => {
    let results = entries

    if (activeTab !== 'all') {
      results = results.filter((entry) => entry.status === activeTab)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (entry) =>
          entry.title.toLowerCase().includes(query) ||
          entry.tropes.some((trope) => trope.toLowerCase().includes(query)),
      )
    }

    return results
  }, [entries, activeTab, searchQuery])

  const isEmptyLibrary = entries.length === 0
  const isEmptyFilter = !isEmptyLibrary && filteredEntries.length === 0

  if (isEmptyLibrary) {
    return <LibraryEmptyState />
  }

  return (
    <div className="space-y-6">
      <LibraryToolbar
        activeTab={activeTab}
        tabCounts={tabCounts}
        viewMode={viewMode}
        searchQuery={searchQuery}
        onTabChange={setActiveTab}
        onViewModeChange={setViewMode}
        onSearchChange={setSearchQuery}
        tabUnderlineId="shared-filter-tab-underline"
      />

      {isEmptyFilter ? (
        <LibraryEmptyState
          title="No manhwa found"
          description="Try adjusting your search or filter to find what you're looking for."
        />
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6"
            >
              {filteredEntries.map((entry, index) => (
                <ManhwaGridCard key={entry.id} entry={entry} index={index} />
              ))}
            </motion.div>
          ) : (
            <ManhwaTableView key="table" entries={filteredEntries} />
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
