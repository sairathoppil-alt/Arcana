import { ManhwaCarousel } from '@/components/shared/ManhwaCarousel'
import type { LibraryEntry } from '@/types/manhwa'

interface RelatedManhwaCarouselProps {
  items: LibraryEntry[]
  delay?: number
}

export function RelatedManhwaCarousel({ items, delay = 0.32 }: RelatedManhwaCarouselProps) {
  return (
    <ManhwaCarousel
      title="Related Manhwa"
      items={items}
      delay={delay}
      cardWidth="sm"
    />
  )
}
