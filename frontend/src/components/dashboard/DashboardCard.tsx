import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface DashboardCardProps {
  children: ReactNode
  className?: string
}

export function DashboardCard({ children, className }: DashboardCardProps) {
  return (
    <div
      className={cn(
        'dashboard-card rounded-[var(--radius-lg)] border p-5',
        className,
      )}
    >
      {children}
    </div>
  )
}
