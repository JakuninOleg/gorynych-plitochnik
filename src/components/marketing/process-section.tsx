import Image from 'next/image'
import styles from './process-section.module.css'

const STEPS = [
  {
    title: 'Замер',
    lead: 'Приезжаю, осматриваю, делаю замеры,',
    rest: 'обсуждаю ваши логовые идеи.',
    src: '/images/process-measure-tall-cutout-v2.webp',
    width: 1024,
    height: 1536,
    alt: 'Гор измеряет помещение рулеткой',
  },
  {
    title: 'Укладка',
    lead: 'Аккуратно, чисто, с умом.',
    rest: 'Современные материалы и проверенные решения.',
    src: '/images/process-lay-tall-cutout-v1.webp',
    width: 1024,
    height: 1536,
    alt: 'Гор укладывает керамическую плитку на раствор',
  },
  {
    title: 'Детали',
    lead: 'Идеальные стыки, углы и ниши —',
    rest: 'всё, что делает ванную по-настоящему красивой.',
    src: '/images/process-detail-tall-cutout-v2.webp',
    width: 1024,
    height: 1536,
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
                  {step.title}
                </span>
                <span className={styles.medal} aria-hidden="true">
                  <span className={styles.medalDigit}>{index + 1}</span>
                </span>
                <div className={styles.cardBody}>
                  <div className={styles.art}>
                    <Image
                      className={styles.portrait}
                      src={step.src}
                      alt={step.alt}
                      width={step.width}
                      height={step.height}
                      sizes="(max-width: 1100px) 35vw, (max-width: 1600px) 160px, 260px"
                    />
                  </div>
                  <p className={styles.cardText}>
                    <strong className={styles.cardLead}>{step.lead}</strong>{' '}
                    <span className={styles.cardRest}>{step.rest}</span>
                  </p>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
