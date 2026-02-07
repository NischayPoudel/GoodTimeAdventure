'use client'

import { useState } from 'react'
import { ActivityCard } from '@/components/ActivityCard'
import { motion } from 'framer-motion'
import { Mountain, Compass, Zap, Users } from 'lucide-react'

interface ActivitiesProps {
  tours: any[]
}

const activityFilters = [
  { id: 'all', label: 'All Adventures', icon: Mountain },
  { id: 'Trekking', label: 'Trekking', icon: Mountain },
  { id: 'Hiking', label: 'Hiking', icon: Compass },
  { id: 'Climbing', label: 'Climbing', icon: Zap },
  { id: 'Cultural', label: 'Cultural Tours', icon: Users },
]

export function Activities({ tours }: ActivitiesProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredTours = activeFilter === 'all' 
    ? tours 
    : tours.filter(tour => tour.activity === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold mb-6 text-gray-900">
            Himalayan Adventures
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover unforgettable mountain experiences across Nepal's most breathtaking landscapes
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {activityFilters.map((filter) => {
            const Icon = filter.icon
            return (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                {filter.label}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Tours Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeFilter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredTours.map((tour) => (
            <motion.div key={tour._id} variants={itemVariants}>
              <ActivityCard tour={tour} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredTours.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mountain className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-xl text-gray-600 font-semibold mb-2">No adventures found</p>
            <p className="text-gray-500">Try selecting a different activity type to explore more options.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}