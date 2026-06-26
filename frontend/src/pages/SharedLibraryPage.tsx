import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ActivityTab } from '@/components/library/ActivityTab'
import { DiscussionsTab } from '@/components/library/DiscussionsTab'
import { MemberAvatarStrip } from '@/components/library/MemberAvatarStrip'
import { MembersTab } from '@/components/library/MembersTab'
import { SharedLibraryHeader } from '@/components/library/SharedLibraryHeader'
import { SharedLibraryTabPanel } from '@/components/library/SharedLibraryTabPanel'
import { SharedLibraryTabs } from '@/components/library/SharedLibraryTabs'
import { PageContainer } from '@/components/ui/PageContainer'
import {
  getSharedLibrary,
  getSharedLibraryActivity,
  getSharedLibraryDiscussions,
  getSharedLibraryMembers,
} from '@/api/sharedLibraries'
import type { ActivityFeedItem, DiscussionMessage, SharedLibrary, SharedLibraryTab, SharedMember } from '@/types/sharedLibrary'
import { tabContent } from '@/utils/motion'

export function SharedLibraryPage() {
  const { id = '1' } = useParams<{ id: string }>()
  const [library, setLibrary] = useState<SharedLibrary | null>(null)
  const [members, setMembers] = useState<SharedMember[]>([])
  const [entries] = useState([])
  const [discussions, setDiscussions] = useState<DiscussionMessage[]>([])
  const [activity, setActivity] = useState<ActivityFeedItem[]>([])
  const [loading, setLoading] = useState(true)

  const [activeTab, setActiveTab] = useState<SharedLibraryTab>('library')
  const creatorId = members.find((member) => member.role === 'owner')?.id ?? 'you'

  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        setLoading(true)
        const [libraryData, membersData, discussionData, activityData] = await Promise.all([
          getSharedLibrary(id),
          getSharedLibraryMembers(id),
          getSharedLibraryDiscussions(id),
          getSharedLibraryActivity(id),
        ])

        if (!isMounted) return
        setLibrary(libraryData)
        setMembers(membersData)
        setDiscussions(discussionData)
        setActivity(activityData)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [id])

  const handleInvite = () => {
    // Backend invite flow can be added later.
  }

  const currentLibrary = library ?? {
    id,
    name: 'Shared Library',
    description: loading ? 'Loading shared library details…' : 'A shared collection of manhwa.',
    memberCount: members.length,
    coverFrom: '#2a1e4a',
    coverTo: '#6b4a8b',
    coverAccent: '#d4af37',
    createdBy: 'You',
  }

  return (
    <PageContainer width="xl" className="space-y-6">
      <SharedLibraryHeader library={currentLibrary} onInvite={handleInvite} />

      <MemberAvatarStrip members={members} creatorId={creatorId} onInvite={handleInvite} />

      <SharedLibraryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <AnimatePresence mode="wait">
        {activeTab === 'library' ? (
          <motion.div key="library" variants={tabContent} initial="hidden" animate="visible" exit="exit">
            <SharedLibraryTabPanel entries={entries} />
          </motion.div>
        ) : null}

        {activeTab === 'discussions' ? (
          <motion.div key="discussions" variants={tabContent} initial="hidden" animate="visible" exit="exit">
            <DiscussionsTab messages={discussions} members={members} />
          </motion.div>
        ) : null}

        {activeTab === 'members' ? (
          <motion.div key="members" variants={tabContent} initial="hidden" animate="visible" exit="exit">
            <MembersTab members={members} />
          </motion.div>
        ) : null}

        {activeTab === 'activity' ? (
          <motion.div key="activity" variants={tabContent} initial="hidden" animate="visible" exit="exit">
            <ActivityTab items={activity} members={members} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PageContainer>
  )
}
