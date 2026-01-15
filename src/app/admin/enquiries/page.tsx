import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Enquiry } from '@/lib/models/Enquiry'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EnquiryCard } from '@/components/EnquiryCard'

export default async function AdminEnquiriesPage() {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') redirect('/login')

  await connectDB()
  const enquiries = await Enquiry.find().sort({ createdAt: -1 })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Enquiries</h1>
      <div className="space-y-4">
        {enquiries.map((enquiry) => (
          <EnquiryCard key={enquiry._id} enquiry={enquiry} />
        ))}
      </div>
    </div>
  )
}