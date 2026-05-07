# Bulletproof React リファクタリング TODO

## 進捗管理

- [ ] Phase 1: Shared Layer Setup
- [ ] Phase 2: Posts Feature
- [ ] Phase 3: Books Feature
- [ ] Phase 4: About Feature
- [ ] Phase 5: ESLint Enforcement
- [ ] Phase 6: Documentation & Cleanup

---

## Phase 1: Shared Layer Setup

### 1.1 Markdown コンポーネントの移動

- [ ] `src/components/ui/markdown/` ディレクトリ作成
- [ ] 以下の13個のコンポーネントをコピー:
  - [ ] `md-anchor.tsx` (from `app/posts/[slug]/_components/post-content/md-parts/md-anchor/index.tsx`)
  - [ ] `md-blockquote.tsx` (from `md-parts/md-blockquote/index.tsx`)
  - [ ] `md-code-block.tsx` (from `md-parts/md-codeBlock/index.tsx`)
  - [ ] `md-delete.tsx` (from `md-parts/md-delete/index.tsx`)
  - [ ] `md-emphasis.tsx` (from `md-parts/md-emphasis/index.tsx`)
  - [ ] `md-heading.tsx` (from `md-parts/md-heading/index.tsx`)
  - [ ] `md-horizontal-rule.tsx` (from `md-parts/md-horizontalRule/index.tsx`)
  - [ ] `md-image.tsx` (from `md-parts/md-image/index.tsx`)
  - [ ] `md-list.tsx` (from `md-parts/md-list/index.tsx`)
  - [ ] `md-paragraph.tsx` (from `md-parts/md-paragraph/index.tsx`)
  - [ ] `md-strong.tsx` (from `md-parts/md-strong/index.tsx`)
  - [ ] `md-table.tsx` (from `md-parts/md-table/index.tsx`)

### 1.2 Markdown バレルエクスポート作成

- [ ] `src/components/ui/markdown/index.ts` 作成
  ```typescript
  export { default as MDAnchor } from './md-anchor'
  export { default as MDBlockquote } from './md-blockquote'
  export { default as MDCodeBlock } from './md-code-block'
  export { default as MDDelete } from './md-delete'
  export { default as MDEmphasis } from './md-emphasis'
  export { MDHeading } from './md-heading'
  export { default as MDHorizontalRule } from './md-horizontal-rule'
  export { default as MDImage } from './md-image'
  export { MDUnorderedList, MDOrderedList, MDListItem } from './md-list'
  export { default as MDParagraph } from './md-paragraph'
  export { default as MDStrong } from './md-strong'
  export { MDTable, MDTableBody, MDTableRow, MDTableHead, MDTableHeadCell, MDTableCell } from './md-table'

  import type { Components } from 'react-markdown'
  import MDAnchor from './md-anchor'
  import MDBlockquote from './md-blockquote'
  import MDCodeBlock from './md-code-block'
  import MDDelete from './md-delete'
  import MDEmphasis from './md-emphasis'
  import { MDHeading } from './md-heading'
  import MDHorizontalRule from './md-horizontal-rule'
  import MDImage from './md-image'
  import { MDUnorderedList, MDOrderedList, MDListItem } from './md-list'
  import MDParagraph from './md-paragraph'
  import MDStrong from './md-strong'
  import { MDTable, MDTableBody, MDTableRow, MDTableHead, MDTableHeadCell, MDTableCell } from './md-table'

  export const markdownComponents: Components = {
    code: ({ className, children, ...props }) => (
      <MDCodeBlock className={className} {...props}>
        {children}
      </MDCodeBlock>
    ),
    h2: ({ children, id }) => <MDHeading level={2} id={id}>{children}</MDHeading>,
    h3: ({ children, id }) => <MDHeading level={3} id={id}>{children}</MDHeading>,
    h4: ({ children, id }) => <MDHeading level={4} id={id}>{children}</MDHeading>,
    h5: ({ children, id }) => <MDHeading level={5} id={id}>{children}</MDHeading>,
    h6: ({ children, id }) => <MDHeading level={6} id={id}>{children}</MDHeading>,
    p: ({ children }) => <MDParagraph>{children}</MDParagraph>,
    table: ({ children }) => <MDTable>{children}</MDTable>,
    tbody: ({ children }) => <MDTableBody>{children}</MDTableBody>,
    tr: ({ children }) => <MDTableRow>{children}</MDTableRow>,
    thead: ({ children }) => <MDTableHead>{children}</MDTableHead>,
    th: ({ children }) => <MDTableHeadCell>{children}</MDTableHeadCell>,
    td: ({ children }) => <MDTableCell>{children}</MDTableCell>,
    ul: ({ children }) => <MDUnorderedList>{children}</MDUnorderedList>,
    ol: ({ children }) => <MDOrderedList>{children}</MDOrderedList>,
    li: ({ children }) => <MDListItem>{children}</MDListItem>,
    img: ({ src, alt }) => <MDImage src={src} alt={alt} />,
    hr: () => <MDHorizontalRule />,
    a: ({ children, href, ...props }) => <MDAnchor href={href} {...props}>{children}</MDAnchor>,
    blockquote: ({ children }) => <MDBlockquote>{children}</MDBlockquote>,
    strong: ({ children }) => <MDStrong>{children}</MDStrong>,
    em: ({ children }) => <MDEmphasis>{children}</MDEmphasis>,
    del: ({ children }) => <MDDelete>{children}</MDDelete>
  }
  ```

