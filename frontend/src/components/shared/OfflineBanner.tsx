import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setOffline(false)
    const handleOffline = () => setOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <AnimatePresence>
      {offline ? (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-sm text-foreground"
        >
          You appear to be offline. Some features may be unavailable until your connection returns.
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
