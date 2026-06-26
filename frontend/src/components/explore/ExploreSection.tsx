import { motion } from 'framer-motion'
import { ExplorePosterCard } from '@/components/explore/ExplorePosterCard'
import type { ExploreManhwa } from '@/types/explore'

interface ExploreSectionProps {
  title: string
  items: ExploreManhwa[]
  addedIds: Set<string>
  onAddToLibrary: (id: string) => void
  delay?: number
}

export function ExploreSection({
  title,
  items,
  addedIds,
  onAddToLibrary,
  delay = 0,
}: ExploreSectionProps) {
  if (items.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">{title}</h2>
        <span className="text-xs font-medium text-muted">{items.length} titles</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.slice(0, 6).map((manhwa, index) => (
          <ExplorePosterCard
            key={manhwa.id}
            manhwa={manhwa}
            index={index}
            added={addedIds.has(manhwa.id)}
            onAddToLibrary={onAddToLibrary}
          />
        ))}
      </div>
    </motion.section>
  )
}
