import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services, getService } from '@/lib/marketing-content'
import { MarketingShell } from '@/components/marketing/marketing-shell'
import { ServiceDetail } from '@/components/marketing/inner-pages'
export function generateStaticParams() { return services.map(service => ({slug:service.slug})) }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> { const service=getService((await params).slug); return service ? {title:`${service.heading} в Санкт-Петербурге`,description:service.lead} : {} }
export default async function Page({params}:{params:Promise<{slug:string}>}) { const service=getService((await params).slug); if(!service) notFound(); return <MarketingShell><ServiceDetail service={service} /></MarketingShell> }
