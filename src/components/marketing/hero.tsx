import Image from 'next/image'
import { WHATSAPP_URL } from '@/lib/gorynych-contacts'
import styles from './hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg} aria-hidden="true">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/hero-mobile-v1.webp" width={1024} height={1536} />
          <img
            className={styles.bgImage}
            src="/images/hero-desktop-v1.webp"
            alt=""
            width={1672}
            height={941}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className={styles.bgShade} />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.aside} aria-hidden="true">три головы · один мастер</p>
          <h1 id="hero-title" className={styles.title}>
            Навожу порядок даже в драконьем{' '}
            <span className={styles.accent}>логове.</span>
          </h1>
          <p className={styles.lead}>
            Укладка плитки и керамогранита в Санкт-Петербурге. Гор работает лично.
          </p>
        </div>

        <div className={styles.mascotWrap}>
          <Image
            className={styles.mascot}
            src="/images/gor-mascot-v1.webp"
            alt="Трёхголовый плиточник Гор: проверяет уровень, держит плитку и бережно выпускает пламя"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 700px) 88vw, (max-width: 1100px) 70vw, (max-width: 1600px) 52vw, 900px"
          />
        </div>

        <div className={styles.actions}>
          <a className={styles.primary} href={WHATSAPP_URL} rel="noopener noreferrer" target="_blank">
            Обсудить проект
          </a>
          <a className={styles.secondary} href="#process">
            Как я работаю
          </a>
          <a className={styles.ghost} href={WHATSAPP_URL} rel="noopener noreferrer" target="_blank">
            Пришлите фото
          </a>
        </div>
      </div>
    </section>
  )
}
