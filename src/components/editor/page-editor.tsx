'use client'

import { ArrowLeft, FloppyDisk, ImageSquare, PaperPlaneTilt, Warning } from '@phosphor-icons/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDemo } from '@/components/demo/demo-provider'
import { Button, Field, Notice, StatusBadge, Textarea } from '@/components/ui/ui'
import { Modal } from '@/components/ui/modal'
import type { PageContent, PageDocument } from '@/lib/demo-data'
import { validateDemoImage } from '@/lib/demo-media'
import styles from './page-editor.module.css'

const emptyContent: PageContent = {
  heading: '',
  intro: '',
  body: '',
  ctaLabel: '',
  ctaUrl: '',
  mediaId: null,
}

type FormState = {
  title: string
  slug: string
  seoDescription: string
  content: PageContent
}

export function PageEditor({ pageId }: { pageId: string }) {
  const { state, dispatch } = useDemo()
  const router = useRouter()
  const page = state.pages.find((item) => item.id === pageId)
  const isNew = pageId === 'new' && !page
  const initial = useMemo<FormState>(() => fromPage(page), [page])
  const [form, setForm] = useState<FormState>(initial)
  const [saved, setSaved] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState<{ tone: 'success' | 'error' | 'warning'; title: string; detail: string } | null>(null)
  const [mediaOpen, setMediaOpen] = useState(false)
  const [leaveOpen, setLeaveOpen] = useState(false)
  const [leaveTarget, setLeaveTarget] = useState('/admin/pages')
  const [simulateFailure, setSimulateFailure] = useState(false)
  const [saving, setSaving] = useState(false)

  const dirty = JSON.stringify(form) !== JSON.stringify(saved)
  const selectedMedia = state.media.find((asset) => asset.id === form.content.mediaId)
  const displayNotice = notice ?? (
    !dirty && page?.updatedAt === 'только что'
      ? page.status === 'published'
        ? { tone: 'success' as const, title: 'Страница опубликована', detail: 'Статус материала обновлён в демонстрации.' }
        : { tone: 'success' as const, title: 'Черновик сохранён', detail: 'Изменения сохранены в демонстрационном рабочем пространстве.' }
      : null
  )

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirty) return
      event.preventDefault()
    }
    const interceptInternalNavigation = (event: MouseEvent) => {
      if (!dirty || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const target = event.target instanceof Element ? event.target.closest('a') : null
      if (!target || target.target === '_blank' || target.hasAttribute('download')) return
      const destination = new URL(target.href, window.location.href)
      if (destination.origin !== window.location.origin || destination.href === window.location.href) return
      event.preventDefault()
      setLeaveTarget(`${destination.pathname}${destination.search}${destination.hash}`)
      setLeaveOpen(true)
    }
    window.addEventListener('beforeunload', beforeUnload)
    document.addEventListener('click', interceptInternalNavigation, true)
    return () => {
      window.removeEventListener('beforeunload', beforeUnload)
      document.removeEventListener('click', interceptInternalNavigation, true)
    }
  }, [dirty])

  const updateContent = <Key extends keyof PageContent>(key: Key, value: PageContent[Key]) => {
    setForm((current) => ({ ...current, content: { ...current.content, [key]: value } }))
  }

  const validate = useCallback(() => {
    const next: Record<string, string> = {}
    if (!form.title.trim()) next.title = 'Введите название страницы.'
    if (!/^[a-z0-9-]+$/.test(form.slug)) next.slug = 'Используйте латинские буквы, цифры и дефисы.'
    if (!form.content.heading.trim()) next.heading = 'Добавьте заголовок первого экрана.'
    if (form.content.ctaUrl && !/^(\/|https?:\/\/|mailto:)/.test(form.content.ctaUrl)) next.ctaUrl = 'Укажите относительный путь, http(s)- или mailto-ссылку.'
    setErrors(next)
    if (Object.keys(next).length) {
      setNotice({ tone: 'error', title: 'Не удалось сохранить', detail: 'Исправьте отмеченные поля и повторите.' })
      window.setTimeout(() => document.getElementById(Object.keys(next)[0] ?? '')?.focus(), 0)
      return false
    }
    return true
  }, [form])

  const persistDraft = useCallback(async () => {
    if (!validate()) return null
    setSaving(true)
    await new Promise((resolve) => window.setTimeout(resolve, 450))
    if (simulateFailure) {
      setSaving(false)
      setNotice({ tone: 'error', title: 'Черновик не сохранён', detail: 'Демо-сбой соединения. Данные остались в форме — отключите сценарий и повторите.' })
      return null
    }

    const id = isNew ? `page-${Date.now()}` : pageId
    if (isNew) {
      const created: PageDocument = {
        id,
        title: form.title,
        slug: form.slug,
        status: 'draft',
        updatedAt: 'только что',
        author: 'Олег Якунин',
        seoDescription: form.seoDescription,
        draft: form.content,
        published: null,
      }
      dispatch({ type: 'page.created', page: created })
    } else {
      dispatch({
        type: 'page.draftSaved',
        id,
        title: form.title,
        slug: form.slug,
        seoDescription: form.seoDescription,
        content: form.content,
      })
    }
    setSaved(form)
    setSaving(false)
    setNotice({ tone: 'success', title: 'Черновик сохранён', detail: 'Изменения сохранены в демонстрационном рабочем пространстве.' })
    if (isNew) router.replace(`/admin/pages/${id}`)
    return id
  }, [dispatch, form, isNew, pageId, router, simulateFailure, validate])

  const publish = async () => {
    const id = dirty || isNew ? await persistDraft() : pageId
    if (!id) return
    dispatch({ type: 'page.published', id })
    setNotice({ tone: 'success', title: 'Страница опубликована', detail: 'Статус материала обновлён в демонстрации.' })
  }

  if (!page && !isNew) {
    return <Notice tone="error" title="Страница не найдена">Проверьте адрес или вернитесь к списку страниц.</Notice>
  }

  return (
    <div className={styles.editor}>
      <header className={styles.editorHeader}>
        <div className={styles.identity}>
          <button type="button" className={styles.back} onClick={() => { if (dirty) { setLeaveTarget('/admin/pages'); setLeaveOpen(true) } else { router.push('/admin/pages') } }} aria-label="Вернуться к страницам"><ArrowLeft /></button>
          <div><span>Страницы / {isNew ? 'Новая' : form.title}</span><h1>{isNew ? 'Новая страница' : form.title}</h1></div>
          {page ? <StatusBadge status={dirty ? 'changed' : page.status} /> : <StatusBadge status="draft" />}
        </div>
        <div className={styles.actions}>
          <span className={styles.saveState} aria-live="polite">{saving ? 'Сохраняем…' : dirty ? 'Есть несохранённые изменения' : 'Все изменения сохранены'}</span>
          <Button variant="secondary" onClick={() => void persistDraft()} disabled={saving} icon={<FloppyDisk />}>{saving ? 'Сохранение…' : 'Сохранить черновик'}</Button>
          <Button onClick={() => void publish()} disabled={saving} icon={<PaperPlaneTilt />}>Опубликовать</Button>
        </div>
      </header>

      {displayNotice ? <Notice tone={displayNotice.tone} title={displayNotice.title} live>{displayNotice.detail}</Notice> : null}
      {Object.keys(errors).length ? <div className={styles.errorSummary} role="alert"><Warning aria-hidden="true" /><div><strong>Проверьте форму</strong><span>{Object.keys(errors).length} поля требуют внимания.</span></div></div> : null}

      <div className={styles.editorGrid}>
        <div className={styles.contentColumn}>
          <section className={styles.panel} aria-labelledby="base-title">
            <header><div><span>01</span><h2 id="base-title">Основное</h2></div><p>Название и адрес страницы</p></header>
            <div className={styles.panelBody}>
              <Field id="title" label="Название страницы" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} error={errors.title} />
              <Field id="slug" label="Адрес" hint={`Публичный путь: /${form.slug || '…'}`} value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value.toLowerCase().replace(/\s+/g, '-') })} error={errors.slug} />
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="cover-title">
            <header><div><span>02</span><h2 id="cover-title">Обложка</h2></div><p>Первый экран страницы</p></header>
            <div className={styles.panelBody}>
              <Field id="heading" label="Заголовок" value={form.content.heading} onChange={(event) => updateContent('heading', event.target.value)} error={errors.heading} />
              <Textarea id="intro" label="Вводный текст" value={form.content.intro} onChange={(event) => updateContent('intro', event.target.value)} rows={3} />
              <div className={styles.mediaField}>
                <div><strong>Изображение</strong><span>Выберите файл из медиатеки или загрузите новый.</span></div>
                {selectedMedia ? <Image src={selectedMedia.url} alt="" width={240} height={150} /> : <div className={styles.mediaPlaceholder}><ImageSquare aria-hidden="true" /><span>Изображение не выбрано</span></div>}
                <Button variant="secondary" onClick={() => setMediaOpen(true)} icon={<ImageSquare />}>{selectedMedia ? 'Заменить изображение' : 'Выбрать изображение'}</Button>
                {selectedMedia ? <span className={styles.altText}>Alt: {selectedMedia.alt}</span> : null}
              </div>
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="text-title">
            <header><div><span>03</span><h2 id="text-title">Текст с изображением</h2></div><p>Основное содержание</p></header>
            <div className={styles.panelBody}><Textarea id="body" label="Текст" value={form.content.body} onChange={(event) => updateContent('body', event.target.value)} rows={7} /></div>
          </section>

          <section className={styles.panel} aria-labelledby="cta-title">
            <header><div><span>04</span><h2 id="cta-title">Призыв к действию</h2></div><p>Финальный следующий шаг</p></header>
            <div className={styles.panelBodyTwo}>
              <Field id="ctaLabel" label="Текст кнопки" value={form.content.ctaLabel} onChange={(event) => updateContent('ctaLabel', event.target.value)} />
              <Field id="ctaUrl" label="Ссылка" value={form.content.ctaUrl} onChange={(event) => updateContent('ctaUrl', event.target.value)} error={errors.ctaUrl} />
            </div>
          </section>
        </div>

        <aside className={styles.sideColumn} aria-label="Публикация и поисковая выдача">
          <section className={styles.sidePanel}><h2>Публикация</h2><dl><div><dt>Статус</dt><dd>{page?.status === 'published' ? 'Опубликовано' : page?.status === 'changed' ? 'Есть изменения' : 'Черновик'}</dd></div><div><dt>Автор</dt><dd>{page?.author ?? 'Олег Якунин'}</dd></div><div><dt>Изменено</dt><dd>{page?.updatedAt ?? 'Ещё не сохранено'}</dd></div></dl></section>
          <section className={styles.sidePanel}><h2>Поисковая выдача</h2><Textarea id="seoDescription" label="Описание" hint="Рекомендуемая длина — до 160 символов." maxLength={160} value={form.seoDescription} onChange={(event) => setForm({ ...form, seoDescription: event.target.value })} rows={5} /><span className={styles.counter}>{form.seoDescription.length} / 160</span></section>
          <section className={styles.sidePanel}><h2>История версий</h2><p>В демонстрации доступны текущий черновик и опубликованная версия. История изменений пока недоступна.</p></section>
        </aside>
      </div>

      <details className={styles.demoScenario}>
        <summary>Демо-сценарии</summary>
        <label><input type="checkbox" checked={simulateFailure} onChange={(event) => setSimulateFailure(event.target.checked)} /> Сымитировать ошибку сохранения</label>
      </details>

      {mediaOpen ? <MediaPicker open onClose={() => setMediaOpen(false)} selectedId={form.content.mediaId} onSelect={(id) => { updateContent('mediaId', id); setMediaOpen(false) }} /> : null}

      <Modal
        open={leaveOpen}
        onClose={() => setLeaveOpen(false)}
        title="Уйти без сохранения?"
        description={`Изменения страницы «${form.title || 'Новая страница'}» будут потеряны.`}
        footer={<><Button variant="secondary" onClick={() => setLeaveOpen(false)}>Остаться</Button><Button variant="danger" onClick={() => router.push(leaveTarget)}>Уйти без сохранения</Button></>}
      >
        <Notice tone="warning" title="Черновик не сохранён">Сохраните изменения, если хотите продолжить с ними позже.</Notice>
      </Modal>
    </div>
  )
}

