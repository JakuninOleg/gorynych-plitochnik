# Главная: иллюстрированные главы — 01.10.2026

## Конструкция

После блока реальных работ: калькулятор → запил 45° → витрина услуг → Гор работает лично → отзывы → заявка. Верхняя сцена и футер сохранены.

Каждая глава использует общий StoryChapter: HTML поверх рваного пергамента, отдельные прозрачные рисунки слева и справа. Центральная сетка совпадает с работами и hero. На десктопе картинки прижаты к внешним краям окна; высота ограничена главой. Разделы перекрываются на 2.3rem, чтобы сократить просвет между бумажными краями. Внутренние страницы продолжают использовать свои прежние компоненты.

Боковой мир меняется по смыслу: чертёжный стол / образцы → инструменты / точный стык → керамическая лестница / ниша → личный верстак / уютный дом → письма / сургуч → почтовый ящик / свет у входа. Петербург остаётся в верхних сценах, ниже не повторяется.

При ширине до 1100px боковой декор скрыт. На планшете 701–900px калькулятор складывается в большую схему над двумя колонками управления; на телефоне управление и содержимое идут одной колонкой. Витрина услуг до 480px показывает крупные арки по одной: фотография и подпись остаются читаемыми.

## Калькулятор

Новая SVG-комната построена в согласованной изометрии: две стены, пол, архитектурный портал, деревянная мебель, латунь и сантехника. Отдельные композиции для ванной, кухни и прихожей. Паттерны SVG меняют формат, цвет/фактуру, ориентацию, смещение и цвет шва. Для синей керамики есть растительный орнамент. Размеры помещения пересчитывают площадь и демонстрационную стоимость. Выборы имеют aria-pressed; результат объявляется через aria-live.

Формула остаётся демонстрационной: пол = длина × ширина; стены = периметр × высота минус 1.8м²; ориентир 1600₽/м². Отправка раскладки и формы — локальные заглушки. CMS, сообщения и доставка заявок не подключены.

## Остальные разделы

- Запил: новый Гор с тремя головами и двумя руками обрабатывает кромку у верстака. На фартуке золотая корона; рядом образец угла и реальная ссылка на страницу услуги.
- Услуги: шесть фотографий внутри новой фактурной каменной арки. Открытие арки прозрачное; фотографии подгоняются CSS без изменения исходников. Подписи — HTML на бумажных лентах.
- Гор: оригинальное фото Георгия, бумажная рамка, подпись, сургуч с короной и личный рассказ.
- Отзывы: отдельные письма, типографика PT Serif, звёзды и сургучные печати. Тексты — демонстрационное наполнение.
- Заявка: бумажная форма, добавление фото, единая красная кнопка, контактные ссылки; локальное уведомление о макете после отправки.

## Генерация и медиа

Все новые растровые ассеты созданы встроенным image_gen по присланному референсу «концепт_горыныч.png». PNG-оригиналы сохранены в локальном каталоге генераций Codex; опубликованы WebP quality94 / alphaQuality100 без увеличения разрешения. Next Image для фотографий/иллюстраций выбирает размер по экрану, декоративные изображения загружаются лениво. Для новых крупных иллюстраций разрешено quality90; стандартное quality75 сохранено.

| Ассет в public/images | Размер исходника | WebP | Имя PNG-оригинала |
|---|---|---|---|
| `calculator-left-v1.webp` | 1024 × 1536 | 517 KiB | `exec-630013b6-b378-4e36-9bd2-5134c997122f.png` |
| `calculator-right-v1.webp` | 1024 × 1536 | 578 KiB | `exec-c88db8ca-8e33-43c1-84ad-0d731d0de64b.png` |
| `craft-dragon-v1.webp` | 1448 × 1086 | 638 KiB | `exec-64424ba2-4b30-4bb3-8864-587796c015b0.png` |
| `story-parchment-v2.webp` | 1774 × 887 | 266 KiB | `exec-0ea4d4ba-4731-414f-ab5e-76717e67c3b7.png` |
| `craft-tools-left-v1.webp` | 1024 × 1536 | 383 KiB | `exec-e8da5e56-7c60-40f2-98cc-65ebd185ea8b.png` |
| `craft-joint-right-v1.webp` | 1024 × 1536 | 489 KiB | `exec-06705f6b-6e6f-4661-89af-918d2caafa2c.png` |
| `services-stair-left-v1.webp` | 1024 × 1536 | 553 KiB | `exec-497e028b-8990-47e7-acbf-89171fea3bde.png` |
| `services-niche-right-v1.webp` | 1024 × 1536 | 601 KiB | `exec-d8bc4f6f-5f35-4069-b03b-db55836c6eff.png` |
| `master-workbench-left-v1.webp` | 1024 × 1536 | 482 KiB | `exec-6202e917-84e0-42d9-81f2-d4a4bf882e3e.png` |
| `master-home-right-v1.webp` | 1024 × 1536 | 424 KiB | `exec-e3ee459e-b6cb-492b-bb1f-d97c1b29b458.png` |
| `letters-left-v1.webp` | 1024 × 1536 | 484 KiB | `exec-300d9cfe-c8f8-44f3-8e57-663a5b51a367.png` |
| `letters-right-v1.webp` | 1024 × 1536 | 473 KiB | `exec-0e903751-c523-4e9b-be60-e8aacf9539f4.png` |
| `contact-post-left-v1.webp` | 1024 × 1536 | 401 KiB | `exec-2374d191-70f3-4fb4-bedf-6808e49ddbc5.png` |
| `contact-lantern-right-v1.webp` | 1024 × 1536 | 325 KiB | `exec-35979cf2-1c98-40be-bf93-263140ddd952.png` |
| `service-arch-v1.webp` | 1448 × 1086 | 381 KiB | `exec-fc8374e0-83d6-450a-be06-9eab2d93310f.png` |

