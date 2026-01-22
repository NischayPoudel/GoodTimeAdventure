'use client'

import { motion } from 'framer-motion'
import { Mountain, Users, Shield, MapPin } from 'lucide-react'

const features = [
  {
    icon: Mountain,
    title: 'Expert Guides',
    description: 'Certified mountaineers with 10+ years of experience leading treks across Nepal',
  },
  {
    icon: Users,
    title: 'Small Groups',
    description: 'Intimate trekking experiences with groups of 4-8 people maximum',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Comprehensive insurance, emergency protocols, and medical support included',
  },
  {
    icon: MapPin,
    title: 'Local Experience',
    description: 'Support local communities while experiencing authentic Nepali culture',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Goodtime Adventure
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine safety, expertise, and authentic experiences to create unforgettable mountain journeys
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <Icon className="w-12 h-12 text-gray-900 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
