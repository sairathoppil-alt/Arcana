import { CreateLibraryWizard } from '@/components/create-library/CreateLibraryWizard'
import { PageContainer } from '@/components/ui/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader'

export function CreateLibraryPage() {
  return (
    <PageContainer width="md">
      <PageHeader
        centered
        className="mb-6 sm:mb-8"
        title="Create a Library"
        description="Build your magical manhwa collection in a few enchanted steps."
      />

      <CreateLibraryWizard />
    </PageContainer>
  )
}
