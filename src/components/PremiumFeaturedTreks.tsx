import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { PremiumTrekCard } from '@/components/PremiumTrekCard'
import { motion } from 'framer-motion'
import Link from 'next/link'

export async function PremiumFeaturedTreks() {
  await connectDB()
  const tours = await Tour.find({ published: true }).limit(4).sort({ createdAt: -1 })

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
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-4">Featured Journeys</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 tracking-tight">
              Curated<br />Expeditions
            </h2>
          </div>
          <Link
            href="/tours"
            className="flex items-center gap-2 text-stone-700 hover:text-stone-900 font-medium text-sm md:text-base whitespace-nowrap transition-all duration-300"
          >
            Explore all journeys
            <span className="text-stone-400 ml-2">→</span>
          </Link>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-stone-600 font-light max-w-3xl mb-16 md:mb-20 leading-relaxed"
        >
          Each trek represents a carefully planned journey into untouched wilderness. From serene forest walks to demanding alpine routes, discover your next summit.
        </motion.p>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {tours.map((trek, idx) => (
            <motion.div key={trek._id} variants={itemVariants}>
              <PremiumTrekCard trek={trek} />
            </motion.div>
          ))}
        </motion.div>

        {/* Spacer */}
        <div className="h-12" />
      </div>
    </section>
  )
}
