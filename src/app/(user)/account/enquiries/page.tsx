import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Enquiry } from '@/lib/models/Enquiry'
import { Card } from '@/components/ui/Card'

export default async function MyEnquiriesPage() {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user) redirect('/login')

  await connectDB()
  const enquiries = await Enquiry.find({ userId: session.user.id }).sort({ createdAt: -1 })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Enquiries</h1>
      <div className="space-y-4">
        {enquiries.map((enquiry) => (
          <Card key={enquiry._id} className="p-4">
            <h2 className="font-semibold">{enquiry.tourId}</h2>
            <p>{enquiry.message}</p>
            <p className="text-sm text-gray-500">{enquiry.createdAt.toDateString()}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}