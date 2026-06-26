import { FeatureCard } from './FeatureCard'

const features = [
  {
    title: 'Organize',
    description: 'Create your personal or shared libraries.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 7h16M4 12h16M4 17h10"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
  {
    title: 'Track',
    description: 'Track your reading progress easily.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Share',
    description: 'Collaborate with friends.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="8" cy="9" r="3" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="16" cy="9" r="3" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M5.5 18c.7-2 2.4-3 2.5-3s1.8 1 2.5 3M13.5 18c.7-2 2.4-3 2.5-3s1.8 1 2.5 3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Recommend',
    description: 'Discover and share amazing stories.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l2.2 5.2L20 9l-4 3.5L17 18l-5-2.8L7 18l1-5.5L4 9l5.8-.8L12 3z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
            Everything you need for your manhwa journey
          </h2>
          <p className="mt-3 text-muted">
            Organize collections, track chapters, and share recommendations with fellow readers.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
