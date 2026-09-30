'use client'

import { ArrowRight, ArrowUpRight, BookOpen, DotsThreeVertical, FileText, ImageSquare, Newspaper, Users, Wrench } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useDemo } from '@/components/demo/demo-provider'
import { StatusBadge } from '@/components/ui/ui'
import { demoUsers } from '@/lib/demo-users'
import styles from './dashboard.module.css'

export default function DashboardPage() {
  const { state } = useDemo()
  const [activeRow, setActiveRow] = useState<string | null>(null)
  const rowsRef = useRef<HTMLDivElement>(null)
  const recent = state.pages.slice(0, 4)
  const canManageUsers = state.role === 'administrator'

  useEffect(() => {
    if (!activeRow) return
    const close = (event: PointerEvent) => {
      if (!(event.target as Element).closest('[data-row-actions]')) setActiveRow(null)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        rowsRef.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')?.focus()
        setActiveRow(null)
      }
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape) }
  }, [activeRow])

  return <>
    <section className={styles.hero} aria-labelledby="welcome-title">
      <div className={styles.heroImage}><Image src="/images/concrete-villa.webp" alt="" fill loading="eager" unoptimized /></div>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>Управление контентом</p>
        <h1 id="welcome-title">Добрый день, Олег!</h1>
        <p className={styles.intro}>Здесь вы можете управлять содержимым сайта, публиковать изменения<br className={styles.desktopBreak} /> и поддерживать актуальность информации.</p>
      </div>
      <div className={styles.heroNote} aria-hidden="true">Создаём<br /><span>возможности</span><i /></div>
    </section>

    <div className={styles.workspace}>
      <div className={styles.contentColumn}>
        <section className={styles.stats} aria-label="Разделы сайта">
          <StatCard href="/admin/pages" icon={<FileText />} title="Страницы" count={state.pages.length} detail="Основной контент сайта" />
          <StatCard href="/admin/news" icon={<Newspaper />} title="Новости" count={state.news.length} detail="Публикации и материалы" />
          <StatCard href="/admin/media" icon={<ImageSquare />} title="Медиа" count={state.media.length} detail="Изображения и файлы" />
          {canManageUsers
            ? <StatCard href="/admin/users" icon={<Users />} title="Пользователи" count={demoUsers.length} detail="Доступ и роли" />
            : <StatCard href="/admin/settings" icon={<Wrench />} title="Настройки сайта" detail="Контакты и меню" />}
        </section>

        <section className={styles.recentPanel} aria-labelledby="recent-title">
          <header className={styles.panelHeader}><h2 id="recent-title">Недавние изменения</h2><Link href="/admin/pages">Все изменения<ArrowRight aria-hidden="true" /></Link></header>
          <div ref={rowsRef} className={styles.rows}>
            {recent.map((item, index) => {
              const media = state.media.find((asset) => asset.id === item.draft.mediaId)
              const fallback = ['/images/concrete-villa.webp', '/images/alpine-house.webp', '/images/alpine-mist.webp', '/images/concrete-villa.webp'][index]
              return <div className={styles.row} key={item.id}>
                <Link className={styles.document} href={`/admin/pages/${item.id}`}>
                  <Image src={media?.url ?? fallback ?? '/images/concrete-villa.webp'} alt="" width={60} height={46} unoptimized />
                  <span><strong>{item.title}</strong><small>{item.slug === 'home' ? '/' : `/${item.slug}`}</small></span>
                </Link>
                <StatusBadge status={item.status} />
                <div className={styles.rowMeta}><span>{item.updatedAt}</span><small>{item.author}</small></div>
                <div className={styles.rowActions} data-row-actions onBlur={(event) => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) setActiveRow(null) }}>
                  <button type="button" className={styles.moreButton} aria-label={`Действия: ${item.title}`} aria-expanded={activeRow === item.id} onClick={() => setActiveRow(activeRow === item.id ? null : item.id)}><DotsThreeVertical aria-hidden="true" weight="bold" /></button>
                  {activeRow === item.id ? <div className={styles.rowMenu}><Link href={`/admin/pages/${item.id}`} onClick={() => setActiveRow(null)}>Редактировать</Link></div> : null}
                </div>
              </div>
            })}
            {!recent.length ? <p className={styles.empty}>Здесь появятся ваши страницы. <Link href="/admin/pages">Перейти к страницам</Link></p> : null}
          </div>
        </section>

        <section className={styles.help} aria-labelledby="help-title"><BookOpen aria-hidden="true" /><div><h2 id="help-title">Нужна помощь?</h2><p>Откройте документацию или напишите мне.</p></div><Link href="/admin/help">Открыть документацию<ArrowUpRight aria-hidden="true" /></Link></section>
      </div>
      <aside className={styles.rightColumn} aria-label="Последняя активность">
        <section className={styles.activity} aria-labelledby="activity-title">
          <h2 id="activity-title">Последняя активность</h2>
          {recent.map((item) => <Link className={styles.activityItem} href={`/admin/pages/${item.id}`} key={item.id}><span className={styles.activityIcon}><FileText aria-hidden="true" /></span><span><span>{item.author} · {item.title}</span><small>{item.updatedAt}</small></span></Link>)}
        </section>
      </aside>
    </div>
    <footer className={styles.signature}><span>Simple to manage. Built to last.</span><i /></footer>
  </>
}

function StatCard({ href, icon, title, count, detail }: { href: string; icon: ReactNode; title: string; count?: number; detail: string }) {
  return <Link className={styles.statCard} href={href}><span className={styles.statIcon} aria-hidden="true">{icon}</span><strong>{title}</strong><span className={styles.statValue}>{count ?? <ArrowRight aria-hidden="true" />}{count !== undefined ? <ArrowRight aria-hidden="true" /> : null}</span><small>{detail}</small></Link>
}
