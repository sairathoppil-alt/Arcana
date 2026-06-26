interface TopBarMeta {
  title: string
  subtitle: string
}

const DEFAULT: TopBarMeta = {
  title: 'Arcana',
  subtitle: 'Your magical manhwa library',
}

const ROUTE_META: { match: (path: string) => boolean; meta: TopBarMeta }[] = [
  {
    match: (path) => path === '/dashboard',
    meta: { title: 'Dashboard', subtitle: "Here's what's happening in your library." },
  },
  {
    match: (path) => path.startsWith('/explore'),
    meta: { title: 'Explore', subtitle: 'Discover your next favorite manhwa.' },
  },
  {
    match: (path) => path.startsWith('/libraries/personal'),
    meta: { title: 'My Library', subtitle: 'Browse and manage your personal shelf.' },
  },
  {
    match: (path) => path.startsWith('/libraries/shared'),
    meta: { title: 'Shared Library', subtitle: 'Read together with your club.' },
  },
  {
    match: (path) => path.startsWith('/libraries/create'),
    meta: { title: 'Create Library', subtitle: 'Build a new magical collection.' },
  },
  {
    match: (path) => path.startsWith('/manhwa'),
    meta: { title: 'Manhwa Detail', subtitle: 'Dive into the story.' },
  },
  {
    match: (path) => path.startsWith('/profile'),
    meta: { title: 'Profile', subtitle: 'Your reading journal and stats.' },
  },
  {
    match: (path) => path.startsWith('/settings'),
    meta: { title: 'Settings', subtitle: 'Customize your Arcana experience.' },
  },
  {
    match: (path) => path.startsWith('/notifications'),
    meta: { title: 'Notifications', subtitle: 'Stay up to date with your library.' },
  },
]

export function getTopBarMeta(pathname: string, displayName: string): TopBarMeta {
  if (pathname === '/dashboard') {
    return {
      title: `Welcome back, ${displayName} ✨`,
      subtitle: "Here's what's happening in your library.",
    }
  }

  const match = ROUTE_META.find((route) => route.match(pathname))
  return match?.meta ?? DEFAULT
}
