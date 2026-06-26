import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import type { ProfileUser } from '@/types/profile'

interface ProfileHeaderProps {
  user: ProfileUser
  delay?: number
}

export function ProfileHeader({ user, delay = 0 }: ProfileHeaderProps) {
  const [editHint, setEditHint] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="dashboard-card relative overflow-hidden rounded-[var(--radius-lg)] border p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${user.avatarColor}, transparent 70%)` }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.1, type: 'spring', stiffness: 200 }}
            className="relative shrink-0"
          >
            <div
              className="flex h-28 w-28 items-center justify-center rounded-full border-[3px] font-display text-4xl font-semibold text-white shadow-[var(--shadow-soft)] sm:h-32 sm:w-32 sm:text-5xl"
              style={{
                backgroundColor: user.avatarColor,
                borderColor: 'var(--gold)',
              }}
              aria-hidden="true"
            >
              {user.displayName.charAt(0).toUpperCase()}
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-[var(--gold)] text-sm">
              ✨
            </span>
          </motion.div>

          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-muted">@{user.username}</p>
            <h1 className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              {user.displayName}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{user.bio}</p>
            <p className="mt-3 text-xs font-medium text-muted/80">
              Joined <span className="text-foreground">{user.joinDate}</span>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2 sm:items-end">
          <Button
            variant="outline"
            size="md"
            onClick={() => setEditHint(true)}
            className="w-full sm:w-auto"
          >
            Edit Profile
          </Button>
          <AnimatePresence>
            {editHint ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-muted"
              >
                Profile editing coming soon
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}
