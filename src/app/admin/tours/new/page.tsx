import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { TourForm } from '@/components/TourForm'

export default async function NewTourPage() {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') {
    redirect('/admin-login')
  }

  return <TourForm />
}
