import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp } from '@/utils/motion'
import { cn } from '@/utils/cn'

export type EmptyStateVariant =
  | 'library'
  | 'search'
  | 'notifications'
  | 'profile'
  | 'offline'
  | 'not-found'
  | 'generic'

interface EmptyStateProps {
  variant?: EmptyStateVariant
  title: string
  description: string
  action?: ReactNode
  className?: string
}

function EmptyIllustration({ variant }: { variant: EmptyStateVariant }) {
  switch (variant) {
    case 'library':
      return (
        <div className="relative mb-6 h-40 w-40">
          <div
            className="absolute inset-0 rounded-full opacity-30 blur-2xl"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
          />
          <svg viewBox="0 0 160 160" className="relative h-full w-full" aria-hidden="true">
            <rect x="30" y="40" width="28" height="80" rx="3" fill="var(--accent)" opacity="0.35" />
            <rect x="66" y="28" width="28" height="92" rx="3" fill="var(--gold)" opacity="0.45" />
            <rect x="102" y="48" width="28" height="72" rx="3" fill="var(--accent)" opacity="0.3" />
            <path d="M20 130h120" stroke="var(--border)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="80" cy="22" r="4" fill="var(--gold)" opacity="0.8" />
          </svg>
        </div>
      )
    case 'search':
      return (
        <svg viewBox="0 0 120 120" className="mb-6 h-28 w-28 opacity-80" aria-hidden="true">
          <circle cx="52" cy="52" r="28" fill="none" stroke="var(--accent)" strokeWidth="3" opacity="0.4" />
          <line x1="72" y1="72" x2="95" y2="95" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <rect x="30" y="85" width="18" height="24" rx="2" fill="var(--gold)" opacity="0.35" />
          <rect x="52" y="78" width="20" height="31" rx="2" fill="var(--accent)" opacity="0.3" />
          <rect x="76" y="88" width="16" height="21" rx="2" fill="var(--gold)" opacity="0.25" />
        </svg>
      )
    case 'notifications':
      return (
        <svg viewBox="0 0 140 120" className="mb-6 h-32 w-36 opacity-90" aria-hidden="true">
          <circle cx="70" cy="48" r="32" fill="none" stroke="var(--accent)" strokeWidth="2.5" opacity="0.35" />
          <path d="M70 24v6M70 66v6M46 48h-6M100 48h6" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <path d="M52 36c4-6 12-8 18-6s12 10 12 18c0 10-8 18-18 18" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
          <rect x="38" y="82" width="16" height="22" rx="2" fill="var(--gold)" opacity="0.3" />
          <rect x="58" y="76" width="18" height="28" rx="2" fill="var(--accent)" opacity="0.25" />
        </svg>
      )
    case 'offline':
      return (
        <svg viewBox="0 0 120 120" className="mb-6 h-28 w-28 opacity-80" aria-hidden="true">
          <circle cx="60" cy="60" r="36" fill="none" stroke="var(--accent)" strokeWidth="2.5" opacity="0.35" />
          <path d="M30 90 Q60 50 90 90" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          <line x1="38" y1="38" x2="82" y2="82" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        </svg>
      )
    case 'not-found':
      return (
        <span className="mb-4 text-5xl" aria-hidden="true">
          🔮
        </span>
      )
    case 'profile':
      return (
        <span className="mb-4 text-5xl" aria-hidden="true">
          📖
        </span>
      )
    default:
      return (
        <svg viewBox="0 0 100 100" className="mb-6 h-24 w-24 opacity-70" aria-hidden="true">
          <rect x="25" y="20" width="20" height="60" rx="2" fill="var(--accent)" opacity="0.3" />
          <rect x="50" y="28" width="20" height="52" rx="2" fill="var(--gold)" opacity="0.35" />
        </svg>
      )
  }
}

export function EmptyState({
  variant = 'generic',
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      role="status"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn(
        'dashboard-card flex flex-col items-center justify-center rounded-[var(--radius-xl)] border px-6 py-16 text-center',
        className,
      )}
    >
      <EmptyIllustration variant={variant} />
      <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </motion.div>
  )
}
