import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlusIcon } from '@/components/icons'
import { ManhwaPoster } from '@/components/shared/ManhwaPoster'
import { StarRating } from '@/components/shared/StarRating'
import { TagBadge } from '@/components/shared/TagBadge'
import { STATUS_LABELS } from '@/types/manhwa'
import type { ExploreManhwa } from '@/types/explore'
import { cn } from '@/utils/cn'

interface ExplorePosterCardProps {
  manhwa: ExploreManhwa
  index?: number
  onAddToLibrary?: (id: string) => void
  added?: boolean
}

export function ExplorePosterCard({
  manhwa,
  index = 0,
  onAddToLibrary,
  added = false,
}: ExplorePosterCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className={cn(
        'dashboard-card flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border transition-shadow',
        'hover:shadow-[var(--shadow-soft)]',
      )}
    >
      <Link to={`/manhwa/${manhwa.id}`} className="group relative block">
        <ManhwaPoster
          manhwa={manhwa}
          size="fluid"
          showTitleOverlay={false}
          className="rounded-none"
        />
        <span
          className={cn(
            'absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            manhwa.publicationStatus === 'completed'
              ? 'bg-blue-500/90 text-white'
              : 'bg-emerald-500/90 text-white',
          )}
        >
          {manhwa.publicationStatus}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/manhwa/${manhwa.id}`}>
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-foreground hover:text-accent">
            {manhwa.title}
          </h3>
        </Link>

        <div className="mt-2">
          <StarRating rating={manhwa.rating} />
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {manhwa.genres.slice(0, 3).map((genre) => (
            <TagBadge
              key={genre}
              label={genre}
              className="border-accent/15 bg-accent/8 text-[10px] text-accent"
            />
          ))}
        </div>

        <p className="mt-1 text-[11px] font-medium text-muted">{STATUS_LABELS[manhwa.status]}</p>

        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">
          {manhwa.description}
        </p>

        <button
          type="button"
          onClick={() => onAddToLibrary?.(manhwa.id)}
          className={cn(
            'mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors',
            added
              ? 'border border-accent/40 bg-accent/10 text-accent'
              : 'bg-accent text-white hover:bg-accent-hover dark:text-[var(--accent-foreground)]',
          )}
        >
          <PlusIcon className="h-4 w-4" />
          {added ? 'Added' : 'Add to Library'}
        </button>
      </div>
    </motion.article>
  )
}
