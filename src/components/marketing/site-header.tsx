'use client'

import { List, X } from '@phosphor-icons/react'
import { useEffect, useId, useRef, useState } from 'react'
import { siTelegram, siWhatsapp } from 'simple-icons'
import { PHONE_HREF, PHONE_LABEL, WHATSAPP_URL } from '@/lib/gorynych-contacts'
import styles from './site-header.module.css'

const NAV = [
  { href: '#top', label: 'Главная' },
  { href: '#process', label: 'Как я работаю' },
  { href: '#contacts', label: 'Контакты' },
] as const

function CrownMark() {
  return (
    <svg className={styles.crown} viewBox="0 0 48 34" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M3 8.5 13 16l11-13 11 13 10-7.5-4 18H7L3 8.5Zm4 20h34v3H7v-3Z"
      />
      <circle cx="24" cy="17.5" r="2.3" fill="#8b1712" />
    </svg>
  )
}

function BrandIcon({ type }: { type: 'whatsapp' | 'telegram' }) {
  return (
    <svg viewBox="0 0 24 24" className={styles.brandIcon} aria-hidden="true" focusable="false">
      <path d={type === 'whatsapp' ? siWhatsapp.path : siTelegram.path} fill="currentColor" />
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
    const desktop = window.matchMedia('(min-width: 1101px)')
    const closeOnDesktop = () => {
      if (desktop.matches) {
        restoreFocusRef.current = false
        setOpen(false)
      }
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

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
          <span className={styles.brandText} aria-hidden="true">
            <span className={styles.brandWord}>Плиточник</span>
            <span className={styles.brandName}><span className={styles.brandInitial}><CrownMark />Г</span>орыныч</span>
            <span className={styles.brandTag}>Ровно. Надёжно. Надолго.</span>
          </span>
        </a>

        <nav className={styles.desktopNav} aria-label="Основная навигация">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className={styles.desktopActions}>
          <div className={styles.social}>
            <a
              className={styles.socialLink}
              href={WHATSAPP_URL}
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Написать в WhatsApp"
            >
              <BrandIcon type="whatsapp" />
            </a>
            <span
              className={styles.socialPending}
              role="img"
              title="Telegram скоро появится — ник запрашивается"
              aria-label="Telegram скоро появится, ник ещё не указан"
            >
              <BrandIcon type="telegram" />
            </span>
          </div>
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
          <a
            className={styles.socialLink}
            href={WHATSAPP_URL}
            rel="noopener noreferrer"
            target="_blank"
            onClick={close}
            aria-label="Написать в WhatsApp"
          >
            <BrandIcon type="whatsapp" />
            WhatsApp
          </a>
          <span
            className={styles.socialPendingRow}
          >
            <BrandIcon type="telegram" />
            Telegram скоро
          </span>
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
