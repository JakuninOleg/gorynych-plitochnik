import Image from 'next/image'
import styles from './process-section.module.css'

const STEPS = [
  {
    title: 'Замер',
    text: 'Приезжаю, смотрю, обсуждаем ваше логово и идею',
    src: '/images/process-measure-v2.webp',
    width: 900,
    height: 600,
    alt: 'Гор измеряет помещение рулеткой',
  },
  {
    title: 'Укладка',
    text: 'Аккуратно, чисто, с умом. Современные материалы и проверенные решения',
    src: '/images/process-lay-v2.webp',
    width: 900,
    height: 600,
    alt: 'Гор укладывает керамическую плитку на раствор',
  },
  {
    title: 'Детали',
    text: 'Стыки, углы, ниши — всё, что делает ванную по-настоящему красивой',
    src: '/images/process-detail-v2.webp',
    width: 900,
    height: 750,
    alt: 'Гор проверяет шов плитки через лупу',
  },
] as const

export function ProcessSection() {
  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.kicker}>Процесс</p>
          <h2 id="process-title" className={styles.title}>
            Три головы — <span className={styles.accent}>один мастер</span>
          </h2>
          <p className={styles.lead}>
            Замерить, уложить, проверить детали — три стороны одного ремесла, без посредников.
          </p>
        </header>

        <ol className={styles.grid}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.card}>
              <div className={styles.frame}>
                <span className={styles.ribbon} aria-hidden="true">
                  <span className={styles.ribbonText}>{step.title}</span>
                  <span className={styles.ribbonArc}>
                    {[...step.title].map((letter, letterIndex, letters) => {
                      const offset = letterIndex - (letters.length - 1) / 2
                      return (
                        <span
                          key={`${step.title}-${letterIndex}`}
                          className={styles.ribbonLetter}
                          style={{ transform: `translateY(${0.035 * offset * offset}em) rotate(${3 * offset}deg)` }}
                        >
                          {letter}
                        </span>
                      )
                    })}
                  </span>
                </span>
                <span className={styles.medal} aria-hidden="true">
                  {index + 1}
                </span>
                <div className={styles.art}>
                  <Image
                    className={styles.portrait}
                    src={step.src}
                    alt={step.alt}
                    width={step.width}
                    height={step.height}
                    sizes="(max-width: 1100px) 42vw, (max-width: 1600px) 18vw, 280px"
                  />
                </div>
                <p className={styles.cardText}>{step.text}</p>
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