### 1.3 PostContent コンポーネントの更新

- [ ] `src/app/posts/[slug]/_components/post-content/index.tsx` を編集
  - [ ] インポートを `@/components/ui/markdown` から変更
  - [ ] `markdownComponents` を使用するように変更

### 1.4 共有コンポーネントの再構成

#### `components/layouts/` に移動
- [ ] `mkdir -p src/components/layouts`
- [ ] `header/` を移動 (既に `components/` にある)
- [ ] `footer/` を移動
- [ ] `section/` を移動
- [ ] `page-header/` を移動
- [ ] `section-header/` を移動
- [ ] `breadcrumb/` を移動
- [ ] `scroll-to-top/` を移動
- [ ] `scroll-to-top-on-route/` を移動

#### `components/ui/` に移動
- [ ] `mkdir -p src/components/ui` (markdownフォルダは既に作成済み)
- [ ] `input/` を移動
- [ ] `search-input/` を移動
- [ ] `share-button/` を移動
- [ ] `social-links/` を移動
- [ ] `heading/` を移動
- [ ] `theme-toggle/` を移動
- [ ] `table-of-contents/` を移動
- [ ] `related-posts/` を移動

### 1.5 インポートの更新

- [ ] 全ファイルで `@/components/header` → `@/components/layouts/header` に更新
- [ ] 全ファイルで `@/components/footer` → `@/components/layouts/footer` に更新
- [ ] その他のコンポーネントのインポートパスを更新

### 1.6 検証

```bash
npm run dev          # Markdown rendering check
npm run build        # Build verification
npm run test         # Run tests
```

---

## Phase 2: Posts Feature

### 2.1 フィーチャー構造作成

```bash
mkdir -p src/features/posts/{api,components,types,utils}
```

### 2.2 型定義の作成

- [ ] `src/features/posts/types/index.ts` 作成
  ```typescript
  import type { TocItem } from '@/lib/toc'

  export type Post = {
    slug: string
    title: string
    thumbnail: string | null
    date: string
    formattedDate: string
    content: string
    excerpt?: string
    tags?: string[]
    toc?: TocItem[]
  }

  export type ZennRSSItem = {
    title: string
    link: string
    pubDate: string
    content: string
  }
  ```

### 2.3 ユーティリティの移行

- [ ] `src/features/posts/utils/process-markdown.ts` 作成
  - `lib/post.ts` から以下を抽出:
    - `extractImageSrc`
    - `copyImageToPublic`
    - `processContentImages`
    - `normalizeTitle`

### 2.4 API層の移行

- [ ] `src/features/posts/api/get-local-posts.ts` 作成
  - `lib/post.ts` の `getAllPosts` をコピー
  - `../utils/process-markdown` からインポート

- [ ] `src/features/posts/api/get-post-by-slug.ts` 作成
  - `lib/post.ts` の `getPostBySlug` をコピー

- [ ] `src/features/posts/api/get-related-posts.ts` 作成
  - `lib/post.ts` の `getRelatedPosts` をコピー

