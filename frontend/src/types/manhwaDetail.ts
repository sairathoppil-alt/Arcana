import type { LibraryEntry } from '@/types/manhwa'

export interface ManhwaComment {
  id: string
  username: string
  avatarColor: string
  message: string
  timestamp: string
}

export interface ReadingLink {
  id: string
  label: string
  url: string
}

export interface ManhwaDetail extends LibraryEntry {
  alternateTitle?: string
  author: string
  artist: string
  synopsis: string
  defaultNote: string
  comments: ManhwaComment[]
  readingLinks: ReadingLink[]
  relatedIds: string[]
}

export interface RelatedManhwaSummary extends LibraryEntry {
  id: string
}

export const NOTES_MAX_LENGTH = 500

export function getProgressPercent(chapter: number, totalChapters?: number): number {
  if (!totalChapters || totalChapters <= 0) return 0
  return Math.min(100, Math.round((chapter / totalChapters) * 100))
}
