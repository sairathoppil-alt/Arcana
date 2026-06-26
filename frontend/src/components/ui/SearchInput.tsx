import { forwardRef, type InputHTMLAttributes } from 'react'
import { SearchIcon } from '@/components/icons'
import { cn } from '@/utils/cn'

type SearchSize = 'sm' | 'md' | 'lg'

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  inputSize?: SearchSize
  label?: string
}

const sizeClasses: Record<SearchSize, { input: string; icon: string; padding: string }> = {
  sm: { input: 'h-9 text-sm', icon: 'h-4 w-4', padding: 'pl-9 pr-3' },
  md: { input: 'h-10 text-sm', icon: 'h-4 w-4', padding: 'pl-10 pr-4' },
  lg: { input: 'h-12 text-sm', icon: 'h-5 w-5', padding: 'pl-12 pr-4' },
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, inputSize = 'md', label = 'Search', id, ...props }, ref) => {
    const inputId = id ?? 'search-input'
    const sizes = sizeClasses[inputSize]

    return (
      <div className={cn('relative min-w-0', className)}>
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
        <SearchIcon
          className={cn(
            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted',
            sizes.icon,
            inputSize === 'lg' && 'left-4',
          )}
          aria-hidden="true"
        />
        <input
          ref={ref}
          id={inputId}
          type="search"
          className={cn(
            'w-full rounded-[var(--radius-md)] border border-border bg-card text-foreground shadow-[var(--shadow-card)]',
            'placeholder:text-muted/70 transition-colors',
            'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25',
            'dark:bg-secondary/40 dark:backdrop-blur-sm',
            inputSize === 'lg' && 'rounded-[var(--radius-lg)]',
            sizes.input,
            sizes.padding,
          )}
          {...props}
        />
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'
