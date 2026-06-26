import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense, type ReactNode } from 'react'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { PageLoading } from '@/components/shared/PageLoading'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useAuth } from '@/contexts/AuthContext'

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const PersonalLibraryPage = lazy(() =>
  import('@/pages/PersonalLibraryPage').then((m) => ({ default: m.PersonalLibraryPage })),
)
const SharedLibraryPage = lazy(() =>
  import('@/pages/SharedLibraryPage').then((m) => ({ default: m.SharedLibraryPage })),
)
const CreateLibraryPage = lazy(() =>
  import('@/pages/CreateLibraryPage').then((m) => ({ default: m.CreateLibraryPage })),
)
const ManhwaDetailPage = lazy(() =>
  import('@/pages/ManhwaDetailPage').then((m) => ({ default: m.ManhwaDetailPage })),
)
const ExplorePage = lazy(() =>
  import('@/pages/ExplorePage').then((m) => ({ default: m.ExplorePage })),
)
const ProfilePage = lazy(() =>
  import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })),
)
const SettingsPage = lazy(() =>
  import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })),
)
const NotificationsPage = lazy(() =>
  import('@/pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })),
)

function LazyPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoading />}>{children}</Suspense>
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <PageLoading />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <PageLoading />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>

      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route
          path="dashboard"
          element={
            <LazyPage>
              <DashboardPage />
            </LazyPage>
          }
        />
        <Route
          path="explore"
          element={
            <LazyPage>
              <ExplorePage />
            </LazyPage>
          }
        />
        <Route
          path="libraries/create"
          element={
            <LazyPage>
              <CreateLibraryPage />
            </LazyPage>
          }
        />
        <Route
          path="libraries/personal/:id"
          element={
            <LazyPage>
              <PersonalLibraryPage />
            </LazyPage>
          }
        />
        <Route
          path="libraries/shared/:id"
          element={
            <LazyPage>
              <SharedLibraryPage />
            </LazyPage>
          }
        />
        <Route
          path="manhwa/:id"
          element={
            <LazyPage>
              <ManhwaDetailPage />
            </LazyPage>
          }
        />
        <Route
          path="profile"
          element={
            <LazyPage>
              <ProfilePage />
            </LazyPage>
          }
        />
        <Route
          path="profile/:username"
          element={
            <LazyPage>
              <ProfilePage />
            </LazyPage>
          }
        />
        <Route
          path="settings"
          element={
            <LazyPage>
              <SettingsPage />
            </LazyPage>
          }
        />
        <Route
          path="notifications"
          element={
            <LazyPage>
              <NotificationsPage />
            </LazyPage>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
