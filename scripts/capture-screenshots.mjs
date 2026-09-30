import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const baseURL = 'http://127.0.0.1:3107'
const outputDir = path.resolve('.design/oj-cms/screenshots')
await mkdir(outputDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 })

async function capture(route, filename, width, height) {
  await page.setViewportSize({ width, height })
  await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded' })
  await page.getByRole('heading', { level: 1 }).waitFor()
  await page.evaluate(() => document.fonts.ready)
  await page.locator('img').evaluateAll(images => images.forEach(image => { image.loading = 'eager' }))
  await page.evaluate(async () => { await Promise.all(Array.from(document.images, image => image.decode())) })
  await page.screenshot({ path: path.join(outputDir, filename), fullPage: true })
}

await page.goto(`${baseURL}/admin`)
await page.evaluate(() => window.localStorage.clear())
await page.reload({ waitUntil: 'domcontentloaded' })

await capture('/admin', 'review-dashboard-desktop-1280.png', 1280, 800)
await capture('/admin', 'review-dashboard-reference-1536.png', 1536, 1024)
await capture('/admin', 'review-dashboard-tablet-768.png', 768, 1024)
await capture('/admin', 'review-dashboard-mobile-375.png', 375, 812)

await capture('/admin/pages/home', 'review-editor-desktop-1280.png', 1280, 800)
await capture('/admin/pages/home', 'review-editor-tablet-768.png', 768, 1024)
await capture('/admin/pages/home', 'review-editor-mobile-375.png', 375, 812)

await capture('/admin/media', 'review-media-desktop-1280.png', 1280, 800)

await page.setViewportSize({ width: 1280, height: 800 })
await page.goto(`${baseURL}/admin/pages/home`, { waitUntil: 'domcontentloaded' })
await page.getByLabel('Заголовок').fill('Проверка состояния ошибки')
await page.getByText('Демо-сценарии', { exact: true }).click()
await page.getByRole('checkbox', { name: 'Сымитировать ошибку сохранения' }).check()
await page.getByRole('button', { name: 'Сохранить черновик' }).click()
await page.getByText('Черновик не сохранён', { exact: true }).waitFor()
await page.screenshot({ path: path.join(outputDir, 'review-editor-error-desktop-1280.png'), fullPage: true })

await page.goto(`${baseURL}/admin`, { waitUntil: 'domcontentloaded' })
await page.getByRole('button', { name: 'Меню профиля' }).click()
await page.getByRole('combobox', { name: 'Роль' }).first().selectOption('editor')
await page.goto(`${baseURL}/admin/users`, { waitUntil: 'domcontentloaded' })
await page.screenshot({ path: path.join(outputDir, 'review-permission-denied-desktop-1280.png'), fullPage: true })

await browser.close()
