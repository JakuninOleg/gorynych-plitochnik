import type { ReactNode } from 'react'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
import styles from './inner-page.module.css'

export function MarketingShell({ children }: { children: ReactNode }) {
  return <div className={`gorynych ${styles.world}`} id="top"><SiteHeader /><main className={styles.main}>{children}</main><SiteFooter /></div>
}
