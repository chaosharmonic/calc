let displayText = ''
let storedValue = null
let operating = true
let currentOperation = null

// keys
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.']

const operations = ['+', '-', '*', '/', '=']

const functionKeys = ['c', 'ce', 'backspace', 'negate']

const input = document.getElementById('input')
const memory = document.getElementById('memory')

const updateDisplayText = (target, text) => {
  target.innerText = `${text}`
}

const digit = (num) => {
  const dupeDecimal = num === '.' && displayText.includes('.')
  if (dupeDecimal) return null

  if (!operating) {
    displayText = num
    operating = true
  } else if (displayText.length < 12) {
    displayText += num
  }
  updateDisplayText(input, displayText)
}

const negate = () => {
  const isNegated = !displayText.startsWith('-')
  displayText = isNegated
    ? `-${displayText}`
    : displayText.slice(1)

  updateDisplayText(input, displayText)
}

const backspace = () => {
  const { length } = displayText
  displayText = displayText.slice(0, length - 1)

  updateDisplayText(input, displayText)
}

const ce = () => {
  displayText = ''
  updateDisplayText(input, displayText)
}

const clearMem = () => {
  storedValue = null
  currentOperation = null
  ce()
  updateDisplayText(memory, '')
}

const evaluate = () => {
  if (!storedValue) return null
  const num = Number(displayText)
  switch (currentOperation) {
    case '+':
      storedValue += num
      break
    case '-':
      storedValue -= num
      break
    case '*':
      storedValue *= num
      break
    case '/':
      storedValue /= num
      break
  }
  currentOperation = null
  updateDisplayText(memory, storedValue)
}

const divByZeroError = () => {
  updateDisplayText(input, 'DIV/0!')
  updateDisplayText(memory, '')

  setTimeout(function () {
    clearMem()
  }, 1500)
}

const finish = () => {
  const divByZero = !Number(displayText) && currentOperation === '/'
  divByZero
    ? divByZeroError()
    : evaluate()

  if (storedValue && !divByZero) {
    displayText = `${storedValue}`
    if (displayText.length > 12) displayText = displayText.slice(0, 12)

    updateDisplayText(input, displayText)
    updateDisplayText(memory, '')
    storedValue = null
    operating = false
  }
}

const applyOperator = (operation) => {
  if (operation !== '=') {
    !storedValue ? storedValue = Number(displayText) : evaluate()
    currentOperation = operation
    updateDisplayText(memory, `${storedValue} ${currentOperation}`)
    ce()
  } else { finish() }
}

const handleFnKey = (fn) => {
  switch (fn) {
    case 'c':
      clearMem()
      break
    case 'ce':
      ce()
      break
    case 'backspace':
      backspace()
      break
    case 'negate':
      negate()
      break
  }
}

for (const n of numbers) {
  const num = `${n}`
  const key = document.getElementById(num)
  key.addEventListener('click', () => digit(num))
}

for (const o of operations) {
  const key = document.getElementById(o)
  key.addEventListener('click', () => applyOperator(o))
}

for (const f of functionKeys) {
  const key = document.getElementById(f)
  key.addEventListener('click', () => handleFnKey(f))
}
