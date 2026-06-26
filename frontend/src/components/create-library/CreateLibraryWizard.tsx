import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { StepChooseType } from '@/components/create-library/StepChooseType'
import { StepInviteMembers } from '@/components/create-library/StepInviteMembers'
import { StepLibraryDetails } from '@/components/create-library/StepLibraryDetails'
import { StepSuccess } from '@/components/create-library/StepSuccess'
import { WizardProgress } from '@/components/create-library/WizardProgress'
import { Button } from '@/components/ui/Button'
import { slugifyLibraryName } from '@/data/mockCreateLibrary'
import { DEFAULT_FORM_DATA, type CreateLibraryFormData } from '@/types/createLibrary'

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
}

export function CreateLibraryWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<CreateLibraryFormData>(DEFAULT_FORM_DATA)
  const [createdSlug, setCreatedSlug] = useState('new-library')

  const updateForm = (updates: Partial<CreateLibraryFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const goToStep = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1)
    setStep(nextStep)
  }

  const handleNext = () => {
    if (step === 1 && !formData.type) return

    if (step === 2) {
      if (!formData.name.trim()) return
      if (formData.type === 'personal') {
        setCreatedSlug(slugifyLibraryName(formData.name))
        goToStep(3)
        return
      }
    }

    if (step === 3) {
      setCreatedSlug(slugifyLibraryName(formData.name))
      goToStep(4)
      return
    }

    goToStep(step + 1)
  }

  const handleBack = () => {
    if (step === 1) {
      navigate(-1)
      return
    }
    goToStep(step - 1)
  }

  const handleSkipInvite = () => {
    setCreatedSlug(slugifyLibraryName(formData.name))
    goToStep(4)
  }

  const toggleMember = (userId: string) => {
    setFormData((prev) => ({
      ...prev,
      invitedMemberIds: prev.invitedMemberIds.includes(userId)
        ? prev.invitedMemberIds.filter((id) => id !== userId)
        : [...prev.invitedMemberIds, userId],
    }))
  }

  const canProceed =
    (step === 1 && formData.type !== null) ||
    (step === 2 && formData.name.trim().length > 0) ||
    step === 3

  return (
    <div className="mx-auto w-full max-w-4xl">
      <WizardProgress currentStep={step} />

      <div className="dashboard-card overflow-hidden rounded-[var(--radius-xl)] border p-6 sm:p-8 lg:p-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {step === 1 ? (
              <StepChooseType selected={formData.type} onSelect={(type) => updateForm({ type })} />
            ) : null}

            {step === 2 ? <StepLibraryDetails data={formData} onChange={updateForm} /> : null}

            {step === 3 ? (
              <StepInviteMembers
                libraryType={formData.type}
                selectedIds={formData.invitedMemberIds}
                onToggle={toggleMember}
              />
            ) : null}

            {step === 4 ? (
              <StepSuccess
                libraryName={formData.name}
                libraryType={formData.type ?? 'personal'}
                librarySlug={createdSlug}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>

        {step < 4 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between"
          >
            <Button variant="ghost" size="lg" onClick={handleBack} className="sm:w-auto">
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>

            <div className="flex flex-col gap-3 sm:flex-row">
              {step === 3 && formData.type === 'personal' ? (
                <Button variant="outline" size="lg" onClick={handleSkipInvite}>
                  Skip
                </Button>
              ) : null}

              <Button size="lg" onClick={handleNext} disabled={!canProceed} className="sm:min-w-[140px]">
                {step === 3 ? 'Create Library' : 'Continue'}
              </Button>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}
