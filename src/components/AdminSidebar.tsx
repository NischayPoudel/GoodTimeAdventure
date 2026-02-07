'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

const navigationItems = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Blog Posts', href: '/admin/blog', icon: '📝' },
  { label: 'Activities/Treks', href: '/admin/activities', icon: '🏔️' },
  { label: 'Enquiries', href: '/admin/enquiries', icon: '📧' },
  { label: 'Gallery', href: '/admin/gallery', icon: '🖼️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-900 text-white p-2 rounded-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-800 shadow-2xl transition-transform duration-300 md:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-white mb-2">GoodTime</h1>
          <p className="text-blue-200 text-sm mb-8">Admin Panel</p>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-emerald-500 text-white font-semibold'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={() => signOut({ callbackUrl: '/admin-login' })}
            className="w-full mt-8 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
