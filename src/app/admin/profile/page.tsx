'use client'

import { useDemo } from '@/components/demo/demo-provider'
import { Field, Notice, PageHeader } from '@/components/ui/ui'
import styles from './profile.module.css'

export default function ProfilePage() {
  const { state } = useDemo()
  return (
    <>
      <PageHeader title="Профиль" description="Личные данные и текущий уровень доступа." />
      <div className={styles.grid}>
        <section className={styles.panel}><span className={styles.avatar}>ОЯ</span><div><h2>Олег Якунин</h2><p>{state.role === 'administrator' ? 'Администратор' : 'Редактор'}</p></div></section>
        <section className={styles.panel}><h2>Учётная запись</h2><Field label="Имя" value="Олег Якунин" readOnly /><Field label="Электронная почта" value="oleg@example.ru" readOnly /><Notice title="Демонстрационный профиль">В демонстрации используются примерные данные. Изменение профиля и пароля здесь недоступно.</Notice></section>
      </div>
    </>
  )
}
