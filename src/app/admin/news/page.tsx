'use client'

import { Plus } from '@phosphor-icons/react'
import { useDemo } from '@/components/demo/demo-provider'
import { DocumentList } from '@/components/documents/document-list'
import { ActionLink, PageHeader } from '@/components/ui/ui'

export default function NewsPage() {
  const { state } = useDemo()
  return (
    <>
      <PageHeader title="Новости" description="Публикации, объявления и материалы компании." actions={<ActionLink href="/admin/news/new" icon={<Plus />}>Добавить новость</ActionLink>} />
      <DocumentList items={state.news} basePath="/admin/news" noun="Новости" />
    </>
  )
}
