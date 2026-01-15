import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { GalleryForm } from '@/components/GalleryForm'

export default async function AdminGalleryNewPage() {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') redirect('/login')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Gallery Item</h1>
      <GalleryForm />
    </div>
  )
}