'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: 'Tours', href: '/tours' },
    { label: 'Blog', href: '/blog' },
    { label: 'Gallery', href: '/gallery' },
  ]

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ]

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-50"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(15, 23, 42, 0.8) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(15, 23, 42, 0.8) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="group">
            <h3 className="text-2xl font-bold text-white mb-4">Goodtime</h3>
            <p className="text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors">Your trusted trekking partner in Nepal, bringing unforgettable Himalayan experiences to adventurers worldwide.</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold text-white mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium group">
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium group">
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 group cursor-pointer">
                <svg className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-300 group-hover:text-cyan-400 transition-colors">info@goodtimeadventure.com</span>
              </div>
              <div className="flex items-start space-x-3 group cursor-pointer">
                <svg className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.02.04.048.082.087.134 1.333 2.127 3.85 5.99 7.8 9.14l1.05-1.313c.383-.48.645-.643 1.11-.08l3.85 3.85c.505.505.767.767.21 1.318-1.88 1.88-4.07 2.271-6.16.181-3.824-3.824-8.99-10.096-10.854-14.36C2.731 7.166 3.122 4.976 5.002 3.096 5.553 2.545 5.715 2.807 6.22 3.312l3.85 3.85c.565.565.4.727-.08 1.11L8.57 8.985c.052.039.094.067.134.087 2.15-3.95 7.01-6.467 9.14-7.8.306-.195.779-.156 1.06-.54l.773-1.548A1 1 0 0116.435 0H4a1 1 0 00-2 0v3z" />
                </svg>
                <span className="text-gray-300 group-hover:text-cyan-400 transition-colors">+977 1 234 5678</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8" />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} Goodtime Adventure. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 group">
              <span className="relative">
                Twitter
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 group">
              <span className="relative">
                Facebook
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 group">
              <span className="relative">
                Instagram
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}