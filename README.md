# ura's notes

ura's notes is a personal blog about frontend development, programming, and the things I learn along the way.

- Website: https://urarara.me/
- RSS: https://urarara.me/feed.xml
- Atom: https://urarara.me/atom.xml

---

## About this blog

- Notes on frontend development with React, Next.js, and TypeScript
- Mix of technical write-ups and day-to-day learnings
- Aggregates local Markdown posts with Zenn articles

For a revised local article, set `updated: YYYY-MM-DD` in its frontmatter. The sitemap only emits
`lastmod` when this date is present.

---

## Tech stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React, Tailwind CSS
- **Content**: Markdown, Zenn RSS
- **Testing**: Vitest, React Testing Library

---

## Development commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build & start
pnpm build && pnpm start

# Quality checks
pnpm lint
pnpm format:check
pnpm exec tsc --noEmit
pnpm test --run
```

Oxlint checks React, Next.js, TypeScript, and accessibility rules. ESLint remains for the project's import boundaries. Oxfmt checks code and configuration formatting; Markdown posts are excluded so their authored line breaks stay intact. The pre-commit hook checks staged files with both Oxc tools and rejects partially staged files so it checks the content being committed.

---

## Links

- GitHub: https://github.com/uraaaa24
- Zenn: https://zenn.dev/uraaaa24
