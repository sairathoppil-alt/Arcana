import { motion } from 'framer-motion'
import { STATUS_LABELS, type ManhwaStatus } from '@/types/manhwa'
import { getProgressPercent } from '@/types/manhwaDetail'
import type { ManhwaDetail } from '@/types/manhwaDetail'
import { cn } from '@/utils/cn'

interface ProgressRingProps {
  percent: number
  size?: number
  strokeWidth?: number
}

export function ProgressRing({ percent, size = 88, strokeWidth = 6 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <span className="absolute font-display text-sm font-semibold text-foreground">{percent}%</span>
    </div>
  )
}

interface StatusBadgeProps {
  status: ManhwaStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {STATUS_LABELS[status]}
    </span>
  )
}

interface ManhwaPosterColumnProps {
  manhwa: ManhwaDetail
}

export function ManhwaPosterColumn({ manhwa }: ManhwaPosterColumnProps) {
  const percent = getProgressPercent(manhwa.chapter, manhwa.totalChapters)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="flex flex-col items-center gap-5 lg:items-start"
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-[280px]"
      >
        <div
          className="aspect-[2/3] w-full overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-soft)]"
          style={{
            background: `linear-gradient(160deg, ${manhwa.coverFrom} 0%, ${manhwa.coverTo} 100%)`,
          }}
        >
          <div
            className="h-full w-full opacity-35"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${manhwa.coverAccent ?? '#ffffff'}66, transparent 55%)`,
            }}
          />
        </div>
      </motion.div>

      <div className="flex w-full max-w-[280px] flex-col items-center gap-4">
        <ProgressRing percent={percent} />
        <StatusBadge status={manhwa.status} />
      </div>
    </motion.div>
  )
}
