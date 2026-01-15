'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] },
    },
  }

  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4)' }}>
      {/* Professional gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Subtle floating glass elements */}
      <motion.div 
        className="absolute top-10 left-10 w-72 h-72 glass rounded-full blur-3xl opacity-10"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-96 h-96 glass rounded-full blur-3xl opacity-8"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-full h-full text-white text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight text-white"
            variants={itemVariants}
          >
            Discover Nepal
          </motion.h1>

          <motion.p 
            className="text-lg md:text-2xl lg:text-2xl mb-10 text-white/70 font-light leading-relaxed"
            variants={itemVariants}
          >
            Premium trekking adventures in the majestic Himalayas with Goodtime Adventure
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link href="/tours">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-xl hover:shadow-2xl border-0 px-10 py-4 text-lg font-semibold rounded-xl"
              >
                Explore Tours
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline"
                className="glass text-white border-white/40 hover:bg-white/15 hover:border-white/60 px-10 py-4 text-lg font-semibold rounded-xl"
              >
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}