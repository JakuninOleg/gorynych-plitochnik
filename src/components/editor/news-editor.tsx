'use client'

import { ArrowLeft, FloppyDisk, PaperPlaneTilt } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useId, useMemo, useState } from 'react'
import { useDemo } from '@/components/demo/demo-provider'
import { Button, Field, Notice, StatusBadge, Textarea } from '@/components/ui/ui'
import type { NewsDocument } from '@/lib/demo-data'
import styles from './news-editor.module.css'

export function NewsEditor({ newsId }: { newsId: string }) {
  const { state, dispatch } = useDemo()
  const router = useRouter()
  const existing = state.news.find((item) => item.id === newsId)
  const generatedId = `news-${useId().replaceAll(':', '')}`
  const initial = useMemo<NewsDocument>(() => existing ?? {
    id: generatedId,
    title: '',
    slug: '',
    status: 'draft',
    updatedAt: 'ещё не сохранено',
    author: 'Олег Якунин',
    excerpt: '',
    body: '',
    publicationDate: new Date().toISOString().slice(0, 10),
  }, [existing, generatedId])
  const [form, setForm] = useState(initial)
  const [saved, setSaved] = useState(initial)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const dirty = JSON.stringify(form) !== JSON.stringify(saved)
  const displaySuccess = success || (existing?.updatedAt === 'только что'
    ? existing.status === 'published' ? 'Новость опубликована.' : 'Черновик сохранён.'
    : '')

  const save = () => {
    if (!form.title.trim() || !/^[a-z0-9-]+$/.test(form.slug)) {
      setError('Добавьте название и корректный адрес из латинских букв, цифр и дефисов.')
      return false
    }
    const next = { ...form, status: form.status === 'published' ? 'changed' as const : 'draft' as const, updatedAt: 'только что' }
    dispatch({ type: 'news.saved', item: next })
    setForm(next)
    setSaved(next)
    setError('')
    setSuccess('Черновик сохранён.')
    if (!existing) router.replace(`/admin/news/${next.id}`)
    return true
  }

  const publish = () => {
    if ((dirty || !existing) && !save()) return
    dispatch({ type: 'news.published', id: form.id })
    const next = { ...form, status: 'published' as const, updatedAt: 'только что' }
    setForm(next)
    setSaved(next)
    setSuccess('Новость опубликована.')
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <button type="button" onClick={() => router.push('/admin/news')} aria-label="Вернуться к новостям"><ArrowLeft /></button>
        <div><span>Новости</span><h1>{form.title || 'Новая новость'}</h1></div>
        <StatusBadge status={dirty ? 'changed' : form.status} />
        <div className={styles.actions}>
          <Button variant="secondary" icon={<FloppyDisk />} onClick={save}>Сохранить черновик</Button>
          <Button icon={<PaperPlaneTilt />} onClick={publish}>Опубликовать</Button>
        </div>
      </header>
      {error ? <Notice tone="error" title="Не удалось сохранить">{error}</Notice> : null}
      {displaySuccess ? <Notice tone="success" title={displaySuccess}>Данные сохраняются только в демо-состоянии браузера.</Notice> : null}
      <div className={styles.grid}>
        <section className={styles.panel}>
          <h2>Материал</h2>
          <Field label="Заголовок" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <Field label="Адрес" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value.toLowerCase().replace(/\s+/g, '-') })} />
          <Textarea label="Краткое описание" value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} rows={3} />
          <Textarea label="Текст новости" value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} rows={12} />
        </section>
        <aside className={styles.panel} aria-label="Публикация новости">
          <h2>Публикация</h2>
          <Field type="date" label="Дата публикации" value={form.publicationDate} onChange={(event) => setForm({ ...form, publicationDate: event.target.value })} />
          <dl><div><dt>Автор</dt><dd>{form.author}</dd></div><div><dt>Изменено</dt><dd>{form.updatedAt}</dd></div></dl>
          <p>Обложка и категории будут подключены к той же медиатеке и отношениям Payload после интеграции.</p>
        </aside>
      </div>
    </div>
  )
}
