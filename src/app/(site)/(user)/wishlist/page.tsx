import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models/User'
import { Tour } from '@/lib/models/Tour'
import { TourCard } from '@/components/TourCard'

export default async function WishlistPage() {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user) redirect('/login')

  await connectDB()
  const user = await User.findById(session.user.id).populate('wishlist')
  const tours = await Tour.find({ _id: { $in: user?.wishlist || [] } })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  )
}