import { describe, expect, it } from 'vitest'
import { initialDemoState } from './demo-data'
import { demoReducer } from './demo-reducer'

describe('demoReducer', () => {
  it('keeps published content unchanged when a draft is saved', () => {
    const original = initialDemoState.pages[0]
    if (!original?.published) throw new Error('Fixture must include a published page')

    const next = demoReducer(initialDemoState, {
      type: 'page.draftSaved',
      id: original.id,
      title: original.title,
      slug: original.slug,
      seoDescription: original.seoDescription,
      content: { ...original.draft, heading: 'Новый черновой заголовок' },
    })

    expect(next.pages[0]?.draft.heading).toBe('Новый черновой заголовок')
    expect(next.pages[0]?.published?.heading).toBe(original.published.heading)
    expect(next.pages[0]?.status).toBe('changed')
  })

  it('copies the latest saved draft into the published snapshot', () => {
    const saved = demoReducer(initialDemoState, {
      type: 'page.draftSaved',
      id: 'home',
      title: 'Главная страница',
      slug: 'home',
      seoDescription: 'Описание',
      content: { ...initialDemoState.pages[0]!.draft, heading: 'Готово к публикации' },
    })
    const published = demoReducer(saved, { type: 'page.published', id: 'home' })

    expect(published.pages[0]?.published?.heading).toBe('Готово к публикации')
    expect(published.pages[0]?.status).toBe('published')
  })

  it('does not expose user administration to the editor role', () => {
    const next = demoReducer(initialDemoState, { type: 'role.changed', role: 'editor' })
    expect(next.role).toBe('editor')
  })
})
