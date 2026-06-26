import { motion } from 'framer-motion'
import type { GenreTag } from '@/types/profile'

interface FavoriteGenresProps {
  genres: GenreTag[]
  delay?: number
}

const genreColors = [
  'from-accent/15 to-accent/5 border-accent/25',
  'from-[var(--gold)]/15 to-[var(--gold)]/5 border-[var(--gold)]/30',
  'from-secondary to-secondary/50 border-border',
  'from-accent/10 to-secondary border-accent/15',
  'from-[var(--gold)]/10 to-accent/5 border-[var(--gold)]/20',
]

export function FavoriteGenres({ genres, delay = 0.2 }: FavoriteGenresProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="dashboard-card rounded-[var(--radius-lg)] border p-5 sm:p-6"
    >
      <h2 className="font-display text-lg font-semibold text-foreground">Favorite Genres</h2>
      <p className="mt-1 text-sm text-muted">Your most-read categories</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {genres.map((genre, index) => (
          <motion.span
            key={genre.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: delay + index * 0.04, type: 'spring', stiffness: 260 }}
            whileHover={{ scale: 1.06, y: -2 }}
            className={`inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-3.5 py-1.5 text-sm font-medium text-foreground ${genreColors[index % genreColors.length]}`}
          >
            {genre.label}
            <span className="rounded-full bg-card/80 px-1.5 py-0.5 text-[10px] font-semibold text-muted">
              {genre.count}
            </span>
          </motion.span>
        ))}
      </div>
    </motion.section>
  )
}
