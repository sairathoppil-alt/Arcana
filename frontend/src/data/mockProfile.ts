import type { UserProfile } from '@/types/profile'
import { personalLibraryEntries } from '@/data/mockPersonalLibrary'

function seededValue(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateHeatmap(endDate: Date, days: number) {
  const result: UserProfile['heatmap'] = []
  const start = new Date(endDate)
  start.setDate(start.getDate() - (days - 1))

  for (let i = 0; i < days; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
    const roll = seededValue(seed)

    let chapters = 0
    if (roll > 0.32) {
      chapters = roll > 0.85 ? Math.floor(seededValue(seed * 3) * 6) + 4 : Math.floor(seededValue(seed * 2) * 4) + 1
    }

    result.push({
      date: date.toISOString().slice(0, 10),
      chapters,
    })
  }

  return result
}

const favoriteIds = ['roxana', 'broken-ring', 'villains-die', 'hourglass', 'stepmother-marchen', 'oust-villain']
const allEntries = personalLibraryEntries['reading-list'] ?? []
const favoriteManhwa = favoriteIds
  .map((id) => allEntries.find((entry) => entry.id === id))
  .filter((entry): entry is NonNullable<typeof entry> => entry !== undefined)

export const sairaProfile: UserProfile = {
  user: {
    id: 'saira',
    username: 'saira',
    displayName: 'Saira',
    bio: 'Villainess arc enthusiast, romance connoisseur, and keeper of too many reading lists. Currently spiraling through Roxana and collecting fantasy obsessions one chapter at a time.',
    joinDate: 'March 14, 2024',
    avatarColor: '#5c3a6b',
  },
  stats: {
    booksRead: 48,
    currentlyReading: 12,
    completed: 28,
    dropped: 3,
    wishlist: 15,
    averageRating: 4.2,
    readingStreak: 30,
    favoriteGenre: 'Villainess',
  },
  heatmap: generateHeatmap(new Date(2026, 5, 23), 371),
  achievements: [
    {
      id: 'first-library',
      emoji: '📚',
      title: 'First Library',
      description: 'Created your first personal library',
      earnedAt: 'Mar 2024',
      unlocked: true,
    },
    {
      id: 'streak-30',
      emoji: '🔥',
      title: '30 Day Streak',
      description: 'Read for 30 consecutive days',
      earnedAt: 'Jun 2026',
      unlocked: true,
    },
    {
      id: 'chapters-100',
      emoji: '⭐',
      title: '100 Chapters',
      description: 'Finished 100 chapters total',
      earnedAt: 'Aug 2024',
      unlocked: true,
    },
    {
      id: 'villainess-collector',
      emoji: '👑',
      title: 'Villainess Collector',
      description: 'Added 10 villainess manhwa to your library',
      earnedAt: 'Nov 2024',
      unlocked: true,
    },
    {
      id: 'romance-lover',
      emoji: '🌸',
      title: 'Romance Lover',
      description: 'Rated 5 romance titles 4 stars or higher',
      earnedAt: 'Jan 2025',
      unlocked: true,
    },
    {
      id: 'shared-shelf',
      emoji: '✨',
      title: 'Shelf Sharer',
      description: 'Join a shared library',
      earnedAt: 'Apr 2025',
      unlocked: true,
    },
  ],
  favoriteGenres: [
    { id: 'villainess', label: 'Villainess', count: 18 },
    { id: 'romance', label: 'Romance', count: 14 },
    { id: 'fantasy', label: 'Fantasy', count: 12 },
    { id: 'isekai', label: 'Isekai', count: 9 },
    { id: 'drama', label: 'Drama', count: 7 },
    { id: 'comedy', label: 'Comedy', count: 5 },
    { id: 'action', label: 'Action', count: 4 },
    { id: 'politics', label: 'Politics', count: 3 },
  ],
  recentActivity: [
    {
      id: 'a1',
      type: 'added',
      title: 'Added Roxana',
      subtitle: 'To My Reading List',
      timestamp: '2 hours ago',
      accent: '#8b3a4a',
    },
    {
      id: 'a2',
      type: 'finished-chapter',
      title: 'Finished Chapter 78',
      subtitle: 'Roxana',
      timestamp: '3 hours ago',
      accent: '#3d2048',
    },
    {
      id: 'a3',
      type: 'created-library',
      title: 'Created Fantasy Obsessions',
      subtitle: 'Shared library with 8 members',
      timestamp: 'Yesterday',
      accent: '#6b4a8b',
    },
    {
      id: 'a4',
      type: 'added-note',
      title: 'Added a note',
      subtitle: 'On Villains Are Destined To Die',
      timestamp: '2 days ago',
      accent: '#7b4a8b',
    },
    {
      id: 'a5',
      type: 'completed',
      title: 'Completed The Broken Ring',
      subtitle: 'Rated 4.5 stars',
      timestamp: '4 days ago',
      accent: '#5a7ab8',
    },
    {
      id: 'a6',
      type: 'rated',
      title: 'Rated Your Throne',
      subtitle: '5 stars — "Absolutely stunning art"',
      timestamp: '1 week ago',
      accent: '#4a5a8b',
    },
  ],
  favoriteManhwa,
  followers: [
    { id: 'sarah', username: 'sarah', displayName: 'Sarah', avatarColor: '#8b3a4a' },
    { id: 'emma', username: 'emma', displayName: 'Emma', avatarColor: '#4a5a8b' },
    { id: 'luna', username: 'luna', displayName: 'Luna', avatarColor: '#5a4a7a' },
    { id: 'kai', username: 'kai', displayName: 'Kai', avatarColor: '#3a6b5c' },
    { id: 'mia', username: 'mia', displayName: 'Mia', avatarColor: '#7a5a4a' },
    { id: 'ava', username: 'ava', displayName: 'Ava', avatarColor: '#4a6b8b' },
    { id: 'noah', username: 'noah', displayName: 'Noah', avatarColor: '#6b4a5c' },
    { id: 'zoe', username: 'zoe', displayName: 'Zoe', avatarColor: '#8b5a6b' },
  ],
  following: [
    { id: 'sarah', username: 'sarah', displayName: 'Sarah', avatarColor: '#8b3a4a' },
    { id: 'emma', username: 'emma', displayName: 'Emma', avatarColor: '#4a5a8b' },
    { id: 'luna', username: 'luna', displayName: 'Luna', avatarColor: '#5a4a7a' },
    { id: 'kai', username: 'kai', displayName: 'Kai', avatarColor: '#3a6b5c' },
    { id: 'mia', username: 'mia', displayName: 'Mia', avatarColor: '#7a5a4a' },
    { id: 'leo', username: 'leo', displayName: 'Leo', avatarColor: '#5a6b4a' },
  ],
}

export function getProfileByUsername(username?: string): UserProfile | null {
  const key = (username ?? 'saira').toLowerCase()
  if (key === 'saira') return sairaProfile
  return null
}
