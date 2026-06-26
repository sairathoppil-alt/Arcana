import { motion } from 'framer-motion'
import { SHARED_LIBRARY_TABS, type SharedLibraryTab } from '@/types/sharedLibrary'
import { cn } from '@/utils/cn'

interface SharedLibraryTabsProps {
  activeTab: SharedLibraryTab
  onTabChange: (tab: SharedLibraryTab) => void
}

export function SharedLibraryTabs({ activeTab, onTabChange }: SharedLibraryTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
      className="flex gap-1 overflow-x-auto border-b border-border pb-px scrollbar-hide"
    >
      {SHARED_LIBRARY_TABS.map((tab) => {
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'relative shrink-0 px-4 py-2.5 text-sm font-medium transition-colors',
              isActive ? 'text-foreground' : 'text-muted hover:text-foreground',
            )}
          >
            {tab.label}
            {isActive ? (
              <motion.span
                layoutId="shared-main-tab-underline"
                className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            ) : null}
          </button>
        )
      })}
    </motion.div>
  )
}
