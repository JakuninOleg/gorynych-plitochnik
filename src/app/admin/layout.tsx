import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DemoProvider } from '@/components/demo/demo-provider'
import { AdminShell } from '@/components/shell/admin-shell'

export const metadata: Metadata = {
  title: { absolute: 'OJ CMS — демо-интерфейс' },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <DemoProvider>
      <AdminShell>{children}</AdminShell>
    </DemoProvider>
  )
}
