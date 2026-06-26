import type { SettingsState } from '@/types/settings'

export const SETTINGS_SECTIONS = [
  { id: 'account', label: 'Account', description: 'Profile and credentials', icon: '👤' },
  { id: 'appearance', label: 'Appearance', description: 'Theme and display', icon: '✨' },
  { id: 'notifications', label: 'Notifications', description: 'Alerts and digests', icon: '🔔' },
  { id: 'privacy', label: 'Privacy', description: 'Visibility and access', icon: '🔒' },
  { id: 'connected', label: 'Connected Accounts', description: 'Linked services', icon: '🔗' },
  { id: 'export', label: 'Export', description: 'Download your data', icon: '📤' },
  { id: 'danger', label: 'Danger Zone', description: 'Irreversible actions', icon: '⚠️' },
] as const

export const DEFAULT_SETTINGS: SettingsState = {
  username: 'saira',
  email: 'saira@arcana.app',
  fontSize: 'medium',
  notifications: {
    friendInvitations: true,
    sharedLibraryUpdates: true,
    comments: true,
    readingReminders: true,
    weeklyDigest: true,
  },
  privacy: {
    profileVisibility: 'public',
    showReadingActivity: true,
    allowFriendRequests: true,
    allowSharedLibraryInvites: true,
  },
  connectedAccounts: [
    {
      id: 'google',
      name: 'Google',
      description: 'Sign in and sync reading progress',
      connected: true,
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Share libraries with your server',
      connected: false,
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Connect for developer features',
      connected: false,
    },
  ],
}

export const PROFILE_AVATAR_COLOR = '#5c3a6b'

export function getDefaultSettingsState(): SettingsState {
  return structuredClone(DEFAULT_SETTINGS)
}
