import { apiClient } from '@/api/axios'
import type { ActivityFeedItem, DiscussionMessage, SharedLibrary, SharedMember } from '@/types/sharedLibrary'

interface BackendSharedLibrary {
  id: number
  library_id: number
  owner_id: number
  display_name: string
  description: string | null
  invite_code: string | null
  created_at: string
  updated_at: string
}

interface BackendMember {
  id: number
  shared_library_id: number
  user_id: number
  role: string
  joined_at: string
}

interface BackendActivityItem {
  id: number
  shared_library_id: number
  actor_id: number
  action: string
  target: string | null
  timestamp: string
}

interface BackendThread {
  id: number
  shared_library_id: number
  title: string
  created_by: number
  is_pinned: boolean
  created_at: string
  updated_at: string
}

function normalizeCoverColors(seed: string) {
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue = hash % 360
  return {
    coverFrom: `hsl(${hue}, 42%, 28%)`,
    coverTo: `hsl(${(hue + 56) % 360}, 38%, 46%)`,
    coverAccent: `hsl(${(hue + 112) % 360}, 62%, 64%)`,
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

function normalizeLibrary(library: BackendSharedLibrary): SharedLibrary {
  const seed = library.display_name || `shared-${library.id}`
  return {
    id: String(library.id),
    name: library.display_name,
    description: library.description ?? 'A shared collection of manhwa.',
    memberCount: 0,
    ...normalizeCoverColors(seed),
    createdBy: 'You',
  }
}

function normalizeMember(member: BackendMember): SharedMember {
  const palette = ['#8b3a4a', '#4a5a8b', '#5a4a7a', '#3a6b5c', '#7a5a4a']
  return {
    id: String(member.user_id),
    name: `Member ${member.user_id}`,
    role: member.role as SharedMember['role'],
    avatarColor: palette[member.user_id % palette.length],
    online: member.role === 'owner' || member.user_id % 2 === 0,
  }
}

function normalizeActivity(activity: BackendActivityItem): ActivityFeedItem {
  return {
    id: String(activity.id),
    userId: String(activity.actor_id),
    username: `User ${activity.actor_id}`,
    text: activity.action,
    highlight: activity.target ?? undefined,
    timestamp: formatRelativeTime(activity.timestamp),
  }
}

function normalizeDiscussions(thread: BackendThread): DiscussionMessage {
  return {
    id: String(thread.id),
    userId: String(thread.created_by),
    username: `User ${thread.created_by}`,
    message: thread.title,
    timestamp: formatRelativeTime(thread.created_at),
  }
}

export async function getSharedLibraries(): Promise<SharedLibrary[]> {
  const { data } = await apiClient.get<BackendSharedLibrary[]>('/shared-libraries')
  return data.map(normalizeLibrary)
}

export async function getSharedLibrary(id: string): Promise<SharedLibrary | null> {
  try {
    const { data } = await apiClient.get<BackendSharedLibrary>(`/shared-libraries/${id}`)
    return normalizeLibrary(data)
  } catch {
    return null
  }
}

export async function getSharedLibraryMembers(id: string): Promise<SharedMember[]> {
  try {
    const { data } = await apiClient.get<BackendMember[]>(`/shared-libraries/${id}/members`)
    return data.map(normalizeMember)
  } catch {
    return []
  }
}

export async function getSharedLibraryActivity(id: string): Promise<ActivityFeedItem[]> {
  try {
    const { data } = await apiClient.get<BackendActivityItem[]>(`/shared-libraries/${id}/activity`)
    return data.map(normalizeActivity)
  } catch {
    return []
  }
}

export async function getSharedLibraryDiscussions(id: string): Promise<DiscussionMessage[]> {
  try {
    const { data } = await apiClient.get<BackendThread[]>(`/shared-libraries/${id}/threads`)
    return data.map(normalizeDiscussions)
  } catch {
    return []
  }
}
