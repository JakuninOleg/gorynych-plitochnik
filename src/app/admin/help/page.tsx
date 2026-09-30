import Link from 'next/link'
import { PageHeader } from '@/components/ui/ui'
import styles from './help.module.css'

const guides = [
  { title: 'Изменить страницу', text: 'Откройте «Коллекции → Страницы», выберите материал и измените текст или изображение. Название, содержимое и описание для поиска находятся в отдельных полях.', href: '/admin/pages', label: 'Перейти к страницам' },
  { title: 'Сохранить и опубликовать', text: '«Сохранить черновик» сохраняет вашу работу. Когда всё готово, нажмите «Опубликовать» — статус материала изменится в рабочем пространстве.', href: '/admin/pages/home', label: 'Открыть редактор' },
  { title: 'Работать с изображениями', text: 'В медиатеке можно выбрать изображение, посмотреть его описание и связанные страницы. Для загрузки в демонстрации используйте файл до 512 КБ.', href: '/admin/media', label: 'Открыть медиатеку' },
  { title: 'Обновить контакты и меню', text: 'Раздел «Глобальные» объединяет название сайта, контактные данные и меню. Эти сведения относятся ко всему сайту.', href: '/admin/settings', label: 'Открыть глобальные настройки' },
]

export default function HelpPage() {
  return <>
    <PageHeader eyebrow="OJ CMS" title="Всё под рукой" description="Короткое руководство, чтобы уверенно познакомиться с интерфейсом." />
    <div className={styles.guides}>{guides.map((guide) => <section className={styles.guide} key={guide.title}><h2>{guide.title}</h2><p>{guide.text}</p><Link href={guide.href}>{guide.label} <span aria-hidden="true">↗</span></Link></section>)}</div>
    <section className={styles.note}><h2>Ваше пространство для знакомства</h2><p>Это интерактивная демонстрация. Изменения сохраняются только в вашем браузере и не влияют на других посетителей. В меню профиля можно попробовать роль редактора или восстановить исходные данные.</p></section>
    <section className={styles.contact}><div><h2>Остались вопросы?</h2><p>Помогу разобраться и адаптировать OJ CMS под ваш проект.</p></div><a href="https://jakuninoleg.dev/ru" target="_blank" rel="noreferrer">Связаться с Олегом <span aria-hidden="true">↗</span></a></section>
  </>
}
