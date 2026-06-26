import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface AuthFormCardProps {
  children: ReactNode
  className?: string
}

export function AuthFormCard({ children, className }: AuthFormCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
        className={cn(
        'auth-form-card w-full max-w-md rounded-[var(--radius-xl)] border p-8',
        'border-[var(--auth-card-border)] bg-[var(--auth-card-bg)] shadow-[var(--auth-card-shadow)]',
        'dark:backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
