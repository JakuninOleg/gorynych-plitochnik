import type { Metadata } from 'next'
import '@fontsource/alegreya/cyrillic-ext-900.css'
import '@fontsource/alegreya/cyrillic-900.css'
import '@fontsource/alegreya/900.css'
import '@fontsource/pt-serif/400.css'
import '@fontsource/pt-serif/700.css'
import '@fontsource/gabriela/400.css'
import '@fontsource/yeseva-one/400.css'
import '@fontsource/vollkorn/900.css'
import { Hero } from '@/components/marketing/hero'
import { ProcessSection } from '@/components/marketing/process-section'
import { SiteHeader } from '@/components/marketing/site-header'
import { SiteFooter } from '@/components/marketing/site-footer'
import { HomeCraft, HomeServices, HomeMaster, HomeReviews } from '@/components/marketing/home-chapters'
import { WorksSection } from '@/components/marketing/works-section'
import { TileCalculator } from '@/components/marketing/tile-calculator'
import { ContactSection } from '@/components/marketing/contact-section'
import worldStyles from '@/components/marketing/world.module.css'
import '@/styles/gorynych-tokens.css'

export const metadata: Metadata = {
  title: { absolute: 'Плиточник Горыныч — укладка плитки в Санкт-Петербурге' },
  description:
    'Укладка плитки и керамогранита в Санкт-Петербурге и области. Гор работает лично: замер, укладка и детали без посредников.',
}

export default function HomePage() {
  return (
    <div className="gorynych" id="top">
      <div className={worldStyles.world}>
        <div className={worldStyles.desktopBg} aria-hidden="true" />

        <SiteHeader />
        <main className={worldStyles.main}>
          <Hero />
          <ProcessSection />
          <div className={worldStyles.continuation}>
            <WorksSection />
            <TileCalculator />
            <HomeCraft />
            <HomeServices />
            <HomeMaster />
            <HomeReviews />
            <ContactSection illustrated />
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
