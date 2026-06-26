import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  ActivityIcon,
  ExploreIcon,
  HomeIcon,
  LibraryIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
  SharedLibraryIcon,
} from '@/components/icons'
import { Logo } from '@/components/layout/Logo'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/utils/cn'

const navItems = [
  { label: 'Home', to: '/dashboard', icon: HomeIcon, end: true },
  {
    label: 'My Libraries',
    to: '/libraries/personal/reading-list',
    icon: LibraryIcon,
    matchPrefix: '/libraries/personal',
  },
  {
    label: 'Shared Libraries',
    to: '/libraries/shared/fantasy-obsessions',
    icon: SharedLibraryIcon,
    matchPrefix: '/libraries/shared',
  },
  { label: 'Explore', to: '/explore', icon: ExploreIcon },
  { label: 'Activity', to: '/notifications', icon: ActivityIcon, matchPrefix: '/notifications' },
  { label: 'Profile', to: '/profile', icon: ProfileIcon },
  { label: 'Settings', to: '/settings', icon: SettingsIcon, matchPrefix: '/settings' },
]

interface SidebarProps {
  mobileOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const isNavItemActive = (item: (typeof navItems)[number]) => {
    if (item.matchPrefix) return location.pathname.startsWith(item.matchPrefix)
    if (item.end) return location.pathname === item.to
    return location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    onClose?.()
  }

  const content = (
    <>
      <div className="px-2">
        <Logo size="sm" to="/dashboard" />
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-0.5 px-1" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={() =>
              cn(
                'flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium transition-colors',
                isNavItemActive(item)
                  ? 'bg-accent/12 text-accent dark:bg-accent/20'
                  : 'text-muted hover:bg-secondary/70 hover:text-foreground',
              )
            }
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 space-y-1 border-t border-border px-1 pt-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <ThemeToggle className="h-9 w-9 shrink-0" />
          <span className="text-sm text-muted">Theme</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-secondary/70 hover:text-foreground"
        >
          <LogoutIcon className="h-[18px] w-[18px] shrink-0" />
          Log out
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-[260px] shrink-0 flex-col border-r border-border bg-sidebar px-4 py-6 lg:flex" id="app-sidebar">
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={onClose}
          />
          <aside className="relative flex h-full w-[280px] max-w-[85vw] flex-col border-r border-border bg-sidebar px-4 py-6 shadow-[var(--shadow-soft)]">
            {content}
          </aside>
        </div>
      ) : null}
    </>
  )
}