- [ ] `src/features/posts/api/get-zenn-posts.ts` 作成
  - `lib/zenn.ts` の全内容をコピー
  - 型定義を `../types` からインポート

- [ ] `src/features/posts/api/get-posts.ts` 作成
  - `lib/data.ts` の `fetchPosts` ロジックをコピー
  - `getLocalPosts` と `getZennPosts` を使用
  - 重複排除とソートロジックを含む

### 2.5 コンポーネントの移行

- [ ] `src/components/posts/post-item/index.tsx` → `src/features/posts/components/post-item.tsx`
- [ ] `src/components/posts/post-items/index.tsx` → `src/features/posts/components/post-items.tsx`
- [ ] `src/app/posts/_components/posts-page-content.tsx` → `src/features/posts/components/posts-page-content.tsx`
- [ ] `src/app/posts/[slug]/_components/post-content/index.tsx` → `src/features/posts/components/post-content.tsx`
  - [ ] Markdown インポートを `@/components/ui/markdown` に更新
- [ ] `src/app/_components/latest-posts/index.tsx` → `src/features/posts/components/latest-posts.tsx`

### 2.6 App ルートの更新

- [ ] `src/app/posts/page.tsx` 更新
  ```typescript
  import { getPosts } from '@/features/posts/api/get-posts'
  import { PostsPageContent } from '@/features/posts/components/posts-page-content'
  ```

- [ ] `src/app/posts/[slug]/page.tsx` 更新
  ```typescript
  import { getPostBySlug } from '@/features/posts/api/get-post-by-slug'
  import { getRelatedPosts } from '@/features/posts/api/get-related-posts'
  ```

- [ ] `src/app/page.tsx` 更新 (ホームページ)
  ```typescript
  import { getPosts } from '@/features/posts/api/get-posts'
  import { LatestPosts } from '@/features/posts/components/latest-posts'
  ```

- [ ] `src/app/feed.xml/route.ts` 更新
  - `@/features/posts/api/get-posts` からインポート

- [ ] `src/app/atom.xml/route.ts` 更新
  - `@/features/posts/api/get-posts` からインポート

### 2.7 古いファイルの削除

```bash
rm src/lib/post.ts
rm src/lib/zenn.ts
rm src/lib/data.ts
rm -rf src/app/posts/_components
rm -rf src/app/_components/latest-posts
rm -rf src/components/posts
```

### 2.8 検証

```bash
npm run dev
# Test:
# - / (home page with latest posts)
# - /posts (list page with search)
# - /posts/[slug] (individual post)
# - /feed.xml
# - /atom.xml

npm run build
npm run test
```

---

## Phase 3: Books Feature

### 3.1 フィーチャー構造作成

```bash
mkdir -p src/features/books/{api,components,types,utils}
```

### 3.2 型定義の作成

- [ ] `src/features/books/types/index.ts` 作成
  ```typescript
  export type Book = {
    id: string
    title: string
    completedDate: string
    formattedDate: string
    url: string
  }
  ```

### 3.3 API層の移行

- [ ] `src/features/books/api/get-books.ts` 作成
  - `lib/books.ts` の内容をコピー
  - `cache()` を使用

### 3.4 コンポーネントの移行

- [ ] `src/components/books/book-item/index.tsx` → `src/features/books/components/book-item.tsx`
- [ ] `src/app/books/_components/books-page-content.tsx` → `src/features/books/components/books-page-content.tsx`

### 3.5 App ルートの更新

- [ ] `src/app/books/page.tsx` 更新
  ```typescript
  import { getBooks } from '@/features/books/api/get-books'
  import { BooksPageContent } from '@/features/books/components/books-page-content'
  ```

- [ ] `src/app/page.tsx` 更新 (ホームページ books セクション)
  ```typescript
  import { getBooks } from '@/features/books/api/get-books'
  ```

### 3.6 古いファイルの削除

```bash
rm src/lib/books.ts
rm -rf src/app/books/_components
rm -rf src/components/books
```

### 3.7 検証

```bash
npm run dev
# Test: /books, / (books section)
npm run build
```

---

## Phase 4: About Feature

### 4.1 フィーチャー構造作成

```bash
mkdir -p src/features/about/{components,constants}
```

### 4.2 コンポーネントの抽出と移行

