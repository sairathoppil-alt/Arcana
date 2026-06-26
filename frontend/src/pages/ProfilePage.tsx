import { Link, useNavigate, useParams } from 'react-router-dom'
import { FavoriteGenres } from '@/components/profile/FavoriteGenres'
import { FavoriteManhwaCarousel } from '@/components/profile/FavoriteManhwaCarousel'
import { ProfileAchievements } from '@/components/profile/ProfileAchievements'
import { ProfileActivityTimeline } from '@/components/profile/ProfileActivityTimeline'
import { ProfileConnections } from '@/components/profile/ProfileConnections'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileStats } from '@/components/profile/ProfileStats'
import { ReadingHeatmap } from '@/components/profile/ReadingHeatmap'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/Button'
import { PageContainer } from '@/components/ui/PageContainer'
import { getProfileByUsername } from '@/data/mockProfile'

export function ProfilePage() {
  const navigate = useNavigate()
  const { username } = useParams<{ username?: string }>()
  const profile = getProfileByUsername(username)

  if (!profile) {
    return (
      <PageContainer width="sm" className="py-16">
        <EmptyState
          variant="profile"
          title="Profile not found"
          description="This reader hasn't joined the Arcana archives yet."
          action={
            <div className="flex flex-col items-center gap-3">
              <Button onClick={() => navigate(-1)} variant="outline">
                Go back
              </Button>
              <Link to="/profile" className="text-sm font-medium text-accent hover:underline">
                View your profile
              </Link>
            </div>
          }
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer width="xl" className="space-y-6">
      <ProfileHeader user={profile.user} />

      <ProfileStats stats={profile.stats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-7">
          <ReadingHeatmap days={profile.heatmap} />
          <FavoriteManhwaCarousel items={profile.favoriteManhwa} />
        </div>

        <div className="space-y-6 xl:col-span-5">
          <ProfileAchievements achievements={profile.achievements} />
          <FavoriteGenres genres={profile.favoriteGenres} />
          <ProfileActivityTimeline activities={profile.recentActivity} />
        </div>
      </div>

      <ProfileConnections followers={profile.followers} following={profile.following} />
    </PageContainer>
  )
}
