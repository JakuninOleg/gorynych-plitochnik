import type { Metadata } from 'next'
import { MarketingShell } from '@/components/marketing/marketing-shell'
import { WorksIndex } from '@/components/marketing/inner-pages'
export const metadata: Metadata = { title: 'Работы плиточника — объекты и детали', description: 'Ванные, кухонные фартуки и керамогранит. Рассмотрите раскладку, фактуры, углы и примыкания.' }
export default function Page() { return <MarketingShell><WorksIndex /></MarketingShell> }
