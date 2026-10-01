import Image from 'next/image'
import type { ReactNode } from 'react'
import styles from './story-chapter.module.css'

type Theme = 'calculator' | 'craft' | 'services' | 'master' | 'reviews' | 'contact'
const scenes: Record<Theme, readonly [string, string]> = {
  calculator: ['calculator-left-v1', 'calculator-right-v1'],
  craft: ['craft-tools-left-v1', 'craft-joint-right-v1'],
  services: ['services-stair-left-v1', 'services-niche-right-v1'],
  master: ['master-workbench-left-v1', 'master-home-right-v1'],
  reviews: ['letters-left-v1', 'letters-right-v1'],
  contact: ['contact-post-left-v1', 'contact-lantern-right-v1'],
}

export function StoryChapter({ id, theme, children, className = '' }: {
  id: string
  theme: Theme
  children: ReactNode
  className?: string | undefined
}) {
  return (
    <section id={id} className={`${styles.chapter} ${styles[theme]} ${className}`}>
      <div className={styles.scenery} aria-hidden="true">
        {scenes[theme].map((scene, index) => (
          <div className={index === 0 ? styles.left : styles.right} key={scene}>
            <Image src={`/images/${scene}.webp`} alt="" fill sizes="(min-width: 1101px) 25vw, 1px" quality={90} />
          </div>
        ))}
      </div>
      <div className={styles.paper} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </section>
  )
}
