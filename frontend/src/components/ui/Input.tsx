import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 w-full rounded-[var(--radius-md)] border border-border bg-card px-4 text-sm text-foreground',
            'placeholder:text-muted/70 transition-colors',
            'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25',
            'dark:bg-secondary/40 dark:backdrop-blur-sm',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/25',
            className,
          )}
          {...props}
        />
        {error ? <p className="mt-1.5 text-xs text-red-500">{error}</p> : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
