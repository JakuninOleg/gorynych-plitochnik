'use client'

import { ArrowRight, Camera } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import { BrandCrown } from './brand-crown'
import { SealGuarantee, SealMeasure, SealWorks, SealYears } from './hero-seal-icons'
import styles from './hero.module.css'

const SEALS = [
  {
    id: 'years',
    Icon: SealYears,
    strong: '20 лет',
    small: 'опыта',
    tone: styles.sealYears,
  },
  {
    id: 'works',
    Icon: SealWorks,
    strong: '500+',
    small: 'выполненных работ',
    tone: styles.sealWorks,
  },
  {
    id: 'guarantee',
    Icon: SealGuarantee,
    strong: 'Гарантия',
    small: 'до 5 лет',
    tone: styles.sealGuarantee,
  },
  {
    id: 'measure',
    Icon: SealMeasure,
    strong: 'Бесплатный',
    small: 'замер по СПб',
    tone: styles.sealMeasure,
  },
] as const

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.desktopArt} aria-hidden="true" />
      <div className={styles.mobileBg} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.stage}>
          <div className={styles.cluster}>
            <div className={styles.copy}>
              <h1 id="hero-title" className={styles.title}>
                <span className={styles.titleLine}>Навожу порядок</span>
                <span className={styles.titleLine}>даже в драконьем</span>
                <span className={`${styles.titleLine} ${styles.accent}`}>логове</span>
              </h1>
              <p className={styles.lead}>
                <span className={styles.leadStrong}>Укладка плитки и керамогранита</span>
                <span className={styles.leadPlace}>в Санкт-Петербурге и области</span>
              </p>
            </div>

            <div className={styles.actions}>
              <motion.a
                tabIndex={0}
                className={styles.primary}
                href="#calculator"
                title="Открыть калькулятор раскладки"
                {...(reduceMotion
                  ? {}
                  : {
                      whileHover: { y: -2, scale: 1.015 },
                      whileTap: { scale: 0.985 },
                    })}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              >
                <BrandCrown className={styles.crown ?? ''} />
                <span>Рассчитать стоимость</span>
                <ArrowRight weight="bold" aria-hidden="true" className={styles.arrow} />
              </motion.a>

              <motion.a
                tabIndex={0}
                className={styles.secondary}
                href="#contacts"
                title="Показать форму проекта"
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
            </div>
          </div>
        </div>

        <ul
          className={styles.plaque}
          aria-label="Опыт и условия работы"
        >
          {SEALS.map(({ id, Icon, strong, small, tone }, index) => (
            <motion.li
              key={id}
              className={tone}
              {...(reduceMotion
                ? {}
                : {
                    whileHover: { y: -3, rotate: index % 2 === 0 ? -1.2 : 1.2 },
                    transition: { type: 'spring', stiffness: 380, damping: 22 },
                  })}
            >
              <span className={styles.sealMark} aria-hidden="true">
                <Icon />
              </span>
              <span className={styles.sealCopy}>
                <strong>{strong}</strong>
                <small>{small}</small>
              </span>
            </motion.li>
          ))}
        </ul>

        <p className={styles.calloutsSr}>
          Один проверяет, что всё ровно. Второй выбирает красивую плитку.
          Третий следит, чтобы держалось вечно.
        </p>
      </div>
    </section>
  )
}
