import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ManhwaPoster } from '@/components/shared/ManhwaPoster'
import { StarRating } from '@/components/shared/StarRating'
import { TagBadge } from '@/components/shared/TagBadge'
import { STATUS_LABELS, type LibraryEntry } from '@/types/manhwa'
import { cn } from '@/utils/cn'

interface ManhwaGridCardProps {
  entry: LibraryEntry
  index: number
}

export function ManhwaGridCard({ entry, index }: ManhwaGridCardProps) {
  const chapterLabel =
    entry.status === 'wishlist'
      ? 'Not started'
      : entry.status === 'completed'
        ? `Ch. ${entry.chapter} · Complete`
        : `Chapter ${entry.chapter}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        to={`/manhwa/${entry.id}`}
        className={cn(
          'dashboard-card group flex h-full flex-col rounded-[var(--radius-lg)] border p-3 transition-shadow',
          'hover:shadow-[var(--shadow-soft)]',
        )}
      >
        <ManhwaPoster
          manhwa={entry}
          size="fluid"
          showTitleOverlay={false}
          className="rounded-[var(--radius-md)]"
        />

        <div className="mt-3 flex flex-1 flex-col">
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-foreground group-hover:text-accent">
            {entry.title}
          </h3>
          <p className="mt-1 text-xs text-muted">{chapterLabel}</p>
          <p className="mt-1 text-[11px] font-medium text-accent/90">{STATUS_LABELS[entry.status]}</p>

          <div className="mt-2">
            {entry.rating > 0 ? (
              <StarRating rating={entry.rating} />
            ) : (
              <span className="text-[11px] text-muted">Unrated</span>
            )}
          </div>

          <div className="mt-auto flex flex-wrap gap-1 pt-3">
            {entry.tropes.slice(0, 3).map((trope) => (
              <TagBadge key={trope} label={trope} />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
