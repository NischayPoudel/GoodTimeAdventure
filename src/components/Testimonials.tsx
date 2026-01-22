'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'USA',
    rating: 5,
    text: 'The Everest Base Camp trek was absolutely incredible. Our guide was knowledgeable, friendly, and made us feel completely safe. Best adventure of my life!',
    avatar: '👩‍🦰',
  },
  {
    name: 'Marco Rossi',
    location: 'Italy',
    rating: 5,
    text: 'Professional, well-organized, and genuinely passionate about sharing Nepal\'s beauty. The Annapurna trek exceeded all my expectations.',
    avatar: '👨‍🦱',
  },
  {
    name: 'Priya Patel',
    location: 'India',
    rating: 5,
    text: 'Amazing experience! The team took great care of us, the accommodations were comfortable, and we got to meet incredible local people.',
    avatar: '👩‍🦱',
  },
  {
    name: 'James Wilson',
    location: 'UK',
    rating: 5,
    text: 'Highly recommended! Goodtime Adventure made our dream of trekking in Nepal a reality. Every detail was perfectly arranged.',
    avatar: '👨‍🦲',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Adventurers Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what fellow trekkers say about their experiences with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}