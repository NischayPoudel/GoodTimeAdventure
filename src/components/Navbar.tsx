'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/tours', label: 'Tours' },
    { href: '/activities', label: 'Activities' },
    { href: '/blog', label: 'Blog' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 shadow-2xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-3xl font-black gradient-text hover:scale-110 transition-transform duration-300">
            GT
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <motion.div
              className="flex items-center space-x-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link 
                    href={link.href}
                    className="px-4 py-2 text-white/80 hover:text-white font-medium transition-all duration-300 rounded-lg glass-light glass-hover group relative"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Auth Links */}
          <motion.div 
            className="hidden md:flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {session ? (
              <>
                {session.user.role === 'admin' && (
                  <Link href="/admin" className="px-4 py-2 text-white/80 hover:text-white font-medium transition-all duration-300 rounded-lg glass-light glass-hover">Admin</Link>
                )}
                <Link href="/wishlist" className="px-4 py-2 text-white/80 hover:text-white font-medium transition-all duration-300 rounded-lg glass-light glass-hover">Wishlist</Link>
                <Link href="/account/enquiries" className="px-4 py-2 text-white/80 hover:text-white font-medium transition-all duration-300 rounded-lg glass-light glass-hover">Enquiries</Link>
                <Button 
                  onClick={() => signOut()} 
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl"
                  size="sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">Register</Button>
                </Link>
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="space-y-1.5">
              <motion.div 
                className="w-6 h-0.5 bg-white"
                animate={isOpen ? { rotate: 45, y: 12 } : { rotate: 0, y: 0 }}
              />
              <motion.div 
                className="w-6 h-0.5 bg-white"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.div 
                className="w-6 h-0.5 bg-white"
                animate={isOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-2 border-t border-white/10 mt-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-white/80 hover:text-white font-medium transition-all duration-300 rounded-lg glass-light glass-hover"
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                {session.user.role === 'admin' && (
                  <Link href="/admin" className="block px-4 py-3 text-white/80 hover:text-white font-medium transition-all duration-300 rounded-lg glass-light glass-hover">Admin</Link>
                )}
                <Link href="/wishlist" className="block px-4 py-3 text-white/80 hover:text-white font-medium transition-all duration-300 rounded-lg glass-light glass-hover">Wishlist</Link>
                <Link href="/account/enquiries" className="block px-4 py-3 text-white/80 hover:text-white font-medium transition-all duration-300 rounded-lg glass-light glass-hover">My Enquiries</Link>
                <Button 
                  onClick={() => {
                    signOut()
                    setIsOpen(false)
                  }} 
                  className="w-full mt-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0"
                  size="sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full text-white border-white/20 hover:bg-white/10">Login</Button>
                </Link>
                <Link href="/register" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">Register</Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}