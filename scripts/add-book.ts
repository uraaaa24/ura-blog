import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { stdin, stdout } from 'node:process'
import { createInterface } from 'node:readline/promises'

type Book = {
  id: string
  title: string
  completedDate: string
  url: string
}

const DATA_PATH = join(process.cwd(), 'data', 'books.json')

const isValidDateParts = (year: number, month: number, day: number): boolean => {
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  )
}

const promptRequired = async (
  rl: ReturnType<typeof createInterface>,
  label: string,
  validate?: (value: string) => boolean
): Promise<string> => {
  while (true) {
    const answer = (await rl.question(`${label}: `)).trim()
    if (!answer) {
      stdout.write('⚠️  Value is required.\n')
      continue
    }
    if (validate && !validate(answer)) {
      stdout.write('⚠️  Value is invalid. Try again.\n')
      continue
    }
    return answer
  }
}

const promptNumber = async (
  rl: ReturnType<typeof createInterface>,
  label: string,
  min: number,
  max: number
): Promise<number> => {
  while (true) {
    const answer = (await rl.question(`${label}: `)).trim()
    if (!answer) {
      stdout.write('⚠️  Value is required.\n')
      continue
    }
    if (!/^\d+$/.test(answer)) {
      stdout.write('⚠️  Please enter numbers only.\n')
      continue
    }

    const value = Number.parseInt(answer, 10)
    if (value < min || value > max) {
      stdout.write(`⚠️  Please enter a value between ${min} and ${max}.\n`)
      continue
    }
    return value
  }
}

const main = async (): Promise<void> => {
  const raw = await readFile(DATA_PATH, 'utf8')
  const books = JSON.parse(raw) as Book[]
  const maxId = books.reduce((current, book) => {
    const asNumber = Number.parseInt(book.id, 10)
    return Number.isNaN(asNumber) ? current : Math.max(current, asNumber)
  }, 0)

  const rl = createInterface({ input: stdin, output: stdout })
  try {
    stdout.write("📚 Let's add a completed book\n")
    stdout.write('----------------------\n')
    const title = await promptRequired(rl, '📖 Title')

    const year = await promptNumber(rl, '🗓️  Completed Year (YYYY)', 1900, 2100)
    const month = await promptNumber(rl, '🗓️  Completed Month (1-12)', 1, 12)
    const day = await promptNumber(rl, '🗓️  Completed Day (1-31)', 1, 31)
    if (!isValidDateParts(year, month, day)) {
      stdout.write('⚠️  The date combination is invalid. Please start over!\n')
      return
    }
    const completedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    const url = await promptRequired(rl, '🔗 URL')

    const nextBook: Book = {
      id: String(maxId + 1),
      title,
      completedDate,
      url
    }

    stdout.write('\n✨ Preview\n\n')
    stdout.write(`${JSON.stringify(nextBook, null, 2)}\n`)

    const confirm = (await rl.question('\n💾 Save? (y/n) [y]: ')).trim()
    if (confirm && confirm.toLowerCase() !== 'y') {
      stdout.write('🧹 Canceled.\n')
      return
    }

    books.push(nextBook)
    await writeFile(DATA_PATH, `${JSON.stringify(books, null, 2)}\n`, 'utf8')
    stdout.write('✅ Saved! Added to data/books.json.\n')
  } finally {
    rl.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
