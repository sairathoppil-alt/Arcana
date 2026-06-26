import { Navbar } from '@/components/layout/Navbar'
import { FeatureGrid } from '@/components/landing/FeatureGrid'
import { Hero } from '@/components/landing/Hero'

export function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureGrid />
      
    </>
  )
}
