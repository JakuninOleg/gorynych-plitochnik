import { PHONE_HREF, PHONE_LABEL, WHATSAPP_URL } from '@/lib/gorynych-contacts'
import styles from './site-footer.module.css'

export function SiteFooter() {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.name}>Плиточник Горыныч</p>
          <p className={styles.note}>Укладка плитки и керамогранита в Санкт-Петербурге. Гор работает лично.</p>
        </div>
        <div className={styles.links}>
          <a href={PHONE_HREF}>{PHONE_LABEL}</a>
          <a href={WHATSAPP_URL} rel="noopener noreferrer" target="_blank">WhatsApp</a>
          <a href="#process">Как я работаю</a>
        </div>
      </div>
    </footer>
  )
}
