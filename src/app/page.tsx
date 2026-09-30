import type { Metadata } from 'next'
import '@fontsource/pt-serif/400.css'
import '@fontsource/pt-serif/700.css'
import '@fontsource/gabriela/400.css'
import '@fontsource/yeseva-one/400.css'
import '@fontsource/vollkorn/900.css'
import { Hero } from '@/components/marketing/hero'
import { ProcessSection } from '@/components/marketing/process-section'
import { SiteFooter } from '@/components/marketing/site-footer'
import { SiteHeader } from '@/components/marketing/site-header'
import worldStyles from '@/components/marketing/world.module.css'
import '@/styles/gorynych-tokens.css'

export const metadata: Metadata = {
  title: { absolute: 'Плиточник Горыныч — укладка плитки в Санкт-Петербурге' },
  description:
    'Укладка плитки и керамогранита в Санкт-Петербурге. Гор работает лично: замер, укладка и детали без посредников.',
}

const SIGNBOARDS = [
  { label: 'Ванные', tone: 'primary' },
  { label: 'Санузлы', tone: 'primary' },
  { label: 'Кухни', tone: 'primary' },
  { label: 'Полы', tone: 'primary' },
  { label: 'Фартуки', tone: 'primary' },
  { label: 'Керамогранит', tone: 'wide' },
] as const

export default function HomePage() {
  return (
    <div className="gorynych" id="top">
      <div className={worldStyles.world}>
        <div className={worldStyles.desktopBg} aria-hidden="true" />

        <SiteHeader />
        <main className={worldStyles.main}>
          <Hero />
          <ProcessSection />
        </main>

        <aside className={worldStyles.signboard} aria-hidden="true">
          {SIGNBOARDS.map((item) => (
            <span
              key={item.label}
              className={item.tone === 'wide' ? worldStyles.boardWide : worldStyles.board}
            >
              {item.label}
            </span>
          ))}
          <span className={worldStyles.boardMotto}>Ровные стены — спокойные люди</span>
        </aside>
      </div>
      <SiteFooter />
    </div>
  )
}
