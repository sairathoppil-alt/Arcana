import { Link, useNavigate, useParams } from 'react-router-dom'
import { DetailSection } from '@/components/manhwa/DetailSection'
import { ManhwaComments } from '@/components/manhwa/ManhwaComments'
import { ManhwaDetailHeader } from '@/components/manhwa/ManhwaDetailHeader'
import { ManhwaNotes } from '@/components/manhwa/ManhwaNotes'
import { ManhwaPosterColumn } from '@/components/manhwa/ManhwaPosterColumn'
import { ReadingLinks } from '@/components/manhwa/ReadingLinks'
import { RelatedManhwaCarousel } from '@/components/manhwa/RelatedManhwaCarousel'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/Button'
import { PageContainer } from '@/components/ui/PageContainer'
import { getManhwaDetail, getRelatedManhwa, isManhwaKnown } from '@/data/mockManhwaDetail'

export function ManhwaDetailPage() {
  const navigate = useNavigate()
  const { id = 'roxana' } = useParams<{ id: string }>()

  if (!isManhwaKnown(id)) {
    return (
      <PageContainer width="sm" className="py-16">
        <EmptyState
          variant="not-found"
          title="Manhwa not found"
          description="This title isn't in the Arcana archives yet. Try exploring the catalog for something new."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={() => navigate(-1)} variant="outline">
                Go back
              </Button>
              <Link to="/explore">
                <Button>Explore Manhwa</Button>
              </Link>
            </div>
          }
        />
      </PageContainer>
    )
  }

  const manhwa = getManhwaDetail(id)
  const related = getRelatedManhwa(manhwa.relatedIds, id)

  return (
    <PageContainer width="lg" className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <ManhwaPosterColumn manhwa={manhwa} />
        </div>

        <div className="space-y-6 lg:col-span-8">
          <ManhwaDetailHeader manhwa={manhwa} />

          <DetailSection title="Overview" delay={0.12}>
            <p className="text-sm leading-relaxed text-foreground/90">{manhwa.synopsis}</p>
          </DetailSection>

          <ManhwaNotes defaultNote={manhwa.defaultNote} />
          <ReadingLinks links={manhwa.readingLinks} />
          <ManhwaComments comments={manhwa.comments} />
        </div>
      </div>

      <RelatedManhwaCarousel items={related} />
    </PageContainer>
  )
}