- [ ] `src/app/_components/hero-content/index.tsx` → `src/features/about/components/about-hero.tsx`
- [ ] `src/app/about/page.tsx` からコンテンツを抽出 → `src/features/about/components/about-content.tsx`
- [ ] 必要に応じて追加のサブコンポーネント作成:
  - [ ] `about-tech-stack.tsx`
  - [ ] `about-interests.tsx`

### 4.3 定数の作成 (必要に応じて)

- [ ] `src/features/about/constants/about-data.ts` 作成

### 4.4 App ルートの更新

- [ ] `src/app/about/page.tsx` 更新
  ```typescript
  import { AboutContent } from '@/features/about/components/about-content'

  export default function AboutPage() {
    return <AboutContent />
  }
  ```

- [ ] `src/app/page.tsx` 更新 (ヒーローセクション)
  ```typescript
  import { AboutHero } from '@/features/about/components/about-hero'
  ```

### 4.5 古いファイルの削除

```bash
rm -rf src/app/_components/hero-content
```

### 4.6 検証

```bash
npm run dev
# Test: /, /about
npm run build
```

---

## Phase 5: ESLint Enforcement

### 5.1 ESLint設定の更新

- [ ] `eslint.config.mjs` に以下のルールを追加:
  ```javascript
  {
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // クロスフィーチャーインポートの防止
            {
              target: './src/features/posts',
              from: './src/features',
              except: ['./posts'],
            },
            {
              target: './src/features/books',
              from: './src/features',
              except: ['./books'],
            },
            {
              target: './src/features/about',
              from: './src/features',
              except: ['./about'],
            },
            // Features can't import from app
            {
              target: './src/features',
              from: './src/app',
            },
            // Shared layer can't import from features/app
            {
              target: [
                './src/components',
                './src/hooks',
                './src/lib',
                './src/types',
                './src/utils',
              ],
              from: ['./src/features', './src/app'],
            },
          ],
        },
      ],
    },
  }
  ```

### 5.2 Lint実行と修正

```bash
npm run lint
npm run lint:fix
```

### 5.3 検証

```bash
npm run lint          # Should pass
npm run build         # Production build
npm run test          # All tests pass
```

---

## Phase 6: Documentation & Cleanup

### 6.1 ドキュメントの更新

- [ ] `CLAUDE.md` を更新
  - [ ] Feature-based アーキテクチャのガイドライン追加
  - [ ] Feature構造の規約を文書化
  - [ ] インポートルールを追加
  - [ ] 例を含める

### 6.2 空ディレクトリの削除

```bash
find src -type d -empty -delete
```

### 6.3 最終検証

```bash
npm run dev
npm run build
npm start
npm run lint
npm run test
npm run storybook
```

### 6.4 手動テストチェックリスト

- [ ] ホームページ (hero, 最新記事, books)
- [ ] /posts (リスト, 検索)
- [ ] /posts/[slug] (個別記事, TOC, 関連記事)
- [ ] /books (リスト, グループ化, 検索)
- [ ] /about (全ページ)
- [ ] ダークモード切り替え
- [ ] レスポンシブデザイン
- [ ] RSS/Atomフィード
- [ ] Open Graph画像

---

## 成功基準

- [ ] すべての `app/_components/` ディレクトリが削除された
- [ ] 3つのフィーチャーが作成された (posts, books, about)
- [ ] すべてのMarkdownコンポーネントが `components/ui/markdown/` にある
- [ ] ESLintアーキテクチャルールがパスする
- [ ] 既存のテストがすべてパスする
- [ ] `npm run build` が成功する
- [ ] すべてのルートが機能する
- [ ] クロスフィーチャーインポートがない
- [ ] バンドルサイズ ≤ ベースライン + 5%

---

## コマンド早見表

```bash
# 開発
npm run dev

# ビルド
npm run build
npm start

# テスト
npm run test
npm run test:ui

# Lint
npm run lint
npm run lint:fix

# Storybook
npm run storybook

# すべて確認
npm run dev && npm run build && npm start
npm run test && npm run lint && npm run storybook
```

---

## 注意事項

- 各フェーズは独立しており、gitでロールバック可能
- フェーズごとに必ず検証を実行
- インポートパスの変更は TypeScript コンパイラエラーで追跡
- Server Components と Client Components の区別に注意
- 'use client' ディレクティブを適切に配置
