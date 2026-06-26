import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SettingsSectionCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  delay?: number
}

export function SettingsSectionCard({
  title,
  description,
  children,
  className,
  delay = 0,
}: SettingsSectionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className={cn('dashboard-card rounded-[var(--radius-lg)] border p-5 sm:p-6', className)}
    >
      <header className="mb-5 border-b border-border/60 pb-4">
        <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </header>
      {children}
    </motion.section>
  )
}

interface SettingsRowProps {
  children: ReactNode
  className?: string
}

export function SettingsRow({ children, className }: SettingsRowProps) {
  return (
    <div className={cn('border-b border-border/50 py-4 last:border-b-0 last:pb-0 first:pt-0', className)}>
      {children}
    </div>
  )
}
