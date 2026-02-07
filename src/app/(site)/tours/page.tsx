import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { PremiumTrekExplorer } from '@/components/PremiumTrekExplorer'

export default async function ToursPage() {
  await connectDB()
  const tours = await Tour.find({ published: true }).sort({ createdAt: -1 })

  return (
    <PremiumTrekExplorer treks={tours} />
  )
}