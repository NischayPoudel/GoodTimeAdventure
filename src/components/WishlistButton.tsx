'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'

interface WishlistButtonProps {
  tourId: string
}

export function WishlistButton({ tourId }: WishlistButtonProps) {
  const { data: session } = useSession()
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if tour is in wishlist (would need API call)
  }, [tourId, session])

  const handleToggle = async () => {
    if (!session) return
    setLoading(true)
    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourId }),
      })
      if (res.ok) {
        setIsInWishlist(!isInWishlist)
      }
    } catch (error) {
      console.error('Failed to update wishlist')
    }
    setLoading(false)
  }

  if (!session) return null

  return (
    <Button onClick={handleToggle} disabled={loading} variant="outline" className="w-full mt-4">
      {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </Button>
  )
}