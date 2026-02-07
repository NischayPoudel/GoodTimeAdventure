'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface EnquiryCardProps {
  enquiry: {
    _id: string
    fullName: string
    email: string
    tourId: string
    message: string
    responded: boolean
    createdAt: Date
  }
  onDelete?: (id: string) => void
}

export function EnquiryCard({ enquiry, onDelete }: EnquiryCardProps) {
  const [responded, setResponded] = useState(enquiry.responded)
  const [loading, setLoading] = useState(false)

  const handleMarkResponded = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/enquiries/${enquiry._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        setResponded(true)
      } else {
        alert('Failed to update enquiry')
      }
    } catch (error) {
      console.error('Error updating enquiry:', error)
      alert('Error updating enquiry')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      setLoading(true)
      try {
        const response = await fetch(`/api/enquiries/${enquiry._id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          onDelete?.(enquiry._id)
        } else {
          alert('Failed to delete enquiry')
        }
      } catch (error) {
        console.error('Error deleting enquiry:', error)
        alert('Error deleting enquiry')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="font-semibold">{enquiry.fullName} - {enquiry.tourId}</h2>
          <p className="text-sm text-gray-600">{enquiry.email}</p>
          <p className="mt-2">{enquiry.message}</p>
          <p className="text-xs text-gray-500 mt-2">{new Date(enquiry.createdAt).toDateString()}</p>
        </div>
        <div className="space-x-2 ml-4">
          <Button
            variant={responded ? 'secondary' : 'default'}
            onClick={handleMarkResponded}
            disabled={loading || responded}
            className="text-xs"
          >
            {loading ? 'Updating...' : responded ? 'Responded' : 'Mark Responded'}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="text-xs"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}