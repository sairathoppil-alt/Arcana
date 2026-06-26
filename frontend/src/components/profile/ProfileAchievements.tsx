import { motion } from 'framer-motion'
import type { ProfileAchievement } from '@/types/profile'

interface ProfileAchievementsProps {
  achievements: ProfileAchievement[]
  delay?: number
}

export function ProfileAchievements({ achievements, delay = 0.16 }: ProfileAchievementsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="dashboard-card rounded-[var(--radius-lg)] border p-5 sm:p-6"
    >
      <h2 className="font-display text-lg font-semibold text-foreground">Achievements</h2>
      <p className="mt-1 text-sm text-muted">{achievements.filter((a) => a.unlocked).length} badges earned</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: delay + index * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`relative overflow-hidden rounded-[var(--radius-md)] border p-3 text-center ${
              achievement.unlocked
                ? 'border-[var(--gold)]/30 bg-gradient-to-b from-[var(--gold)]/8 to-transparent'
                : 'border-border opacity-50 grayscale'
            }`}
          >
            <span className="text-2xl" aria-hidden="true">
              {achievement.emoji}
            </span>
            <p className="mt-2 text-xs font-semibold text-foreground">{achievement.title}</p>
            <p className="mt-1 line-clamp-2 text-[10px] text-muted">{achievement.description}</p>
            {achievement.unlocked ? (
              <p className="mt-2 text-[9px] font-medium text-[var(--gold)]">{achievement.earnedAt}</p>
            ) : null}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
