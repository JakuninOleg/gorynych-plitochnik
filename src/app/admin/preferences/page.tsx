'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useDemo } from '@/components/demo/demo-provider'
import { Modal } from '@/components/ui/modal'
import { Button, Notice, PageHeader } from '@/components/ui/ui'
import styles from './preferences.module.css'

export default function PreferencesPage() {
  const { state, dispatch } = useDemo()
  const [confirmReset, setConfirmReset] = useState(false)
  const [wasReset, setWasReset] = useState(false)
  return <>
    <PageHeader title="Настройки" description="Ваше рабочее пространство и параметры демонстрации." />
    <div className={styles.stack}>
      {wasReset ? <Notice tone="success" title="Демонстрация восстановлена">Можно начать знакомство с чистого листа.</Notice> : null}
      <section className={styles.panel}><div><h2>Учётная запись</h2><p>Олег Якунин · {state.role === 'administrator' ? 'Администратор' : 'Редактор'}</p></div><Link href="/admin/profile">Открыть профиль ↗</Link></section>
      <section className={styles.panel}><div><h2>Роль в демонстрации</h2><p>Попробуйте интерфейс редактора. Управление пользователями доступно только администратору.</p></div><label><span className="sr-only">Роль в демонстрации</span><select value={state.role} onChange={(event) => dispatch({ type: 'role.changed', role: event.target.value === 'editor' ? 'editor' : 'administrator' })}><option value="administrator">Администратор</option><option value="editor">Редактор</option></select></label></section>
      <section className={styles.panel}><div><h2>Начать заново</h2><p>Восстановить исходные страницы и изображения. Ваши изменения в этой демонстрации будут удалены.</p></div><Button variant="secondary" onClick={() => setConfirmReset(true)}>Сбросить демо-данные</Button></section>
      <p className={styles.caption}>OJ CMS · Демонстрационная версия. Данные сохраняются в вашем браузере.</p>
    </div>
    <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="Сбросить демо-данные?" footer={<><Button variant="secondary" onClick={() => setConfirmReset(false)}>Отмена</Button><Button onClick={() => { dispatch({ type: 'demo.reset' }); setConfirmReset(false); setWasReset(true) }}>Восстановить демонстрацию</Button></>}><p>Изменённые страницы, новые публикации и загруженные изображения будут заменены исходным набором.</p></Modal>
  </>
}
