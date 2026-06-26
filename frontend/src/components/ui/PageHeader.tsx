import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  className?: string
  centered?: boolean
}

export function PageHeader({
  title,
  description,
  actions,
  className,
  centered = false,
}: PageHeaderProps) {
  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex flex-col gap-4',
        actions ? 'sm:flex-row sm:items-center sm:justify-between' : undefined,
        centered && 'text-center sm:text-center',
        className,
      )}
    >
      <div className={cn(centered && 'mx-auto')}>
        <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </motion.header>
  )
}
