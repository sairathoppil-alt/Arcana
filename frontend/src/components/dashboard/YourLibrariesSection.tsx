import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDashboardData } from '@/api/dashboard'
import { BookStackIcon, ChevronRightIcon, UsersSmallIcon } from '@/components/icons'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import type { LibrarySummary } from '@/types/manhwa'
import { cn } from '@/utils/cn'

function LibraryRow({ library, index }: { library: LibrarySummary; index: number }) {
  const href =
    library.type === 'personal'
      ? `/libraries/personal/${library.id}`
      : `/libraries/shared/${library.id}`

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.2 + index * 0.06 }}
      whileHover={{ x: 2 }}
    >
      <Link
        to={href}
        className={cn(
          'flex items-center gap-3 rounded-[var(--radius-md)] border border-transparent p-2.5 transition-colors',
          'hover:border-border hover:bg-secondary/50',
        )}
      >
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)]',
            library.type === 'personal'
              ? 'bg-accent/10 text-accent'
              : 'bg-[var(--gold)]/15 text-[var(--gold)]',
          )}
        >
          {library.type === 'personal' ? (
            <BookStackIcon className="h-4 w-4" />
          ) : (
            <UsersSmallIcon className="h-4 w-4" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{library.name}</p>
          <p className="text-[11px] text-muted">
            {library.entryCount} entries · {library.lastUpdated}
          </p>
        </div>
        <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted" />
      </Link>
    </motion.div>
  )
}

function LibraryGroup({
  title,
  libraries,
  startIndex,
}: {
  title: string
  libraries: LibrarySummary[]
  startIndex: number
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">{title}</p>
      <div className="space-y-1">
        {libraries.map((library, i) => (
          <LibraryRow key={library.id} library={library} index={startIndex + i} />
        ))}
      </div>
    </div>
  )
}

export function YourLibrariesSection() {
  const { data, loading } = useDashboardData()
  const personalLibraries = data?.personalLibraries ?? []
  const sharedLibraries = data?.sharedLibraries ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.16, ease: 'easeOut' }}
      className="h-full"
    >
      <DashboardCard className="flex h-full flex-col">
        <SectionHeader title="Your Libraries" actionLabel="View all" />

        {loading ? (
          <div className="flex flex-1 items-center justify-center text-sm text-muted">Loading your libraries…</div>
        ) : (
          <div className="space-y-5">
            <LibraryGroup title="Personal Libraries" libraries={personalLibraries} startIndex={0} />
            <LibraryGroup title="Shared Libraries" libraries={sharedLibraries} startIndex={2} />
          </div>
        )}
      </DashboardCard>
    </motion.div>
  )
}
