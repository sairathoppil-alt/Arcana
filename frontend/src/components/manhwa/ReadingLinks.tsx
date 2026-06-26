import { DetailSection } from '@/components/manhwa/DetailSection'
import type { ReadingLink } from '@/types/manhwaDetail'
import { cn } from '@/utils/cn'

interface ReadingLinksProps {
  links: ReadingLink[]
  delay?: number
}

const linkIcons: Record<string, string> = {
  official: '🌐',
  tapas: '📖',
  webtoon: '📱',
  other: '🔗',
}

export function ReadingLinks({ links, delay = 0.24 }: ReadingLinksProps) {
  return (
    <DetailSection title="Reading Links" delay={delay}>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            onClick={(e) => e.preventDefault()}
            className={cn(
              'flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-secondary/30 p-3 transition-colors',
              'hover:border-accent/40 hover:bg-accent/8',
              'dark:bg-secondary/20 dark:backdrop-blur-sm',
            )}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-card text-lg">
              {linkIcons[link.id] ?? '🔗'}
            </span>
            <span className="text-sm font-medium text-foreground">{link.label}</span>
          </a>
        ))}
      </div>
    </DetailSection>
  )
}
