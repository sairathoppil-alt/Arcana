import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDashboardData } from '@/api/dashboard'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { ManhwaPoster } from '@/components/shared/ManhwaPoster'

export function ContinueReadingCard() {
  const { data, loading } = useDashboardData()
  const continueReading = data?.continueReading

  const progress = continueReading && continueReading.totalChapters
    ? Math.min(100, Math.round(((continueReading.chapter ?? 0) / continueReading.totalChapters) * 100))
    : 0

  if (loading || !continueReading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="h-full"
      >
        <DashboardCard className="flex h-full flex-col">
          <SectionHeader title="Continue Reading" />
          <div className="flex flex-1 items-center justify-center text-sm text-muted">
            {loading ? 'Loading your reading progress…' : 'No recent reading activity yet.'}
          </div>
        </DashboardCard>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="h-full"
    >
      <DashboardCard className="flex h-full flex-col">
        <SectionHeader title="Continue Reading" />

        <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:items-center">
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <ManhwaPoster manhwa={continueReading} size="xl" className="mx-auto sm:mx-0" />
          </motion.div>

          <div className="flex flex-1 flex-col justify-center">
            <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">{continueReading.title}</h3>
            <p className="mt-1 text-sm text-muted">
              Chapter {continueReading.chapter}
              {continueReading.totalChapters ? ` of ${continueReading.totalChapters}` : ''}
            </p>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted">
                <span>Progress</span>
                <span className="font-medium text-[var(--gold)]">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
            </div>

            <div className="mt-5">
              <Link
                to={`/manhwa/${continueReading.id}`}
                className="inline-flex h-12 w-full items-center justify-center rounded-[var(--radius-md)] bg-accent px-7 text-base font-medium text-white transition-colors hover:bg-accent-hover sm:w-auto"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  )
}
