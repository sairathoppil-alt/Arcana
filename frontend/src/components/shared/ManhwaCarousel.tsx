import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ManhwaPoster } from '@/components/shared/ManhwaPoster'
import { StarRating } from '@/components/shared/StarRating'
import { pageSection } from '@/utils/motion'
import type { LibraryEntry } from '@/types/manhwa'
import { cn } from '@/utils/cn'

interface ManhwaCarouselProps {
  title: string
  subtitle?: string
  items: LibraryEntry[]
  delay?: number
  cardWidth?: 'sm' | 'md'
  className?: string
}

export function ManhwaCarousel({
  title,
  subtitle,
  items,
  delay = 0.24,
  cardWidth = 'md',
  className,
}: ManhwaCarouselProps) {
  if (items.length === 0) return null

  const widthClass = cardWidth === 'sm' ? 'w-[120px]' : 'w-[130px]'

  return (
    <motion.section
      variants={pageSection}
      initial="hidden"
      animate="visible"
      custom={delay}
      className={cn('dashboard-card rounded-[var(--radius-lg)] border p-5 sm:p-6', className)}
    >
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}

      <div
        className="-mx-1 mt-5 flex gap-4 overflow-x-auto px-1 pb-2 scrollbar-hide"
        role="list"
        aria-label={title}
      >
        {items.map((manhwa, index) => (
          <motion.div
            key={manhwa.id}
            role="listitem"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: delay + index * 0.07 }}
            whileHover={{ y: -6 }}
            className={cn('shrink-0', widthClass)}
          >
            <Link to={`/manhwa/${manhwa.id}`} className="group block">
              <ManhwaPoster manhwa={manhwa} size="lg" showTitleOverlay={false} className="w-full" />
              <p className="mt-2 line-clamp-2 text-xs font-medium text-foreground group-hover:text-accent">
                {manhwa.title}
              </p>
              {manhwa.rating > 0 ? (
                <div className="mt-1">
                  <StarRating rating={manhwa.rating} />
                </div>
              ) : null}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
