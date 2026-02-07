import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { TourForm } from '@/components/TourForm'

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') {
    redirect('/admin-login')
  }

  const { id } = await params

  await connectDB()
  const tour = await Tour.findById(id)

  if (!tour) {
    redirect('/admin/tours')
  }

  return <TourForm initialData={tour.toObject()} />
}