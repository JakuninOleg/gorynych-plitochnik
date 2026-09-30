'use client'

import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { DocumentStatus } from '@/lib/demo-data'
import { EmptyState, StatusBadge } from '@/components/ui/ui'
import styles from './document-list.module.css'

export type DocumentListItem = {
  id: string
  title: string
  slug: string
  status: DocumentStatus
  updatedAt: string
  author: string
}

export function DocumentList({ items, basePath, noun }: { items: DocumentListItem[]; basePath: string; noun: string }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | DocumentStatus>('all')
  const [sort, setSort] = useState<'recent' | 'title'>('recent')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('ru')
    const next = items.filter((item) => {
      const matchesSearch = !normalized || `${item.title} ${item.slug}`.toLocaleLowerCase('ru').includes(normalized)
      const matchesStatus = status === 'all' || item.status === status
      return matchesSearch && matchesStatus
    })
    if (sort === 'title') next.sort((a, b) => a.title.localeCompare(b.title, 'ru'))
    return next
  }, [items, query, sort, status])

  return (
    <section className={styles.section} aria-label={`Список: ${noun}`}>
      <div className={styles.toolbar}>
        <label className={styles.search}>
          <span className="sr-only">Поиск</span>
          <MagnifyingGlass aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Найти ${noun.toLocaleLowerCase('ru')}…`} />
        </label>
        <label className={styles.selectLabel}>
          <span>Статус</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as 'all' | DocumentStatus)}>
            <option value="all">Все</option>
            <option value="published">Опубликовано</option>
            <option value="draft">Черновики</option>
            <option value="changed">Есть изменения</option>
          </select>
        </label>
        <label className={styles.selectLabel}>
          <span>Сортировка</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as 'recent' | 'title')}>
            <option value="recent">Сначала недавние</option>
            <option value="title">По названию</option>
          </select>
        </label>
      </div>

      {filtered.length ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th>Название</th><th>Статус</th><th>Изменено</th><th>Автор</th><th><span className="sr-only">Открыть</span></th></tr></thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td data-label="Название"><Link className={styles.documentLink} href={`${basePath}/${item.id}`}><strong>{item.title}</strong><span>/{item.slug}</span></Link></td>
                  <td data-label="Статус"><StatusBadge status={item.status} /></td>
                  <td data-label="Изменено"><span className={styles.secondary}>{item.updatedAt}</span></td>
                  <td data-label="Автор"><span className={styles.secondary}>{item.author}</span></td>
                  <td><Link className={styles.open} href={`${basePath}/${item.id}`} aria-label={`Открыть: ${item.title}`}><ArrowRight aria-hidden="true" /></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
          <footer className={styles.pagination}><span>Показано {filtered.length} из {items.length}</span><span>Страница 1 из 1</span></footer>
        </div>
      ) : (
        <EmptyState
          title={items.length ? 'Ничего не найдено' : `Пока нет: ${noun.toLocaleLowerCase('ru')}`}
          description={items.length ? 'Измените запрос или снимите фильтр статуса.' : 'Первый материал можно создать прямо сейчас.'}
        />
      )}
    </section>
  )
}
