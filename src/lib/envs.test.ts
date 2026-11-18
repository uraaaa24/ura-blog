import { afterEach, describe, expect, it, vi } from 'vitest'

const loadBaseUrl = async () => {
  vi.resetModules()
  const { BASE_URL } = await import('./envs')
  return BASE_URL
}

describe('BASE_URL', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('falls back to localhost when no origin is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_APP_BASE_URL', '')

    expect(await loadBaseUrl()).toBe('http://localhost:3000')
  })

  it('uses the configured origin without trailing slashes', async () => {
    vi.stubEnv('NEXT_PUBLIC_APP_BASE_URL', 'https://example.com//')

    expect(await loadBaseUrl()).toBe('https://example.com')
  })
})
