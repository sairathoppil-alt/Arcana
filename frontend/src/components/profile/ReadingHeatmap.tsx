import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HeatmapDay } from '@/types/profile'

interface ReadingHeatmapProps {
  days: HeatmapDay[]
  delay?: number
}

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatTooltipDate(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

function getIntensity(chapters: number): number {
  if (chapters === 0) return 0
  if (chapters <= 2) return 1
  if (chapters <= 4) return 2
  if (chapters <= 6) return 3
  return 4
}

function buildWeeks(days: HeatmapDay[]): (HeatmapDay | null)[][] {
  if (days.length === 0) return []

  const first = new Date(`${days[0].date}T12:00:00`)
  const leading = first.getDay()
  const padded: (HeatmapDay | null)[] = [...Array(leading).fill(null), ...days]

  const weeks: (HeatmapDay | null)[][] = []
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7))
  }

  const lastWeek = weeks[weeks.length - 1]
  if (lastWeek && lastWeek.length < 7) {
    while (lastWeek.length < 7) lastWeek.push(null)
  }

  return weeks
}

function getMonthLabels(weeks: (HeatmapDay | null)[][]): { label: string; weekIndex: number }[] {
  const labels: { label: string; weekIndex: number }[] = []
  let lastMonth = -1

  weeks.forEach((week, weekIndex) => {
    const firstDay = week.find((day) => day !== null)
    if (!firstDay) return
    const date = new Date(`${firstDay.date}T12:00:00`)
    const month = date.getMonth()
    if (month !== lastMonth) {
      labels.push({ label: MONTH_LABELS[month], weekIndex })
      lastMonth = month
    }
  })

  return labels
}

export function ReadingHeatmap({ days, delay = 0.12 }: ReadingHeatmapProps) {
  const [hovered, setHovered] = useState<HeatmapDay | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const weeks = useMemo(() => buildWeeks(days), [days])
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks])
  const totalChapters = useMemo(() => days.reduce((sum, day) => sum + day.chapters, 0), [days])
  const activeDays = useMemo(() => days.filter((day) => day.chapters > 0).length, [days])

  const intensityColors = [
    'bg-secondary/50 dark:bg-secondary/30',
    'bg-accent/25 dark:bg-accent/30',
    'bg-accent/45 dark:bg-accent/50',
    'bg-accent/65 dark:bg-accent/70',
    'bg-accent dark:bg-accent',
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="dashboard-card rounded-[var(--radius-lg)] border p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">Reading Activity</h2>
          <p className="mt-1 text-sm text-muted">
            {totalChapters} chapters across {activeDays} days this year
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted">
          <span>Less</span>
          {intensityColors.map((color, i) => (
            <span key={i} className={`h-3 w-3 rounded-[3px] ${color}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="relative mt-5 overflow-x-auto pb-2">
        <div className="min-w-[640px]">
          <div className="mb-2 flex pl-8 text-[10px] font-medium text-muted">
            {monthLabels.map(({ label, weekIndex }) => (
              <span
                key={`${label}-${weekIndex}`}
                className="absolute"
                style={{ left: `${32 + weekIndex * 14}px` }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="relative flex gap-[3px] pt-5">
            <div className="flex flex-col gap-[3px] pr-1 pt-[1px] text-[9px] text-muted">
              {WEEKDAY_LABELS.map((label, i) => (
                <span key={label} className="flex h-[11px] items-center leading-none">
                  {i % 2 === 1 ? label : ''}
                </span>
              ))}
            </div>

            <div className="flex gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIndex) => {
                    if (!day) {
                      return <span key={dayIndex} className="h-[11px] w-[11px]" />
                    }

                    const intensity = getIntensity(day.chapters)

                    return (
                      <motion.button
                        key={day.date}
                        type="button"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15, delay: delay + weekIndex * 0.005 }}
                        whileHover={{ scale: 1.25 }}
                        className={`h-[11px] w-[11px] rounded-[3px] border border-transparent transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${intensityColors[intensity]}`}
                        onMouseEnter={(e) => {
                          setHovered(day)
                          const rect = e.currentTarget.getBoundingClientRect()
                          setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top })
                        }}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={(e) => {
                          setHovered(day)
                          const rect = e.currentTarget.getBoundingClientRect()
                          setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top })
                        }}
                        onBlur={() => setHovered(null)}
                        aria-label={
                          day.chapters > 0
                            ? `Read ${day.chapters} chapter${day.chapters === 1 ? '' : 's'} on ${formatTooltipDate(day.date)}`
                            : `No reading on ${formatTooltipDate(day.date)}`
                        }
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {hovered ? (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-[var(--radius-sm)] border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-[var(--shadow-soft)]"
              style={{ left: tooltipPos.x, top: tooltipPos.y - 8 }}
            >
              {hovered.chapters > 0
                ? `Read ${hovered.chapters} chapter${hovered.chapters === 1 ? '' : 's'} on ${formatTooltipDate(hovered.date)}`
                : `No reading on ${formatTooltipDate(hovered.date)}`}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
