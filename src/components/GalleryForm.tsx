'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface GalleryFormProps {
  initialData?: {
    _id?: string
    title: string
    imageUrl: string
    category: string
  }
}

export function GalleryForm({ initialData }: GalleryFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    imageUrl: initialData?.imageUrl || '',
    category: initialData?.category || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url = initialData?._id ? `/api/gallery/${initialData._id}` : '/api/gallery'
      const method = initialData?._id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save gallery item')
      }

      alert(`Gallery item ${initialData ? 'updated' : 'created'} successfully!`)
      router.push('/admin/gallery')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!initialData?._id) return
    if (!confirm('Are you sure you want to delete this gallery item?')) return

    setLoading(true)
    try {
      const response = await fetch(`/api/gallery/${initialData._id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete gallery item')
      }

      alert('Gallery item deleted successfully!')
      router.push('/admin/gallery')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="max-w-md">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Image URL</label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Saving...' : initialData ? 'Update Item' : 'Create Item'}
          </Button>
          {initialData?._id && (
            <Button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              variant="destructive"
              className="flex-1"
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}