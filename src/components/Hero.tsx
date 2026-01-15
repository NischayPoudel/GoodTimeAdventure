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
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden pt-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4)' }}>
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Floating glass elements */}
      <motion.div 
        className="absolute top-10 left-10 w-72 h-72 glass rounded-full blur-3xl opacity-20"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-96 h-96 glass rounded-full blur-3xl opacity-15"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center h-full text-white text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight gradient-text"
            variants={itemVariants}
          >
            Discover Nepal
          </motion.h1>

          <motion.p 
            className="text-lg md:text-2xl lg:text-3xl mb-8 text-white/80 font-light leading-relaxed"
            variants={itemVariants}
          >
            Experience premium trekking adventures in the majestic Himalayas with Goodtime Adventure
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link href="/tours">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-2xl border-0 px-8 py-4 text-lg font-semibold"
              >
                Explore Tours
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline"
                className="glass text-white border-white/30 hover:bg-white/10 px-8 py-4 text-lg font-semibold"
              >
                Get in Touch
              </Button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-white text-sm font-light">Scroll to explore</div>
            <div className="flex justify-center mt-2">
              <motion.div
                className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div className="w-1 h-2 bg-white rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}