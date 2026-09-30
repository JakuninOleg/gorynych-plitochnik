'use client'

import { ArrowLeft, ArrowRight, Eye } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useDemo } from '@/components/demo/demo-provider'
import type { PageContent } from '@/lib/demo-data'
import { OJLogo } from '@/components/brand/oj-logo'
import styles from './page-renderer.module.css'

export function PageRenderer({ slug, mode }: { slug: string; mode: 'preview' | 'published' }) {
  const { state, hydrated } = useDemo()
  const page = state.pages.find((item) => item.slug === slug)
  const content: PageContent | null = mode === 'preview' ? page?.draft ?? null : page?.published ?? null
  const media = state.media.find((asset) => asset.id === content?.mediaId)

  if (!hydrated) return <main className={styles.loading}>Загружаем демо-данные…</main>
  if (!page || !content) return <main className={styles.notFound}><span>404</span><h1>Страница не опубликована</h1><p>В публичной версии доступны только опубликованные материалы.</p><Link href="/admin/pages">Вернуться в CMS</Link></main>

  return (
    <div className={styles.site}>
      {mode === 'preview' ? <div className={styles.previewBar}><span><Eye aria-hidden="true" />Предпросмотр черновика · посетители сайта его не видят</span><Link href={`/admin/pages/${page.id}`}><ArrowLeft />Вернуться к редактированию</Link></div> : null}
      <header className={styles.siteHeader}><Link href="/site/home" className={styles.logo} aria-label="OJ Studio — главная"><OJLogo compact /></Link><nav aria-label="Навигация сайта"><a href="#about">О студии</a><a href="#work">Подход</a><a href="#contacts">Контакты</a></nav><a className={styles.contact} href={content.ctaUrl || '#contacts'}>Обсудить проект</a></header>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}><p>OJ Studio · Москва</p><h1>{content.heading}</h1><div><span>{content.intro}</span><a href={content.ctaUrl || '#contacts'}>{content.ctaLabel || 'Подробнее'}<ArrowRight /></a></div></div>
          {media ? <Image src={media.url} alt={media.alt} width={1280} height={840} priority unoptimized /> : <div className={styles.noImage}>Изображение пока не выбрано</div>}
        </section>
        <section className={styles.statement} id="about"><span>01</span><h2>Смысл, форма и работающая система</h2><p>{content.body}</p></section>
        <section className={styles.approach} id="work"><div><span>Стратегия</span><p>Понимаем контекст и формулируем задачу.</p></div><div><span>Дизайн</span><p>Создаём ясный интерфейс и визуальный язык.</p></div><div><span>Разработка</span><p>Собираем устойчивый продукт и сопровождаем запуск.</p></div></section>
      </main>
      <footer className={styles.footer} id="contacts"><div><span className={styles.footerBrand}><OJLogo compact /></span><h2>Есть задача?<br />Давайте обсудим.</h2></div><div><a href={`mailto:${state.settings.email}`}>{state.settings.email}</a><span>{state.settings.phone}</span><span>{state.settings.address}</span></div></footer>
    </div>
  )
}
