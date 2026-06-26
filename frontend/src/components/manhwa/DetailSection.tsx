import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface DetailSectionProps {
  title: string
  children: ReactNode
  className?: string
  delay?: number
}

export function DetailSection({ title, children, className, delay = 0 }: DetailSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={cn('dashboard-card rounded-[var(--radius-lg)] border p-5 sm:p-6', className)}
    >
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </motion.section>
  )
}
