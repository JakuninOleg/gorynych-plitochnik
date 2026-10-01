const state = { room: 'bath', tile: 60 }
const roomFactor = { bath: 1, wc: 0.82, kitchen: 0.72 }
const tileFactor = { 30: 0, 60: 260, 120: 620 }
const number = new Intl.NumberFormat('ru-RU')

function updateEstimate() {
  const length = Math.max(1, Number(document.querySelector('#room-length').value) || 1)
  const width = Math.max(1, Number(document.querySelector('#room-width').value) || 1)
  const floor = length * width
  const walls = 2 * (length + width) * 2.4
  const estimate = Math.round((floor * 1700 + walls * (1350 + tileFactor[state.tile]) + 5000) * roomFactor[state.room] / 1000) * 1000
  document.querySelector('#estimate-value').textContent = `${number.format(estimate)} ₽`
  document.querySelectorAll('.measure')[0].textContent = `${number.format(length)} м`
  document.querySelectorAll('.measure')[1].textContent = `${number.format(width)} м`
  const pattern = document.querySelector('#floorTiles')
  const scale = state.tile === 30 ? 0.75 : state.tile === 120 ? 1.44 : 1
  pattern.setAttribute('patternTransform', `scale(${scale})`)
}

for (const button of document.querySelectorAll('[data-room]')) {
  button.addEventListener('click', () => {
    state.room = button.dataset.room
    document.querySelectorAll('[data-room]').forEach(item => item.classList.toggle('selected', item === button))
    updateEstimate()
  })
}
for (const button of document.querySelectorAll('[data-tile]')) {
  button.addEventListener('click', () => {
    state.tile = Number(button.dataset.tile)
    document.querySelectorAll('[data-tile]').forEach(item => item.classList.toggle('selected', item === button))
    updateEstimate()
  })
}
document.querySelectorAll('.field-row input').forEach(input => input.addEventListener('input', updateEstimate))
updateEstimate()
