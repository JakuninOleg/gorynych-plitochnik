import { WHATSAPP_URL } from '@/lib/gorynych-contacts'
import styles from './hero.module.css'

const QUOTE_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('Здравствуйте! Хочу рассчитать стоимость укладки плитки.')}`
const PHOTO_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('Здравствуйте! Хочу прислать фото помещения и обсудить укладку плитки.')}`

function CastleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M3 3h3v3l3-2v3l3-2 3 2V4l3 2V3h3v6l-2-1v11h2v2H1v-2h2V8L1 9V3h2Zm4 8v8h3v-5h4v5h3v-8H7Z" />
    </svg>
  )
}

function PhotoMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" d="M3 4h18v16H3zM3 17l5-5 4 3 3-4 6 7" />
      <circle cx="8" cy="8.5" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.mobileBg} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleLine}>Навожу порядок</span>{' '}
            <span className={styles.titleLine}>даже в драконьем</span>{' '}
            <span className={styles.accent}>логове.</span>
          </h1>
          <p className={styles.lead}>
            <span className={styles.leadLine}>Укладка плитки и керамогранита</span>{' '}
            <span className={styles.leadLine}>в Санкт-Петербурге.</span>{' '}
            <span className={styles.leadLine}>Гор работает лично.</span>
          </p>

        </div>

        <div className={styles.actions}>
          <a className={styles.primary} href={QUOTE_URL} rel="noopener noreferrer" target="_blank" title="Написать Гору для расчёта стоимости">
            <CastleMark />
            <span>Рассчитать стоимость</span>
            <span aria-hidden="true">→</span>
          </a>
          <a className={styles.secondary} href={PHOTO_URL} rel="noopener noreferrer" target="_blank" title="Открыть WhatsApp, чтобы прислать фото помещения">
            <PhotoMark />
            <span>Пришлите фото</span>
          </a>
        </div>

        <p className={styles.plaque} aria-hidden="true">
          Хорошая плитка делает счастливее
        </p>

        <div className={styles.callouts} aria-hidden="true">
          <span className={styles.calloutLevel}>Один проверяет,<br />что всё ровно</span>
          <span className={styles.calloutTile}>Второй выбирает<br />красивую плитку</span>
          <span className={styles.calloutFire}>Третий следит,<br />чтобы держалось вечно</span>
        </div>
      </div>
    </section>
  )
}
