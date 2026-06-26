import { useState } from 'react'
import { DetailSection } from '@/components/manhwa/DetailSection'
import { Button } from '@/components/ui/Button'
import { NOTES_MAX_LENGTH } from '@/types/manhwaDetail'
import { cn } from '@/utils/cn'

interface ManhwaNotesProps {
  defaultNote: string
  delay?: number
}

export function ManhwaNotes({ defaultNote, delay = 0.2 }: ManhwaNotesProps) {
  const [note, setNote] = useState(defaultNote)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <DetailSection title="My Notes" delay={delay}>
      <textarea
        value={note}
        onChange={(e) => {
          setNote(e.target.value.slice(0, NOTES_MAX_LENGTH))
          setSaved(false)
        }}
        rows={5}
        placeholder="Write your thoughts about this manhwa..."
        className={cn(
          'w-full resize-none rounded-[var(--radius-md)] border border-border bg-card px-4 py-3 text-sm leading-relaxed text-foreground',
          'placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
          'dark:bg-secondary/30 dark:backdrop-blur-sm',
        )}
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs text-muted">
          {note.length}/{NOTES_MAX_LENGTH}
        </span>
        <Button size="sm" onClick={handleSave}>
          {saved ? 'Saved!' : 'Save'}
        </Button>
      </div>
    </DetailSection>
  )
}
