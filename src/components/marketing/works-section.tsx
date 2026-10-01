import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/marketing-content'
import styles from './works-section.module.css'

const featured = [
  { slug: 'seraya-vannaya', caption: 'Ванная с характером' },
  { slug: 'uzornyy-fartuk', caption: 'Узор, который собирает кухню' },
  { slug: 'uzornyy-pol', caption: 'Красота с самого порога' },
] as const

function Flourish() {
  return (
    <svg viewBox="0 0 120 38" fill="none" aria-hidden="true">
      <path d="M6 20c27 3 47-8 69-1 14 4 27 3 39-1M42 19c-9-1-14-6-17-13m32 12c-5 2-10 8-11 14m27-13c-6-3-7-9-5-14m19 15c8 1 12 6 13 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 6c-8-3-11 1-4 7 4 2 7 1 4-7m21 26c-8 1-10-4-3-8 5-1 7 1 3 8M68 5c-6-7-11-4-7 4 4 4 7 4 7-4m32 26c9 3 12-2 5-7-5-2-8 0-5 7" fill="currentColor" />
      <path d="m108 18 5-5 5 5-5 5z" fill="currentColor" />
    </svg>
  )
}

export function WorksSection() {
  return (
    <section id="works" className={styles.section} aria-labelledby="works-title">
      <div className={styles.scenery} aria-hidden="true">
        <div className={styles.before} />
        <div className={styles.after} />
      </div>
      <div className={styles.paper} aria-hidden="true" />
      <div className={styles.content}>
        <header className={styles.heading}>
          <span className={styles.flourish}><Flourish /></span>
          <h2 id="works-title">Сказки кончаются, <em>реальные работы остаются</em></h2>
          <span className={`${styles.flourish} ${styles.mirrored}`}><Flourish /></span>
        </header>
        <div className={styles.gallery}>
          {featured.map(item => {
            const project = projects.find(project => project.slug === item.slug)!
            return (
              <Link href={`/raboty/${project.slug}`} className={styles.card} key={project.slug}>
                <div className={styles.photo}>
                  <Image src={project.image} alt={project.alt} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 44vw, 19vw" style={{ objectPosition: project.position }} />
                  <span className={styles.corner} aria-hidden="true" />
                </div>
                <div className={styles.caption}>
                  <h3>{item.caption}</h3>
                  <span aria-hidden="true">↗</span>
                </div>
                <p className={styles.detail}>{project.subtitle}</p>
              </Link>
            )
          })}
        </div>
        <Link href="/raboty" className={styles.allWorks}>Заглянуть в другие логова <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  )
}