### Задания для повторной генерации

Общая основа каждого задания: sharp crisp traditional ink + watercolor, warm cream limestone/oak/brass/burgundy/blue ceramics, soft late-afternoon light, true transparent background, no glitter speckles/no plastic/no haze, no text except dragon's small speech scroll. Reference supplies the character and art style, not a full-page layout. Side assets are portrait 2:3, attached to the outer edge, inner half mostly transparent. No repeated city panoramas, no ivy wall or giant arches.

- Calculator left: LEFT edge drafting workbench, renovation plans, brass dividers, copper lamp, ceramic samples, faint architectural sketches; open right half.
- Calculator right: RIGHT edge oak sample cabinet, gray/sand/ivory/navy ceramic samples, sample book, leaded window and small plant; open left half.
- Craft dragon: one body, exactly three distinct orange-red heads and two connected arms, black apron with gold crown; left hand holds a clamped tile, right hand manually finishes its edge with abrasive block; oak bench, finished miter corner and drawings; small speech scroll «Углы — моя гордость».
- Craft left: LEFT edge hanging square/angle gauge/red tile nippers/linen apron, stacked bevelled tiles and corner studies on a stone counter.
- Craft right: RIGHT edge tiled corner sample, brass square and magnifier, sketchpaper and blue ceramic fragment on a stone corbel.
- Services left: LEFT edge fairy-tale limestone stairway with blue-white ceramic risers, wrought-iron handrail, tile niches and a faint turret sketch.
- Services right: RIGHT edge tall tiled niche, oak shelves with ceramic vases and linen, stone countertop/blue backsplash, narrow leaded window.
- Master left: LEFT edge personal workshop, oak workbench, hanging black apron with gold crown, red spirit level, tools, cream plans, tile samples and earthenware mug; no person.
- Master right: RIGHT edge cozy home, slim golden leaded window, linen window seat, blue ceramic cup, herbs, brass key, finished tiled step; no person or city panorama.
- Reviews left: LEFT edge oak correspondence desk, cream letters tied with burgundy ribbon, crown wax seals, quill/ink/candle, blue ceramic cup and carved wooden pigeon.
- Reviews right: RIGHT edge correspondence cabinet with cream envelopes, guestbook, brass bell, seal/stamp, vase of blue cornflowers; airy open left half.
- Contact left: LEFT edge burgundy brass mailbox on narrow cream stone post, envelopes, oak ledge with rolled plan/pencil/photo cards, wildflowers and tile step.
- Contact right: RIGHT edge narrow slice of dark oak door and stone jamb, warm brass lantern, blue-white ceramic threshold, small stool/linen/keys and rosemary.
- Parchment: blank broad light cream antique sheet, restrained irregular worn edges, no rolled/folded corners, no illustrations, no text; intended for nine-slice background.
- Service arch: symmetrical frontal limestone arch frame, landscape4:3, transparent outside AND in the central arched opening; sharp handpainted worn stone, block joints, gold trim, small blue ceramic ornaments on capitals; no ivy, no letters, thin stone threshold.

## Проверка

Сборка, ESLint и TypeScript. Браузер: 320, 390, 430, 768, 1024, 1101, 1440 и 2560px. Проверены плитка/цвет/смещение, переключение трёх комнат, размеры и площадь, локальные действия двух форм и переходы на шесть услуг. Отчёт: previews/chapters/report.json. Визуальные снимки всей страницы и отдельных глав: previews/chapters. Для desktop использованы снимки шириной2560px, для телефона390px и планшета768px.

Презентационный макет: фото работ, отзывы и формулы будут заменены при наполнении CMS. Футер оставлен для отдельной итерации.
