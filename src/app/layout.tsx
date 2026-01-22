import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { TopBar } from '@/components/TopBar'
import { SiteNavbar } from '@/components/site-navbar'
import { Footer } from '@/components/Footer'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Goodtime Adventure - Premium Trekking in Nepal',
  description: 'Experience the best trekking adventures in Nepal with Goodtime Adventure. Explore Everest, Annapurna, and more with local guides, flexible itineraries, and 24/7 support.',
  openGraph: {
    title: 'Goodtime Adventure - Adventure Made Effortless',
    description: 'Premium trekking in Nepal with certified local guides',
    type: 'website',
  },
  keywords: 'trekking, nepal, adventure, everest, annapurna, tours, hiking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${geistMono.variable} antialiased bg-white`}>
        <Providers>
          <TopBar />
          <SiteNavbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
