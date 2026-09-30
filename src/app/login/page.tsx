'use client'

import { ArrowRight, Eye, EyeSlash } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, Field, Notice } from '@/components/ui/ui'
import { OJLogo } from '@/components/brand/oj-logo'
import styles from './login.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('oleg@example.ru')
  const [password, setPassword] = useState('demo-password')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 6) {
      setError('Проверьте электронную почту и пароль. Пароль должен содержать минимум 6 символов.')
      return
    }
    setLoading(true)
    await new Promise((resolve) => window.setTimeout(resolve, 600))
    setLoading(false)
    router.push('/admin')
  }

  return (
    <main className={styles.page}>
      <section className={styles.brandPanel}>
        <OJLogo />
        <div><p>Хорошие сайты делают большие дела.</p><h1>Управление сайтом без лишней сложности.</h1></div>
        <footer><span>OJ CMS</span><span>Демо-интерфейс</span></footer>
      </section>
      <section className={styles.formPanel}>
        <form className={styles.form} action="/admin" method="get" onSubmit={(event) => void submit(event)} noValidate>
          <header><span className={styles.smallMark}><OJLogo compact /></span><div><h2>Войти в OJ CMS</h2><p>Ваш сайт. Ваше рабочее пространство.</p></div></header>
          {error ? <Notice tone="error" title="Не удалось войти">{error}</Notice> : null}
          <Field id="login-email" type="email" autoComplete="username" label="Электронная почта" value={email} onChange={(event) => setEmail(event.target.value)} />
          <div className={styles.passwordField}>
            <Field id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" label="Пароль" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}>{showPassword ? <EyeSlash /> : <Eye />}</button>
          </div>
          <Button type="submit" disabled={loading} icon={<ArrowRight />}>{loading ? 'Входим…' : 'Войти'}</Button>
          <p className={styles.demo}>Демо-доступ уже заполнен. Нажмите «Войти», чтобы познакомиться с CMS.</p>
        </form>
      </section>
    </main>
  )
}
