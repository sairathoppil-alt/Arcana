import type { LibraryEntry } from '@/types/manhwa'
import type {
  ActivityFeedItem,
  DiscussionMessage,
  SharedLibrary,
  SharedMember,
} from '@/types/sharedLibrary'

export const sharedLibraryCatalog: Record<string, SharedLibrary> = {
  'fantasy-obsessions': {
    id: 'fantasy-obsessions',
    name: 'Fantasy Obsessions',
    description: 'A cozy club for fantasy, villainess, and isekai manhwa lovers.',
    memberCount: 8,
    coverFrom: '#2a1e4a',
    coverTo: '#6b4a8b',
    coverAccent: '#d4af37',
    createdBy: 'Sarah',
  },
  'romance-club': {
    id: 'romance-club',
    name: 'Romance Club',
    description: 'Romance manhwa recommendations and heartfelt discussions.',
    memberCount: 5,
    coverFrom: '#5a2e4a',
    coverTo: '#9b4a6b',
    coverAccent: '#f0c8d8',
    createdBy: 'Emma',
  },
}

export const fantasyObsessionsMembers: SharedMember[] = [
  { id: 'sarah', name: 'Sarah', role: 'owner', avatarColor: '#8b3a4a', online: true },
  { id: 'emma', name: 'Emma', role: 'moderator', avatarColor: '#4a5a8b', online: true },
  { id: 'luna', name: 'Luna', role: 'member', avatarColor: '#5a4a7a', online: true },
  { id: 'kai', name: 'Kai', role: 'member', avatarColor: '#3a6b5c', online: false },
  { id: 'mia', name: 'Mia', role: 'member', avatarColor: '#7a5a4a', online: true },
  { id: 'ava', name: 'Ava', role: 'member', avatarColor: '#4a6b8b', online: false },
  { id: 'noah', name: 'Noah', role: 'member', avatarColor: '#6b4a5c', online: false },
  { id: 'saira', name: 'Saira', role: 'member', avatarColor: '#5c3a6b', online: true },
]

export const sharedLibraryMembers: Record<string, SharedMember[]> = {
  'fantasy-obsessions': fantasyObsessionsMembers,
  'romance-club': fantasyObsessionsMembers.slice(0, 5),
}

export const fantasyObsessionsDiscussions: DiscussionMessage[] = [
  {
    id: 'd1',
    userId: 'sarah',
    username: 'Sarah',
    message: 'Roxana is still the best villainess manhwa.',
    timestamp: '2 hours ago',
  },
  {
    id: 'd2',
    userId: 'emma',
    username: 'Emma',
    message: 'The Broken Ring deserves more attention.',
    timestamp: '5 hours ago',
  },
  {
    id: 'd3',
    userId: 'luna',
    username: 'Luna',
    message: 'Just finished Hourglass — that ending was incredible!',
    timestamp: 'Yesterday',
  },
  {
    id: 'd4',
    userId: 'mia',
    username: 'Mia',
    message: 'Anyone reading I Failed To Oust The Villain? Worth picking back up?',
    timestamp: '2 days ago',
  },
]

export const sharedLibraryDiscussions: Record<string, DiscussionMessage[]> = {
  'fantasy-obsessions': fantasyObsessionsDiscussions,
  'romance-club': fantasyObsessionsDiscussions.slice(0, 2),
}

export const fantasyObsessionsActivity: ActivityFeedItem[] = [
  {
    id: 'a1',
    userId: 'sarah',
    username: 'Sarah',
    text: 'added',
    highlight: 'Roxana',
    timestamp: '2 hours ago',
  },
  {
    id: 'a2',
    userId: 'emma',
    username: 'Emma',
    text: 'updated',
    highlight: 'Chapter 84',
    timestamp: '4 hours ago',
  },
  {
    id: 'a3',
    userId: 'luna',
    username: 'Luna',
    text: 'added a note',
    timestamp: '1 day ago',
  },
  {
    id: 'a4',
    userId: 'kai',
    username: 'Kai',
    text: 'invited',
    highlight: 'Mia',
    timestamp: '2 days ago',
  },
  {
    id: 'a5',
    userId: 'mia',
    username: 'Mia',
    text: 'rated',
    highlight: 'The Broken Ring',
    timestamp: '3 days ago',
  },
  {
    id: 'a6',
    userId: 'ava',
    username: 'Ava',
    text: 'completed',
    highlight: 'Villains Are Destined To Die',
    timestamp: '4 days ago',
  },
]

