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
}

export function EnquiryCard({ enquiry }: EnquiryCardProps) {
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

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold">{enquiry.fullName} - {enquiry.tourId}</h2>
          <p>{enquiry.email}</p>
          <p>{enquiry.message}</p>
          <p className="text-sm text-gray-500">{new Date(enquiry.createdAt).toDateString()}</p>
        </div>
        <Button
          variant={responded ? 'secondary' : 'default'}
          onClick={handleMarkResponded}
          disabled={loading || responded}
        >
          {loading ? 'Updating...' : responded ? 'Responded' : 'Mark Responded'}
        </Button>
      </div>
    </Card>
  )
}