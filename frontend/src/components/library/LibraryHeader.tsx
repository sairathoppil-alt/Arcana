import { motion } from 'framer-motion'
import { PencilIcon, PlusIcon } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { fadeUp } from '@/utils/motion'
import type { PersonalLibrary } from '@/types/manhwa'

interface LibraryHeaderProps {
  library: PersonalLibrary
}

export function LibraryHeader({ library }: LibraryHeaderProps) {
  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="flex gap-4 sm:gap-5">
        <div
          className="h-[88px] w-[64px] shrink-0 overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-card)] sm:h-[104px] sm:w-[76px]"
          style={{
            background: `linear-gradient(160deg, ${library.coverFrom} 0%, ${library.coverTo} 100%)`,
          }}
          aria-hidden="true"
        >
          <div
            className="h-full w-full opacity-40"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${library.coverAccent ?? '#ffffff'}88, transparent 60%)`,
            }}
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              {library.name}
            </h1>
            <button
              type="button"
              aria-label="Edit library"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-secondary/70 hover:text-foreground"
            >
              <PencilIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-1 text-sm text-muted">{library.description}</p>
          <p className="mt-2 text-sm font-medium text-foreground">
            {library.entryCount} {library.entryCount === 1 ? 'Entry' : 'Entries'}
          </p>
        </div>
      </div>

      <Button className="shrink-0 gap-2">
        <PlusIcon className="h-4 w-4" aria-hidden="true" />
        Add Manhwa
      </Button>
    </motion.header>
  )
}
