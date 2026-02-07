import type { Metadata } from 'next'
import { TopBar } from '@/components/TopBar'
import { SiteNavbar } from '@/components/site-navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Goodtime Adventure - Premium Trekking in Nepal',
  description: 'Experience the best trekking adventures in Nepal with Goodtime Adventure.',
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopBar />
      <SiteNavbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}
