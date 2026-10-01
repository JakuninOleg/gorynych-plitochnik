import '@fontsource-variable/inter'
import '@fontsource-variable/manrope'
import '@fontsource-variable/caveat'
import '@fontsource/alegreya/cyrillic-ext-900.css'
import '@fontsource/alegreya/cyrillic-900.css'
import '@fontsource/alegreya/900.css'
import '@fontsource/pt-serif/400.css'
import '@fontsource/pt-serif/700.css'
import '@fontsource/gabriela/400.css'
import '@/styles/gorynych-tokens.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined)

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: 'Плиточник Горыныч — укладка плитки в Санкт-Петербурге',
    template: '%s · Плиточник Горыныч',
  },
  description:
    'Укладка плитки и керамогранита в Санкт-Петербурге. Гор работает лично: замер, укладка и детали.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Плиточник Горыныч',
    title: 'Плиточник Горыныч — укладка плитки в Санкт-Петербурге',
    description:
      'Укладка плитки и керамогранита в Санкт-Петербурге. Гор работает лично.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Плиточник Горыныч',
    description: 'Укладка плитки и керамогранита в Санкт-Петербурге. Гор работает лично.',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" data-theme="light">
      <body>{children}</body>
    </html>
  )
}
