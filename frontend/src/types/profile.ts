import type { LibraryEntry } from '@/types/manhwa'

export interface ProfileUser {
  id: string
  username: string
  displayName: string
  bio: string
  joinDate: string
  avatarColor: string
}

export interface ReadingStats {
  booksRead: number
  currentlyReading: number
  completed: number
  dropped: number
  wishlist: number
  averageRating: number
  readingStreak: number
  favoriteGenre: string
}

export interface HeatmapDay {
  date: string
  chapters: number
}

export interface ProfileAchievement {
  id: string
  emoji: string
  title: string
  description: string
  earnedAt: string
  unlocked: boolean
}

export interface GenreTag {
  id: string
  label: string
  count: number
}

export type ProfileActivityType =
  | 'added'
  | 'finished-chapter'
  | 'created-library'
  | 'added-note'
  | 'completed'
  | 'rated'

export interface ProfileActivity {
  id: string
  type: ProfileActivityType
  title: string
  subtitle?: string
  timestamp: string
  accent?: string
}

export interface ProfileConnection {
  id: string
  username: string
  displayName: string
  avatarColor: string
}

export interface UserProfile {
  user: ProfileUser
  stats: ReadingStats
  heatmap: HeatmapDay[]
  achievements: ProfileAchievement[]
  favoriteGenres: GenreTag[]
  recentActivity: ProfileActivity[]
  favoriteManhwa: LibraryEntry[]
  followers: ProfileConnection[]
  following: ProfileConnection[]
}
