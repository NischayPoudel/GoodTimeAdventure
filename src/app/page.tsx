import { HeroCarousel } from '@/components/HeroCarousel'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { FeaturedExperiences } from '@/components/featured-experiences'
import { Testimonials } from '@/components/Testimonials'
import { CTASection } from '@/components/CTASection'

export default function Home() {
  return (
    <div className="bg-white">
      <HeroCarousel />
      <WhyChooseUs />
      <FeaturedExperiences />
      <Testimonials />
      <CTASection />
    </div>
  )
}
