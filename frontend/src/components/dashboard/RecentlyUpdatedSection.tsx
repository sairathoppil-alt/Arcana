import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDashboardData } from '@/api/dashboard'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { ManhwaPoster } from '@/components/shared/ManhwaPoster'

export function RecentlyUpdatedSection() {
  const { data, loading } = useDashboardData()
  const recentlyUpdatedShared = data?.recentlyUpdatedShared ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.24, ease: 'easeOut' }}
    >
      <DashboardCard>
        <SectionHeader title="Recently Updated in Shared Libraries" actionLabel="See all" />

        {loading ? (
          <div className="py-6 text-center text-sm text-muted">Loading shared-library activity…</div>
        ) : recentlyUpdatedShared.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted">No shared-library activity yet.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {recentlyUpdatedShared.map((manhwa, index) => (
              <motion.div
                key={manhwa.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3 + index * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <Link to={`/manhwa/${manhwa.id}`} className="group block">
                  <ManhwaPoster
                    manhwa={manhwa}
                    size="lg"
                    className="mx-auto w-full max-w-[120px] transition-shadow group-hover:shadow-[var(--shadow-soft)]"
                  />
                  <p className="mt-2 line-clamp-2 text-center text-xs font-medium text-foreground group-hover:text-accent">
                    {manhwa.title}
                  </p>
                  <p className="mt-0.5 text-center text-[11px] text-muted">Ch. {manhwa.chapter}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </DashboardCard>
    </motion.div>
  )
}
