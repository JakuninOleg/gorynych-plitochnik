import styles from './oj-logo.module.css'

/** Fixed vector letterforms keep the wordmark independent of installed fonts. */
export function OJLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`${styles.logo} ${compact ? styles.compact : ''}`} aria-hidden="true">
      <svg className={styles.mark} viewBox="0 0 50 38" fill="none">
        <ellipse cx="17" cy="19" rx="15" ry="16" stroke="currentColor" strokeWidth="3.2" />
        <path d="M46 2.8v24.7c0 5.9-2.9 8.3-8.5 6.9" stroke="currentColor" strokeWidth="3.2" />
      </svg>
      {!compact ? <span className={styles.descriptor}><span>Content</span><span>Management</span></span> : null}
    </span>
  )
}