function fromPage(page: PageDocument | undefined): FormState {
  return page
    ? { title: page.title, slug: page.slug, seoDescription: page.seoDescription, content: { ...page.draft } }
    : { title: '', slug: '', seoDescription: '', content: { ...emptyContent } }
}

function MediaPicker({ open, onClose, selectedId, onSelect }: { open: boolean; onClose: () => void; selectedId: string | null; onSelect: (id: string) => void }) {
  const { state, dispatch } = useDemo()
  const [pendingId, setPendingId] = useState(selectedId)
  const [uploadError, setUploadError] = useState('')

  const upload = (file: File | undefined) => {
    setUploadError('')
    if (!file) return
    const validationError = validateDemoImage(file)
    if (validationError) { setUploadError(validationError); return }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') return
      const id = `media-${Date.now()}`
      dispatch({ type: 'media.added', asset: { id, title: file.name.replace(/\.[^.]+$/, ''), alt: `Загруженное изображение ${file.name}`, url: reader.result, kind: 'image', size: `${Math.max(1, Math.round(file.size / 1024))} КБ`, usedBy: [] } })
      setPendingId(id)
    }
    reader.onerror = () => setUploadError('Не удалось прочитать файл. Попробуйте ещё раз.')
    reader.readAsDataURL(file)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Выбрать изображение"
      description="Медиа из демо-библиотеки сохраняются только в этом браузере."
      footer={<><Button variant="secondary" onClick={onClose}>Отмена</Button><Button onClick={() => pendingId && onSelect(pendingId)} disabled={!pendingId}>Выбрать</Button></>}
    >
      <label className={styles.uploadLabel}>Загрузить изображение<input type="file" accept="image/*" onChange={(event) => upload(event.target.files?.[0])} /></label>
      {uploadError ? <Notice tone="error" title="Файл не загружен">{uploadError}</Notice> : null}
      <div className={styles.pickerGrid}>
        {state.media.map((asset) => (
          <button className={`${styles.pickerItem} ${pendingId === asset.id ? styles.pickerItemSelected : ''}`} type="button" key={asset.id} onClick={() => setPendingId(asset.id)} aria-pressed={pendingId === asset.id}>
            <Image src={asset.url} alt="" width={260} height={170} unoptimized={asset.url.startsWith('data:')} />
            <span><strong>{asset.title}</strong><small>{asset.alt}</small></span>
          </button>
        ))}
      </div>
    </Modal>
  )
}
