import type { ManhwaDetail } from '@/types/manhwaDetail'
import type { LibraryEntry } from '@/types/manhwa'

const baseReadingLinks = [
  { id: 'official', label: 'Official Site', url: '#' },
  { id: 'tapas', label: 'Tapas', url: '#' },
  { id: 'webtoon', label: 'Webtoon', url: '#' },
  { id: 'other', label: 'Other Sources', url: '#' },
]

const roxanaDetail: ManhwaDetail = {
  id: 'roxana',
  title: 'Roxana',
  alternateTitle: 'The Way to Protect the Female Lead\'s Older Brother',
  chapter: 78,
  totalChapters: 110,
  coverFrom: '#3d2048',
  coverTo: '#8b3a4a',
  coverAccent: '#d4af37',
  status: 'reading',
  rating: 5,
  tropes: ['Villainess', 'Romance', 'Revenge', 'Fantasy', 'Politics', 'Reincarnation'],
  lastUpdated: '2 hours ago',
  author: 'Kin',
  artist: 'Sum',
  synopsis:
    'Roxana Agriche, the eldest daughter of a villainous ducal house, navigates a world of political intrigue, dangerous alliances, and unexpected romance. After living through countless timelines as a side character, she uses her knowledge to survive — and perhaps change the fate of those around her. A masterclass in morally grey protagonists, Roxana blends court drama, dark humor, and slow-burn tension into one of the most compelling villainess narratives in the genre.',
  defaultNote: "One of the strongest villainess protagonists I've read.",
  comments: [
    {
      id: 'c1',
      username: 'Sarah',
      avatarColor: '#8b3a4a',
      message: 'Still one of the best manhwa.',
      timestamp: '2 hours ago',
    },
    {
      id: 'c2',
      username: 'Emma',
      avatarColor: '#4a5a8b',
      message: 'The art is incredible.',
      timestamp: '5 hours ago',
    },
    {
      id: 'c3',
      username: 'Luna',
      avatarColor: '#5a4a7a',
      message: 'Chapter 78 had me speechless. That dinner scene!',
      timestamp: 'Yesterday',
    },
  ],
  readingLinks: baseReadingLinks,
  relatedIds: ['villains-die', 'broken-ring', 'hourglass', 'oust-villain'],
}

const detailCatalog: Record<string, Partial<ManhwaDetail> & LibraryEntry> = {
  roxana: roxanaDetail,
  'broken-ring': {
    id: 'broken-ring',
    title: 'The Broken Ring',
    alternateTitle: 'This Marriage Will Surely Fail!',
    chapter: 56,
    totalChapters: 89,
    coverFrom: '#2c3e6b',
    coverTo: '#5a7ab8',
    coverAccent: '#e8d4a8',
    status: 'reading',
    rating: 4,
    tropes: ['Romance', 'Fantasy', 'Reincarnation'],
    lastUpdated: '5 hours ago',
    author: 'Cha So-wol',
    artist: 'Song Ha-na',
    synopsis:
      'Engaged to a man who openly despises her, a noblewoman from a fallen house must navigate a marriage destined to fail — until she discovers fragments of a past life that may change everything. A tender romance woven through prophecy, pride, and second chances.',
    defaultNote: 'The slow burn is worth every chapter.',
    relatedIds: ['roxana', 'hourglass', 'villains-die', 'oust-villain'],
  },
  'villains-die': {
    id: 'villains-die',
    title: 'Villains Are Destined To Die',
    alternateTitle: 'PW:TD',
    chapter: 124,
    totalChapters: 124,
    coverFrom: '#4a2858',
    coverTo: '#7b4a8b',
    coverAccent: '#c9a84c',
    status: 'completed',
    rating: 5,
    tropes: ['Villainess', 'Fantasy', 'Revenge', 'Romance'],
    lastUpdated: '1 day ago',
    author: 'Gwon Gyeoeul',
    artist: 'Suol',
    synopsis:
      'Transported into her favorite otome game as the villainess Penelope Eckhart, a modern woman must raise affection flags with every character — or face death at the hands of the game\'s deadly love interests. Sharp writing, stunning art, and one of the genre\'s most beloved protagonists.',
    defaultNote: 'Penelope remains iconic.',
    relatedIds: ['roxana', 'hourglass', 'broken-ring', 'oust-villain'],
  },
  'stepmother-marchen': {
    id: 'stepmother-marchen',
    title: "A Stepmother's Märchen",
    chapter: 102,
    totalChapters: 118,
    coverFrom: '#5c3a2e',
    coverTo: '#9b6b4a',
    coverAccent: '#f0e0c8',
    status: 'reading',
    rating: 5,
    tropes: ['Villainess', 'Romance', 'Politics', 'Fantasy'],
    lastUpdated: '3 hours ago',
    author: 'Orca',
    artist: 'Kiro',
    synopsis:
      'A woman reborn as the wicked stepmother from a fairy tale decides to rewrite her story — protecting her stepchildren and dismantling the narrative that cast her as the villain. Political scheming meets heartfelt family drama.',
    defaultNote: '',
    relatedIds: ['roxana', 'villains-die', 'hourglass', 'princess'],
  },
  'oust-villain': {
    id: 'oust-villain',
    title: 'I Failed To Oust The Villain',
    chapter: 34,
    totalChapters: 72,
    coverFrom: '#3a2848',
    coverTo: '#6b4a7a',
    coverAccent: '#e8c878',
    status: 'on-hold',
    rating: 4,
    tropes: ['Villainess', 'Romance', 'Fantasy', 'Politics'],
    lastUpdated: '4 days ago',
    author: 'Yun Rok',
    artist: 'Saha',
    synopsis:
      'Reincarnated as the female lead\'s best friend, her mission is clear: oust the villain before he destroys the kingdom. But the villain is far more charming — and dangerous — than the game ever suggested.',
    defaultNote: 'Need to pick this back up.',
    relatedIds: ['roxana', 'broken-ring', 'hourglass', 'villains-die'],
  },
  hourglass: {
    id: 'hourglass',
    title: 'The Villainess Turns The Hourglass',
    chapter: 115,
    totalChapters: 140,
    coverFrom: '#1e3a4a',
    coverTo: '#4a7a8b',
    coverAccent: '#b8d4e8',
    status: 'reading',
    rating: 5,
    tropes: ['Villainess', 'Revenge', 'Fantasy', 'Romance'],
    lastUpdated: 'Yesterday',
    author: 'Sansobee',
    artist: 'Antstudio',
    synopsis:
      'Given a second chance at life through a mysterious hourglass, a condemned villainess rewinds time to exact revenge on those who wronged her — while carefully rewriting her own tragic fate.',
    defaultNote: 'The revenge arc is so satisfying.',
    relatedIds: ['roxana', 'villains-die', 'broken-ring', 'oust-villain'],
  },
  princess: {
    id: 'princess',
    title: 'Who Made Me A Princess',
    chapter: 42,
    totalChapters: 125,
    coverFrom: '#5a3a5c',
    coverTo: '#b87a9b',
    coverAccent: '#f8e0f0',
    status: 'wishlist',
    rating: 5,
    tropes: ['Romance', 'Fantasy', 'Reincarnation'],
    lastUpdated: '2 days ago',
    author: 'Yubi',
    artist: 'Spoon',
    synopsis:
      'A woman wakes up as Athanasia de Alger Obelia, the doomed princess from her favorite novel. With full knowledge of the story, she must survive her tyrant father — the most beautiful and terrifying emperor in the empire.',
    defaultNote: '',
    relatedIds: ['roxana', 'stepmother-marchen', 'villains-die', 'tyrant'],
  },
  tyrant: {
    id: 'tyrant',
    title: 'The Tyrant Wants To Be Good',
    chapter: 61,
    totalChapters: 95,
    coverFrom: '#2a2848',
    coverTo: '#4a5a8b',
    coverAccent: '#c9d4e8',
    status: 'dropped',
    rating: 3,
    tropes: ['Romance', 'Politics', 'Fantasy'],
    lastUpdated: '1 week ago',
    author: 'Jaeha',
    artist: 'Didi',
    synopsis:
      'A tyrannical emperor who only ever wanted to be good meets a woman who sees through his mask. Political intrigue and emotional healing intertwine in this slow-burn court romance.',
    defaultNote: '',
    relatedIds: ['roxana', 'princess', 'broken-ring', 'hourglass'],
  },
}

