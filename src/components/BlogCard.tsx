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
      data-aos="fade-up"
      data-aos-delay="0"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="glass rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-500 hover:bg-white/12 border border-white/10 group">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:brightness-110 transition-all duration-500" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            {/* Date */}
            <p className="text-xs font-semibold text-cyan-300 uppercase tracking-wide mb-2">
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-300 transition-colors">{post.title}</h3>
            
            {/* Excerpt */}
            <p className="text-sm text-white/70 mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold border border-blue-400/30">{tag}</span>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold border-0" size="sm">
                Read More
              </Button>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}