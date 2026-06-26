import type { NotificationSettings } from '@/types/settings'
import { SettingsRow, SettingsSectionCard } from '@/components/settings/SettingsSectionCard'
import { SettingsToggle } from '@/components/settings/SettingsToggle'

interface NotificationSettingsPanelProps {
  settings: NotificationSettings
  onChange: (settings: NotificationSettings) => void
}

const notificationItems: {
  key: keyof NotificationSettings
  label: string
  description: string
}[] = [
  {
    key: 'friendInvitations',
    label: 'Friend Invitations',
    description: 'When someone sends you a friend request',
  },
  {
    key: 'sharedLibraryUpdates',
    label: 'Shared Library Updates',
    description: 'New titles and activity in shared libraries',
  },
  {
    key: 'comments',
    label: 'Comments',
    description: 'Replies and mentions on your notes',
  },
  {
    key: 'readingReminders',
    label: 'Reading Reminders',
    description: 'Gentle nudges to continue your current reads',
  },
  {
    key: 'weeklyDigest',
    label: 'Weekly Digest',
    description: 'A summary of your reading week every Sunday',
  },
]

export function NotificationSettingsPanel({
  settings,
  onChange,
}: NotificationSettingsPanelProps) {
  const update = (key: keyof NotificationSettings, value: boolean) => {
    onChange({ ...settings, [key]: value })
  }

  return (
    <SettingsSectionCard
      title="Notifications"
      description="Choose what updates you want to receive."
    >
      {notificationItems.map((item) => (
        <SettingsRow key={item.key}>
          <SettingsToggle
            checked={settings[item.key]}
            onChange={(checked) => update(item.key, checked)}
            label={item.label}
            description={item.description}
          />
        </SettingsRow>
      ))}
    </SettingsSectionCard>
  )
}
