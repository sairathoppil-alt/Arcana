export type MemberRole = 'owner' | 'moderator' | 'member'

export type SharedLibraryTab = 'library' | 'discussions' | 'members' | 'activity'

export interface SharedLibrary {
  id: string
  name: string
  description: string
  memberCount: number
  coverFrom: string
  coverTo: string
  coverAccent?: string
  createdBy: string
}

export interface SharedMember {
  id: string
  name: string
  role: MemberRole
  avatarColor: string
  online: boolean
}

export interface DiscussionMessage {
  id: string
  userId: string
  username: string
  message: string
  timestamp: string
}

export interface ActivityFeedItem {
  id: string
  userId: string
  username: string
  text: string
  highlight?: string
  timestamp: string
}

export const MEMBER_ROLE_LABELS: Record<MemberRole, string> = {
  owner: 'Owner',
  moderator: 'Moderator',
  member: 'Member',
}

export const SHARED_LIBRARY_TABS: { id: SharedLibraryTab; label: string }[] = [
  { id: 'library', label: 'Library' },
  { id: 'discussions', label: 'Discussions' },
  { id: 'members', label: 'Members' },
  { id: 'activity', label: 'Activity' },
]
