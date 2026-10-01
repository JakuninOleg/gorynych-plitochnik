import Link from 'next/link'
import { PHONE_HREF, PHONE_LABEL, WHATSAPP_URL } from '@/lib/gorynych-contacts'
import { BrandCrown } from './brand-crown'
import styles from './site-footer.module.css'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}><BrandCrown /><span>Плиточник<strong>Горыныч</strong></span></Link>
          <p className={styles.note}>Ровно. Надёжно. Надолго.</p>
        </div>
        <div className={styles.links}>
          <Link href="/">Главная</Link>
          <Link href="/uslugi">Услуги</Link>
          <Link href="/raboty">Работы</Link>
          <Link href="/#process">Как я работаю</Link>
          <a href={PHONE_HREF}>{PHONE_LABEL}</a>
          <a href={WHATSAPP_URL} rel="noopener noreferrer" target="_blank">WhatsApp</a>
          <a href="#top">Наверх ↑</a>
        </div>
        <p className={styles.bottom}>Санкт-Петербург и область <span>© {new Date().getFullYear()} Плиточник Горыныч · Презентационный макет</span></p>
      </div>
    </footer>
  )
}
