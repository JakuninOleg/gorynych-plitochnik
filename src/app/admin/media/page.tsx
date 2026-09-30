'use client'

import { ImageSquare, MagnifyingGlass, UploadSimple, Warning } from '@phosphor-icons/react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useDemo } from '@/components/demo/demo-provider'
import { Button, EmptyState, Notice, PageHeader } from '@/components/ui/ui'
import { Modal } from '@/components/ui/modal'
import { maxDemoImageLabel, validateDemoImage } from '@/lib/demo-media'
import styles from './media.module.css'

export default function MediaPage() {
  const { state, dispatch } = useDemo()
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(state.media[0]?.id ?? '')
  const [uploadError, setUploadError] = useState('')
  const [uploaded, setUploaded] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const normalized = query.trim().toLocaleLowerCase('ru')
  const results = useMemo(() => state.media.filter((asset) => `${asset.title} ${asset.alt}`.toLocaleLowerCase('ru').includes(normalized)), [normalized, state.media])
  const selected = state.media.find((asset) => asset.id === selectedId)

  const upload = (file: File | undefined) => {
    setUploadError('')
    setUploaded('')
    if (!file) return
    const validationError = validateDemoImage(file)
    if (validationError) { setUploadError(validationError); return }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') return
      const id = `media-${Date.now()}`
      dispatch({ type: 'media.added', asset: { id, title: file.name.replace(/\.[^.]+$/, ''), alt: `Загруженное изображение ${file.name}`, url: reader.result, kind: 'image', size: `${Math.max(1, Math.round(file.size / 1024))} КБ`, usedBy: [] } })
      setSelectedId(id)
      setUploaded('Изображение добавлено в демо-библиотеку.')
    }
    reader.onerror = () => setUploadError('Не удалось прочитать файл. Попробуйте ещё раз.')
    reader.readAsDataURL(file)
  }

  return (
    <>
      <PageHeader title="Медиа" description="Изображения и файлы, доступные в материалах сайта." actions={<label className={styles.uploadButton}><UploadSimple aria-hidden="true" />Загрузить<input type="file" accept="image/*" onChange={(event) => upload(event.target.files?.[0])} /></label>} />
      {uploadError ? <Notice tone="error" title="Файл не загружен">{uploadError}</Notice> : null}
      {uploaded ? <Notice tone="success" title="Готово">{uploaded}</Notice> : null}
      <div className={styles.layout}>
        <section className={styles.library} aria-label="Медиатека">
          <label className={styles.search}><MagnifyingGlass aria-hidden="true" /><span className="sr-only">Поиск по медиатеке</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти изображение…" /></label>
          {results.length ? (
            <div className={styles.grid}>
              {results.map((asset) => (
                <button className={`${styles.asset} ${selectedId === asset.id ? styles.assetSelected : ''}`} type="button" key={asset.id} onClick={() => setSelectedId(asset.id)} aria-pressed={selectedId === asset.id}>
                  <Image src={asset.url} alt="" width={320} height={210} unoptimized />
                  <span><strong>{asset.title}</strong><small>{asset.size}</small></span>
                </button>
              ))}
            </div>
          ) : <EmptyState title="Ничего не найдено" description="Измените поисковый запрос или загрузите новый файл." />}
        </section>
        <aside className={styles.details} aria-label="Сведения о медиафайле">
          {selected ? (
            <>
              <Image src={selected.url} alt="" width={420} height={280} unoptimized />
              <div><span>Файл</span><h2>{selected.title}</h2><p>{selected.size}</p></div>
              <dl><div><dt>Alt-текст</dt><dd>{selected.alt}</dd></div><div><dt>Используется</dt><dd>{selected.usedBy.length ? selected.usedBy.join(', ') : 'Не используется'}</dd></div></dl>
              {selected.usedBy.length ? <Notice tone="warning" title="Удаление недоступно">Сначала замените изображение в связанных материалах.</Notice> : <Button variant="danger" onClick={() => setDeleteOpen(true)}>Удалить файл</Button>}
            </>
          ) : (
            <div className={styles.noSelection}><ImageSquare aria-hidden="true" /><h2>Выберите файл</h2><p>Здесь появятся его описание и связи.</p></div>
          )}
        </aside>
      </div>
      <div className={styles.demoFailure}><Warning aria-hidden="true" /><span>Чтобы проверить ошибку загрузки, выберите файл другого типа или изображение больше {maxDemoImageLabel}.</span></div>
      {selected ? <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title={`Удалить «${selected.title}»?`} description="Это действие нельзя отменить." footer={<><Button variant="secondary" onClick={() => setDeleteOpen(false)}>Отмена</Button><Button variant="danger" onClick={() => { dispatch({ type: 'media.removed', id: selected.id }); setSelectedId(''); setDeleteOpen(false) }}>Удалить файл</Button></>}><p>Файл будет удалён из демонстрационной медиатеки.</p></Modal> : null}
    </>
  )
}
