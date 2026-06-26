import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageContainer } from '@/components/ui/PageContainer'

export function NotFoundPage() {
  return (
    <PageContainer width="sm" className="py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <EmptyState
          variant="not-found"
          title="Page not found"
          description="This path doesn't exist in the Arcana archives. The page may have moved or never been written."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline">Explore Manhwa</Button>
              </Link>
            </div>
          }
        />
      </motion.div>
    </PageContainer>
  )
}
