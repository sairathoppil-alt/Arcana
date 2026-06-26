import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/shared/EmptyState'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Arcana ErrorBoundary:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-primary p-6">
          <div className="w-full max-w-lg">
            <EmptyState
              variant="generic"
              title="Something went wrong"
              description="An unexpected error occurred. Try refreshing the page or return to your dashboard."
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <Button onClick={() => window.location.reload()}>Refresh</Button>
                  <Link to="/dashboard">
                    <Button variant="outline">Go to Dashboard</Button>
                  </Link>
                </div>
              }
            />
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
