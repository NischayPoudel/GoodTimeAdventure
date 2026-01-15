'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryGridProps {
  items: any[]
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<any>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
            onClick={() => setSelectedImage(item)}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm">{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="max-w-4xl max-h-full p-4">
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <p>{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}