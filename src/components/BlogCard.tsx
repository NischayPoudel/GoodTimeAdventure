'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

interface BlogCardProps {
  post: {
    _id: string
    title: string
    slug: string
    excerpt: string
    coverImage?: string
    image?: string
    tags?: string[]
    createdAt: Date | string
  }
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
      data-aos="fade-up"
      data-aos-delay="0"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="bg-white rounded-lg overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-300 hover:shadow-lg border border-gray-200 group">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden bg-gray-100">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Image src={post.coverImage || post.image || ''} alt={post.title} fill className="object-cover transition-all duration-300" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            {/* Date */}
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">{post.title}</h3>
            
            {/* Excerpt */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags && post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">{tag}</span>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold border-0 rounded-lg" size="sm">
                Read More
              </Button>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}