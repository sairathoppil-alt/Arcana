export interface Manhwa {
  id: string
  title: string
  chapter: number
  totalChapters?: number
  coverFrom: string
  coverTo: string
  coverAccent?: string
}

export type ManhwaStatus = 'reading' | 'completed' | 'on-hold' | 'dropped' | 'wishlist'

export type LibraryFilterTab = 'all' | ManhwaStatus

export interface LibraryEntry extends Manhwa {
  status: ManhwaStatus
  rating: number
  tropes: string[]
  lastUpdated: string
}

export interface PersonalLibrary {
  id: string
  name: string
  description: string
  entryCount: number
  coverFrom: string
  coverTo: string
  coverAccent?: string
}

export interface LibrarySummary {
  id: string
  name: string
  entryCount: number
  lastUpdated: string
  type: 'personal' | 'shared'
}

export const STATUS_LABELS: Record<ManhwaStatus, string> = {
  reading: 'Reading',
  completed: 'Completed',
  'on-hold': 'On Hold',
  dropped: 'Dropped',
  wishlist: 'Wishlist',
}

export const FILTER_TABS: { id: LibraryFilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'reading', label: 'Reading' },
  { id: 'completed', label: 'Completed' },
  { id: 'on-hold', label: 'On Hold' },
  { id: 'dropped', label: 'Dropped' },
  { id: 'wishlist', label: 'Wishlist' },
]
