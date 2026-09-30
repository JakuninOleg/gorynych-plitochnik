'use client'

import { ArrowRight, Camera, CastleTurret } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import { WHATSAPP_URL } from '@/lib/gorynych-contacts'
import styles from './hero.module.css'

const QUOTE_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('Здравствуйте! Хочу рассчитать стоимость укладки плитки.')}`
const PHOTO_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('Здравствуйте! Хочу прислать фото помещения и обсудить укладку плитки.')}`

const easeOut = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduceMotion = useReducedMotion()

  const reveal = (delay: number) =>
    reduceMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: easeOut },
        }

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.mobileBg} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.stage}>
          <div className={styles.cluster}>
            <motion.div className={styles.copy} {...reveal(0.05)}>
              <h1 id="hero-title" className={styles.title}>
                <span className={styles.titleLine}>Навожу порядок</span>
                <span className={styles.titleLine}>даже в драконьем</span>
                <span className={`${styles.titleLine} ${styles.accent}`}>логове.</span>
              </h1>
              <p className={styles.lead}>
                <span className={styles.leadStrong}>Укладка плитки и керамогранита</span>
                <span className={styles.leadPlace}>в Санкт-Петербурге и области</span>
              </p>
            </motion.div>

            <motion.div className={styles.actions} {...reveal(0.18)}>
              <motion.a
                className={styles.primary}
                href={QUOTE_URL}
                rel="noopener noreferrer"
                target="_blank"
                title="Написать Гору для расчёта стоимости"
                {...(reduceMotion
                  ? {}
                  : {
                      whileHover: { y: -2, scale: 1.015 },
                      whileTap: { scale: 0.985 },
                    })}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              >
                <CastleTurret weight="fill" aria-hidden="true" />
                <span>Рассчитать стоимость</span>
                <ArrowRight weight="bold" aria-hidden="true" className={styles.arrow} />
              </motion.a>

              <motion.a
                className={styles.secondary}
                href={PHOTO_URL}
                rel="noopener noreferrer"
                target="_blank"
                title="Открыть WhatsApp, чтобы прислать фото помещения"
                {...(reduceMotion
                  ? {}
                  : {
                      whileHover: { y: -2, scale: 1.015 },
                      whileTap: { scale: 0.985 },
                    })}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              >
                <Camera weight="bold" aria-hidden="true" />
                <span>Пришлите фото</span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        <p className={styles.calloutsSr}>
          Один проверяет, что всё ровно. Второй выбирает красивую плитку.
          Третий следит, чтобы держалось вечно.
        </p>
      </div>
    </section>
  )
}
