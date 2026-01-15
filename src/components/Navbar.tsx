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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Goodtime
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <motion.div
              className="flex items-center space-x-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link 
                    href={link.href}
                    className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 font-medium transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {link.label}
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
            transition={{ duration: 0.3 }}
          >
            {session ? (
              <>
                {session.user.role === 'admin' && (
                  <Link href="/admin" className="px-3 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-500 transition-colors">Admin</Link>
                )}
                <Link href="/wishlist" className="px-3 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-500 transition-colors">Wishlist</Link>
                <Link href="/account/enquiries" className="px-3 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-500 transition-colors">Enquiries</Link>
                <Button 
                  onClick={() => signOut()} 
                  className="bg-red-500 hover:bg-red-600 text-white"
                  size="sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Register</Button>
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
                className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300"
                animate={isOpen ? { rotate: 45, y: 12 } : { rotate: 0, y: 0 }}
              />
              <motion.div 
                className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.div 
                className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300"
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
          <div className="py-4 space-y-2 border-t border-gray-200 dark:border-gray-800">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                {session.user.role === 'admin' && (
                  <Link href="/admin" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium">Admin</Link>
                )}
                <Link href="/wishlist" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium">Wishlist</Link>
                <Link href="/account/enquiries" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium">My Enquiries</Link>
                <Button 
                  onClick={() => {
                    signOut()
                    setIsOpen(false)
                  }} 
                  className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white"
                  size="sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </Link>
                <Link href="/register" className="block">
                  <Button size="sm" className="w-full">Register</Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}