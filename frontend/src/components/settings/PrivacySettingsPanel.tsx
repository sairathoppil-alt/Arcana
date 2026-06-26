import type { PrivacySettings } from '@/types/settings'
import { SettingsRow, SettingsSectionCard } from '@/components/settings/SettingsSectionCard'
import { SettingsToggle } from '@/components/settings/SettingsToggle'
import { cn } from '@/utils/cn'

interface PrivacySettingsPanelProps {
  settings: PrivacySettings
  onChange: (settings: PrivacySettings) => void
}

export function PrivacySettingsPanel({ settings, onChange }: PrivacySettingsPanelProps) {
  const update = <K extends keyof PrivacySettings>(key: K, value: PrivacySettings[K]) => {
    onChange({ ...settings, [key]: value })
  }

  return (
    <SettingsSectionCard
      title="Privacy"
      description="Control who can see your profile and interact with you."
    >
      <SettingsRow>
        <p className="mb-3 text-sm font-medium text-foreground">Profile Visibility</p>
        <div className="grid grid-cols-2 gap-2 sm:max-w-sm">
          {(['public', 'private'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => update('profileVisibility', option)}
              className={cn(
                'rounded-[var(--radius-md)] border px-4 py-3 text-left transition-colors',
                settings.profileVisibility === option
                  ? 'border-accent bg-accent/10'
                  : 'border-border bg-secondary/40 hover:bg-secondary/70',
              )}
            >
              <p className="text-sm font-semibold capitalize text-foreground">{option} Profile</p>
              <p className="mt-0.5 text-[11px] text-muted">
                {option === 'public' ? 'Anyone can view your shelves' : 'Only you can view your profile'}
              </p>
            </button>
          ))}
        </div>
      </SettingsRow>

      <SettingsRow>
        <SettingsToggle
          checked={settings.showReadingActivity}
          onChange={(checked) => update('showReadingActivity', checked)}
          label="Show Reading Activity"
          description="Display your heatmap and recent chapters on your profile"
        />
      </SettingsRow>

      <SettingsRow>
        <SettingsToggle
          checked={settings.allowFriendRequests}
          onChange={(checked) => update('allowFriendRequests', checked)}
          label="Allow Friend Requests"
          description="Let other readers send you friend requests"
        />
      </SettingsRow>

      <SettingsRow>
        <SettingsToggle
          checked={settings.allowSharedLibraryInvites}
          onChange={(checked) => update('allowSharedLibraryInvites', checked)}
          label="Allow Shared Library Invites"
          description="Receive invitations to join shared libraries"
        />
      </SettingsRow>
    </SettingsSectionCard>
  )
}
