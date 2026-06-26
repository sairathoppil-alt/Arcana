import { type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BellIcon, MenuIcon } from '@/components/icons'
import { SearchInput } from '@/components/ui/SearchInput'
import { DASHBOARD_USER } from '@/data/mockDashboard'
import { useAuth } from '@/contexts/AuthContext'
import { getTopBarMeta } from '@/utils/topBarMeta'

interface TopBarProps {
  onMenuClick?: () => void
  mobileNavOpen?: boolean
}

export function TopBar({ onMenuClick, mobileNavOpen = false }: TopBarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const displayName = user?.displayName ?? DASHBOARD_USER.displayName
  const avatarInitial = displayName.charAt(0).toUpperCase()
  const { title, subtitle } = getTopBarMeta(location.pathname, displayName)

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = String(formData.get('q') ?? '').trim()
    navigate(query ? `/explore?q=${encodeURIComponent(query)}` : '/explore')
  }

  return (
    <header className="border-b border-border/60 bg-primary/80 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border text-foreground transition-colors hover:bg-secondary/70 lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={mobileNavOpen}
            aria-controls="app-sidebar"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <div>
            <h1 className="font-display text-xl font-semibold text-foreground sm:text-2xl">{title}</h1>
            <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <form onSubmit={handleSearch} className="min-w-0 flex-1 sm:w-64 sm:flex-none lg:w-72">
            <SearchInput
              name="q"
              inputSize="md"
              label="Search manhwa"
              placeholder="Search manhwa..."
              defaultValue={
                location.pathname === '/explore'
                  ? new URLSearchParams(location.search).get('q') ?? ''
                  : ''
              }
            />
          </form>

          <Link
            to="/notifications"
            aria-label="View notifications"
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary/70 dark:bg-secondary/40 dark:backdrop-blur-sm"
          >
            <BellIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          </Link>

          <Link
            to="/profile"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--gold)]/50 bg-accent/15 font-display text-sm font-semibold text-accent transition-colors hover:bg-accent/25"
            aria-label={`${displayName}'s profile`}
          >
            {avatarInitial}
          </Link>
        </div>
      </div>
    </header>
  )
}
