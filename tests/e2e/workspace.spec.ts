import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('search finds documents and supports a keyboard transition into the editor', async ({ page }) => {
  await page.goto('/admin')
  const search = page.getByRole('textbox', { name: 'Поиск по контенту' })
  await search.fill('контакты')
  const results = page.getByRole('region', { name: 'Результаты поиска' })
  await expect(results.getByRole('link')).toHaveCount(1)
  await search.press('ArrowDown')
  await expect(results.getByRole('link')).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/admin\/pages\/contacts$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Контакты')
})

test('search has an empty state and escape restores focus', async ({ page }) => {
  await page.goto('/admin')
  const search = page.getByRole('textbox', { name: 'Поиск по контенту' })
  await search.fill('нет-такого-документа')
  await expect(page.getByRole('status')).toHaveText('Ничего не найдено. Попробуйте другое название.')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('region', { name: 'Результаты поиска' })).toHaveCount(0)
  await expect(search).toBeFocused()
})

test('sidebar collapses and restores, collections expose working links', async ({ page }) => {
  await page.goto('/admin')
  await page.getByRole('button', { name: 'Свернуть боковую панель' }).click()
  await expect(page.getByRole('button', { name: 'Развернуть боковую панель' })).toBeVisible()
  await page.getByRole('button', { name: 'Развернуть боковую панель' }).click()
  await page.getByRole('button', { name: 'Коллекции' }).click()
  await page.getByRole('navigation', { name: 'Основная навигация' }).getByRole('link', { name: 'Новости', exact: true }).click()
  await expect(page).toHaveURL(/\/admin\/news$/)
})

test('mobile navigation traps focus, closes with escape and opens a collection', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/admin')
  await page.getByRole('button', { name: 'Открыть меню' }).click()
  const dialog = page.getByRole('dialog', { name: 'Навигация', exact: true })
  await expect(dialog.getByRole('button', { name: 'Закрыть меню' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('link', { name: 'OJ CMS — обзор' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('link', { name: /Демо-интерфейс/ })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Открыть меню' })).toBeFocused()
  await page.getByRole('button', { name: 'Открыть меню' }).click()
  await dialog.getByRole('button', { name: 'Коллекции' }).click()
  await dialog.getByRole('link', { name: 'Страницы', exact: true }).click()
  await expect(page).toHaveURL(/\/admin\/pages$/)
  await expect(dialog).toHaveCount(0)
})

test('dashboard does not expose a fictional public site, help and workspace settings are usable', async ({ page }) => {
  await page.goto('/admin')
  await expect(page.getByText('Предпросмотр сайта', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Открыть сайт' })).toHaveCount(0)
  await page.getByRole('button', { name: 'Действия: Главная страница' }).click()
  await page.getByRole('link', { name: 'Редактировать', exact: true }).click()
  await expect(page).toHaveURL(/\/admin\/pages\/home$/)
  await page.goto('/admin/help')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Всё под рукой')
  await page.getByRole('link', { name: 'Открыть медиатеку' }).click()
  await expect(page).toHaveURL(/\/admin\/media$/)
  await page.goto('/admin/preferences')
  await page.getByRole('button', { name: 'Сбросить демо-данные' }).click()
  await page.getByRole('button', { name: 'Отмена' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('legacy public and preview routes return visitors to the CMS demonstration', async ({ page }) => {
  await page.goto('/site/home')
  await expect(page).toHaveURL(/\/admin$/)
  await page.goto('/preview/home')
  await expect(page).toHaveURL(/\/admin$/)
})

for (const width of [375, 768, 1280, 1536]) {
  test(`dashboard fits ${width}px and its images load`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1024 })
    await page.goto('/admin')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.locator('img').evaluateAll((images) => images.forEach((image) => { if (image instanceof HTMLImageElement) image.loading = 'eager' }))
    await page.evaluate(async () => { await Promise.all(Array.from(document.images, (image) => image.decode())) })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    expect(await page.evaluate(() => Array.from(document.images).every((image) => image.naturalWidth > 0))).toBe(true)
  })
}

test('mobile dashboard and profile controls pass automated accessibility checks', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/admin')
  await page.getByRole('button', { name: 'Меню профиля' }).click()
  const result = await new AxeBuilder({ page }).analyze()
  expect(result.violations.map(({ id, nodes }) => ({ id, count: nodes.length }))).toEqual([])
})
