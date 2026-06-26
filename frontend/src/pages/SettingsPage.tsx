import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AccountSettings } from '@/components/settings/AccountSettings'
import { AppearanceSettings } from '@/components/settings/AppearanceSettings'
import { ConnectedAccountsSettings } from '@/components/settings/ConnectedAccountsSettings'
import {
  DangerZoneSettings,
} from '@/components/settings/DangerZoneSettings'
import { ExportSettings } from '@/components/settings/ExportSettings'
import { NotificationSettingsPanel } from '@/components/settings/NotificationSettingsPanel'
import { PrivacySettingsPanel } from '@/components/settings/PrivacySettingsPanel'
import { SettingsNav } from '@/components/settings/SettingsNav'
import { PageContainer } from '@/components/ui/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader'
import { DEFAULT_SETTINGS, getDefaultSettingsState } from '@/data/mockSettings'
import type { ConnectedAccount, FontSize, SettingsSectionId, SettingsState } from '@/types/settings'
import { tabContent } from '@/utils/motion'

const FONT_SIZE_KEY = 'arcana-font-size'

function loadFontSize(): FontSize {
  const stored = localStorage.getItem(FONT_SIZE_KEY)
  if (stored === 'small' || stored === 'medium' || stored === 'large') return stored
  return DEFAULT_SETTINGS.fontSize
}

export function SettingsPage() {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState<SettingsSectionId>('account')
  const [settings, setSettings] = useState<SettingsState>(() => ({
    ...DEFAULT_SETTINGS,
    fontSize: loadFontSize(),
  }))

  useEffect(() => {
    const section = (location.state as { section?: SettingsSectionId } | null)?.section
    if (section) setActiveSection(section)
  }, [location.state])

  useEffect(() => {
    document.documentElement.dataset.fontSize = settings.fontSize
    localStorage.setItem(FONT_SIZE_KEY, settings.fontSize)
  }, [settings.fontSize])

  const updateSettings = (patch: Partial<SettingsState>) => {
    setSettings((current) => ({ ...current, ...patch }))
  }

  const toggleConnectedAccount = (id: ConnectedAccount['id']) => {
    setSettings((current) => ({
      ...current,
      connectedAccounts: current.connectedAccounts.map((account) =>
        account.id === id ? { ...account, connected: !account.connected } : account,
      ),
    }))
  }

  const resetPreferences = () => {
    const defaults = getDefaultSettingsState()
    setSettings((current) => ({
      ...current,
      fontSize: defaults.fontSize,
      notifications: defaults.notifications,
      privacy: defaults.privacy,
      connectedAccounts: defaults.connectedAccounts,
    }))
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'account':
        return (
          <AccountSettings
            username={settings.username}
            email={settings.email}
            onUsernameChange={(username) => updateSettings({ username })}
            onEmailChange={(email) => updateSettings({ email })}
          />
        )
      case 'appearance':
        return (
          <AppearanceSettings
            fontSize={settings.fontSize}
            onFontSizeChange={(fontSize) => updateSettings({ fontSize })}
          />
        )
      case 'notifications':
        return (
          <NotificationSettingsPanel
            settings={settings.notifications}
            onChange={(notifications) => updateSettings({ notifications })}
          />
        )
      case 'privacy':
        return (
          <PrivacySettingsPanel
            settings={settings.privacy}
            onChange={(privacy) => updateSettings({ privacy })}
          />
        )
      case 'connected':
        return (
          <ConnectedAccountsSettings
            accounts={settings.connectedAccounts}
            onToggle={toggleConnectedAccount}
          />
        )
      case 'export':
        return <ExportSettings />
      case 'danger':
        return <DangerZoneSettings onResetPreferences={resetPreferences} />
      default:
        return null
    }
  }

  return (
    <PageContainer width="lg" className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account, appearance, and privacy preferences."
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-1/4">
          <SettingsNav active={activeSection} onSelect={setActiveSection} />
        </div>

        <div className="min-w-0 lg:w-3/4">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} variants={tabContent} initial="hidden" animate="visible" exit="exit">
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageContainer>
  )
}
