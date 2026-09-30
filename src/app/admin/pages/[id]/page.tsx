import { PageEditor } from '@/components/editor/page-editor'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <PageEditor key={id} pageId={id} />
}
