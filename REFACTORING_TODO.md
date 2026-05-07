# Bulletproof React リファクタリング TODO

## 進捗管理

- [x] Phase 1: Shared Layer Setup ✅ (Commit: ee2df1d)
- [x] Phase 2: Posts Feature ✅ (Ready to commit)
- [ ] Phase 3: Books Feature
- [ ] Phase 4: About Feature
- [ ] Phase 5: ESLint Enforcement
- [ ] Phase 6: Documentation & Cleanup

---

## Phase 1: Shared Layer Setup ✅

### 1.1 Markdown コンポーネントの移動 ✅

- [x] `src/components/ui/markdown/` ディレクトリ作成
- [x] 以下の13個のコンポーネントをコピー:
  - [x] `md-anchor.tsx` (from `app/posts/[slug]/_components/post-content/md-parts/md-anchor/index.tsx`)
  - [x] `md-blockquote.tsx` (from `md-parts/md-blockquote/index.tsx`)
  - [x] `md-code-block.tsx` (from `md-parts/md-codeBlock/index.tsx`)
  - [x] `md-delete.tsx` (from `md-parts/md-delete/index.tsx`)
  - [x] `md-emphasis.tsx` (from `md-parts/md-emphasis/index.tsx`)
  - [x] `md-heading.tsx` (from `md-parts/md-heading/index.tsx`)
  - [x] `md-horizontal-rule.tsx` (from `md-parts/md-horizontalRule/index.tsx`)
  - [x] `md-image.tsx` (from `md-parts/md-image/index.tsx`)
  - [x] `md-list.tsx` (from `md-parts/md-list/index.tsx`)
  - [x] `md-paragraph.tsx` (from `md-parts/md-paragraph/index.tsx`)
  - [x] `md-strong.tsx` (from `md-parts/md-strong/index.tsx`)
  - [x] `md-table.tsx` (from `md-parts/md-table/index.tsx`)

### 1.2 Markdown バレルエクスポート作成 ✅

- [x] `src/components/ui/markdown/index.tsx` 作成 (注: .tsxに変更済み)
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

### 1.3 PostContent コンポーネントの更新 ✅

- [x] `src/app/posts/[slug]/_components/post-content/index.tsx` を編集
  - [x] インポートを `@/components/ui/markdown` から変更
  - [x] `markdownComponents` を使用するように変更

### 1.4 共有コンポーネントの再構成 ✅

#### `components/layouts/` に移動 ✅
- [x] `mkdir -p src/components/layouts`
- [x] `header/` を移動
- [x] `footer/` を移動
- [x] `section/` を移動
- [x] `page-header/` を移動
- [x] `section-header/` を移動
- [x] `breadcrumb/` を移動
- [x] `scroll-to-top/` を移動
- [x] `scroll-to-top-on-route/` を移動

#### `components/ui/` に移動 ✅
- [x] `mkdir -p src/components/ui`
- [x] `input/` を移動
- [x] `search-input/` を移動
- [x] `share-button/` を移動
- [x] `social-links/` を移動
- [x] `heading/` を移動
- [x] `theme-toggle/` を移動
- [x] `table-of-contents/` を移動
- [x] `related-posts/` を移動

### 1.5 インポートの更新 ✅

- [x] `src/app/layout.tsx` - header, footer
- [x] `src/app/page.tsx` - section, section-header
- [x] `src/app/about/page.tsx` - heading, section, social-links
- [x] `src/app/posts/_components/posts-page-content.tsx` - page-header, search-input
- [x] `src/app/books/_components/books-page-content.tsx` - page-header, search-input
- [x] `src/app/posts/[slug]/page.tsx` - breadcrumb, scroll-to-top, share-button
- [x] `src/app/not-found.tsx` - section
- [x] `src/components/layouts/header/index.tsx` - theme-toggle
- [x] `src/components/posts/post-items/index.tsx` - input
- [x] `src/components/books/book-items/index.tsx` - input

### 1.6 検証 ✅

```bash
npm run build        # ✅ Build successful
```

---

## Phase 2: Posts Feature ✅

### 2.1 フィーチャー構造作成 ✅

```bash
mkdir -p src/features/posts/{api,components,types,utils}  # ✅ 完了
```

### 2.2 型定義の作成 ✅

- [x] `src/features/posts/types/index.ts` 作成
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

### 2.3 ユーティリティの移行 ✅

- [x] `src/features/posts/utils/process-markdown.ts` 作成
  - [x] `extractImageSrc`
  - [x] `copyImageToPublic`
  - [x] `processContentImages`
  - [x] `normalizeTitle`

### 2.4 API層の移行 ✅

- [x] `src/features/posts/api/get-local-posts.ts` 作成
- [x] `src/features/posts/api/get-post-by-slug.ts` 作成
- [x] `src/features/posts/api/get-related-posts.ts` 作成
- [x] `src/features/posts/api/get-zenn-posts.ts` 作成
- [x] `src/features/posts/api/get-posts.ts` 作成

### 2.5 コンポーネントの移行 ✅

- [x] `src/features/posts/components/post-item.tsx`
- [x] `src/features/posts/components/post-items.tsx`
- [x] `src/features/posts/components/posts-page-content.tsx`
- [x] `src/features/posts/components/post-content.tsx`
- [x] `src/features/posts/components/latest-posts.tsx`

### 2.6 App ルートの更新 ✅

- [x] `src/app/posts/page.tsx` 更新
- [x] `src/app/posts/[slug]/page.tsx` 更新
- [x] `src/app/page.tsx` 更新 (ホームページ)
- [x] `src/app/feed.xml/route.ts` 更新
  - `@/features/posts/api/get-posts` からインポート

- [x] `src/app/atom.xml/route.ts` 更新
- [x] `src/app/sitemap.ts` 更新
- [x] `src/app/llms.txt/route.ts` 更新
- [x] `src/app/posts/[slug]/opengraph-image.tsx` 更新
- [x] `src/lib/feed.ts` 型インポート更新
- [x] `src/lib/llms-txt.ts` 型インポート更新
- [x] `src/lib/ogp.ts` 型インポート更新
- [x] `src/lib/structured-data.ts` 型インポート更新

### 2.7 古いファイルの削除 ✅

```bash
rm src/lib/post.ts           # ✅ 削除完了
rm src/lib/zenn.ts           # ✅ 削除完了
rm src/lib/data.ts           # ✅ 削除完了
rm -rf src/app/posts/_components          # ✅ 削除完了
rm -rf src/app/_components/latest-posts   # ✅ 削除完了
rm -rf src/components/posts               # ✅ 削除完了
```

### 2.8 検証 ✅

```bash
npm run build        # ✅ Build successful
```

**Routes verified:**
- ✅ `/` (home page with latest posts)
- ✅ `/posts` (list page)
- ✅ `/posts/[slug]` (individual posts)
- ✅ `/feed.xml` (RSS)
- ✅ `/atom.xml` (Atom)
- ✅ `/sitemap.xml`
- ✅ `/llms.txt`

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
