export type SettingsSectionId =
  | 'account'
  | 'appearance'
  | 'notifications'
  | 'privacy'
  | 'connected'
  | 'export'
  | 'danger'

export type FontSize = 'small' | 'medium' | 'large'

export type ProfileVisibility = 'public' | 'private'

export interface NotificationSettings {
  friendInvitations: boolean
  sharedLibraryUpdates: boolean
  comments: boolean
  readingReminders: boolean
  weeklyDigest: boolean
}

export interface PrivacySettings {
  profileVisibility: ProfileVisibility
  showReadingActivity: boolean
  allowFriendRequests: boolean
  allowSharedLibraryInvites: boolean
}

export interface ConnectedAccount {
  id: 'google' | 'discord' | 'github'
  name: string
  description: string
  connected: boolean
}

export interface SettingsState {
  username: string
  email: string
  fontSize: FontSize
  notifications: NotificationSettings
  privacy: PrivacySettings
  connectedAccounts: ConnectedAccount[]
}

export interface SettingsSectionMeta {
  id: SettingsSectionId
  label: string
  description: string
  icon: string
}
