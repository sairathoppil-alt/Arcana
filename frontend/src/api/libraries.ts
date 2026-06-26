import { apiClient } from '@/api/axios'
import type { LibraryEntry, LibrarySummary, PersonalLibrary } from '@/types/manhwa'

interface BackendLibrary {
  id: number
  owner_id: number
  name: string
  description: string | null
  cover_image: string | null
  visibility: string
  created_at: string
  updated_at: string
}

interface BackendLibraryItem {
  id: number
  library_id: number
  title: string
  poster_url: string | null
  author: string | null
  artist: string | null
  status: string
  current_chapter: number | null
  total_chapters: number | null
  rating: number | null
  favorite: boolean
  reading_state: string | null
  tropes: string | null
  notes: string | null
  genres: string[]
  tags: string[]
  reading_links: Array<{ id: number; label: string; url: string }>
  date_added: string
  last_updated: string
}

const STATUS_MAP: Record<string, LibraryEntry['status']> = {
  Reading: 'reading',
  Completed: 'completed',
  'On Hold': 'on-hold',
  Dropped: 'dropped',
  'Plan To Read': 'wishlist',
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function hashString(value: string) {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }
  return Math.abs(hash)
}

function colorFromSeed(seed: string, offset = 0) {
  const hue = (hashString(seed) + offset) % 360
  return `hsl(${hue}, 56%, ${offset ? 58 : 42}%)`
}

function normalizeCoverColors(seed: string) {
  return {
    coverFrom: colorFromSeed(seed),
    coverTo: colorFromSeed(seed, 55),
    coverAccent: colorFromSeed(seed, 110),
  }
}

function formatRelativeTime(value?: string | null) {
  if (!value) {
    return 'Recently updated'
  }

  const delta = Date.now() - new Date(value).getTime()
  if (Number.isNaN(delta)) {
    return 'Recently updated'
  }

  const hours = Math.floor(delta / (1000 * 60 * 60))
  if (hours < 1) {
    return 'Just now'
  }
  if (hours < 24) {
    return `${hours}h ago`
  }

  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days}d ago`
  }

  const weeks = Math.floor(days / 7)
  return `${weeks}w ago`
}

function normalizeLibrary(library: BackendLibrary): PersonalLibrary {
  const seed = library.name || `library-${library.id}`
  return {
    id: String(library.id),
    name: library.name,
    description: library.description ?? 'A personal collection of manhwa.',
    entryCount: 0,
    ...normalizeCoverColors(seed),
  }
}

function normalizeLibrarySummary(library: BackendLibrary, entryCount: number): LibrarySummary {
  return {
    id: String(library.id),
    name: library.name,
    entryCount,
    lastUpdated: formatRelativeTime(library.updated_at),
    type: 'personal',
  }
}

function normalizeLibraryEntry(item: BackendLibraryItem): LibraryEntry {
  const status = STATUS_MAP[item.status] ?? 'wishlist'
  const chapter = item.current_chapter ?? 0
  const totalChapters = item.total_chapters ?? undefined
  const tropes = (item.tropes ?? '')
    .split(',')
    .map((trope) => trope.trim())
    .filter(Boolean)

  const seed = `${item.title}-${item.id}`
  return {
    id: String(item.id),
    title: item.title,
    chapter,
    totalChapters,
    ...normalizeCoverColors(seed),
    status,
    rating: item.rating ?? 0,
    tropes,
    lastUpdated: formatRelativeTime(item.last_updated),
  }
}

async function fetchBackendLibraries(): Promise<BackendLibrary[]> {
  const { data } = await apiClient.get<BackendLibrary[]>('/libraries')
  return data
}

async function fetchBackendLibraryItems(libraryId: string): Promise<BackendLibraryItem[]> {
  const { data } = await apiClient.get<BackendLibraryItem[]>(`/libraries/${libraryId}/items`)
  return data
}

export async function getPersonalLibraries(): Promise<PersonalLibrary[]> {
  const libraries = await fetchBackendLibraries()
  return libraries.map(normalizeLibrary)
}

export async function getPersonalLibrarySummaries(): Promise<LibrarySummary[]> {
  const libraries = await fetchBackendLibraries()

  const summaries = await Promise.all(
    libraries.map(async (library) => {
      try {
        const items = await fetchBackendLibraryItems(String(library.id))
        return normalizeLibrarySummary(library, items.length)
      } catch {
        return normalizeLibrarySummary(library, 0)
      }
    }),
  )

  return summaries
}

export async function getPersonalLibrary(id: string): Promise<PersonalLibrary | null> {
  const parsedId = Number(id)
  if (Number.isFinite(parsedId) && parsedId > 0) {
    try {
      const { data } = await apiClient.get<BackendLibrary>(`/libraries/${parsedId}`)
      return normalizeLibrary(data)
    } catch {
      return null
    }
  }

  const libraries = await getPersonalLibraries()
  const match = libraries.find((library) => slugify(library.name) === slugify(id))
  return match ?? libraries[0] ?? null
}

export async function getPersonalLibraryEntries(id: string): Promise<LibraryEntry[]> {
  const parsedId = Number(id)
  if (Number.isFinite(parsedId) && parsedId > 0) {
    try {
      const items = await fetchBackendLibraryItems(String(parsedId))
      return items.map(normalizeLibraryEntry)
    } catch {
      return []
    }
  }

  const libraries = await getPersonalLibraries()
  const match = libraries.find((library) => slugify(library.name) === slugify(id))
  if (!match) {
    return []
  }

  try {
    const items = await fetchBackendLibraryItems(match.id)
    return items.map(normalizeLibraryEntry)
  } catch {
    return []
  }
}

export function getTabCounts(entries: LibraryEntry[]) {
  return {
    all: entries.length,
    reading: entries.filter((entry) => entry.status === 'reading').length,
    completed: entries.filter((entry) => entry.status === 'completed').length,
    'on-hold': entries.filter((entry) => entry.status === 'on-hold').length,
    dropped: entries.filter((entry) => entry.status === 'dropped').length,
    wishlist: entries.filter((entry) => entry.status === 'wishlist').length,
  }
}
