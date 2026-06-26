import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthFormCard } from '@/components/auth/AuthFormCard'
import { GoogleButton } from '@/components/auth/GoogleButton'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/contexts/AuthContext'
import { authFieldVariants } from '@/utils/motion'

export function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to log in right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthFormCard>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="font-display text-2xl font-semibold text-foreground">Welcome Back</h1>
        <p className="mt-2 text-sm text-muted">Log in to your library</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <motion.div custom={0} variants={authFieldVariants} initial="hidden" animate="visible">
          <Input
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            required
          />
        </motion.div>

        <motion.div custom={1} variants={authFieldVariants} initial="hidden" animate="visible">
          <Input
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            required
          />
        </motion.div>

        <motion.div
          custom={2}
          variants={authFieldVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-end"
        >
          <a
            href="#"
            className="text-sm text-muted transition-colors hover:text-accent"
            onClick={(e) => e.preventDefault()}
          >
            Forgot password?
          </a>
        </motion.div>

        <motion.div custom={3} variants={authFieldVariants} initial="hidden" animate="visible">
          {error ? <p className="mb-3 text-sm text-red-500">{error}</p> : null}
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>
        </motion.div>

        <motion.div custom={4} variants={authFieldVariants} initial="hidden" animate="visible">
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted dark:bg-transparent">or</span>
            </div>
          </div>
          <GoogleButton />
        </motion.div>
      </form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-sm text-muted"
      >
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-medium text-accent transition-colors hover:text-accent-hover">
          Sign up
        </Link>
      </motion.p>
    </AuthFormCard>
  )
}
