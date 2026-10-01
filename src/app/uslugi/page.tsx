import type { Metadata } from 'next'
import { MarketingShell } from '@/components/marketing/marketing-shell'
import { ServicesIndex } from '@/components/marketing/inner-pages'
export const metadata: Metadata = { title: 'Услуги плиточника в Санкт-Петербурге', description: 'Ванные, керамогранит, полы и стены, кухонные фартуки, мозаика и запил под 45°. Гор работает лично.' }
export default function Page() { return <MarketingShell><ServicesIndex /></MarketingShell> }
