export const themeTokens = {
  light: {
    bgPrimary: '#F5F0E8',
    bgSecondary: '#EDE6DA',
    bgCard: '#FFFCF7',
    textPrimary: '#3D2E1F',
    textMuted: '#7A6B5D',
    accent: '#8B3A4A',
    accentHover: '#6E2E3B',
    border: '#D4C9B8',
    sidebarBg: '#F0EAE0',
    heroOverlay: 'rgba(245, 240, 232, 0.55)',
  },
  dark: {
    bgPrimary: '#13111C',
    bgSecondary: '#1E1B2E',
    bgCard: 'rgba(30, 27, 46, 0.85)',
    textPrimary: '#E8E0F0',
    textMuted: '#9B8FB0',
    accent: '#B8A4E8',
    accentHover: '#C9B8F0',
    border: '#3D3555',
    sidebarBg: '#1A1528',
    heroOverlay: 'rgba(19, 17, 28, 0.65)',
  },
} as const

export type ThemeMode = 'light' | 'dark'
export type ThemePreference = ThemeMode | 'system'
