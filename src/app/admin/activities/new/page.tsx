'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function NewActivityPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    region: '',
    activity: 'Trekking',
    durationDays: 1,
    difficulty: 'Moderate',
    maxAltitudeM: 0,
    bestSeason: '',
    priceFrom: 0,
    overview: '',
    includes: '',
    excludes: '',
    itinerary: [{ day: 1, title: '', details: '' }],
    published: false,
    heroImage: '',
    gallery: [] as string[],
  })

  const [heroPreview, setHeroPreview] = useState<string | null>(null)
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : (type === 'checkbox' ? (e.target as HTMLInputElement).checked : value),
      ...(name === 'title' && { slug: generateSlug(value) }),
    })
  }

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        setFormData({ ...formData, heroImage: imageData })
        setHeroPreview(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const imageData = reader.result as string
          setFormData((prev) => ({
            ...prev,
            gallery: [...prev.gallery, imageData],
          }))
          setGalleryPreviews((prev) => [...prev, imageData])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index),
    })
    setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index))
  }

  const handleItineraryChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newItinerary = [...formData.itinerary]
    newItinerary[index] = { ...newItinerary[index], [field]: value }
    setFormData({ ...formData, itinerary: newItinerary })
  }

  const addItineraryDay = () => {
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        { day: formData.itinerary.length + 1, title: '', details: '' },
      ],
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          includes: formData.includes.split('\n').filter((i) => i.trim()),
          excludes: formData.excludes.split('\n').filter((i) => i.trim()),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to create activity')
      }

      alert('Activity created successfully!')
      router.push('/admin/activities')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Activity/Trek</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-8">
        {/* Basic Info */}
        <div className="border-b pb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Trek title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region *</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="e.g., Himalayas, Western Ghats"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type *</label>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option>Trekking</option>
                <option>Hiking</option>
                <option>Mountaineering</option>
                <option>Rock Climbing</option>
                <option>Wildlife Safari</option>
                <option>Water Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option>Easy</option>
                <option>Moderate</option>
                <option>Hard</option>
                <option>Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days) *</label>
              <input
                type="number"
                name="durationDays"
                value={formData.durationDays}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Altitude (meters)</label>
              <input
                type="number"
                name="maxAltitudeM"
                value={formData.maxAltitudeM}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Best Season *</label>
              <input
                type="text"
                name="bestSeason"
                value={formData.bestSeason}
                onChange={handleInputChange}
                required
                placeholder="e.g., September - October"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price From (₹) *</label>
              <input
                type="number"
                name="priceFrom"
                value={formData.priceFrom}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="border-b pb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Images</h2>
          
          {/* Hero Image */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image *</label>
            <div className="flex gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleHeroImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                📤 Upload Hero Image
              </button>
              {heroPreview && (
                <div className="flex-1">
                  <img src={heroPreview} alt="Hero Preview" className="h-40 object-cover rounded-lg" />
                </div>
              )}
            </div>
            {!formData.heroImage && (
              <p className="text-xs text-red-600 mt-1">Required</p>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images (Multiple)</label>
            <div className="mb-4">
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                📸 Add Gallery Photos
              </button>
            </div>
            {galleryPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryPreviews.map((preview, idx) => (
                  <div key={idx} className="relative">
                    <img src={preview} alt={`Gallery ${idx}`} className="h-32 w-full object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="border-b pb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Description</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Overview *</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Detailed overview of the trek"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What's Included</label>
              <textarea
                name="includes"
                value={formData.includes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="One item per line"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What's Excluded</label>
              <textarea
                name="excludes"
                value={formData.excludes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="One item per line"
              />
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="border-b pb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>
            <button
              type="button"
              onClick={addItineraryDay}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
            >
              + Add Day
            </button>
          </div>

          {formData.itinerary.map((day, idx) => (
            <div key={idx} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-4 text-gray-900">Day {day.day}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => handleItineraryChange(idx, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Day title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                  <textarea
                    value={day.details}
                    onChange={(e) => handleItineraryChange(idx, 'details', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Day details"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Published */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="published"
            id="published"
            checked={formData.published}
            onChange={handleInputChange}
            className="w-4 h-4 rounded"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-700">
            Publish immediately
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || !formData.heroImage}
            className="flex-1 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
          >
            {loading ? 'Creating...' : '✅ Create Activity'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition font-semibold"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
