import type { ManhwaStatus } from '@/types/manhwa'

export type ExploreSectionId =
  | 'trending'
  | 'recent'
  | 'rated'
  | 'new'
  | 'gems'
  | 'recommended'

export type PublicationStatus = 'ongoing' | 'completed'

export type ExploreSort = 'trending' | 'rating' | 'newest' | 'title'

export interface ExploreManhwa {
  id: string
  title: string
  description: string
  rating: number
  genres: string[]
  status: ManhwaStatus
  publicationStatus: PublicationStatus
  publicationYear: number
  coverFrom: string
  coverTo: string
  coverAccent?: string
  sections: ExploreSectionId[]
  isTrending: boolean
}

export const EXPLORE_SECTIONS: { id: ExploreSectionId; title: string }[] = [
  { id: 'trending', title: 'Trending This Week' },
  { id: 'recent', title: 'Recently Updated' },
  { id: 'rated', title: 'Highest Rated' },
  { id: 'new', title: 'New Releases' },
  { id: 'gems', title: 'Hidden Gems' },
  { id: 'recommended', title: 'Recommended For You' },
]

export const GENRE_CHIPS = [
  'All',
  'Villainess',
  'Romance',
  'Fantasy',
  'Action',
  'Isekai',
  'Drama',
  'Comedy',
] as const

export const SORT_OPTIONS: { value: ExploreSort; label: string }[] = [
  { value: 'trending', label: 'Trending' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'title', label: 'Title A–Z' },
]

export interface ExploreFilters {
  genres: string[]
  statuses: ManhwaStatus[]
  minRating: number
  publicationYears: number[]
  publicationStatus: PublicationStatus[]
}

export const DEFAULT_EXPLORE_FILTERS: ExploreFilters = {
  genres: [],
  statuses: [],
  minRating: 0,
  publicationYears: [],
  publicationStatus: [],
}
