import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SettingsSectionCard } from '@/components/settings/SettingsSectionCard'

interface DangerZoneSettingsProps {
  onResetPreferences: () => void
}

export function DangerZoneSettings({ onResetPreferences }: DangerZoneSettingsProps) {
  const [message, setMessage] = useState<string | null>(null)

  const showMessage = (text: string) => {
    setMessage(text)
    window.setTimeout(() => setMessage(null), 2800)
  }

  return (
    <SettingsSectionCard
      title="Danger Zone"
      description="Irreversible actions. Proceed with caution."
      className="border-red-500/25 bg-red-500/[0.03] dark:border-red-400/20 dark:bg-red-500/[0.06] dark:backdrop-blur-md"
    >
      <p className="mb-5 text-sm text-muted">
        These actions cannot be undone in this mock environment. In production, confirmations would be required.
      </p>

      <div className="space-y-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-[var(--radius-md)] border border-red-500/20 bg-card/60 p-4 dark:bg-card/30"
        >
          <p className="text-sm font-semibold text-foreground">Delete Account</p>
          <p className="mt-1 text-xs text-muted">Permanently remove your account and all associated data.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 border-red-500/40 text-red-600 hover:bg-red-500/10 dark:text-red-400"
            onClick={() => showMessage('Account deletion is disabled in this mock build')}
          >
            Delete Account
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-[var(--radius-md)] border border-red-500/20 bg-card/60 p-4 dark:bg-card/30"
        >
          <p className="text-sm font-semibold text-foreground">Clear Reading History</p>
          <p className="mt-1 text-xs text-muted">Remove all chapter progress and heatmap activity.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 border-red-500/40 text-red-600 hover:bg-red-500/10 dark:text-red-400"
            onClick={() => showMessage('Reading history cleared (mock)')}
          >
            Clear Reading History
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-[var(--radius-md)] border border-red-500/20 bg-card/60 p-4 dark:bg-card/30"
        >
          <p className="text-sm font-semibold text-foreground">Reset Preferences</p>
          <p className="mt-1 text-xs text-muted">Restore notifications, privacy, and appearance to defaults.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 border-red-500/40 text-red-600 hover:bg-red-500/10 dark:text-red-400"
            onClick={() => {
              onResetPreferences()
              showMessage('Preferences reset to defaults (mock)')
            }}
          >
            Reset Preferences
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {message ? (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="mt-4 text-xs font-medium text-red-600 dark:text-red-400"
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </SettingsSectionCard>
  )
}
