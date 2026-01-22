'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Clock, Zap } from 'lucide-react'

interface Experience {
  id: string
  title: string
  location: string
  duration: string
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  price: number
  gradient: string
}

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Everest Base Camp Trek',
    location: 'Solukhumbu',
    duration: '12-14 days',
    difficulty: 'Challenging',
    price: 1299,
    gradient: 'from-slate-400 via-slate-300 to-slate-200',
  },
  {
    id: '2',
    title: 'Annapurna Sunrise Trek',
    location: 'Poon Hill',
    duration: '7-9 days',
    difficulty: 'Moderate',
    price: 849,
    gradient: 'from-orange-300 via-pink-300 to-rose-200',
  },
  {
    id: '3',
    title: 'Chitwan Jungle Safari',
    location: 'Chitwan National Park',
    duration: '2-3 days',
    difficulty: 'Easy',
    price: 399,
    gradient: 'from-green-400 via-emerald-300 to-teal-200',
  },
]

const difficultyConfig = {
  Easy: { color: 'bg-emerald-100 text-emerald-700', icon: '🌤️' },
  Moderate: { color: 'bg-amber-100 text-amber-700', icon: '⛅' },
  Challenging: { color: 'bg-rose-100 text-rose-700', icon: '⛈️' },
}

export function FeaturedExperiences() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative py-20 md:py-28 px-4 md:px-0 bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 right-20 w-64 h-64 bg-gradient-to-br from-cyan-100/30 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Treks
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Handpicked adventures for unforgettable mountain experiences
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-200/50 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
            >
              {/* Image Placeholder with Gradient */}
              <div className={`relative h-48 md:h-56 bg-gradient-to-br ${exp.gradient} overflow-hidden`}>
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-all">
                  {exp.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 flex-shrink-0 text-emerald-500" />
                  <span className="text-sm">{exp.location}</span>
                </div>

                {/* Duration & Difficulty */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                    <Clock className="w-3.5 h-3.5" />
                    {exp.duration}
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                      difficultyConfig[exp.difficulty].color
                    }`}
                  >
                    <span>{difficultyConfig[exp.difficulty].icon}</span>
                    {exp.difficulty}
                  </div>
                </div>

                {/* Price and Link */}
                <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">From</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${exp.price}
                      <span className="text-sm font-normal text-gray-600">/person</span>
                    </p>
                  </div>
                  <Link href="/activities" className="p-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 text-emerald-600 rounded-full hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* View Details Link */}
                <Link href="/activities" className="block w-full mt-4 px-4 py-2.5 text-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors">
                  View Details →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link href="/activities" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-gray-800">
            Explore All Treks
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
