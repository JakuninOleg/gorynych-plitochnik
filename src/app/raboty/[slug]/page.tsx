import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects, getProject } from '@/lib/marketing-content'
import { MarketingShell } from '@/components/marketing/marketing-shell'
import { WorkDetail } from '@/components/marketing/inner-pages'
export function generateStaticParams() { return projects.map(project => ({slug:project.slug})) }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> { const project=getProject((await params).slug); return project ? {title:project.title,description:project.subtitle} : {} }
export default async function Page({params}:{params:Promise<{slug:string}>}) { const project=getProject((await params).slug); if(!project) notFound(); return <MarketingShell><WorkDetail project={project} /></MarketingShell> }
