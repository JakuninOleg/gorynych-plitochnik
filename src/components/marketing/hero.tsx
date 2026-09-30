import { WHATSAPP_URL } from '@/lib/gorynych-contacts'
import styles from './hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.mobileBg} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.aside}>три головы · один мастер</p>
          <h1 id="hero-title" className={styles.title}>
            Навожу порядок даже в драконьем{' '}
            <span className={styles.accent}>логове.</span>
          </h1>
          <p className={styles.lead}>
            Укладка плитки и керамогранита в Санкт-Петербурге. Гор работает лично.
          </p>

        </div>

        <div className={styles.actions}>
          <a className={styles.primary} href={WHATSAPP_URL} rel="noopener noreferrer" target="_blank">
            Обсудить проект
          </a>
          <a className={styles.secondary} href="#process">
            Как я работаю
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
