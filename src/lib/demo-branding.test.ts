import { describe, expect, it } from 'vitest'
import { refreshDemoArtwork } from './demo-branding'
import { initialDemoState } from './demo-data'

describe('refreshDemoArtwork', () => {
  it('replaces legacy artwork without resetting saved pages, roles or upload metadata', () => {
    const state = structuredClone(initialDemoState)
    state.role = 'editor'
    state.pages[0]!.draft.heading = 'Мой сохранённый заголовок'
    state.media[0]!.url = '/demo/form-and-light.svg'
    state.media[0]!.title = 'Моё название'
    state.media[0]!.usedBy = ['Моя страница']
    const migrated = refreshDemoArtwork(state)
    expect(migrated.media[0]).toMatchObject({ url: '/images/alpine-house.webp', title: 'Моё название', usedBy: ['Моя страница'] })
    expect(migrated.pages).toEqual(state.pages)
    expect(migrated.role).toBe('editor')
    expect(state.media[0]!.url).toBe('/demo/form-and-light.svg')
  })

  it('keeps user uploads and already upgraded media unchanged', () => {
    const state = structuredClone(initialDemoState)
    state.media[0]!.url = 'data:image/png;base64,example'
    expect(refreshDemoArtwork(state)).toEqual(state)
  })
})
