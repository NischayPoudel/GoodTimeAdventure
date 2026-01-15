import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { EnquiryForm } from '@/components/EnquiryForm'
import { WishlistButton } from '@/components/WishlistButton'
import Image from 'next/image'

export default async function TourDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  await connectDB()
  const tour = await Tour.findOne({ slug: params.slug, published: true })
  if (!tour) return <div>Tour not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-96 mb-6">
        <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
          <p className="text-lg mb-4">{tour.overview}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <strong>Duration:</strong> {tour.durationDays} days
            </div>
            <div>
              <strong>Difficulty:</strong> {tour.difficulty}
            </div>
            <div>
              <strong>Max Altitude:</strong> {tour.maxAltitudeM}m
            </div>
            <div>
              <strong>Price from:</strong> ${tour.priceFrom}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Itinerary</h2>
            {tour.itinerary.map((day: any) => (
              <div key={day.day} className="mb-4">
                <h3 className="font-semibold">Day {day.day}: {day.title}</h3>
                <p>{day.details}</p>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Includes</h2>
            <ul className="list-disc list-inside">
              {tour.includes.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Excludes</h2>
            <ul className="list-disc list-inside">
              {tour.excludes.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <EnquiryForm tourId={tour._id.toString()} />
          <WishlistButton tourId={tour._id.toString()} />
        </div>
      </div>
    </div>
  )
}