const defaultComments = [
  {
    id: 'c1',
    username: 'Sarah',
    avatarColor: '#8b3a4a',
    message: 'Still one of the best manhwa.',
    timestamp: '2 hours ago',
  },
  {
    id: 'c2',
    username: 'Emma',
    avatarColor: '#4a5a8b',
    message: 'The art is incredible.',
    timestamp: '5 hours ago',
  },
]

export function isManhwaKnown(id: string): boolean {
  return id in detailCatalog
}

export function getManhwaDetail(id: string): ManhwaDetail {
  const entry = detailCatalog[id]

  if (!entry) {
    return {
      id,
      title: 'Unknown Manhwa',
      chapter: 1,
      totalChapters: 50,
      coverFrom: '#4a2c5c',
      coverTo: '#8b3a4a',
      coverAccent: '#d4af37',
      status: 'wishlist',
      rating: 0,
      tropes: ['Fantasy'],
      lastUpdated: 'Unknown',
      author: 'Unknown',
      artist: 'Unknown',
      synopsis: 'No synopsis available for this title yet.',
      defaultNote: '',
      comments: defaultComments,
      readingLinks: baseReadingLinks,
      relatedIds: ['roxana', 'villains-die', 'broken-ring', 'hourglass'],
    }
  }

  return {
    ...entry,
    comments: entry.comments ?? defaultComments,
    readingLinks: entry.readingLinks ?? baseReadingLinks,
    relatedIds: entry.relatedIds ?? ['roxana', 'villains-die', 'broken-ring', 'hourglass'],
    defaultNote: entry.defaultNote ?? '',
    author: entry.author ?? 'Unknown',
    artist: entry.artist ?? 'Unknown',
    synopsis: entry.synopsis ?? 'No synopsis available.',
  } as ManhwaDetail
}

export function getRelatedManhwa(ids: string[], excludeId?: string): LibraryEntry[] {
  return ids
    .filter((id) => id !== excludeId)
    .map((id) => {
      const detail = detailCatalog[id]
      if (!detail) return null
      return {
        id: detail.id,
        title: detail.title,
        chapter: detail.chapter,
        totalChapters: detail.totalChapters,
        coverFrom: detail.coverFrom,
        coverTo: detail.coverTo,
        coverAccent: detail.coverAccent,
        status: detail.status ?? 'reading',
        rating: detail.rating ?? 0,
        tropes: detail.tropes ?? [],
        lastUpdated: detail.lastUpdated ?? '',
      } as LibraryEntry
    })
    .filter((entry): entry is LibraryEntry => entry !== null)
}
