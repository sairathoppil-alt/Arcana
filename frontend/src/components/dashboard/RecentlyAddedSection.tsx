import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDashboardData } from '@/api/dashboard'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { ManhwaPoster } from '@/components/shared/ManhwaPoster'
import { cn } from '@/utils/cn'

export function RecentlyAddedSection() {
  const { data, loading } = useDashboardData()
  const recentlyAdded = data?.recentlyAdded ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
      className="h-full"
    >
      <DashboardCard className="flex h-full flex-col">
        <SectionHeader title="Recently Added" actionLabel="View all" />

        {loading ? (
          <div className="flex flex-1 items-center justify-center text-sm text-muted">Loading recent additions…</div>
        ) : recentlyAdded.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm text-muted">No recent additions yet.</div>
        ) : (
          <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-1 scrollbar-hide">
            {recentlyAdded.map((manhwa, index) => (
              <motion.div
                key={manhwa.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.15 + index * 0.06 }}
                whileHover={{ y: -4 }}
                className="w-[100px] shrink-0"
              >
                <Link to={`/manhwa/${manhwa.id}`} className="group block">
                  <ManhwaPoster manhwa={manhwa} size="sm" className="mx-auto w-full" />
                  <p className="mt-2 line-clamp-2 text-center text-xs font-medium text-foreground group-hover:text-accent">
                    {manhwa.title}
                  </p>
                  <p className="mt-0.5 text-center text-[11px] text-muted">Ch. {manhwa.chapter}</p>
                  <span
                    className={cn(
                      'mt-2 block rounded-[var(--radius-sm)] border border-border py-1 text-center text-[11px] font-medium',
                      'text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent',
                    )}
                  >
                    View
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </DashboardCard>
    </motion.div>
  )
}
