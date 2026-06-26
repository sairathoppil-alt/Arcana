import { useState } from 'react'
import { motion } from 'framer-motion'
import { DownloadIcon } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { SettingsRow, SettingsSectionCard } from '@/components/settings/SettingsSectionCard'

const exportOptions = [
  { id: 'reading-list', label: 'Export Reading List', description: 'All titles, statuses, and progress' },
  { id: 'notes', label: 'Export Notes', description: 'Personal notes across your library' },
  { id: 'libraries', label: 'Export Libraries', description: 'Personal and shared library metadata' },
] as const

export function ExportSettings() {
  const [message, setMessage] = useState<string | null>(null)

  const handleExport = (label: string) => {
    setMessage(`${label} download started (mock)`)
    window.setTimeout(() => setMessage(null), 2500)
  }

  return (
    <SettingsSectionCard
      title="Export"
      description="Download a copy of your Arcana data."
    >
      {exportOptions.map((option) => (
        <SettingsRow key={option.id}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{option.label}</p>
              <p className="mt-0.5 text-xs text-muted">{option.description}</p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport(option.label)}
                className="w-full gap-2 sm:w-auto"
              >
                <DownloadIcon className="h-4 w-4" />
                Download
              </Button>
            </motion.div>
          </div>
        </SettingsRow>
      ))}

      {message ? (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs font-medium text-accent"
        >
          {message}
        </motion.p>
      ) : null}
    </SettingsSectionCard>
  )
}
