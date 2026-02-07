'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function PremiumFeaturedSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const highlights = [
    {
      title: 'Serve as Guide',
      description: 'Lead adventures and share your passion',
      href: '#',
    },
    {
      title: 'Premium Routes',
      description: 'Access to exclusive expedition trails',
      href: '#',
    },
    {
      title: 'Mountain Stories',
      description: 'Documentation and expedition journals',
      href: '#',
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-4">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 tracking-tight mb-6">
            We bring excellence<br />to each expedition
          </h2>
          <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl leading-relaxed">
            More than just trekking outfitter. We're storytellers, naturalists, and guides dedicated to transforming how you experience mountains.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-20"
        >
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex flex-col"
            >
              <div className="w-12 h-12 bg-stone-900 rounded-sm mb-6 flex items-center justify-center">
                <span className="text-stone-50 text-lg font-light">{idx + 1}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-stone-900 mb-3">
                {item.title}
              </h3>
              <p className="text-base text-stone-600 font-light mb-6 grow leading-relaxed">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-colors duration-300 text-sm font-medium group"
              >
                Learn more
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-stone-200 pt-16 md:pt-20"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-light text-stone-900 mb-3">
                Ready to explore?
              </h3>
              <p className="text-base text-stone-600 font-light">
                Choose from dozens of carefully planned expeditions
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                href="/tours"
                className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-stone-50 font-medium text-base hover:bg-stone-800 transition-colors duration-300"
              >
                Browse expeditions
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
