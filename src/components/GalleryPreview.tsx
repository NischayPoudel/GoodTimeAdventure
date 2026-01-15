import { connectDB } from '@/lib/db'
import { GalleryItem } from '@/lib/models/GalleryItem'
import Image from 'next/image'
import Link from 'next/link'

export async function GalleryPreview() {
  await connectDB()
  const items = await GalleryItem.find().limit(6).sort({ createdAt: -1 })

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item._id} className="relative h-48">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover rounded" />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/gallery" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white">View All</Link>
        </div>
      </div>
    </section>
  )
}