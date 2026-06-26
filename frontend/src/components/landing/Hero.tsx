import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Logo } from '@/components/layout/Logo'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/utils/cn'

export function Hero() {
  const { theme } = useTheme()

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-[72px]"
    >
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500',
          theme === 'light' ? 'opacity-100' : 'opacity-0',
        )}
        style={{ backgroundImage: 'url(/images/hero-light.svg)' }}
        aria-hidden="true"
      />
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500',
          theme === 'dark' ? 'opacity-100' : 'opacity-0',
        )}
        style={{ backgroundImage: 'url(/images/hero-dark.svg)' }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--hero-overlay)' }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_78%)] opacity-80" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-5 font-display text-xl font-medium text-foreground md:text-2xl"
        >
          Share. Track. Recommend.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-3 text-base text-muted md:text-lg"
        >
          A magical library for manhwa lovers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/signup"
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-accent px-7 text-base font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Start Your Library
          </Link>
          <a
            href="#features"
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] border border-border bg-transparent px-7 text-base font-medium text-foreground transition-colors hover:bg-secondary/50"
          >
            Explore Libraries
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
