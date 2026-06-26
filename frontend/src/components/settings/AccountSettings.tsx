import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SettingsRow, SettingsSectionCard } from '@/components/settings/SettingsSectionCard'
import { PROFILE_AVATAR_COLOR } from '@/data/mockSettings'
import { useAuth } from '@/contexts/AuthContext'

interface AccountSettingsProps {
  username: string
  email: string
  onUsernameChange: (value: string) => void
  onEmailChange: (value: string) => void
}

export function AccountSettings({
  username,
  email,
  onUsernameChange,
  onEmailChange,
}: AccountSettingsProps) {
  const { user } = useAuth()
  const displayName = user?.displayName ?? 'Saira'
  const [message, setMessage] = useState<string | null>(null)

  const showMessage = (text: string) => {
    setMessage(text)
    window.setTimeout(() => setMessage(null), 2500)
  }

  return (
    <SettingsSectionCard
      title="Account"
      description="Manage your profile picture, username, and email."
    >
      <SettingsRow>
        <p className="mb-3 text-sm font-medium text-foreground">Profile Picture</p>
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] font-display text-3xl font-semibold text-white"
            style={{ backgroundColor: PROFILE_AVATAR_COLOR, borderColor: 'var(--gold)' }}
            aria-hidden="true"
          >
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-2">
            <Button variant="outline" size="sm" onClick={() => showMessage('Avatar upload coming soon')}>
              Change Photo
            </Button>
            <p className="text-xs text-muted">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>
      </SettingsRow>

      <SettingsRow>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Username"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="username"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="you@arcana.app"
          />
        </div>
      </SettingsRow>

      <SettingsRow>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => showMessage('Password change coming soon')}>
            Change Password
          </Button>
          <Button variant="ghost" disabled className="text-muted">
            Delete Account
          </Button>
        </div>
        {message ? <p className="mt-3 text-xs font-medium text-accent">{message}</p> : null}
      </SettingsRow>
    </SettingsSectionCard>
  )
}
