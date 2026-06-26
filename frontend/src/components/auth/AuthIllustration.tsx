import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/utils/cn'

export function AuthIllustration() {
  const { theme } = useTheme()

  return (
    <div className="relative h-full min-h-[220px] w-full overflow-hidden lg:min-h-0">
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500',
          theme === 'light' ? 'opacity-100' : 'opacity-0',
        )}
        style={{ backgroundImage: 'url(/images/auth-light.svg)' }}
        aria-hidden="true"
      />
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500',
          theme === 'dark' ? 'opacity-100' : 'opacity-0',
        )}
        style={{ backgroundImage: 'url(/images/auth-dark.svg)' }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent dark:from-[#13111C]/50" />

      <div className="relative z-10 flex h-full flex-col justify-end p-8 lg:p-10">
        <p className="font-display text-2xl font-semibold text-white drop-shadow-md lg:text-3xl">
          ARCANA
        </p>
        <p className="mt-2 max-w-xs text-sm text-white/85 drop-shadow-sm">
          A magical library for manhwa lovers.
        </p>
      </div>
    </div>
  )
}
