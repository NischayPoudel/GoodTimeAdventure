'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumTrekCard } from '@/components/PremiumTrekCard'
import { ChevronDown } from 'lucide-react'

interface PremiumTrekExplorerProps {
  treks: any[]
}

const difficultyFilters = [
  { id: 'all', label: 'All Expeditions' },
  { id: 'Easy', label: 'Easy Treks' },
  { id: 'Medium', label: 'Moderate Routes' },
  { id: 'Hard', label: 'Challenging Peaks' },
  { id: 'Expert', label: 'Expert Journeys' },
]

const sortOptions = [
  { id: 'newest', label: 'Newest First' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'difficulty', label: 'By Difficulty' },
]

export function PremiumTrekExplorer({ treks }: PremiumTrekExplorerProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showSort, setShowSort] = useState(false)

  const filteredTreks = activeFilter === 'all'
    ? treks
    : treks.filter(trek => trek.difficulty === activeFilter)

  const sortedTreks = [...filteredTreks].sort((a, b) => {
    if (sortBy === 'difficulty') {
      const diffOrder = { 'Easy': 0, 'Medium': 1, 'Hard': 2, 'Expert': 3 }
      return (diffOrder[a.difficulty as keyof typeof diffOrder] || 0) - (diffOrder[b.difficulty as keyof typeof diffOrder] || 0)
    }
    return 0
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-stone-900 mb-4 tracking-tight">
            Mountain<br />Expeditions
          </h1>
          <p className="text-base md:text-lg text-stone-600 max-w-2xl leading-relaxed font-light">
            Carefully curated journeys into the heart of the Himalayas. Each route tells a story of discovery, challenge, and natural wonder.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          {/* Difficulty Filters */}
          <div className="flex flex-wrap gap-2">
            {difficultyFilters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 border ${
                  activeFilter === filter.id
                    ? 'bg-stone-900 text-stone-50 border-stone-900'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-stone-900'
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setShowSort(!showSort)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-300 hover:border-stone-900 transition-colors duration-300"
            >
              {sortOptions.find(opt => opt.id === sortBy)?.label}
              <ChevronDown size={16} className={`transition-transform duration-300 ${showSort ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 bg-white border border-stone-300 shadow-sm z-10 min-w-48"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id)
                        setShowSort(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm border-b border-stone-200 last:border-0 transition-colors duration-200 ${
                        sortBy === option.id
                          ? 'bg-stone-100 text-stone-900 font-medium'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Asymmetrical Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`${activeFilter}-${sortBy}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-max"
        >
          {sortedTreks.map((trek, idx) => {
            // Asymmetrical layout: alternate tall cards
            let variant: 'standard' | 'featured' | 'wide' = 'standard'
            if (idx % 5 === 0) variant = 'featured' // First of each 5 is featured (taller)
            if (idx % 5 === 3) variant = 'wide' // 4th of each 5 is wide

            return (
              <motion.div
                key={trek._id}
                variants={itemVariants}
                className={idx % 5 === 0 || idx % 5 === 3 ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <PremiumTrekCard trek={trek} variant={variant} />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Empty State */}
        {sortedTreks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-lg text-stone-600 font-light mb-2">No expeditions match your criteria</p>
            <p className="text-sm text-stone-500">Try adjusting your filters to discover more journeys</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
