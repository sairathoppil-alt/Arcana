import { motion } from 'framer-motion'
import type { ConnectedAccount } from '@/types/settings'
import { Button } from '@/components/ui/Button'
import { SettingsSectionCard } from '@/components/settings/SettingsSectionCard'
import { cn } from '@/utils/cn'

interface ConnectedAccountsSettingsProps {
  accounts: ConnectedAccount[]
  onToggle: (id: ConnectedAccount['id']) => void
}

const providerIcons: Record<ConnectedAccount['id'], string> = {
  google: 'G',
  discord: 'D',
  github: 'GH',
}

const providerColors: Record<ConnectedAccount['id'], string> = {
  google: '#ea4335',
  discord: '#5865f2',
  github: '#24292f',
}

export function ConnectedAccountsSettings({ accounts, onToggle }: ConnectedAccountsSettingsProps) {
  return (
    <SettingsSectionCard
      title="Connected Accounts"
      description="Link external services to your Arcana account."
    >
      <div className="space-y-3">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            className="dashboard-card rounded-[var(--radius-md)] border p-4"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-sm font-bold text-white"
                  style={{ backgroundColor: providerColors[account.id] }}
                  aria-hidden="true"
                >
                  {providerIcons[account.id]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{account.name}</p>
                  <p className="text-xs text-muted">{account.description}</p>
                  <p
                    className={cn(
                      'mt-1 text-[11px] font-semibold',
                      account.connected ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted',
                    )}
                  >
                    {account.connected ? 'Connected' : 'Not Connected'}
                  </p>
                </div>
              </div>

              <Button
                variant={account.connected ? 'outline' : 'primary'}
                size="sm"
                onClick={() => onToggle(account.id)}
                className="w-full sm:w-auto"
              >
                {account.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </SettingsSectionCard>
  )
}
