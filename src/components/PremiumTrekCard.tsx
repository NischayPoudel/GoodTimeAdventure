'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mountain, Clock, TrendingUp } from 'lucide-react'

interface PremiumTrekCardProps {
  trek: {
    _id: string
    title: string
    slug: string
    region: string
    difficulty: string
    duration?: string
    durationDays?: number
    elevation?: string
    price?: number
    heroImage: string
  }
  variant?: 'standard' | 'featured' | 'wide'
}

const difficultyMap: Record<string, { level: number; label: string; color: string }> = {
  'Easy': { level: 1, label: 'Easy', color: 'from-green-50 to-green-100' },
  'Medium': { level: 2, label: 'Moderate', color: 'from-amber-50 to-amber-100' },
  'Hard': { level: 3, label: 'Challenging', color: 'from-orange-50 to-orange-100' },
  'Expert': { level: 4, label: 'Expert', color: 'from-red-50 to-red-100' },
}

export function PremiumTrekCard({ trek, variant = 'standard' }: PremiumTrekCardProps) {
  const diff = difficultyMap[trek.difficulty] || difficultyMap['Medium']
  const duration = trek.durationDays || 3
  const elevation = trek.elevation || '3500m'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -2, transition: { duration: 0.3 } }}
    >
      <Link href={`/tours/${trek.slug}`}>
        <div className="group cursor-pointer h-full flex flex-col bg-stone-50 border border-stone-200 overflow-hidden hover:border-stone-300 transition-colors duration-300">
          {/* Image Section */}
          <div className={`relative overflow-hidden ${variant === 'wide' ? 'h-80' : variant === 'featured' ? 'h-72' : 'h-64'} bg-stone-100`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full h-full"
            >
              <Image
                src={trek.heroImage}
                alt={trek.title}
                fill
                className="object-cover transition-opacity duration-700"
                priority={variant === 'featured'}
              />
            </motion.div>
            
            {/* Difficulty Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-1.5 bg-white px-3 py-1.5 border border-stone-200">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: diff.level === 1 ? '#2d5a3d' : diff.level === 2 ? '#8b7355' : diff.level === 3 ? '#c9623a' : '#8b4513' }} />
              <span className="text-xs font-medium text-stone-700">{diff.label}</span>
            </div>

            {/* Subtle Overlay on Hover */}
            <motion.div
              className="absolute inset-0 bg-stone-900 opacity-0"
              whileHover={{ opacity: 0.05 }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8 flex flex-col grow">
            {/* Region & Title */}
            <div className="mb-4">
              <p className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">{trek.region}</p>
              <h3 className="text-lg lg:text-xl font-semibold text-stone-900 leading-tight line-clamp-2 group-hover:text-stone-700 transition-colors duration-300">
                {trek.title}
              </h3>
            </div>

            {/* Metrics */}
            <div className="space-y-3 py-4 border-t border-stone-200 mb-auto">
              {/* Duration */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-stone-600">
                  <Clock size={16} strokeWidth={1.5} />
                </div>
                <span className="text-sm text-stone-600">
                  {duration} {duration === 1 ? 'day' : 'days'}
                </span>
              </div>

              {/* Elevation */}
              {trek.elevation && (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center text-stone-600">
                    <Mountain size={16} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-stone-600">{elevation}</span>
                </div>
              )}
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ x: 2 }}
              transition={{ duration: 0.3 }}
              className="pt-4 border-t border-stone-200"
            >
              <p className="text-sm font-medium text-stone-700 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                Explore journey
                <span className="text-stone-400">→</span>
              </p>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
