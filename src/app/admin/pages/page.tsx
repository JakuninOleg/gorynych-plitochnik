'use client'

import { Plus } from '@phosphor-icons/react'
import { useDemo } from '@/components/demo/demo-provider'
import { DocumentList } from '@/components/documents/document-list'
import { ActionLink, PageHeader } from '@/components/ui/ui'

export default function PagesPage() {
  const { state } = useDemo()
  return (
    <>
      <PageHeader
        title="Страницы"
        description="Основные разделы сайта, их содержимое и публикация."
        actions={<ActionLink href="/admin/pages/new" icon={<Plus />}>Создать страницу</ActionLink>}
      />
      <DocumentList items={state.pages} basePath="/admin/pages" noun="Страницы" />
    </>
  )
}