export const sharedLibraryActivity: Record<string, ActivityFeedItem[]> = {
  'fantasy-obsessions': fantasyObsessionsActivity,
  'romance-club': fantasyObsessionsActivity.slice(0, 3),
}

export const sharedLibraryEntries: Record<string, LibraryEntry[]> = {
  'fantasy-obsessions': [
    {
      id: 'roxana',
      title: 'Roxana',
      chapter: 78,
      totalChapters: 110,
      coverFrom: '#3d2048',
      coverTo: '#8b3a4a',
      coverAccent: '#d4af37',
      status: 'reading',
      rating: 5,
      tropes: ['Villainess', 'Romance', 'Politics'],
      lastUpdated: '2 hours ago',
    },
    {
      id: 'broken-ring',
      title: 'The Broken Ring',
      chapter: 56,
      coverFrom: '#2c3e6b',
      coverTo: '#5a7ab8',
      coverAccent: '#e8d4a8',
      status: 'reading',
      rating: 4,
      tropes: ['Romance', 'Fantasy'],
      lastUpdated: '5 hours ago',
    },
    {
      id: 'villains-die',
      title: 'Villains Are Destined To Die',
      chapter: 124,
      coverFrom: '#4a2858',
      coverTo: '#7b4a8b',
      coverAccent: '#c9a84c',
      status: 'completed',
      rating: 5,
      tropes: ['Villainess', 'Fantasy', 'Revenge'],
      lastUpdated: '1 day ago',
    },
    {
      id: 'stepmother-marchen',
      title: "A Stepmother's Märchen",
      chapter: 102,
      coverFrom: '#5c3a2e',
      coverTo: '#9b6b4a',
      coverAccent: '#f0e0c8',
      status: 'reading',
      rating: 5,
      tropes: ['Villainess', 'Romance', 'Politics'],
      lastUpdated: '3 hours ago',
    },
    {
      id: 'hourglass',
      title: 'The Villainess Turns The Hourglass',
      chapter: 115,
      coverFrom: '#1e3a4a',
      coverTo: '#4a7a8b',
      coverAccent: '#b8d4e8',
      status: 'reading',
      rating: 5,
      tropes: ['Villainess', 'Revenge', 'Fantasy'],
      lastUpdated: 'Yesterday',
    },
    {
      id: 'oust-villain',
      title: 'I Failed To Oust The Villain',
      chapter: 34,
      coverFrom: '#3a2848',
      coverTo: '#6b4a7a',
      coverAccent: '#e8c878',
      status: 'on-hold',
      rating: 4,
      tropes: ['Villainess', 'Romance', 'Comedy'],
      lastUpdated: '4 days ago',
    },
    {
      id: 'princess',
      title: 'Who Made Me A Princess',
      chapter: 42,
      coverFrom: '#5a3a5c',
      coverTo: '#b87a9b',
      coverAccent: '#f8e0f0',
      status: 'reading',
      rating: 5,
      tropes: ['Romance', 'Fantasy', 'Family'],
      lastUpdated: '2 days ago',
    },
    {
      id: 'tyrant',
      title: 'The Tyrant Wants To Be Good',
      chapter: 61,
      coverFrom: '#2a2848',
      coverTo: '#4a5a8b',
      coverAccent: '#c9d4e8',
      status: 'reading',
      rating: 4,
      tropes: ['Romance', 'Politics', 'Drama'],
      lastUpdated: '1 week ago',
    },
  ],
  'romance-club': [],
}

export function getSharedLibrary(id: string): SharedLibrary {
  return (
    sharedLibraryCatalog[id] ?? {
      id,
      name: 'Shared Library',
      description: 'A shared collection of manhwa.',
      memberCount: 0,
      coverFrom: '#2a1e4a',
      coverTo: '#6b4a8b',
      coverAccent: '#d4af37',
      createdBy: 'Unknown',
    }
  )
}

export function getSharedLibraryMembers(id: string): SharedMember[] {
  return sharedLibraryMembers[id] ?? []
}

export function getSharedLibraryEntries(id: string): LibraryEntry[] {
  return sharedLibraryEntries[id] ?? []
}

export function getSharedLibraryDiscussions(id: string): DiscussionMessage[] {
  return sharedLibraryDiscussions[id] ?? []
}

export function getSharedLibraryActivity(id: string): ActivityFeedItem[] {
  return sharedLibraryActivity[id] ?? []
}

export function getMemberById(members: SharedMember[], userId: string): SharedMember | undefined {
  return members.find((m) => m.id === userId)
}
