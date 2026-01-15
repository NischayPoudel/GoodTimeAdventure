'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

interface TourCardProps {
  tour: {
    _id: string
    title: string
    slug: string
    region: string
    activity: string
    difficulty: string
    durationDays: number
    priceFrom: number
    heroImage: string
  }
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link href={`/tours/${tour.slug}`}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 cursor-pointer h-full flex flex-col">
          {/* Image Container */}
          <div className="relative h-56 overflow-hidden bg-gray-200">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" />
            </motion.div>
            <div className="absolute top-0 right-0 p-3">
              <Badge className="bg-blue-500 text-white shadow-lg">{tour.activity}</Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors">{tour.title}</h3>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {tour.region}
            </div>

            {/* Duration and Difficulty */}
            <div className="flex justify-between items-center mb-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 11-2 0 1 1 0 012 0zm0 4a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                {tour.durationDays} days
              </div>
              <Badge variant="secondary" className="text-xs">{tour.difficulty}</Badge>
            </div>

            {/* Price and CTA */}
            <div className="mt-auto">
              <p className="text-2xl font-bold text-blue-500 mb-3">From ${tour.priceFrom}</p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold" size="sm">
                  View Details
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}