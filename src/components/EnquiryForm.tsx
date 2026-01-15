'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface EnquiryFormProps {
  tourId: string
}

export function EnquiryForm({ tourId }: EnquiryFormProps) {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    travelDate: '',
    people: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tourId, userId: session?.user?.id }),
      })
      if (res.ok) {
        setMessage('Enquiry sent successfully!')
        setFormData({ fullName: '', email: '', travelDate: '', people: '', message: '' })
      } else {
        setMessage('Failed to send enquiry')
      }
    } catch (error) {
      setMessage('An error occurred')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Enquire About This Tour</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="date"
          value={formData.travelDate}
          onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Number of People"
          value={formData.people}
          onChange={(e) => setFormData({ ...formData, people: e.target.value })}
          required
        />
        <Textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Sending...' : 'Send Enquiry'}
        </Button>
        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </div>
  )
}