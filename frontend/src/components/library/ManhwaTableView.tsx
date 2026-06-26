import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ManhwaPoster } from '@/components/shared/ManhwaPoster'
import { StarRating } from '@/components/shared/StarRating'
import { STATUS_LABELS, type LibraryEntry } from '@/types/manhwa'
import { cn } from '@/utils/cn'

interface ManhwaTableViewProps {
  entries: LibraryEntry[]
}

export function ManhwaTableView({ entries }: ManhwaTableViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="dashboard-card overflow-hidden rounded-[var(--radius-lg)] border"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-xs font-semibold uppercase tracking-wider text-muted">
              <th scope="col" className="px-4 py-3 font-medium">Poster</th>
              <th scope="col" className="px-4 py-3 font-medium">Title</th>
              <th scope="col" className="px-4 py-3 font-medium">Status</th>
              <th scope="col" className="px-4 py-3 font-medium">Rating</th>
              <th scope="col" className="px-4 py-3 font-medium">Current Chapter</th>
              <th scope="col" className="px-4 py-3 font-medium">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <motion.tr
                key={entry.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className={cn(
                  'border-b border-border/70 transition-colors last:border-b-0',
                  'hover:bg-secondary/30',
                )}
              >
                <td className="px-4 py-3">
                  <Link to={`/manhwa/${entry.id}`}>
                    <ManhwaPoster manhwa={entry} size="xs" showTitleOverlay={false} />
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/manhwa/${entry.id}`}
                    className="font-medium text-foreground hover:text-accent"
                  >
                    {entry.title}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                    {STATUS_LABELS[entry.status]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {entry.rating > 0 ? (
                    <StarRating rating={entry.rating} />
                  ) : (
                    <span className="text-xs text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">
                  {entry.status === 'wishlist' ? '—' : `Ch. ${entry.chapter}`}
                </td>
                <td className="px-4 py-3 text-muted">{entry.lastUpdated}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
