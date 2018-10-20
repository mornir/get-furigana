const getFuriganaButton = document.querySelector('#get-furigana')
const textArea = document.querySelector('#furigana-area')
const resultOutputParagraph = document.querySelector('#result')
const correctOutputArea = document.querySelector('#correct-ouput')
const myWrapper = document.querySelector('#my-wrapper')
const copyToClipboardButton = document.querySelector('#copyToClipboard')

let isKuroshiroReady = false

copyToClipboardButton.hidden = true

if (navigator.clipboard) {
  copyToClipboardButton.hidden = false
}

kuroshiro.init(
  {
    dicPath: 'dict',
  },
  err => {
    if (err) {
      console.error(err)
    } else {
      console.log('kuroshiro is ready')
      isKuroshiroReady = true
      getFuriganaButton.disabled = !isKuroshiroReady
      getFuriganaButton.classList.remove('opacity-50', 'cursor-not-allowed')
    }
  }
)

function getFurigana() {
  if (!isKuroshiroReady) return
  const kanji = textArea.value
  if (!kanji) return

  const result = kuroshiro.convert(kanji, {
    mode: 'furigana',
    to: 'hiragana',
  })

  resultOutputParagraph.innerHTML = result

  correctOutputArea.value = result

  myWrapper.style.display = 'contents'
}

function correctOutput() {
  resultOutputParagraph.innerHTML = this.value
}

async function copyToClipboard() {
  if (!navigator.clipboard) return
  try {
    await navigator.clipboard.writeText(correctOutputArea.value)
    copyToClipboardButton.textContent = 'Copied!'
    setTimeout(
      () => (copyToClipboardButton.textContent = 'Copy to clipboard'),
      2000
    )
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

getFuriganaButton.addEventListener('click', getFurigana)

correctOutputArea.addEventListener('input', correctOutput)

copyToClipboardButton.addEventListener('click', copyToClipboard)
