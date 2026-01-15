import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { Activities } from '@/components/Activities'

export default async function ActivitiesPage() {
  await connectDB()
  const tours = await Tour.find({ published: true }).sort({ createdAt: -1 })

  return <Activities tours={tours} />
}