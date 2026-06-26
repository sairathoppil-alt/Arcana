import { cn } from '@/utils/cn'
import type { Manhwa } from '@/types/manhwa'

type PosterSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid'

interface ManhwaPosterProps {
  manhwa: Pick<Manhwa, 'title' | 'coverFrom' | 'coverTo' | 'coverAccent'>
  size?: PosterSize
  className?: string
  showTitleOverlay?: boolean
}

const sizeClasses: Record<PosterSize, string> = {
  xs: 'h-[88px] w-[60px] text-[8px]',
  sm: 'h-[108px] w-[72px] text-[9px]',
  md: 'h-[140px] w-[94px] text-[10px]',
  lg: 'h-[180px] w-[120px] text-[11px]',
  xl: 'h-[220px] w-[148px] text-xs',
  fluid: 'aspect-[2/3] h-auto w-full text-[10px]',
}

export function ManhwaPoster({
  manhwa,
  size = 'md',
  className,
  showTitleOverlay = true,
}: ManhwaPosterProps) {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-[var(--radius-sm)] shadow-[var(--shadow-card)]',
        sizeClasses[size],
        className,
      )}
      style={{
        background: `linear-gradient(160deg, ${manhwa.coverFrom} 0%, ${manhwa.coverTo} 100%)`,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${manhwa.coverAccent ?? '#ffffff'}55, transparent 55%)`,
        }}
      />
      <div
        className="absolute left-1.5 top-1.5 h-6 w-1 rounded-full opacity-60"
        style={{ backgroundColor: manhwa.coverAccent ?? '#ffffff' }}
      />
      {showTitleOverlay ? (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-1.5">
          <span className="line-clamp-2 font-display font-medium leading-tight text-white/90">
            {manhwa.title}
          </span>
        </div>
      ) : null}
    </div>
  )
}
