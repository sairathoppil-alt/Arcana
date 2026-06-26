import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { LibraryEmptyState } from '@/components/library/LibraryEmptyState'
import { LibraryHeader } from '@/components/library/LibraryHeader'
import { LibraryToolbar, type LibraryViewMode } from '@/components/library/LibraryToolbar'
import { ManhwaGridCard } from '@/components/library/ManhwaGridCard'
import { ManhwaTableView } from '@/components/library/ManhwaTableView'
import { PageContainer } from '@/components/ui/PageContainer'
import { getPersonalLibrary, getPersonalLibraryEntries, getTabCounts } from '@/api/libraries'
import type { LibraryEntry, LibraryFilterTab, PersonalLibrary } from '@/types/manhwa'

export function PersonalLibraryPage() {
  const { id = '1' } = useParams<{ id: string }>()
  const [library, setLibrary] = useState<PersonalLibrary | null>(null)
  const [allEntries, setAllEntries] = useState<LibraryEntry[]>([])
  const [loading, setLoading] = useState(true)

  const [activeTab, setActiveTab] = useState<LibraryFilterTab>('all')
  const [viewMode, setViewMode] = useState<LibraryViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        setLoading(true)
        const [libraryData, entries] = await Promise.all([getPersonalLibrary(id), getPersonalLibraryEntries(id)])
        if (!isMounted) return
        setLibrary(libraryData)
        setAllEntries(entries)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [id])

  const tabCounts = useMemo(() => getTabCounts(allEntries), [allEntries])

  const filteredEntries = useMemo(() => {
    let results = allEntries

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
  }, [allEntries, activeTab, searchQuery])

  const isEmptyLibrary = allEntries.length === 0
  const isEmptyFilter = !isEmptyLibrary && filteredEntries.length === 0

  const currentLibrary = library ?? {
    id,
    name: 'Your library',
    description: loading ? 'Loading library details…' : 'A personal collection of manhwa.',
    entryCount: allEntries.length,
    coverFrom: '#4a2c5c',
    coverTo: '#8b3a4a',
    coverAccent: '#d4af37',
  }

  if (loading && allEntries.length === 0 && !library) {
    return (
      <PageContainer width="xl" className="space-y-6">
        <LibraryHeader library={currentLibrary} />
        <div className="rounded-[var(--radius-lg)] border border-border bg-card/70 p-8 text-center text-sm text-muted">
          Loading your library…
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer width="xl" className="space-y-6">
      <LibraryHeader library={currentLibrary} />

      {!isEmptyLibrary ? (
        <LibraryToolbar
          activeTab={activeTab}
          tabCounts={tabCounts}
          viewMode={viewMode}
          searchQuery={searchQuery}
          onTabChange={setActiveTab}
          onViewModeChange={setViewMode}
          onSearchChange={setSearchQuery}
        />
      ) : null}

      {isEmptyLibrary ? (
        <LibraryEmptyState />
      ) : isEmptyFilter ? (
        <EmptyState
          variant="search"
          title="No manhwa found"
          description="Try adjusting your search or filter to find what you're looking for."
        />
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
    </PageContainer>
  )
}
