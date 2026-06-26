import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ThemeMode, ThemePreference } from '@/theme'

interface ThemeContextValue {
  theme: ThemeMode
  preference: ThemePreference
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
  setThemePreference: (preference: ThemePreference) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'arcana-theme'

function getSystemTheme(): ThemeMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(preference: ThemePreference): ThemeMode {
  if (preference === 'system') return getSystemTheme()
  return preference
}

function getInitialPreference(): ThemePreference {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return getSystemTheme()
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(getInitialPreference)
  const [theme, setThemeState] = useState<ThemeMode>(() => resolveTheme(getInitialPreference()))

  useEffect(() => {
    const resolved = resolveTheme(preference)
    setThemeState(resolved)
    const root = document.documentElement
    root.classList.add('theme-transition')
    root.classList.toggle('dark', resolved === 'dark')
    localStorage.setItem(STORAGE_KEY, preference)
    const timer = window.setTimeout(() => root.classList.remove('theme-transition'), 300)
    return () => window.clearTimeout(timer)
  }, [preference])

  useEffect(() => {
    if (preference !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const resolved = resolveTheme('system')
      setThemeState(resolved)
      document.documentElement.classList.toggle('dark', resolved === 'dark')
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [preference])

  const setTheme = useCallback((next: ThemeMode) => {
    setPreferenceState(next)
  }, [])

  const setThemePreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setPreferenceState((current) => {
      const resolved = resolveTheme(current)
      return resolved === 'light' ? 'dark' : 'light'
    })
  }, [])

  const value = useMemo(
    () => ({ theme, preference, toggleTheme, setTheme, setThemePreference }),
    [theme, preference, toggleTheme, setTheme, setThemePreference],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
