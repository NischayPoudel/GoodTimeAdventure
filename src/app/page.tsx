import { Hero } from '@/components/Hero'
import { FeaturedExperiences } from '@/components/featured-experiences'

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <FeaturedExperiences />
    </div>
  )
}
