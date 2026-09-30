import { describe, expect, it } from 'vitest'
import { maxDemoImageBytes, validateDemoImage } from './demo-media'

describe('validateDemoImage', () => {
  it('accepts a small image', () => {
    expect(validateDemoImage({ type: 'image/webp', size: 100_000 })).toBeNull()
  })

  it('rejects non-image files', () => {
    expect(validateDemoImage({ type: 'application/pdf', size: 10_000 })).toBe('Поддерживаются только изображения.')
  })

  it('rejects files that could exhaust browser demo storage', () => {
    expect(validateDemoImage({ type: 'image/png', size: maxDemoImageBytes + 1 })).toContain('512 КБ')
  })
})
