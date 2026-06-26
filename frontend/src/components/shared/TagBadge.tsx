import { cn } from '@/utils/cn'

interface TagBadgeProps {
  label: string
  className?: string
}

export function TagBadge({ label, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted',
        'dark:bg-secondary/40 dark:text-muted',
        className,
      )}
    >
      {label}
    </span>
  )
}
