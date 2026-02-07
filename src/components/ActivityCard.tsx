'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Clock, Zap, DollarSign, ArrowRight } from 'lucide-react'

interface ActivityCardProps {
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

const difficultyConfig = {
  Easy: { dotColor: 'bg-green-600', label: 'Easy' },
  Moderate: { dotColor: 'bg-amber-600', label: 'Moderate' },
  Medium: { dotColor: 'bg-amber-600', label: 'Moderate' },
  Hard: { dotColor: 'bg-orange-600', label: 'Challenging' },
  Expert: { dotColor: 'bg-red-600', label: 'Expert' },
}

export function ActivityCard({ tour }: ActivityCardProps) {
  const difficulty = (tour.difficulty as keyof typeof difficultyConfig) || 'Moderate'
  const config = difficultyConfig[difficulty] || difficultyConfig.Moderate

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/tours/${tour.slug}`}>
        <div className="group h-full flex flex-col bg-white border border-gray-200 hover:border-gray-300 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden bg-gray-100">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Image 
                src={tour.heroImage} 
                alt={tour.title} 
                fill 
                className="object-cover" 
                priority={false}
              />
            </motion.div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Activity Badge */}
            <div className="absolute top-4 left-4">
              <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <span className="text-xs font-semibold text-gray-900">{tour.activity}</span>
              </div>
            </div>

            {/* Difficulty Badge */}
            <div className="absolute top-4 right-4">
              <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
                <span className="text-xs font-medium text-gray-700">{config.label}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5 md:p-6 flex flex-col grow">
            {/* Region */}
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" strokeWidth={2} />
              <span className="text-xs uppercase tracking-widest font-medium text-gray-500">{tour.region}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
              {tour.title}
            </h3>

            {/* Divider */}
            <div className="w-8 h-0.5 bg-gray-900 mb-4 group-hover:w-12 transition-all duration-300" />

            {/* Info Grid */}
            <div className="space-y-3 mb-5 py-4 border-y border-gray-200">
              {/* Duration */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Clock className="w-4 h-4 text-gray-600" strokeWidth={2} />
                </div>
                <span className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">{tour.durationDays}</span> {tour.durationDays === 1 ? 'Day' : 'Days'}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <DollarSign className="w-4 h-4 text-gray-600" strokeWidth={2} />
                </div>
                <span className="text-sm text-gray-700">
                  From <span className="font-bold text-gray-900">₹{tour.priceFrom.toLocaleString('en-IN')}</span>
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
              className="mt-auto"
            >
              <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                <span className="font-semibold text-sm text-gray-900">Explore</span>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
