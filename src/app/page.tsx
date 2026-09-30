import type { Metadata } from 'next'
import { Hero } from '@/components/marketing/hero'
import { ProcessSection } from '@/components/marketing/process-section'
import { SiteFooter } from '@/components/marketing/site-footer'
import { SiteHeader } from '@/components/marketing/site-header'
import '@/styles/gorynych-tokens.css'

export const metadata: Metadata = {
  title: 'Плиточник Горыныч — укладка плитки в Санкт-Петербурге',
  description:
    'Укладка плитки и керамогранита в Санкт-Петербурге. Гор работает лично: замер, укладка и детали без посредников.',
}

export default function HomePage() {
  return (
    <div className="gorynych" id="top">
      <SiteHeader />
      <main>
        <Hero />
        <ProcessSection />
      </main>
      <SiteFooter />
    </div>
  )
}
