'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DropdownItem {
  icon: string
  title: string
  description: string
}

interface DropdownCategory {
  title: string
  items: DropdownItem[]
}

const activitiesDropdown: DropdownCategory[] = [
  {
    title: 'Trekking',
    items: [
      { icon: '⛏️', title: 'Everest Base Camp', description: 'Legendary Himalayan trek' },
      { icon: '🏔️', title: 'Annapurna Circuit', description: 'Stunning mountain loop' },
      { icon: '🌲', title: 'Langtang Valley', description: 'Intimate alpine experience' },
    ],
  },
  {
    title: 'Tours',
    items: [
      { icon: '🏛️', title: 'Kathmandu Heritage', description: 'Ancient temples & culture' },
      { icon: '🌅', title: 'Pokhara Highlights', description: 'Lakes & mountain views' },
      { icon: '🐅', title: 'Chitwan Safari', description: 'Wildlife adventure' },
    ],
  },
  {
    title: 'Adventure',
    items: [
      { icon: '🪂', title: 'Paragliding', description: 'Fly over mountains' },
      { icon: '🚣', title: 'Rafting', description: 'White water thrills' },
      { icon: '🧗', title: 'Peak Climbing', description: 'Summit the peaks' },
    ],
  },
]

export function SiteNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobileActivityOpen, setIsMobileActivityOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm'
            : 'bg-white/40 backdrop-blur-sm border-b border-white/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-lg">⛰️</span>
              </div>
              <span className="font-bold text-gray-900 text-lg hidden sm:inline">Goodtime Adventure</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
<div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors flex items-center gap-1 group">
                  Activities
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-2 w-screen max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-100/50 p-8"
                  >
                    <div className="grid grid-cols-3 gap-8">
                      {activitiesDropdown.map((category) => (
                        <div key={category.title}>
                          <h3 className="font-semibold text-gray-900 mb-4 text-sm">{category.title}</h3>
                          <div className="space-y-3">
                            {category.items.map((item) => (
                              <button
                                key={item.title}
                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group/item"
                              >
                                <div className="flex items-start gap-2">
                                  <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                                  <div>
                                    <p className="font-medium text-gray-900 text-sm group-hover/item:text-emerald-600 transition-colors">
                                      {item.title}
                                    </p>
                                    <p className="text-xs text-gray-600">{item.description}</p>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <Link
                href="/about"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                View Packages
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium text-sm rounded-full hover:shadow-lg transition-shadow">
                Book a Trip
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 md:hidden bg-white border-b border-gray-100 shadow-lg z-40"
        >
          <div className="px-6 py-4 space-y-3 max-h-96 overflow-y-auto">
            <Link
              href="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileOpen(false)}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Activities Accordion */}
            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={() => setIsMobileActivityOpen(!isMobileActivityOpen)}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium flex items-center justify-between"
              >
                Activities
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isMobileActivityOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isMobileActivityOpen && (
                <div className="ml-4 mt-2 space-y-2 border-l border-gray-200 pl-4">
                  {activitiesDropdown.map((category) =>
                    category.items.map((item) => (
                      <button
                        key={item.title}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-lg flex-shrink-0">{item.icon}</span>
                          <div>
                            <p className="font-medium text-gray-700">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button className="w-full px-4 py-2 text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors font-medium text-sm">
                View Packages
              </button>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full hover:shadow-lg transition-shadow font-medium text-sm">
                Book a Trip
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
