export type UserRole = 'administrator' | 'editor'
export type DocumentStatus = 'published' | 'draft' | 'changed'

export type PageContent = {
  heading: string
  intro: string
  body: string
  ctaLabel: string
  ctaUrl: string
  mediaId: string | null
}

export type PageDocument = {
  id: string
  title: string
  slug: string
  status: DocumentStatus
  updatedAt: string
  author: string
  seoDescription: string
  draft: PageContent
  published: PageContent | null
}

export type NewsDocument = {
  id: string
  title: string
  slug: string
  status: DocumentStatus
  updatedAt: string
  author: string
  excerpt: string
  body: string
  publicationDate: string
}

export type MediaAsset = {
  id: string
  title: string
  alt: string
  url: string
  kind: 'image'
  size: string
  usedBy: string[]
}

export type SiteSettings = {
  siteName: string
  phone: string
  email: string
  address: string
  navigation: string
}

export type DemoState = {
  role: UserRole
  pages: PageDocument[]
  news: NewsDocument[]
  media: MediaAsset[]
  settings: SiteSettings
}

const homeContent: PageContent = {
  heading: 'Пространство для важных идей',
  intro: 'Создаём спокойные и точные цифровые продукты для компаний, которым важно качество.',
  body: 'Мы соединяем стратегию, дизайн и разработку в одной команде. Работаем последовательно: от смысла и структуры до запуска и поддержки.',
  ctaLabel: 'Обсудить проект',
  ctaUrl: '/contacts',
  mediaId: 'media-1',
}

export const initialDemoState: DemoState = {
  role: 'administrator',
  pages: [
    {
      id: 'home',
      title: 'Главная страница',
      slug: 'home',
      status: 'changed',
      updatedAt: '12 минут назад',
      author: 'Олег Якунин',
      seoDescription: 'Студия цифровых продуктов — стратегия, дизайн и разработка.',
      draft: {
        ...homeContent,
        heading: 'Пространство для идей, которые остаются',
      },
      published: homeContent,
    },
    {
      id: 'services',
      title: 'Услуги и направления работы',
      slug: 'services',
      status: 'published',
      updatedAt: '3 часа назад',
      author: 'Елена П.',
      seoDescription: 'Стратегия, дизайн, разработка и поддержка цифровых продуктов.',
      draft: {
        heading: 'От задачи до работающего продукта',
        intro: 'Команда подключается на любом этапе и помогает сохранить цельность результата.',
        body: 'Исследуем контекст, проектируем сценарии, создаём интерфейс и выпускаем продукт в продакшен.',
        ctaLabel: 'Посмотреть направления',
        ctaUrl: '/services',
        mediaId: 'media-2',
      },
      published: {
        heading: 'От задачи до работающего продукта',
        intro: 'Команда подключается на любом этапе и помогает сохранить цельность результата.',
        body: 'Исследуем контекст, проектируем сценарии, создаём интерфейс и выпускаем продукт в продакшен.',
        ctaLabel: 'Посмотреть направления',
        ctaUrl: '/services',
        mediaId: 'media-2',
      },
    },
    {
      id: 'events',
      title: 'Мероприятия и открытые встречи',
      slug: 'events',
      status: 'draft',
      updatedAt: '1 день назад',
      author: 'Иван С.',
      seoDescription: '',
      draft: {
        heading: 'Встречи, на которых можно говорить по делу',
        intro: 'Небольшие события для клиентов, коллег и партнёров.',
        body: 'Программа и даты появятся после согласования.',
        ctaLabel: 'Оставить заявку',
        ctaUrl: '/contacts',
        mediaId: null,
      },
      published: null,
    },
    {
      id: 'contacts',
      title: 'Контакты',
      slug: 'contacts',
      status: 'published',
      updatedAt: '2 дня назад',
      author: 'Елена П.',
      seoDescription: 'Контакты студии и форма для обсуждения проекта.',
      draft: {
        heading: 'Давайте познакомимся',
        intro: 'Расскажите о задаче — ответим в течение рабочего дня.',
        body: 'Москва · работаем с командами по всему миру.',
        ctaLabel: 'Написать нам',
        ctaUrl: 'mailto:hello@example.ru',
        mediaId: 'media-4',
      },
      published: {
        heading: 'Давайте познакомимся',
        intro: 'Расскажите о задаче — ответим в течение рабочего дня.',
        body: 'Москва · работаем с командами по всему миру.',
        ctaLabel: 'Написать нам',
        ctaUrl: 'mailto:hello@example.ru',
        mediaId: 'media-4',
      },
    },
  ],
  news: [
    {
      id: 'news-1',
      title: 'Открыли набор на осеннюю дизайн-сессию',
      slug: 'autumn-design-session',
      status: 'published',
      updatedAt: 'Сегодня, 09:40',
      author: 'Олег Якунин',
      excerpt: 'Три рабочих дня, чтобы собрать цельную структуру нового продукта.',
      body: 'Рассказываем, как устроен формат и для каких задач он подходит.',
      publicationDate: '2026-09-22',
    },
    {
      id: 'news-2',
      title: 'Обновляем процесс передачи проектов в поддержку',
      slug: 'support-handoff',
      status: 'draft',
      updatedAt: 'Вчера, 18:15',
      author: 'Елена П.',
      excerpt: 'Новый регламент делает запуск спокойнее для клиента и команды.',
      body: 'Материал готовится к публикации.',
      publicationDate: '2026-09-25',
    },
  ],
  media: [
    {
      id: 'media-1',
      title: 'Форма и свет',
      alt: 'Современный дом с панорамными окнами и тёплым светом на фоне гор',
      url: '/images/alpine-house.webp',
      kind: 'image',
      size: '1536 × 1024 · 214 КБ',
      usedBy: ['Главная страница'],
    },
    {
      id: 'media-2',
      title: 'Рабочий ритм',
      alt: 'Фасад современной виллы из светлого бетона рядом с соснами',
      url: '/images/concrete-villa.webp',
      kind: 'image',
      size: '1536 × 1024 · 137 КБ',
      usedBy: ['Услуги и направления работы'],
    },
    {
      id: 'media-3',
      title: 'Точка встречи',
      alt: 'Каменные горные хребты и сосны в мягком утреннем тумане',
      url: '/images/alpine-mist.webp',
      kind: 'image',
      size: '1536 × 1024 · 140 КБ',
      usedBy: [],
    },
    {
      id: 'media-4',
      title: 'Линия горизонта',
      alt: 'Светлая гостиная с деревянной мебелью и панорамным видом на горы',
      url: '/images/alpine-interior.webp',
      kind: 'image',
      size: '1536 × 1024 · 214 КБ',
      usedBy: ['Контакты'],
    },
  ],
  settings: {
    siteName: 'Демонстрационный проект',
    phone: '+7 900 000-00-00',
    email: 'project@example.ru',
    address: 'Данные настраиваются для каждого проекта',
    navigation: 'Главная\nУслуги\nНовости\nКонтакты',
  },
}
