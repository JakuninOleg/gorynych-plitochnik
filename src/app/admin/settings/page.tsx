'use client'

import { FloppyDisk } from '@phosphor-icons/react'
import { useState } from 'react'
import { useDemo } from '@/components/demo/demo-provider'
import { Button, Field, Notice, PageHeader, Textarea } from '@/components/ui/ui'
import type { SiteSettings } from '@/lib/demo-data'
import styles from './settings.module.css'

export default function SettingsPage() {
  const { state, dispatch } = useDemo()
  const [form, setForm] = useState<SiteSettings>(state.settings)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const update = <Key extends keyof SiteSettings>(key: Key, value: SiteSettings[Key]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.siteName.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Проверьте название сайта и адрес электронной почты.')
      setSaved(false)
      return
    }
    dispatch({ type: 'settings.saved', settings: form })
    setError('')
    setSaved(true)
  }

  return (
    <>
      <PageHeader title="Настройки сайта" description="Контактная информация, публичное название и основная навигация." />
      <form className={styles.form} onSubmit={submit}>
        {error ? <Notice tone="error" title="Настройки не сохранены">{error}</Notice> : null}
        {saved ? <Notice tone="success" title="Настройки сохранены">Публичные значения обновлены в демо-состоянии.</Notice> : null}
        <section className={styles.panel}>
          <header><span>01</span><div><h2>Публичная информация</h2><p>Эти данные видят посетители сайта.</p></div></header>
          <div className={styles.fields}>
            <Field label="Название сайта" value={form.siteName} onChange={(event) => update('siteName', event.target.value)} />
            <Field label="Телефон" value={form.phone} onChange={(event) => update('phone', event.target.value)} />
            <Field type="email" label="Электронная почта" value={form.email} onChange={(event) => update('email', event.target.value)} />
            <Field label="Адрес или география работы" value={form.address} onChange={(event) => update('address', event.target.value)} />
          </div>
        </section>
        <section className={styles.panel}>
          <header><span>02</span><div><h2>Основная навигация</h2><p>Введите каждый пункт меню с новой строки.</p></div></header>
          <div className={styles.fields}><Textarea label="Пункты меню" value={form.navigation} onChange={(event) => update('navigation', event.target.value)} rows={6} /></div>
        </section>
        <footer className={styles.actions}><span>Бренд OJ CMS и состав модулей задаются разработчиком.</span><Button type="submit" icon={<FloppyDisk />}>Сохранить настройки</Button></footer>
      </form>
    </>
  )
}
