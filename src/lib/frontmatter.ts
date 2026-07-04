type FrontmatterValue = string | boolean | string[]

type ParsedFrontmatter = {
  data: Record<string, FrontmatterValue>
  content: string
}

const parseScalar = (value: string): string | boolean => {
  const trimmed = value.trim()

  if (trimmed === 'true') return true
  if (trimmed === 'false') return false

  return trimmed.replace(/^(['"])(.*)\1$/, '$2')
}

const parseData = (source: string) => {
  const data: Record<string, FrontmatterValue> = {}
  const lines = source.split(/\r?\n/)
  let currentArrayKey: string | null = null

  for (const line of lines) {
    const arrayItem = line.match(/^\s*-\s+(.*)$/)
    if (arrayItem && currentArrayKey) {
      const current = data[currentArrayKey]
      data[currentArrayKey] = Array.isArray(current)
        ? [...current, String(parseScalar(arrayItem[1]))]
        : [String(parseScalar(arrayItem[1]))]
      continue
    }

    const field = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/)
    if (!field) {
      currentArrayKey = null
      continue
    }

    const [, key, value = ''] = field
    if (value.trim() === '') {
      data[key] = []
      currentArrayKey = key
      continue
    }

    data[key] = parseScalar(value)
    currentArrayKey = null
  }

  return data
}

export const parseFrontmatter = (source: string): ParsedFrontmatter => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)

  if (!match) {
    return { data: {}, content: source }
  }

  return {
    data: parseData(match[1]),
    content: source.slice(match[0].length)
  }
}

export const getFrontmatterString = (
  data: Record<string, FrontmatterValue>,
  key: string,
  fallback = ''
) => {
  const value = data[key]
  return typeof value === 'string' ? value : fallback
}

export const getFrontmatterStringArray = (
  data: Record<string, FrontmatterValue>,
  key: string
) => {
  const value = data[key]
  return Array.isArray(value) ? value : []
}
