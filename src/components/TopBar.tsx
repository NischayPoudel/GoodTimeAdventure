'use client'

import { Mail, Phone, MapPin } from 'lucide-react'

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[51] bg-gray-900 text-white h-12">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm w-full">
          <div className="flex items-center gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
              <a href="mailto:info@goodtimeadventure.com" className="hover:text-gray-300 transition">
                info@goodtimeadventure.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <a href="tel:+977-9846977658" className="hover:text-gray-300 transition">
              +977 9846977658
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
