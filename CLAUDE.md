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

This is a Japanese personal blog built with Next.js 15 App Router, combining local Markdown posts with external Zenn articles.

### Content Management System
- **Local posts**: Stored in `/contents/` as Markdown files with frontmatter
- **External posts**: Fetched from Zenn RSS feed via `src/lib/zenn.ts`
- **Unified data layer**: `src/lib/data.ts` combines and sorts posts from both sources
- **Post processing**: `src/lib/post.ts` handles Markdown parsing with gray-matter and Twemoji support

### Key Data Flow
1. Posts are parsed from `/contents/*.md` files using frontmatter (title, date, tags, excerpt, thumbnail)
2. Zenn articles are fetched from RSS feed and normalized to match local post structure
3. Both sources are merged and sorted by date in `fetchPosts()` function
4. React Markdown renders content with custom components for syntax highlighting and styling

### Component Architecture
- **Layout**: Fixed header/footer with responsive container (max-width: 2xl)
- **Post rendering**: Custom Markdown components in `src/app/posts/[slug]/_components/post-content/md-parts/`
- **Routing**: Dynamic routes for individual posts at `/posts/[slug]`
- **Styling**: Tailwind CSS with Japanese typography (Roboto font)

### Environment Configuration
- Google Analytics integration via `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Image optimization configured for CDN assets (cdn.jsdelivr.net)
- TypeScript with path aliases (`@/*` maps to `src/*`)

### Testing Setup
- Vitest with jsdom environment for React component testing
- Testing Library for component interactions
- Global test setup in `vitest.setup.ts`