import { useRef, type ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { LibraryPreviewCard } from '@/components/create-library/LibraryPreviewCard'
import { PRIVACY_OPTIONS, type CreateLibraryFormData, type PrivacySetting } from '@/types/createLibrary'
import { cn } from '@/utils/cn'

interface StepLibraryDetailsProps {
  data: CreateLibraryFormData
  onChange: (updates: Partial<CreateLibraryFormData>) => void
}

export function StepLibraryDetails({ data, onChange }: StepLibraryDetailsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      onChange({ coverPreview: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <div className="mb-8 text-center lg:text-left">
        <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          Library Details
        </h2>
        <p className="mt-2 text-sm text-muted">Give your library a name and a little personality.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-5 lg:col-span-3"
        >
          <Input
            label="Library Name"
            placeholder="e.g. Fantasy Obsessions"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            required
          />

          <div>
            <label htmlFor="library-description" className="mb-1.5 block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              id="library-description"
              rows={3}
              placeholder="What's this library about?"
              value={data.description}
              onChange={(e) => onChange({ description: e.target.value })}
              className={cn(
                'w-full resize-none rounded-[var(--radius-md)] border border-border bg-card px-4 py-3 text-sm text-foreground',
                'placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25',
                'dark:bg-secondary/40 dark:backdrop-blur-sm',
              )}
            />
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-foreground">Cover Image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'flex h-32 w-full flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed border-border',
                'bg-card/50 text-muted transition-colors hover:border-accent/50 hover:bg-secondary/40 hover:text-foreground',
                'dark:bg-secondary/20 dark:backdrop-blur-sm',
              )}
            >
              {data.coverPreview ? (
                <img
                  src={data.coverPreview}
                  alt="Cover preview"
                  className="h-full w-full rounded-[var(--radius-sm)] object-cover"
                />
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm font-medium">Upload cover image</span>
                </>
              )}
            </button>
          </div>

          <div>
            <span className="mb-2 block text-sm font-medium text-foreground">Privacy Setting</span>
            <div className="space-y-2">
              {PRIVACY_OPTIONS.map((option) => {
                const isSelected = data.privacy === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange({ privacy: option.value as PrivacySetting })}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-[var(--radius-md)] border p-3 text-left transition-colors',
                      isSelected
                        ? 'border-accent bg-accent/8'
                        : 'border-border bg-card hover:bg-secondary/40 dark:bg-secondary/20',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2',
                        isSelected ? 'border-accent bg-accent' : 'border-border',
                      )}
                    >
                      {isSelected ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-[var(--accent-foreground)]" />
                      ) : null}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-foreground">{option.label}</span>
                      <span className="block text-xs text-muted">{option.description}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <LibraryPreviewCard
            name={data.name}
            description={data.description}
            type={data.type}
            coverPreview={data.coverPreview}
            privacy={data.privacy}
            memberCount={1 + data.invitedMemberIds.length}
          />
        </motion.div>
      </div>
    </div>
  )
}
