import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const base = process.env.MARKETING_URL ?? 'http://127.0.0.1:3000'
const dir = path.resolve('docs/previews/site')
await mkdir(dir, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ reducedMotion: 'reduce' })
const errors = []
page.on('pageerror', error => errors.push(error.message))
const report = []
async function capture(route, name, width, height) {
  await page.setViewportSize({ width, height })
  const response = await page.goto(base + route, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.locator('img').evaluateAll(images => images.forEach(image => { image.loading = 'eager' }))
  await page.evaluate(async () => { await Promise.all(Array.from(document.images, image => image.decode().catch(() => {}))) })
  const details = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: innerWidth,
    h1: document.querySelectorAll('h1').length,
    brokenImages: Array.from(document.images).filter(image => !image.naturalWidth).map(image => image.src),
    missingAnchors: Array.from(document.querySelectorAll('a[href]')).map(link => new URL(link.href, location.href)).filter(url => url.origin === location.origin && url.pathname === location.pathname && url.hash && !document.getElementById(decodeURIComponent(url.hash.slice(1)))).map(url => url.hash),
    overflow: Array.from(document.querySelectorAll('main *')).filter(element => { const box = element.getBoundingClientRect(); return box.width > 0 && (box.right > innerWidth + 2 || box.left < -2) }).slice(0,8).map(element => ({ tag: element.tagName, class: element.className })),
  }))
  report.push({ route, width, status: response?.status(), ...details })
  await page.screenshot({ path: path.join(dir, name + '.png'), fullPage: true })
}
await capture('/', 'home-2560', 2560, 1440)
await capture('/uslugi', 'services-2560', 2560, 1440)
await capture('/uslugi/keramogranit', 'service-2560', 2560, 1440)
await capture('/raboty', 'works-2560', 2560, 1440)
await capture('/raboty/seraya-vannaya', 'work-2560', 2560, 1440)
await capture('/', 'home-1440', 1440, 900)
await capture('/', 'home-1366', 1366, 1024)
await capture('/', 'home-1024', 1024, 1366)
await capture('/', 'home-768', 768, 1024)
await capture('/', 'home-390', 390, 844)
await capture('/', 'home-430', 430, 932)
await capture('/', 'home-320', 320, 568)
await capture('/uslugi/keramogranit', 'service-390', 390, 844)
await capture('/raboty/seraya-vannaya', 'work-390', 390, 844)
await capture('/uslugi', 'services-390', 390, 844)
await capture('/raboty', 'works-390', 390, 844)
await page.goto(base + '/', { waitUntil:'networkidle' })
await page.getByRole('button', {name:'Меню', exact:true}).click()
await page.getByRole('navigation', {name:'Мобильная навигация'}).getByRole('link', {name:'Услуги',exact:true}).click()
await page.waitForURL('**/uslugi')
report.push({ scenario:'mobile menu navigation', ok:true })
await page.goto(base + '/raboty', { waitUntil:'networkidle' })
await page.getByRole('button',{name:'Фартуки',exact:true}).click()
report.push({ scenario:'project filter', cards:await page.locator('a[href^="/raboty/"]').count() })
await page.goto(base + '/', {waitUntil:'networkidle'})
const before = await page.locator('#calculator svg[role="img"]').getAttribute('aria-label')
await page.getByRole('button',{name:'60 × 60',exact:true}).click()
await page.getByRole('button',{name:'Со смещением',exact:true}).click()
const after = await page.locator('#calculator svg[role="img"]').getAttribute('aria-label')
report.push({scenario:'calculator', before, after, ok:before!==after})
await page.getByRole('button',{name:'Прихожая',exact:true}).click()
await page.getByLabel('Длина помещения в метрах').fill('3.5')
await page.getByLabel('Ширина помещения в метрах').fill('2')
await page.getByLabel('Ширина помещения в метрах').blur()
const floorArea = await page.locator('#calculator').innerText()
report.push({scenario:'room and dimensions',ok:floorArea.includes('7,0 м²') && (await page.locator('#calculator svg[role="img"]').getAttribute('aria-label')).includes('Прихожая')})
const form = page.locator('#contacts form')
await form.getByLabel('Ваше имя').fill('Проверка макета')
await form.getByLabel('Телефон').fill('+7 900 000-00-00')
await form.getByRole('button',{name:'Обсудить проект'}).click()
report.push({scenario:'placeholder form',ok:(await form.getByRole('status').innerText()).includes('Это макет формы')})
const routes=['/','/uslugi','/raboty','/uslugi/vannaya','/uslugi/keramogranit','/uslugi/pol-i-steny','/uslugi/fartuk','/uslugi/zapil-45','/uslugi/mozaika','/raboty/seraya-vannaya','/raboty/vannaya-pod-mramor','/raboty/krupnyy-format','/raboty/uzornyy-fartuk']
routes.push('/raboty/uzornyy-pol','/raboty/sinyaya-nisha')
for(const route of routes){const response=await page.request.get(base+route);report.push({route,status:response.status()})}
const missing=await page.request.get(base+'/uslugi/not-a-service')
report.push({scenario:'unknown service',status:missing.status()})
const missingWork=await page.request.get(base+'/raboty/not-a-project')
report.push({scenario:'unknown work',status:missingWork.status()})
await writeFile(path.join(dir,'report.json'),JSON.stringify({report,errors},null,2))
console.log(JSON.stringify({report,errors},null,2))
await browser.close()
if(errors.length || report.some(item=>item.ok===false || (item.h1!==undefined && (item.h1!==1 || item.brokenImages.length || item.missingAnchors.length || item.width>item.viewport+2)))) process.exitCode=1
