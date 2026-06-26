import { motion } from 'framer-motion'
import { PencilIcon, PlusIcon } from '@/components/icons'
import type { SharedLibrary } from '@/types/sharedLibrary'

interface SharedLibraryHeaderProps {
  library: SharedLibrary
  onInvite?: () => void
}

export function SharedLibraryHeader({ library, onInvite }: SharedLibraryHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="flex gap-4 sm:gap-5">
        <div
          className="h-[88px] w-[120px] shrink-0 overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-card)] sm:h-[100px] sm:w-[140px]"
          style={{
            background: `linear-gradient(135deg, ${library.coverFrom} 0%, ${library.coverTo} 55%, ${library.coverAccent ?? '#d4af37'} 100%)`,
          }}
        >
          <div className="flex h-full w-full items-end justify-center p-2 opacity-80">
            <div className="flex -space-x-2">
              <div className="h-8 w-6 rounded-sm bg-white/20" />
              <div className="h-10 w-7 rounded-sm bg-white/30" />
              <div className="h-7 w-5 rounded-sm bg-white/15" />
            </div>
          </div>
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
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-sm text-muted">{library.description}</p>
          <p className="mt-2 text-sm font-medium text-foreground">
            {library.memberCount} {library.memberCount === 1 ? 'Member' : 'Members'}
            <span className="text-muted"> · Created by {library.createdBy}</span>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onInvite}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-hover dark:text-[var(--accent-foreground)]"
      >
        <PlusIcon className="h-4 w-4" />
        Invite Members
      </button>
    </motion.header>
  )
}
