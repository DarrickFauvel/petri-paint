const canvas = document.querySelector('.app__canvas')
const toolbarBtnIncrease = document.querySelector('.toolbar__button_increase')
const toolbarBtnDecrease = document.querySelector('.toolbar__button_decrease')
const toolbarInputSize = document.querySelector('.toolbar__input_size')
const toolbarColorChipCurrent = document.querySelector(
  '.toolbar__color_chip--current'
)
const toolbarBtnFill = document.querySelector('.toolbar__button_fill')
const toolbarBtnClear = document.querySelector('.toolbar__button_clear')

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  'black',
  'white'
]

const ctx = canvas.getContext('2d')

let brushSize = 5
let brushColor = 'black'
let currentTool = 'brush'
let isPressed = false
let x
let y

const drawCircle = (x, y) => {
  ctx.beginPath()
  ctx.arc(x, y, brushSize, 0, Math.PI * 2)
  ctx.fillStyle = brushColor
  ctx.fill()
}

const drawLine = (x1, y1, x2, y2) => {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = brushColor
  ctx.lineWidth = brushSize * 2
  ctx.stroke()
}

toolbarColorChipCurrent.style.backgroundColor = brushColor

const renderColorPalette = () => {
  const colorPalette = document.querySelector('.color-palette')

  let renderedHtml = ''
  colors.forEach((color) => {
    renderedHtml += `
  <div class="tooltip">
    <div class="color-chip" style="background-color: ${color}"></div>
    <span class="tooltip_text">${color}</span>
  </div>
  `
  })

  console.log(renderedHtml)
  colorPalette.innerHTML = renderedHtml
  const colorChip = document.querySelectorAll('.color-chip')

  colorChip.forEach((chip) =>
    chip.addEventListener('click', (e) => {
      changeBrushColor(e.target.style.backgroundColor)
      toolbarColorChipCurrent.style.backgroundColor = brushColor
    })
  )
}

const changeBrushSize = (action) => {
  if (action === 'increase') {
    if (brushSize >= 10) return
    brushSize++
    toolbarInputSize.value = brushSize
  }
  if (action === 'decrease') {
    if (brushSize <= 1) return
    brushSize--
    toolbarInputSize.value = brushSize
  }
}

const changeBrushColor = (selectedColor) => {
  brushColor = selectedColor
}

const resetApp = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

toolbarBtnDecrease.addEventListener('click', () => changeBrushSize('decrease'))
toolbarBtnIncrease.addEventListener('click', () => changeBrushSize('increase'))
toolbarInputSize.addEventListener('change', (e) => (brushSize = e.target.value))

toolbarBtnClear.addEventListener('click', resetApp)

canvas.addEventListener('mousedown', (e) => {
  isPressed = true
  x = e.offsetX
  y = e.offsetY
})

canvas.addEventListener('mouseup', (e) => {
  isPressed = false
  x = undefined
  y = undefined
})

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX
    const y2 = e.offsetY
    drawCircle(x2, y2)
    drawLine(x, y, x2, y2)
    x = x2
    y = y2
  }
})

renderColorPalette()
resetApp()
