'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Hero() {
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
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 md:px-0">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20" />
        {/* Subtle animated background elements */}
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-emerald-100/40 to-cyan-100/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Grid texture overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, .05) 25%, rgba(0, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .05) 75%, rgba(0, 0, 0, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, .05) 25%, rgba(0, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .05) 75%, rgba(0, 0, 0, .05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 md:space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full hover:bg-white/80 transition-colors">
                <span className="text-sm font-medium text-gray-700">
                  🌏 Nepal • Treks • Tours • Adventure
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                Adventure,{' '}
                <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  made effortless.
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-prose">
                Treks, tours, and experiences you'll never forget.
              </h2>
            </motion.div>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-base md:text-lg leading-relaxed max-w-prose"
            >
              Local certified guides. Safety-first approach. Custom itineraries tailored to your pace. Transparent pricing with no hidden costs. Join thousands of adventurers who've discovered their next great story with us.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-4">
              <button className="group px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2">
                Explore Activities
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 md:py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                Talk to a Guide
              </button>
            </motion.div>

            {/* Trust Chips */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-4"
            >
              {[
                { icon: '✓', text: 'Local certified guides' },
                { icon: '✓', text: 'Flexible itineraries' },
                { icon: '✓', text: '24/7 trip support' },
              ].map((chip, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-gray-200/30 hover:bg-white/60 transition-colors text-sm text-gray-700"
                >
                  <span className="text-emerald-500 font-bold">{chip.icon}</span>
                  {chip.text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Visual */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="relative h-96 md:h-full min-h-96 lg:min-h-screen flex items-center justify-center"
          >
            {/* Floating orb with layered gradients */}
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            >
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-blue-500/5 blur-2xl" />

              {/* Main gradient sphere */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-300 to-blue-400 shadow-2xl">
                {/* Inner highlight for 3D effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-70" />

                {/* Floating particles effect */}
                <div className="absolute inset-2 rounded-full border border-white/30" />
                <div className="absolute inset-6 rounded-full border border-white/20" />
                <div className="absolute inset-10 rounded-full border border-white/10" />
              </div>

              {/* Ambient light behind */}
              <div className="absolute -inset-12 rounded-full bg-gradient-radial from-emerald-200/30 to-transparent blur-3xl -z-10" />

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* Grain overlay */}
            <div
              className="absolute inset-0 rounded-3xl opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}