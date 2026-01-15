'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

interface BlogFormProps {
  initialData?: {
    _id?: string
    title: string
    excerpt: string
    content: string
    imageUrl: string
    slug: string
  }
}

export function BlogForm({ initialData }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    imageUrl: initialData?.imageUrl || '',
    slug: initialData?.slug || '',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = initialData?._id ? `/api/blog/${initialData._id}` : '/api/blog'
      const method = initialData?._id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/blog')
      } else {
        alert('Failed to save blog post')
      }
    } catch (error) {
      console.error('Error saving blog post:', error)
      alert('Error saving blog post')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
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
        <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug</label>
        <Input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium mb-1">Excerpt</label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={10}
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
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Post' : 'Create Post'}
      </Button>
    </form>
  )
}