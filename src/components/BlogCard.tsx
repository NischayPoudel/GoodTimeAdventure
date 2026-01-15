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
    coverImage: string
    tags: string[]
    createdAt: Date
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
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 cursor-pointer h-full flex flex-col">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden bg-gray-200">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            {/* Date */}
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors">{post.title}</h3>
            
            {/* Excerpt */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold" size="sm">
                Read More
              </Button>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}