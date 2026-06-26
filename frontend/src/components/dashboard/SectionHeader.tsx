import { Link } from 'react-router-dom'

interface SectionHeaderProps {
  title: string
  actionLabel?: string
  actionTo?: string
}

export function SectionHeader({ title, actionLabel = 'View all', actionTo = '#' }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-display text-base font-semibold text-foreground md:text-lg">{title}</h2>
      {actionTo === '#' ? (
        <span className="text-xs font-medium text-muted">{actionLabel}</span>
      ) : (
        <Link
          to={actionTo}
          className="text-xs font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
