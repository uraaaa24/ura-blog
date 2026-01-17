'use client'

import type * as React from 'react'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={true}
    >
      {children}
    </NextThemesProvider>
  )
}
