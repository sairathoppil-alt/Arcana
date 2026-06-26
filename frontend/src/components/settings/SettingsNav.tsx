import { motion } from 'framer-motion'
import type { SettingsSectionId } from '@/types/settings'
import { SETTINGS_SECTIONS } from '@/data/mockSettings'
import { cn } from '@/utils/cn'

interface SettingsNavProps {
  active: SettingsSectionId
  onSelect: (id: SettingsSectionId) => void
}

export function SettingsNav({ active, onSelect }: SettingsNavProps) {
  return (
    <nav className="dashboard-card rounded-[var(--radius-lg)] border p-2 lg:sticky lg:top-6 lg:p-3">
      <p className="hidden px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-muted lg:block">
        Settings
      </p>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
        {SETTINGS_SECTIONS.map((section, index) => {
          const isActive = active === section.id

          return (
            <motion.button
              key={section.id}
              type="button"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              whileHover={{ x: 2 }}
              onClick={() => onSelect(section.id)}
              className={cn(
                'flex min-w-[140px] shrink-0 items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left transition-colors lg:min-w-0 lg:w-full',
                isActive
                  ? 'bg-accent/12 text-accent dark:bg-accent/20'
                  : 'text-muted hover:bg-secondary/70 hover:text-foreground',
                section.id === 'danger' && !isActive && 'text-red-500/80 hover:text-red-500',
              )}
            >
              <span className="text-base" aria-hidden="true">
                {section.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{section.label}</span>
                <span className="hidden text-[11px] text-muted lg:block">{section.description}</span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
