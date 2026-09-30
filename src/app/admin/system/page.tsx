'use client'

import { ArrowRight, FloppyDisk, Plus, Trash } from '@phosphor-icons/react'
import { Button, Field, Notice, PageHeader, StatusBadge, Textarea } from '@/components/ui/ui'
import styles from './system.module.css'

export default function SystemPage() {
  return (
    <>
      <PageHeader eyebrow="Дизайн-система" title="Компоненты OJ CMS" description="Живая проверка типографики, состояний и семантических токенов прототипа." />
      <div className={styles.stack}>
        <section className={styles.section}><h2>Действия</h2><div className={styles.row}><Button icon={<Plus />}>Основное действие</Button><Button variant="secondary" icon={<FloppyDisk />}>Вторичное</Button><Button variant="quiet" icon={<ArrowRight />}>Тихое</Button><Button variant="danger" icon={<Trash />}>Удалить</Button><Button disabled>Недоступно</Button></div></section>
        <section className={styles.section}><h2>Статусы и сообщения</h2><div className={styles.row}><StatusBadge status="published" /><StatusBadge status="draft" /><StatusBadge status="changed" /></div><div className={styles.noticeGrid}><Notice title="Информация">Нейтральное пояснение.</Notice><Notice tone="success" title="Сохранено">Действие завершено.</Notice><Notice tone="warning" title="Есть изменения">Нужно проверить черновик.</Notice><Notice tone="error" title="Не сохранено">Можно повторить без потери данных.</Notice></div></section>
        <section className={styles.section}><h2>Поля</h2><div className={styles.fieldGrid}><Field label="Обычное поле" placeholder="Введите значение" /><Field label="Поле с описанием" hint="Описание помогает принять решение." defaultValue="Заполненное значение" /><Field label="Поле с ошибкой" error="Исправьте значение." defaultValue="Ошибка" /><Field label="Только чтение" readOnly defaultValue="Системное значение" /><Textarea label="Многострочный текст" defaultValue="Текст сохраняет комфортную длину строки и высоту." rows={4} /></div></section>
        <section className={styles.section}><h2>Типографика</h2><div className={styles.type}><span>Подпись раздела</span><h3>Спокойный рабочий интерфейс</h3><p>Основной текст остаётся читаемым при высокой информационной плотности. Иерархию создают размер, вес и пространство.</p><small>Вторичная информация · 13 px</small></div></section>
      </div>
    </>
  )
}
