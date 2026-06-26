import { motion } from 'framer-motion'
import { PencilIcon } from '@/components/icons'
import { StarRating } from '@/components/shared/StarRating'
import { TagBadge } from '@/components/shared/TagBadge'
import type { ManhwaDetail } from '@/types/manhwaDetail'

interface ManhwaDetailHeaderProps {
  manhwa: ManhwaDetail
}

export function ManhwaDetailHeader({ manhwa }: ManhwaDetailHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">{manhwa.title}</h1>
          {manhwa.alternateTitle ? (
            <p className="mt-1 text-sm italic text-muted">{manhwa.alternateTitle}</p>
          ) : null}
        </div>
        <button
          type="button"
          aria-label="Edit manhwa"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-secondary/70 hover:text-foreground"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Author</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">{manhwa.author}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Artist</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">{manhwa.artist}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Rating</dt>
          <dd className="mt-1">
            <StarRating rating={manhwa.rating} size="md" />
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Chapter</dt>
          <dd className="mt-1 font-display text-lg font-semibold text-foreground">
            {manhwa.chapter}
            {manhwa.totalChapters ? (
              <span className="text-muted"> / {manhwa.totalChapters}</span>
            ) : null}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Tropes</p>
        <div className="flex flex-wrap gap-2">
          {manhwa.tropes.map((trope) => (
            <TagBadge
              key={trope}
              label={trope}
              className="border-accent/20 bg-accent/8 px-3 py-1 text-xs text-accent dark:bg-accent/15"
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
