import { NewsEditor } from '@/components/editor/news-editor'

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <NewsEditor newsId={id} />
}
