import { cn } from '@/utils/cn'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md'
  className?: string
}

export function StarRating({ rating, max = 5, size = 'sm', className }: StarRatingProps) {
  const starSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'

  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < rating
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={cn(starSize, filled ? 'text-[var(--gold)]' : 'text-border')}
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M12 3l2.2 5.2L20 9l-4 3.5L17 18l-5-2.8L7 18l1-5.5L4 9l5.8-.8L12 3z" />
          </svg>
        )
      })}
    </div>
  )
}
