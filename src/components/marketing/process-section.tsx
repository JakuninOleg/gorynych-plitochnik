import styles from './process-section.module.css'

const STEPS = [
  {
    title: 'Замер',
    text: 'Приезжаю, смотрю, обсуждаем ваше логово и идею',
    position: '0% 50%',
  },
  {
    title: 'Укладка',
    text: 'Аккуратно, чисто, с умом. Современные материалы и проверенные решения',
    position: '50% 50%',
  },
  {
    title: 'Детали',
    text: 'Стыки, углы, ниши — всё, что делает ванную по-настоящему красивой',
    position: '100% 50%',
  },
] as const

export function ProcessSection() {
  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      {/* Desktop-only CSS backdrop — avoids loading the wide art below 901px. */}
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.backdropShade} />
      </div>

      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.kicker}>Процесс</p>
          <h2 id="process-title" className={styles.title}>Три головы — один мастер</h2>
          <p className={styles.lead}>
            Замерить, уложить, проверить детали — три стороны одного ремесла, без посредников.
          </p>
        </header>

        <ol className={styles.grid}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.card}>
              <div
                className={styles.art}
                style={{ backgroundPosition: step.position }}
                role="img"
                aria-label={`Иллюстрация: ${step.title}`}
              />
              <div className={styles.body}>
                <span className={styles.medal} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
