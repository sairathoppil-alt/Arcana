import { ManhwaCarousel } from '@/components/shared/ManhwaCarousel'
import type { LibraryEntry } from '@/types/manhwa'

interface FavoriteManhwaCarouselProps {
  items: LibraryEntry[]
  delay?: number
}

export function FavoriteManhwaCarousel({ items, delay = 0.24 }: FavoriteManhwaCarouselProps) {
  return (
    <ManhwaCarousel
      title="Favorite Manhwa"
      subtitle="Titles you keep coming back to"
      items={items}
      delay={delay}
    />
  )
}
