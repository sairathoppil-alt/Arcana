import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthFormCard } from '@/components/auth/AuthFormCard'
import { GoogleButton } from '@/components/auth/GoogleButton'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/contexts/AuthContext'
import { signupFieldVariants } from '@/utils/motion'

export function SignupForm() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    try {
      await signup(username, email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create your account right now.')
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
        <h1 className="font-display text-2xl font-semibold text-foreground">Create Your Account</h1>
        <p className="mt-2 text-sm text-muted">Start your magical journey</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <motion.div custom={0} variants={signupFieldVariants} initial="hidden" animate="visible">
          <Input
            label="Username"
            type="text"
            name="username"
            autoComplete="username"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </motion.div>

        <motion.div custom={1} variants={signupFieldVariants} initial="hidden" animate="visible">
          <Input
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </motion.div>

        <motion.div custom={2} variants={signupFieldVariants} initial="hidden" animate="visible">
          <Input
            label="Password"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </motion.div>

        <motion.div custom={3} variants={signupFieldVariants} initial="hidden" animate="visible">
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error}
            required
          />
        </motion.div>

        <motion.div custom={4} variants={signupFieldVariants} initial="hidden" animate="visible" className="pt-1">
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </motion.div>

        <motion.div custom={5} variants={signupFieldVariants} initial="hidden" animate="visible">
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
        transition={{ delay: 0.55 }}
        className="mt-6 text-center text-sm text-muted"
      >
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-accent transition-colors hover:text-accent-hover">
          Log in
        </Link>
      </motion.p>
    </AuthFormCard>
  )
}
