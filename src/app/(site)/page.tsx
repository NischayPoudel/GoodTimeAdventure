import { HeroCarousel } from '@/components/HeroCarousel'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { PremiumFeaturedSection } from '@/components/PremiumFeaturedSection'
import { Testimonials } from '@/components/Testimonials'
import { CTASection } from '@/components/CTASection'

export default function Home() {
  return (
    <div className="bg-white">
      <HeroCarousel />
      <WhyChooseUs />
      <PremiumFeaturedSection />
      <Testimonials />
      <CTASection />
    </div>
  )
}
