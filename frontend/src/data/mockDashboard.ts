import type { LibrarySummary, Manhwa } from '@/types/manhwa'

export const continueReading: Manhwa & { progress: number } = {
  id: 'roxana',
  title: 'Roxana',
  chapter: 78,
  totalChapters: 110,
  progress: 71,
  coverFrom: '#3d2048',
  coverTo: '#8b3a4a',
  coverAccent: '#d4af37',
}

export const recentlyAdded: Manhwa[] = [
  {
    id: 'broken-ring',
    title: 'The Broken Ring',
    chapter: 12,
    coverFrom: '#2c3e6b',
    coverTo: '#5a7ab8',
    coverAccent: '#e8d4a8',
  },
  {
    id: 'villains-die',
    title: 'Villains Are Destined To Die',
    chapter: 45,
    coverFrom: '#4a2858',
    coverTo: '#7b4a8b',
    coverAccent: '#c9a84c',
  },
  {
    id: 'stepmother-marchen',
    title: "A Stepmother's Märchen",
    chapter: 67,
    coverFrom: '#5c3a2e',
    coverTo: '#9b6b4a',
    coverAccent: '#f0e0c8',
  },
  {
    id: 'hourglass',
    title: 'The Villainess Turns The Hourglass',
    chapter: 89,
    coverFrom: '#1e3a4a',
    coverTo: '#4a7a8b',
    coverAccent: '#b8d4e8',
  },
  {
    id: 'oust-villain',
    title: 'I Failed To Oust The Villain',
    chapter: 34,
    coverFrom: '#3a2848',
    coverTo: '#6b4a7a',
    coverAccent: '#e8c878',
  },
]

export const personalLibraries: LibrarySummary[] = [
  {
    id: 'reading-list',
    name: 'My Reading List',
    entryCount: 48,
    lastUpdated: '2 hours ago',
    type: 'personal',
  },
  {
    id: 'favorites',
    name: 'Favorites',
    entryCount: 23,
    lastUpdated: 'Yesterday',
    type: 'personal',
  },
]

export const sharedLibraries: LibrarySummary[] = [
  {
    id: 'fantasy-obsessions',
    name: 'Fantasy Obsessions',
    entryCount: 32,
    lastUpdated: '3 hours ago',
    type: 'shared',
  },
  {
    id: 'romance-club',
    name: 'Romance Club',
    entryCount: 18,
    lastUpdated: '1 day ago',
    type: 'shared',
  },
]

export const recentlyUpdatedShared: Manhwa[] = [
  {
    id: 'roxana',
    title: 'Roxana',
    chapter: 78,
    coverFrom: '#3d2048',
    coverTo: '#8b3a4a',
    coverAccent: '#d4af37',
  },
  {
    id: 'villains-die',
    title: 'Villains Are Destined To Die',
    chapter: 124,
    coverFrom: '#4a2858',
    coverTo: '#7b4a8b',
    coverAccent: '#c9a84c',
  },
  {
    id: 'broken-ring',
    title: 'The Broken Ring',
    chapter: 56,
    coverFrom: '#2c3e6b',
    coverTo: '#5a7ab8',
    coverAccent: '#e8d4a8',
  },
  {
    id: 'stepmother-marchen',
    title: "A Stepmother's Märchen",
    chapter: 102,
    coverFrom: '#5c3a2e',
    coverTo: '#9b6b4a',
    coverAccent: '#f0e0c8',
  },
  {
    id: 'hourglass',
    title: 'The Villainess Turns The Hourglass',
    chapter: 115,
    coverFrom: '#1e3a4a',
    coverTo: '#4a7a8b',
    coverAccent: '#b8d4e8',
  },
  {
    id: 'oust-villain',
    title: 'I Failed To Oust The Villain',
    chapter: 67,
    coverFrom: '#3a2848',
    coverTo: '#6b4a7a',
    coverAccent: '#e8c878',
  },
]

export const DASHBOARD_USER = {
  displayName: 'Saira',
  avatarInitial: 'S',
}
