import LandingNav from '../components/landing/LandingNav'
import LandingHero from '../components/landing/LandingHero'
import FeatureBento from '../components/landing/FeatureBento'
import HowItWorks from '../components/landing/HowItWorks'
import LandingFooter from '../components/landing/LandingFooter'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-page font-sans text-ink">
      <LandingNav />
      <main>
        <LandingHero />
        <FeatureBento />
        <HowItWorks />
      </main>
      <LandingFooter />
    </div>
  )
}
