export type LibraryType = 'personal' | 'shared'

export type PrivacySetting = 'public' | 'private' | 'invite-only'

export interface InviteUser {
  id: string
  name: string
  avatarColor: string
}

export interface CreateLibraryFormData {
  type: LibraryType | null
  name: string
  description: string
  coverPreview: string | null
  privacy: PrivacySetting
  invitedMemberIds: string[]
}

export const WIZARD_STEPS = [
  { step: 1, label: 'Choose Type' },
  { step: 2, label: 'Library Details' },
  { step: 3, label: 'Invite Members' },
  { step: 4, label: 'Complete' },
] as const

export const PRIVACY_OPTIONS: { value: PrivacySetting; label: string; description: string }[] = [
  { value: 'public', label: 'Public', description: 'Anyone can discover this library' },
  { value: 'private', label: 'Private', description: 'Only you and invited members' },
  { value: 'invite-only', label: 'Invite Only', description: 'Visible only via invite link' },
]

export const DEFAULT_FORM_DATA: CreateLibraryFormData = {
  type: null,
  name: '',
  description: '',
  coverPreview: null,
  privacy: 'private',
  invitedMemberIds: [],
}
