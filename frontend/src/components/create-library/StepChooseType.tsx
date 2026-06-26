import { motion } from 'framer-motion'
import { BookStackIcon, SharedLibraryIcon } from '@/components/icons'
import type { LibraryType } from '@/types/createLibrary'
import { cn } from '@/utils/cn'

interface StepChooseTypeProps {
  selected: LibraryType | null
  onSelect: (type: LibraryType) => void
}

const options: {
  type: LibraryType
  title: string
  description: string
  icon: typeof BookStackIcon
}[] = [
  {
    type: 'personal',
    title: 'Personal Library',
    description: 'Private reading tracker.',
    icon: BookStackIcon,
  },
  {
    type: 'shared',
    title: 'Shared Library',
    description: 'Collaborate with friends.',
    icon: SharedLibraryIcon,
  },
]

export function StepChooseType({ selected, onSelect }: StepChooseTypeProps) {
  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          Choose Library Type
        </h2>
        <p className="mt-2 text-sm text-muted">
          Start a private collection or build a shared shelf with friends.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {options.map((option, index) => {
          const isSelected = selected === option.type
          const Icon = option.icon

          return (
            <motion.button
              key={option.type}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option.type)}
              className={cn(
                'dashboard-card group flex flex-col items-center rounded-[var(--radius-xl)] border p-8 text-center transition-shadow',
                isSelected
                  ? 'border-accent shadow-[0_0_0_1px_var(--accent),var(--shadow-soft)]'
                  : 'hover:shadow-[var(--shadow-soft)]',
              )}
            >
              <div
                className={cn(
                  'mb-5 flex h-16 w-16 items-center justify-center rounded-[var(--radius-lg)] transition-colors',
                  isSelected
                    ? 'bg-accent/15 text-accent'
                    : 'bg-secondary/80 text-muted group-hover:text-accent',
                )}
              >
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">{option.title}</h3>
              <p className="mt-2 text-sm text-muted">{option.description}</p>
              {isSelected ? (
                <motion.span
                  layoutId="type-selected-ring"
                  className="mt-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
                >
                  Selected
                </motion.span>
              ) : null}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
