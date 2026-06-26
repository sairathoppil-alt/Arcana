import type { InviteUser } from '@/types/createLibrary'

export const mockInviteUsers: InviteUser[] = [
  { id: 'sarah', name: 'Sarah', avatarColor: '#8b3a4a' },
  { id: 'emma', name: 'Emma', avatarColor: '#4a5a8b' },
  { id: 'luna', name: 'Luna', avatarColor: '#5a4a7a' },
  { id: 'kai', name: 'Kai', avatarColor: '#3a6b5c' },
  { id: 'mia', name: 'Mia', avatarColor: '#7a5a4a' },
  { id: 'ava', name: 'Ava', avatarColor: '#4a6b8b' },
  { id: 'noah', name: 'Noah', avatarColor: '#6b4a5c' },
  { id: 'saira', name: 'Saira', avatarColor: '#5c3a6b' },
]

export function slugifyLibraryName(name: string): string {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
  return slug || 'new-library'
}
