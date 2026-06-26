import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import type { LibraryType } from '@/types/createLibrary'

interface StepSuccessProps {
  libraryName: string
  libraryType: LibraryType
  librarySlug: string
}

const SPARKLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${10 + (i * 7) % 80}%`,
  delay: i * 0.08,
  size: 4 + (i % 3) * 2,
}))

export function StepSuccess({ libraryName, libraryType, librarySlug }: StepSuccessProps) {
  const libraryPath =
    libraryType === 'shared'
      ? `/libraries/shared/${librarySlug}`
      : `/libraries/personal/${librarySlug}`

  return (
    <div className="relative flex flex-col items-center py-8 text-center">
      {SPARKLES.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="pointer-events-none absolute rounded-full bg-[var(--gold)]"
          style={{
            left: sparkle.x,
            top: `${20 + (sparkle.id % 4) * 12}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            y: [-10, -40],
          }}
          transition={{
            duration: 1.8,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="relative mb-8"
      >
        <div
          className="absolute inset-0 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
        />
        <svg viewBox="0 0 200 200" className="relative h-40 w-40 sm:h-48 sm:w-48" aria-hidden="true">
          <circle cx="100" cy="100" r="80" fill="var(--accent)" opacity="0.12" />
          <rect x="55" y="70" width="24" height="70" rx="3" fill="var(--accent)" opacity="0.5" />
          <rect x="88" y="55" width="28" height="85" rx="3" fill="var(--gold)" opacity="0.65" />
          <rect x="125" y="75" width="22" height="65" rx="3" fill="var(--accent)" opacity="0.4" />
          <path
            d="M100 45 L105 55 L115 57 L107 65 L109 75 L100 70 L91 75 L93 65 L85 57 L95 55 Z"
            fill="var(--gold)"
            opacity="0.9"
          />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-2xl font-semibold text-foreground sm:text-3xl"
      >
        ✨ Library Created Successfully
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 max-w-md text-sm text-muted"
      >
        <span className="font-medium text-foreground">{libraryName || 'Your library'}</span> is ready.
        Start adding manhwa and sharing recommendations.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
      >
        <Link
          to={libraryPath}
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-accent px-7 text-base font-medium text-white transition-colors hover:bg-accent-hover dark:text-[var(--accent-foreground)]"
        >
          Open Library
        </Link>
        <Link to="/dashboard">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
