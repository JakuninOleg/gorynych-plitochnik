'use client'

import { ArrowUpRight, Bell, CaretDown, FileText, List, MagnifyingGlass, X } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { OJLogo } from '@/components/brand/oj-logo'
import { useDemo } from '@/components/demo/demo-provider'
import styles from './admin-shell.module.css'

export function AdminTopbar({ menuButtonRef, onOpenMenu }: { menuButtonRef: RefObject<HTMLButtonElement | null>; onOpenMenu: () => void }) {
  const { state, dispatch } = useDemo()
  const [query, setQuery] = useState('')
  const [panel, setPanel] = useState<'search' | 'activity' | 'profile' | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const activityRef = useRef<HTMLButtonElement>(null)
  const profileRef = useRef<HTMLButtonElement>(null)
  const documents = [
    ...state.pages.map((item) => ({ ...item, href: `/admin/pages/${item.id}`, kind: 'Страница' })),
    ...state.news.map((item) => ({ ...item, href: `/admin/news/${item.id}`, kind: 'Новость' })),
  ]
  const matches = documents.filter((item) => `${item.title} ${item.slug}`.toLocaleLowerCase('ru').includes(query.trim().toLocaleLowerCase('ru'))).slice(0, 6)

  useEffect(() => {
    if (!panel) return
    const outside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setPanel(null)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setPanel(null)
      if (panel === 'search') searchRef.current?.focus()
      if (panel === 'activity') activityRef.current?.focus()
      if (panel === 'profile') profileRef.current?.focus()
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [panel])

  return <header ref={headerRef} className={styles.topbar} onBlur={(event) => {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) setPanel(null)
  }}>
    <button ref={menuButtonRef} className={`${styles.iconButton} ${styles.mobileMenu}`} type="button" onClick={onOpenMenu} aria-label="Открыть меню"><List /></button>
    <Link className={styles.mobileLogo} href="/admin" aria-label="OJ CMS — обзор"><OJLogo compact /></Link>
    <div className={styles.searchArea}>
      <div className={styles.searchField}>
        <MagnifyingGlass aria-hidden="true" />
        <input ref={searchRef} aria-label="Поиск по контенту" placeholder="Поиск..." value={query} onFocus={() => setPanel('search')} onChange={(event) => { setQuery(event.target.value); setPanel('search') }} onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            headerRef.current?.querySelector<HTMLAnchorElement>('#content-search-results a')?.focus()
          }
        }} />
        {query ? <button type="button" aria-label="Очистить поиск" onClick={() => { setQuery(''); searchRef.current?.focus() }}><X /></button> : null}
      </div>
      {panel === 'search' ? <section id="content-search-results" className={`${styles.popover} ${styles.searchResults}`} aria-label="Результаты поиска">
        <h2>{query.trim() ? 'Результаты поиска' : 'Быстрый переход'}</h2>
        {matches.length ? matches.map((item) => <Link key={item.id} href={item.href} onClick={() => setPanel(null)}><FileText aria-hidden="true" /><span><strong>{item.title}</strong><small>{item.kind} · /{item.slug}</small></span><ArrowUpRight aria-hidden="true" /></Link>) : <p role="status">Ничего не найдено. Попробуйте другое название.</p>}
      </section> : null}
    </div>
    <div className={styles.topActions}>
      <div className={styles.popoverAnchor}>
        <button ref={activityRef} type="button" className={styles.iconButton} aria-label="Последние изменения" aria-expanded={panel === 'activity'} aria-controls={panel === 'activity' ? 'header-activity' : undefined} onClick={() => setPanel(panel === 'activity' ? null : 'activity')}><Bell /></button>
        {panel === 'activity' ? <section id="header-activity" className={styles.popover} aria-label="Последние изменения"><h2>Последние изменения</h2>{documents.slice(0, 4).map((item) => <Link href={item.href} key={item.id} onClick={() => setPanel(null)}><FileText aria-hidden="true" /><span><strong>{item.title}</strong><small>{item.author} · {item.updatedAt}</small></span></Link>)}<p>Демонстрационные данные</p></section> : null}
      </div>
      <div className={styles.popoverAnchor}>
        <button ref={profileRef} type="button" className={styles.profileButton} aria-label="Меню профиля" aria-expanded={panel === 'profile'} aria-controls={panel === 'profile' ? 'profile-menu' : undefined} onClick={() => setPanel(panel === 'profile' ? null : 'profile')}>
          <span className={styles.avatar} aria-hidden="true">ОЯ</span>
          <span className={styles.profileCopy}><strong>Олег Якунин</strong><small>{state.role === 'administrator' ? 'Администратор' : 'Редактор'}</small></span>
          <CaretDown className={styles.profileCaret} aria-hidden="true" />
        </button>
        {panel === 'profile' ? <section id="profile-menu" className={`${styles.popover} ${styles.profilePopover}`} aria-label="Профиль и демо-настройки">
          <Link href="/admin/profile" onClick={() => setPanel(null)}>Мой профиль<ArrowUpRight aria-hidden="true" /></Link>
          <div className={styles.demoControls}>
            <strong>Демонстрационный режим</strong><p>Изменения сохраняются в этом браузере.</p>
            <label>Роль<select value={state.role} onChange={(event) => dispatch({ type: 'role.changed', role: event.target.value === 'editor' ? 'editor' : 'administrator' })}><option value="administrator">Администратор</option><option value="editor">Редактор</option></select></label>
            <button type="button" onClick={() => { dispatch({ type: 'demo.reset' }); setPanel(null) }}>Сбросить демо-данные</button>
          </div>
        </section> : null}
      </div>
    </div>
  </header>
}
