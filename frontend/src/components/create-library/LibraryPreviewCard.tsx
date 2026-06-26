import type { LibraryType, PrivacySetting } from '@/types/createLibrary'

interface LibraryPreviewCardProps {
  name: string
  description: string
  type: LibraryType | null
  coverPreview: string | null
  privacy: PrivacySetting
  memberCount?: number
}

const privacyLabels: Record<PrivacySetting, string> = {
  public: 'Public',
  private: 'Private',
  'invite-only': 'Invite Only',
}

const defaultGradients = {
  personal: { from: '#4a2c5c', to: '#8b3a4a', accent: '#d4af37' },
  shared: { from: '#2a1e4a', to: '#6b4a8b', accent: '#d4af37' },
}

export function LibraryPreviewCard({
  name,
  description,
  type,
  coverPreview,
  privacy,
  memberCount = 1,
}: LibraryPreviewCardProps) {
  const gradient = type === 'shared' ? defaultGradients.shared : defaultGradients.personal
  const displayName = name.trim() || 'My Library'
  const displayDescription = description.trim() || 'Your magical manhwa collection awaits...'

  return (
    <div className="dashboard-card sticky top-6 rounded-[var(--radius-xl)] border p-6">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-muted">Live Preview</p>

      <div
        className="mb-4 h-[120px] w-full overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-card)]"
        style={
          coverPreview
            ? undefined
            : {
                background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 55%, ${gradient.accent} 100%)`,
              }
        }
      >
        {coverPreview ? (
          <img src={coverPreview} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-end justify-center p-3 opacity-70">
            <div className="flex -space-x-1">
              <div className="h-10 w-7 rounded-sm bg-white/20" />
              <div className="h-12 w-8 rounded-sm bg-white/30" />
              <div className="h-8 w-6 rounded-sm bg-white/15" />
            </div>
          </div>
        )}
      </div>

      <h3 className="font-display text-lg font-semibold text-foreground">{displayName}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{displayDescription}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
          {type === 'shared' ? 'Shared' : 'Personal'}
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted">
          {privacyLabels[privacy]}
        </span>
        {type === 'shared' ? (
          <span className="rounded-full bg-[var(--gold)]/15 px-2.5 py-1 text-[11px] font-medium text-[var(--gold)]">
            {memberCount} {memberCount === 1 ? 'member' : 'members'}
          </span>
        ) : null}
      </div>
    </div>
  )
}
