import { Link, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthIllustration } from '@/components/auth/AuthIllustration'
import { ThemeToggle } from '@/components/shared/ThemeToggle'

export function AuthLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-primary text-foreground">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Illustration panel — ~40% on desktop */}
        <div className="relative lg:w-[40%] lg:shrink-0">
          <AuthIllustration />
        </div>

        {/* Form panel — ~60% on desktop */}
        <div className="relative flex flex-1 flex-col">
          <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
            <ThemeToggle />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
            <Link
              to="/"
              className="mb-8 font-display text-sm font-medium tracking-[0.2em] text-muted transition-colors hover:text-foreground lg:hidden"
            >
              ARCANA
            </Link>

            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex w-full justify-center"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
