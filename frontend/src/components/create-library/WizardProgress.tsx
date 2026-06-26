import { motion } from 'framer-motion'
import { WIZARD_STEPS } from '@/types/createLibrary'
import { cn } from '@/utils/cn'

interface WizardProgressProps {
  currentStep: number
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {WIZARD_STEPS.map((item, index) => {
          const isComplete = currentStep > item.step
          const isActive = currentStep === item.step
          const isLast = index === WIZARD_STEPS.length - 1

          return (
            <div key={item.step} className={cn('flex flex-1 items-center', isLast && 'flex-none')}>
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: isActive ? 1.08 : 1,
                    backgroundColor: isComplete || isActive ? 'var(--accent)' : 'var(--bg-card)',
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold',
                    isComplete || isActive
                      ? 'border-accent text-white dark:text-[var(--accent-foreground)]'
                      : 'border-border text-muted',
                  )}
                >
                  {isComplete ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M5 12l5 5L20 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    item.step
                  )}
                </motion.div>
                <span
                  className={cn(
                    'mt-2 hidden text-center text-xs font-medium sm:block',
                    isActive ? 'text-foreground' : 'text-muted',
                  )}
                >
                  {item.label}
                </span>
              </div>

              {!isLast ? (
                <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-border sm:mx-4">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-accent"
                    initial={{ width: '0%' }}
                    animate={{ width: currentStep > item.step ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-center text-sm text-muted sm:hidden">
        Step {currentStep} of {WIZARD_STEPS.length} — {WIZARD_STEPS[currentStep - 1]?.label}
      </p>
    </div>
  )
}
