import { cn } from '@/utils/cn'

interface UserAvatarProps {
  name: string
  color: string
  size?: 'sm' | 'md' | 'lg'
  online?: boolean
  className?: string
}

const sizeMap = {
  sm: 'h-8 w-8 text-xs border',
  md: 'h-10 w-10 text-sm border-2',
  lg: 'h-14 w-14 text-base border-2',
}

export function UserAvatar({ name, color, size = 'md', online, className }: UserAvatarProps) {
  const initial = name.charAt(0).toUpperCase()
  const dotSize = size === 'sm' ? 'h-2.5 w-2.5 border' : 'h-3 w-3 border-2'

  return (
    <div className={cn('relative shrink-0', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-full font-display font-semibold text-white',
          sizeMap[size],
        )}
        style={{
          backgroundColor: color,
          borderColor: 'var(--gold)',
          opacity: 0.92,
        }}
        aria-hidden="true"
      >
        {initial}
      </div>
      {online ? (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-card bg-emerald-500',
            dotSize,
          )}
          aria-label="Online"
        />
      ) : null}
    </div>
  )
}
