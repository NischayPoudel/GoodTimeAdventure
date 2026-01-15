import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default async function AdminToursPage() {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') redirect('/login')

  await connectDB()
  const tours = await Tour.find().sort({ createdAt: -1 })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Tours</h1>
        <Link href="/admin/tours/new">
          <Button>Add New Tour</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {tours.map((tour) => (
          <Card key={tour._id} className="p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{tour.title}</h2>
              <p>{tour.region} - {tour.difficulty}</p>
            </div>
            <div className="space-x-2">
              <Link href={`/admin/tours/${tour._id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button variant="destructive">Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}