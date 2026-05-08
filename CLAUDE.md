# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```
Uses Next.js with Turbopack for fast development mode.

**Build and production:**
```bash
npm run build    # Build for production
npm start        # Start production server
```

**Code quality:**
```bash
npm run lint       # Run ESLint
npm run lint:fix   # Auto-fix linting issues
npm run watch      # TypeScript compiler in watch mode
```

**Testing:**
```bash
npm test          # Run Vitest tests
npm test:ui       # Run Vitest with UI
```

**Storybook:**
```bash
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build Storybook for production
```

## Architecture Overview

This is a Japanese personal blog built with Next.js 15 App Router following feature-based
architecture patterns inspired by [Bulletproof React](https://github.com/alan2207/bulletproof-react).

### Feature-Based Architecture

The codebase follows a strict feature-based organization with unidirectional dependencies:

```
src/
├── app/                    # Next.js App Router (composition only)
├── features/               # Feature modules (self-contained)
│   ├── posts/             # Blog posts feature
│   ├── books/             # Reading list feature
│   └── about/             # About page feature
├── components/            # Shared components
│   ├── ui/               # UI primitives (buttons, inputs, markdown)
│   └── layouts/          # Layout components (header, footer)
├── lib/                   # Configured libraries
├── hooks/                 # Shared React hooks
├── types/                 # Shared TypeScript types
└── utils/                 # Shared utility functions
```

**Key Principles:**
- **Unidirectional dependency flow**: `app → features → shared (components, lib, hooks, utils)`
- **No cross-feature imports**: Features cannot import from other features
- **Self-contained features**: Each feature has its own api/, components/, types/, utils/
- **Enforced boundaries**: ESLint rules prevent architectural violations

### Feature Structure

Each feature follows this structure:

```
features/[feature-name]/
├── api/              # Data fetching and mutations (Server Components)
├── components/       # Feature-specific components
├── types/           # Feature-specific TypeScript types
└── utils/           # Feature-specific utilities
```

**Example: Posts Feature**
```typescript
// features/posts/api/get-posts.ts
export const getPosts = cache(async (): Promise<Post[]> => {
  // Data fetching logic
})

// app/posts/page.tsx
import { getPosts } from '@/features/posts/api/get-posts'
import PostsPageContent from '@/features/posts/components/posts-page-content'

export default async function PostsPage() {
  const posts = await getPosts()
  return <PostsPageContent posts={posts} />
}
```

### Content Management

- **Local posts**: Markdown files in `/contents/` with frontmatter (title, date, tags, etc.)
- **External posts**: Fetched from Zenn RSS feed and normalized
- **Data fetching**: Uses React's `cache()` API for Server Components request deduplication
- **Post processing**: Markdown parsing with gray-matter, image optimization, TOC generation

### Shared Components

**UI Components** (`components/ui/`):
- Markdown rendering components (`markdown/`)
- Form inputs, buttons, theme toggle
- Social links, share button

**Layout Components** (`components/layouts/`):
- Header, footer, section wrappers
- Breadcrumbs, page headers, scroll-to-top

### Styling

- **CSS Framework**: Tailwind CSS with custom configuration
- **Typography**: Zen Kaku Gothic New font for Japanese text
- **Dark Mode**: Theme toggle with system preference detection
- **Responsive**: Mobile-first design with Tailwind breakpoints

### Environment Configuration
- Google Analytics integration via `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Image optimization configured for CDN assets (cdn.jsdelivr.net)
- TypeScript with path aliases (`@/*` maps to `src/*`)

### Testing Setup
- Vitest with jsdom environment for React component testing
- Testing Library for component interactions
- Global test setup in `vitest.setup.ts`

## Development Guidelines

### Import Rules

The architecture enforces these import rules via ESLint:

**✅ Allowed:**
```typescript
// App routes can import from features and shared
import { getPosts } from '@/features/posts/api/get-posts'
import Section from '@/components/layouts/section'

// Features can import from shared layers
import { Heading1 } from '@/components/ui/heading'
import { formatDate } from '@/lib/date'

// Features can import from within themselves
import { Post } from '../types'
import { processMarkdown } from '../utils/process-markdown'
```

**❌ Forbidden:**
```typescript
// Cross-feature imports
import { getBooks } from '@/features/books/api/get-books' // In posts feature

// Features importing from app
import Component from '@/app/_components/something' // In any feature

// Shared layers importing from features or app
import { Post } from '@/features/posts/types' // In shared lib/components
```

### Creating New Features

When adding a new feature:

1. **Create the structure:**
   ```bash
   mkdir -p src/features/[feature-name]/{api,components,types,utils}
   ```

2. **Define types first:**
   ```typescript
   // features/[feature-name]/types/index.ts
   export type FeatureData = {
     // ...
   }
   ```

3. **Create API layer with cache():**
   ```typescript
   // features/[feature-name]/api/get-data.ts
   import { cache } from 'react'

   export const getData = cache(async () => {
     // Fetching logic
   })
   ```

4. **Build components:**
   ```typescript
   // features/[feature-name]/components/feature-content.tsx
   import type { FeatureData } from '../types'

   export default function FeatureContent({ data }: { data: FeatureData }) {
     return <div>{/* ... */}</div>
   }
   ```

5. **Compose in app routes:**
   ```typescript
   // app/[feature-name]/page.tsx
   import { getData } from '@/features/[feature-name]/api/get-data'
   import FeatureContent from '@/features/[feature-name]/components/feature-content'

   export default async function FeaturePage() {
     const data = await getData()
     return <FeatureContent data={data} />
   }
   ```

### Server Components Best Practices

- **Use React's `cache()`** for data fetching instead of React Query
- **Keep business logic in features** not in app routes
- **Minimize 'use client'** directives - only for interactivity
- **Colocate types** with features, not in global types/