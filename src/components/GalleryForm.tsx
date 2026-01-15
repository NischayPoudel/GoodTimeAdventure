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
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = initialData?._id ? `/api/gallery/${initialData._id}` : '/api/gallery'
      const method = initialData?._id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/gallery')
      } else {
        alert('Failed to save gallery item')
      }
    } catch (error) {
      console.error('Error saving gallery item:', error)
      alert('Error saving gallery item')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
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
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Item' : 'Create Item'}
      </Button>
    </form>
  )
}