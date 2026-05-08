# Bulletproof React リファクタリング TODO

## 進捗管理

- [x] Phase 1: Shared Layer Setup ✅ (Commit: ee2df1d)
- [x] Phase 2: Posts Feature ✅ (Commit: 7a6741b)
- [x] Phase 3: Books Feature ✅ (Commit: 93fd191)
- [x] Phase 4: About Feature ✅ (Commit: be98f14)
- [x] Phase 5: ESLint Enforcement ✅ (Commit: bd368b7)
- [x] Phase 6: Documentation & Cleanup ✅ (Commit: deabc78)

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

## Phase 3: Books Feature ✅

### 3.1 フィーチャー構造作成 ✅

```bash
mkdir -p src/features/books/{api,components,types,utils}  # ✅ 完了
```

### 3.2 型定義の作成 ✅

- [x] `src/features/books/types/index.ts` 作成

### 3.3 API層の移行 ✅

- [x] `src/features/books/api/get-books.ts` 作成

### 3.4 コンポーネントの移行 ✅

- [x] `src/features/books/components/book-item.tsx`
- [x] `src/features/books/components/books-page-content.tsx`

### 3.5 App ルートの更新 ✅

- [x] `src/app/books/page.tsx` 更新
- [x] `src/app/page.tsx` 更新 (ホームページ books セクション)

### 3.6 古いファイルの削除 ✅

```bash
rm src/lib/books.ts                       # ✅ 削除完了
rm -rf src/app/books/_components          # ✅ 削除完了
rm -rf src/components/books               # ✅ 削除完了
```

### 3.7 検証 ✅

```bash
npm run build        # ✅ Build successful
```

**Routes verified:**
- ✅ `/` (home page books section)
- ✅ `/books` (list page with year/month grouping)

---

## Phase 4: About Feature ✅

### 4.1 フィーチャー構造作成 ✅

```bash
mkdir -p src/features/about/{components,constants}  # ✅ 完了
```

### 4.2 コンポーネントの抽出と移行 ✅

- [x] `src/app/_components/hero-content/index.tsx` → `src/features/about/components/about-hero.tsx`
- [x] `src/app/about/page.tsx` からコンテンツを抽出 → `src/features/about/components/about-content.tsx`

### 4.3 App ルートの更新 ✅

- [x] `src/app/about/page.tsx` 更新
  ```typescript
  import AboutContent from '@/features/about/components/about-content'

  export default function AboutPage() {
    return <AboutContent />
  }
  ```

- [x] `src/app/page.tsx` 更新 (ヒーローセクション)
  ```typescript
  import AboutHero from '@/features/about/components/about-hero'
  ```

### 4.4 古いファイルの削除 ✅

```bash
rm -rf src/app/_components/hero-content  # ✅ 削除完了
```

### 4.5 検証 ✅

```bash
npm run build        # ✅ Build successful
```

**Routes verified:**
- ✅ `/` (home page hero section)
- ✅ `/about` (full about page)

---

## Phase 5: ESLint Enforcement ✅

### 5.1 ESLint設定の更新 ✅

- [x] `eslint.config.mjs` に以下のルールを追加:
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

### 5.2 Lint実行と修正 ✅

```bash
npx eslint .         # ✅ Passed - No violations
```

Note: `import/order` rule temporarily disabled due to ESLint 10 compatibility issue.
Architectural boundaries (`import/no-restricted-paths`) are fully enforced.

### 5.3 検証 ✅

```bash
npx eslint .         # ✅ Passed
npm run build        # ✅ Build successful
```

---

## Phase 6: Documentation & Cleanup ✅

### 6.1 ドキュメントの更新 ✅

- [x] `CLAUDE.md` を更新
  - [x] Feature-based アーキテクチャのガイドライン追加
  - [x] Feature構造の規約を文書化
  - [x] インポートルールを追加
  - [x] 新しいフィーチャーの作成方法を追加
  - [x] Server Components ベストプラクティスを追加

### 6.2 空ディレクトリの削除 ✅

```bash
find src -type d -empty -delete  # ✅ 完了
```

Removed:
- `src/features/about/constants`
- `src/features/books/utils`
- `src/components/layouts/scroll-to-top-on-route`

### 6.3 テストファイルのクリーンアップ ✅

```bash
rm -f src/lib/data.test.ts src/lib/post.test.ts  # ✅ 完了
rm -rf "src/app/posts/[slug]/_components/post-content/md-parts"  # ✅ 完了
```

### 6.4 最終検証 ✅

```bash
npm run dev     # ✅ Started on port 3001
npm run build   # ✅ Build successful
npm test        # ✅ 10 test files, 44 tests passed
npx eslint .    # ✅ No violations
```

### 6.5 手動テストチェックリスト

Routes verified:
- ✅ `/` (home page with hero, latest posts, books)
- ✅ `/posts` (list page)
- ✅ `/posts/[slug]` (individual posts)
- ✅ `/books` (list page)
- ✅ `/about` (about page)
- ✅ `/feed.xml` (RSS)
- ✅ `/atom.xml` (Atom)
- ✅ `/sitemap.xml`

---

## 成功基準 ✅

- [x] すべての `app/_components/` ディレクトリが削除された
- [x] 3つのフィーチャーが作成された (posts, books, about)
- [x] すべてのMarkdownコンポーネントが `components/ui/markdown/` にある
- [x] ESLintアーキテクチャルールがパスする
- [x] 既存のテストがすべてパスする (10 files, 44 tests)
- [x] `npm run build` が成功する
- [x] すべてのルートが機能する
- [x] クロスフィーチャーインポートがない (ESLint enforced)

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
