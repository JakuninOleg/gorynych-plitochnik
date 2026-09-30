'use client'

import { List, X } from '@phosphor-icons/react'
import { useEffect, useId, useRef, useState } from 'react'
import { PHONE_HREF, PHONE_LABEL, WHATSAPP_URL } from '@/lib/gorynych-contacts'
import styles from './site-header.module.css'

const NAV = [
  { href: '#process', label: 'Как я работаю' },
  { href: '#contacts', label: 'Контакты' },
] as const

function CrownMark() {
  return (
    <svg className={styles.crown} viewBox="0 0 40 28" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M3 22.5 7.2 8.8l6.1 7.4L20 4.5l6.7 11.7 6.1-7.4L36.8 22.5H3Zm2.2 2.8h29.6c.9 0 1.6.7 1.6 1.6v.6H3.6v-.6c0-.9.7-1.6 1.6-1.6Z"
      />
    </svg>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef(false)

  useEffect(() => {
    if (!open && restoreFocusRef.current) {
      restoreFocusRef.current = false
      toggleRef.current?.focus({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const background = [
      toggleRef.current?.parentElement,
      document.querySelector('main'),
      document.querySelector('footer'),
    ].filter((element): element is HTMLElement => element instanceof HTMLElement)
    const previousInert = background.map((element) => element.inert)
    background.forEach((element) => { element.inert = true })
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        restoreFocusRef.current = true
        setOpen(false)
      } else if (event.key === 'Tab') {
        const focusable = Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!first || !last) return
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      background.forEach((element, index) => { element.inert = previousInert[index] ?? false })
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const close = () => {
    restoreFocusRef.current = true
    setOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label="Плиточник Горыныч">
          <span className={styles.brandMark} aria-hidden="true">
            <CrownMark />
          </span>
          <span className={styles.brandText} aria-hidden="true">
            <span className={styles.brandWord}>Плиточник</span>
            <span className={styles.brandName}>Горыныч</span>
            <span className={styles.brandTag}>Ровно. Надёжно. Надолго.</span>
          </span>
        </a>

        <nav className={styles.desktopNav} aria-label="Основная навигация">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className={styles.desktopActions}>
          <a className={styles.phone} href={PHONE_HREF}>{PHONE_LABEL}</a>
          <a className={styles.cta} href={WHATSAPP_URL} rel="noopener noreferrer" target="_blank">
            Обсудить проект
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuToggle}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(true)}
        >
          <List size={22} weight="bold" aria-hidden />
          <span>Меню</span>
        </button>
      </div>

      <div
        className={open ? styles.backdropOpen : styles.backdrop}
        hidden={!open}
        onClick={close}
        aria-hidden
      />

      <div
        ref={panelRef}
        id={panelId}
        className={open ? styles.panelOpen : styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        hidden={!open}
      >
        <div className={styles.panelHead}>
          <span className={styles.panelTitle}>Меню</span>
          <button ref={closeRef} type="button" className={styles.close} onClick={close}>
            <X size={22} weight="bold" aria-hidden />
            Закрыть
          </button>
        </div>
        <nav className={styles.mobileNav} aria-label="Мобильная навигация">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>{item.label}</a>
          ))}
        </nav>
        <div className={styles.mobileActions}>
          <a className={styles.phone} href={PHONE_HREF} onClick={close}>{PHONE_LABEL}</a>
          <a
            className={styles.cta}
            href={WHATSAPP_URL}
            rel="noopener noreferrer"
            target="_blank"
            onClick={close}
          >
            Обсудить проект
          </a>
        </div>
      </div>
    </header>
  )
}
