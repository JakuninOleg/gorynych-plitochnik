'use client'

import { ArrowUpRight, BookOpen, CaretDown, CaretLeft, CaretRight, Database, Files, Gear, ImageSquare, SquaresFour, Users, X } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { OJLogo } from '@/components/brand/oj-logo'
import { useDemo } from '@/components/demo/demo-provider'
import { AdminTopbar } from './admin-topbar'
import styles from './admin-shell.module.css'

const focusableSelector = 'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { state, storageWarning } = useDemo()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [collectionsOpen, setCollectionsOpen] = useState<boolean | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const mobileDialogRef = useRef<HTMLElement>(null)
  const inCollections = pathname.startsWith('/admin/pages') || pathname.startsWith('/admin/news')
  const showCollections = collectionsOpen ?? inCollections

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeAtDesktop = () => { if (desktop.matches) setMobileOpen(false) }
    desktop.addEventListener('change', closeAtDesktop)
    return () => desktop.removeEventListener('change', closeAtDesktop)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const trigger = menuButtonRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
      if (event.key !== 'Tab' || !mobileDialogRef.current) return
      const focusable = Array.from(mobileDialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => element.getClientRects().length > 0)
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      // Restore focus after React removes inert from the main column.
      queueMicrotask(() => trigger?.focus())
    }
  }, [mobileOpen])

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  const renderNavigation = (mobile = false) => {
    const compact = collapsed && !mobile
    const navLink = (href: string, label: string, icon: ReactNode, exact = false) => {
      const active = exact ? pathname === href : pathname.startsWith(href)
      return <Link href={href} className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`} aria-current={active ? 'page' : undefined} title={compact ? label : undefined} onClick={() => { setMobileOpen(false); setCollectionsOpen(null) }}>{icon}<span className={styles.navLabel}>{label}</span></Link>
    }
    return <>
      <div className={styles.brandRow}>
        <Link className={styles.brand} href="/admin" aria-label="OJ CMS — обзор" onClick={() => setMobileOpen(false)}><OJLogo compact={compact} /></Link>
        {mobile
          ? <button ref={closeButtonRef} className={styles.iconButton} type="button" onClick={closeMobileMenu} aria-label="Закрыть меню"><X /></button>
          : <button className={`${styles.iconButton} ${styles.collapseButton}`} type="button" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'}>{collapsed ? <CaretRight /> : <CaretLeft />}</button>}
      </div>
      <nav className={styles.navigation} aria-label="Основная навигация">
        {navLink('/admin', 'Обзор', <SquaresFour aria-hidden="true" />, true)}
        {compact ? navLink('/admin/pages', 'Коллекции', <Database aria-hidden="true" />) : <>
          <button className={`${styles.navLink} ${inCollections ? styles.navLinkActive : ''}`} type="button" aria-expanded={showCollections} aria-controls={mobile ? 'mobile-collections' : 'desktop-collections'} onClick={() => setCollectionsOpen(!showCollections)}><Database aria-hidden="true" /><span className={styles.navLabel}>Коллекции</span><CaretDown className={styles.navCaret} aria-hidden="true" /></button>
          <div className={styles.subnav} id={mobile ? 'mobile-collections' : 'desktop-collections'} hidden={!showCollections}>{navLink('/admin/pages', 'Страницы', null)}{navLink('/admin/news', 'Новости', null)}</div>
        </>}
        {navLink('/admin/settings', 'Глобальные', <Files aria-hidden="true" />)}
        {navLink('/admin/media', 'Медиа', <ImageSquare aria-hidden="true" />)}
        {state.role === 'administrator' ? navLink('/admin/users', 'Пользователи', <Users aria-hidden="true" />) : null}
        <div className={styles.navDivider} />
        {navLink('/admin/preferences', 'Настройки', <Gear aria-hidden="true" />)}
        {navLink('/admin/help', 'Документация', <BookOpen aria-hidden="true" />)}
      </nav>
      <div className={styles.sidebarFooter}>
        <div className={styles.landscape} aria-hidden="true" />
        <p className={styles.motto}>Хорошие<br />сайты делают<br />большие дела.</p>
        <span className={styles.footerRule} />
        <a className={styles.credit} href="https://github.com/JakuninOleg/OJ-CMS" target="_blank" rel="noreferrer"><span>© OJ 2026<br />Демо-интерфейс</span><ArrowUpRight aria-hidden="true" /></a>
      </div>
    </>
  }

  return <div className={`${styles.app} ${collapsed ? styles.collapsed : ''}`}>
    <a className={styles.skipLink} href="#main-content">Перейти к содержимому</a>
    <aside className={styles.sidebar} aria-label="Навигация CMS" inert={mobileOpen}>{renderNavigation()}</aside>
    {mobileOpen ? <>
      <div className={styles.mobileBackdrop} onClick={closeMobileMenu} aria-hidden="true" />
      <aside ref={mobileDialogRef} className={styles.mobileSidebar} role="dialog" aria-modal="true" aria-label="Навигация">{renderNavigation(true)}</aside>
    </> : null}
    <div className={styles.mainColumn} inert={mobileOpen}>
      <AdminTopbar menuButtonRef={menuButtonRef} onOpenMenu={() => setMobileOpen(true)} />
      {storageWarning ? <div className={styles.storageWarning} role="alert">{storageWarning}</div> : null}
      <main className={`${styles.main} ${pathname === '/admin' ? styles.dashboardMain : ''}`} id="main-content" tabIndex={-1}>{children}</main>
    </div>
  </div>
}
