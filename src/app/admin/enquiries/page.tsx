'use client'

import { useEffect, useState } from 'react'
import { EnquiryCard } from '@/components/EnquiryCard'

interface Enquiry {
  _id: string
  fullName: string
  email: string
  tourId: string
  message: string
  responded: boolean
  createdAt: Date
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/enquiries')
      if (!response.ok) throw new Error('Failed to fetch enquiries')
      const data = await response.json()
      setEnquiries(data)
    } catch (err) {
      setError('Failed to load enquiries')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    setEnquiries(enquiries.filter((e) => e._id !== id))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Enquiries</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading enquiries...</p>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No enquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <EnquiryCard
              key={enquiry._id}
              enquiry={enquiry}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}