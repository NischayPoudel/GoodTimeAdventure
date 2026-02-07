'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface GalleryItem {
  _id: string
  title: string
  category: string
  imageUrl: string
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (!response.ok) throw new Error('Failed to fetch gallery items')
      const data = await response.json()
      setItems(data)
    } catch (err) {
      setError('Failed to load gallery items')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const response = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
        if (response.ok) {
          setItems(items.filter((item) => item._id !== id))
          alert('Gallery item deleted successfully')
        } else {
          alert('Failed to delete gallery item')
        }
      } catch (err) {
        alert('Error deleting gallery item')
        console.error(err)
      }
    }
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manage Gallery</h1>
        <Link
          href="/admin/gallery/new"
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-semibold"
        >
          ➕ Add New Item
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading gallery items...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No gallery items yet</p>
          <Link
            href="/admin/gallery/new"
            className="text-emerald-500 hover:text-emerald-600 font-semibold"
          >
            Add your first gallery item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-gray-900 mb-1">{item.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{item.category}</p>
                <div className="flex gap-3">
                  <Link
                    href={`/admin/gallery/${item._id}`}
                    className="flex-1 text-center px-3 py-2 text-blue-600 hover:text-blue-800 border border-blue-600 rounded font-medium transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    className="flex-1 px-3 py-2 text-red-600 hover:text-red-800 border border-red-600 rounded font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}