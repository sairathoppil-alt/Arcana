import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

type PageWidth = 'sm' | 'md' | 'lg' | 'xl'

const widthClasses: Record<PageWidth, string> = {
  sm: 'max-w-[900px]',
  md: 'max-w-[960px]',
  lg: 'max-w-[1200px]',
  xl: 'max-w-[1400px]',
}

interface PageContainerProps {
  children: ReactNode
  width?: PageWidth
  className?: string
}

export function PageContainer({ children, width = 'xl', className }: PageContainerProps) {
  return <div className={cn('mx-auto w-full', widthClasses[width], className)}>{children}</div>
}
