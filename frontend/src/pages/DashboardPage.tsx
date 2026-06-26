import { PageContainer } from '@/components/ui/PageContainer'
import { ContinueReadingCard } from '@/components/dashboard/ContinueReadingCard'
import { RecentlyAddedSection } from '@/components/dashboard/RecentlyAddedSection'
import { RecentlyUpdatedSection } from '@/components/dashboard/RecentlyUpdatedSection'
import { YourLibrariesSection } from '@/components/dashboard/YourLibrariesSection'

export function DashboardPage() {
  return (
    <PageContainer width="xl" className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <ContinueReadingCard />
        </div>
        <div className="xl:col-span-4">
          <RecentlyAddedSection />
        </div>
        <div className="xl:col-span-3">
          <YourLibrariesSection />
        </div>
      </div>

      <RecentlyUpdatedSection />
    </PageContainer>
  )
}
