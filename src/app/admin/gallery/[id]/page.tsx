import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { GalleryItem } from '@/lib/models/GalleryItem'
import { GalleryForm } from '@/components/GalleryForm'

export default async function AdminGalleryEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions) as any
  if (!session || !session.user || session.user.role !== 'admin') redirect('/login')

  const { id } = await params

  await connectDB()
  const item = await GalleryItem.findById(id)

  if (!item) {
    redirect('/admin/gallery')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Gallery Item</h1>
      <GalleryForm initialData={item} />
    </div>
  )
}