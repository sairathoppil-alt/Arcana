import { useEffect, useState } from 'react'
import { getPersonalLibraryEntries, getPersonalLibrarySummaries } from '@/api/libraries'
import { getSharedLibraries } from '@/api/sharedLibraries'
import type { LibraryEntry, LibrarySummary } from '@/types/manhwa'

export interface DashboardData {
  continueReading: LibraryEntry | null
  recentlyAdded: LibraryEntry[]
  recentlyUpdatedShared: LibraryEntry[]
  personalLibraries: LibrarySummary[]
  sharedLibraries: LibrarySummary[]
}

function createPlaceholderEntry(title: string, chapter: number, seed: string): LibraryEntry {
  const hue = title.length % 360
  return {
    id: seed,
    title,
    chapter,
    totalChapters: chapter + 20,
    coverFrom: `hsl(${hue}, 44%, 28%)`,
    coverTo: `hsl(${(hue + 60) % 360}, 38%, 46%)`,
    coverAccent: `hsl(${(hue + 120) % 360}, 62%, 64%)`,
    status: 'reading',
    rating: 4,
    tropes: ['Fantasy', 'Drama'],
    lastUpdated: 'Just now',
  }
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const [personalLibraries, sharedLibraryData] = await Promise.all([
          getPersonalLibrarySummaries(),
          getSharedLibraries(),
        ])

        const personalLibraryEntries = await Promise.all(
          personalLibraries.map(async (library) => {
            try {
              const entries = await getPersonalLibraryEntries(library.id)
              return entries
            } catch {
              return [] as LibraryEntry[]
            }
          }),
        )

        const allEntries = personalLibraryEntries.flat()
        const sortedEntries = [...allEntries].sort((a, b) => b.chapter - a.chapter)
        const continueReading = sortedEntries.find((entry) => entry.status === 'reading') ?? sortedEntries[0] ?? null
        const recentlyAdded = sortedEntries.slice(0, 6)

        const sharedLibraries: LibrarySummary[] = sharedLibraryData.map((library) => ({
          id: library.id,
          name: library.name,
          entryCount: 0,
          lastUpdated: 'Recently shared',
          type: 'shared',
        }))

        const recentlyUpdatedShared = sharedLibraries.length
          ? sharedLibraries.slice(0, 6).map((library, index) => createPlaceholderEntry(library.name, 1 + index, `shared-${library.id}`))
          : []

        if (!isMounted) {
          return
        }

        setData({
          continueReading,
          recentlyAdded,
          recentlyUpdatedShared,
          personalLibraries,
          sharedLibraries,
        })
      } catch (err) {
        if (!isMounted) {
          return
        }

        setError(err instanceof Error ? err.message : 'Unable to load dashboard data.')
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
  }, [])

  return { data, loading, error }
}
