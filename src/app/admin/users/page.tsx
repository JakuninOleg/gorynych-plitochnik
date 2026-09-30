'use client'

import { Lock, Plus, UserCircle } from '@phosphor-icons/react'
import { useDemo } from '@/components/demo/demo-provider'
import { ActionLink, Notice, PageHeader, StatusBadge } from '@/components/ui/ui'
import { useState } from 'react'
import { demoUsers as users } from '@/lib/demo-users'
import styles from './users.module.css'

export default function UsersPage() {
  const { state, hydrated } = useDemo()
  const [inviteNotice, setInviteNotice] = useState(false)
  if (!hydrated) {
    return (
      <div className={styles.denied} aria-busy="true" aria-live="polite">
        <span><UserCircle aria-hidden="true" /></span>
        <h1>Проверяем доступ…</h1>
        <p>Подготавливаем рабочее пространство пользователя.</p>
      </div>
    )
  }
  if (state.role !== 'administrator') {
    return (
      <div className={styles.denied}>
        <span><Lock aria-hidden="true" /></span>
        <h1>Недостаточно прав</h1>
        <p>Управлять пользователями может только администратор. Данные пользователей не были загружены.</p>
        <ActionLink href="/admin" variant="secondary">Вернуться на обзор</ActionLink>
      </div>
    )
  }

  return (
    <>
      <PageHeader title="Пользователи" description="Доступ к админке и роли команды." actions={<button className={styles.invite} type="button" onClick={() => setInviteNotice(true)}><Plus />Пригласить пользователя</button>} />
      {inviteNotice ? <div className={styles.notice}><Notice tone="info" title="Демо-действие">Приглашение не отправлено. После интеграции это действие создаст пользователя или приглашение через Payload Auth.</Notice></div> : null}
      <section className={styles.panel}>
        <table>
          <thead><tr><th>Пользователь</th><th>Роль</th><th>Статус</th><th>Последний вход</th></tr></thead>
          <tbody>{users.map((user, index) => <tr key={user.id}><td data-label="Пользователь"><div className={styles.person}><span><UserCircle /></span><div><strong>{user.name}</strong><small>{user.email}</small></div></div></td><td data-label="Роль">{user.role}</td><td data-label="Статус"><StatusBadge status="published" /></td><td data-label="Последний вход">{index === 0 ? 'Сейчас' : index === 1 ? 'Сегодня, 10:20' : 'Вчера, 17:42'}</td></tr>)}</tbody>
        </table>
      </section>
      <p className={styles.note}>Редактор управляет контентом и публикацией, но не видит этот раздел. В production права дополнительно проверяются на сервере и в API.</p>
    </>
  )
}
