import { motion } from 'framer-motion'
import type { FontSize } from '@/types/settings'
import type { ThemePreference } from '@/theme'
import { SettingsRow, SettingsSectionCard } from '@/components/settings/SettingsSectionCard'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/utils/cn'

interface AppearanceSettingsProps {
  fontSize: FontSize
  onFontSizeChange: (size: FontSize) => void
}

const themeOptions: { id: ThemePreference; label: string; icon: string }[] = [
  { id: 'light', label: 'Light', icon: '☀️' },
  { id: 'dark', label: 'Dark', icon: '🌙' },
  { id: 'system', label: 'System', icon: '💻' },
]

const fontSizeOptions: { id: FontSize; label: string }[] = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
]

const accentSwatches = [
  { label: 'Plum', color: '#8b3a4a' },
  { label: 'Lavender', color: '#b8a4e8' },
  { label: 'Gold', color: '#c9a84c' },
]

export function AppearanceSettings({ fontSize, onFontSizeChange }: AppearanceSettingsProps) {
  const { preference, setThemePreference, theme } = useTheme()

  return (
    <SettingsSectionCard
      title="Appearance"
      description="Customize how Arcana looks and feels on your device."
    >
      <SettingsRow>
        <p className="mb-3 text-sm font-medium text-foreground">Theme</p>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {themeOptions.map((option) => {
            const selected = preference === option.id
            return (
              <motion.button
                key={option.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setThemePreference(option.id)}
                className={cn(
                  'rounded-[var(--radius-md)] border p-3 text-center transition-colors',
                  selected
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-secondary/40 text-foreground hover:bg-secondary/70',
                )}
              >
                <span className="text-xl" aria-hidden="true">
                  {option.icon}
                </span>
                <p className="mt-2 text-xs font-semibold">{option.label}</p>
              </motion.button>
            )
          })}
        </div>
      </SettingsRow>

      <SettingsRow>
        <p className="mb-3 text-sm font-medium text-foreground">Accent Color Preview</p>
        <div className="flex flex-wrap gap-3">
          {accentSwatches.map((swatch) => (
            <motion.div
              key={swatch.label}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium"
            >
              <span
                className="h-4 w-4 rounded-full border border-white/20"
                style={{ backgroundColor: swatch.color }}
                aria-hidden="true"
              />
              {swatch.label}
            </motion.div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">Accent customization is preview-only in this mock build.</p>
      </SettingsRow>

      <SettingsRow>
        <p className="mb-3 text-sm font-medium text-foreground">Font Size</p>
        <div className="inline-flex rounded-[var(--radius-md)] border border-border bg-secondary/40 p-1">
          {fontSizeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onFontSizeChange(option.id)}
              className={cn(
                'rounded-[var(--radius-sm)] px-4 py-2 text-xs font-semibold transition-colors',
                fontSize === option.id
                  ? 'bg-card text-accent shadow-sm'
                  : 'text-muted hover:text-foreground',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </SettingsRow>

      <SettingsRow>
        <p className="mb-3 text-sm font-medium text-foreground">Preview Card</p>
        <motion.div
          whileHover={{ y: -3 }}
          className="dashboard-card rounded-[var(--radius-md)] border p-4"
        >
          <p className="font-display text-lg font-semibold text-foreground">Roxana</p>
          <p className="mt-1 text-sm text-muted">
            Chapter 78 · {theme === 'dark' ? 'Midnight archive' : 'Warm cream'} · {fontSize} text
          </p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted">
              Villainess
            </span>
            <span className="rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-2 py-0.5 text-[10px] font-medium text-foreground">
              Reading
            </span>
          </div>
        </motion.div>
      </SettingsRow>
    </SettingsSectionCard>
  )
}
