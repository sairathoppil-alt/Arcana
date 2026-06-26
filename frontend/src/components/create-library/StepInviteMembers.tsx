import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { SearchInput } from '@/components/ui/SearchInput'
import { mockInviteUsers } from '@/data/mockCreateLibrary'
import type { LibraryType } from '@/types/createLibrary'
import { cn } from '@/utils/cn'

interface StepInviteMembersProps {
  libraryType: LibraryType | null
  selectedIds: string[]
  onToggle: (userId: string) => void
}

export function StepInviteMembers({ libraryType, selectedIds, onToggle }: StepInviteMembersProps) {
  const [search, setSearch] = useState('')

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return mockInviteUsers
    const query = search.toLowerCase()
    return mockInviteUsers.filter((user) => user.name.toLowerCase().includes(query))
  }, [search])

  const selectedUsers = mockInviteUsers.filter((u) => selectedIds.includes(u.id))

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          Invite Members
        </h2>
        <p className="mt-2 text-sm text-muted">
          {libraryType === 'personal'
            ? 'Personal libraries are solo by default — you can skip this step.'
            : 'Invite friends to collaborate on your shared library.'}
        </p>
      </div>

      {selectedUsers.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-card mb-6 rounded-[var(--radius-lg)] border p-4"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
            Selected ({selectedUsers.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 rounded-full border border-border bg-secondary/40 py-1 pl-1 pr-3"
              >
                <UserAvatar name={user.name} color={user.avatarColor} size="sm" />
                <span className="text-sm font-medium text-foreground">{user.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}

      <SearchInput
        inputSize="md"
        label="Search friends"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search friends..."
        className="mb-4"
      />

      <div className="space-y-2">
        {filteredUsers.map((user, index) => {
          const isSelected = selectedIds.includes(user.id)

          return (
            <motion.button
              key={user.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ x: 4 }}
              onClick={() => onToggle(user.id)}
              className={cn(
                'dashboard-card flex w-full items-center gap-4 rounded-[var(--radius-lg)] border p-4 text-left transition-shadow',
                isSelected ? 'border-accent/50 shadow-[var(--shadow-soft)]' : 'hover:shadow-[var(--shadow-card)]',
              )}
            >
              <UserAvatar name={user.name} color={user.avatarColor} />
              <span className="flex-1 text-sm font-medium text-foreground">{user.name}</span>
              <span
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded border-2 transition-colors',
                  isSelected ? 'border-accent bg-accent text-white' : 'border-border',
                )}
              >
                {isSelected ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
