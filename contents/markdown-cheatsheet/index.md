---
thumbnail: 😏
title: マークダウン表現チートシート
excerpt: Next.jsとApp Routerを使った個人ブログの作り方について解説します。
date: 2025-03-14
tags:
  - Self
published: true
---

マークダウンがどのように表示されるかを一覧で確認する自分用のメモです。

---

## 見出し

```md
## H2 見出し
### H3 見出し
#### H4 見出し
##### H5 見出し
```

## H2 見出し
### H3 見出し
#### H4 見出し
##### H5 見出し
###### H6 見出し

---

## テキストの装飾

```md
これが**太字**です
これが*イタリック*です
これが~~打ち消し線~~です
これが`インラインコード`です
**太字の中に`コード`**を入れます
***太字とイタリック***を同時に使います
```

これが**太字**です
これが*イタリック*です
これが~~打ち消し線~~です
これが`インラインコード`です
**太字の中に`コード`**を入れます
***太字とイタリック***を同時に使います

```md
1行目  
2行目
```

1行目  
2行目

---

## リスト

```md
- リスト1
- リスト2
  - ネストリスト
- リスト3
```

- リスト1
- リスト2
  - ネストリスト
- リスト3


```md
1. 項目1
2. 項目2
   1. ネスト項目
3. 項目3
```

1. 項目1
2. 項目2
3. 項目3

```md
- [ ] 未完了タスク
- [x] 完了済みタスク
- [ ] もう一つの未完了タスク
```

- [ ] 未完了タスク
- [x] 完了済みタスク
- [ ] もう一つの未完了タスク

---

## リンクと画像

```md
[Google](https://www.google.com)
[見出しへ戻る](#見出し)
https://example.com

![ローカル画像](./example.jpeg)
![外部画像](https://placehold.jp/500x300.png)
```

[Google](https://www.google.com)
[見出しへ戻る](#見出し)
https://example.com

![ローカル画像](./example.jpeg)
![外部画像](https://placehold.jp/500x300.png)

---

## YouTube

```md
https://www.youtube.com/watch?v=QJO3ROT-A4E
```

https://www.youtube.com/watch?v=QJO3ROT-A4E

---

## コードブロック

````md
```ts
type User = {
  id: string
  name: string
}

const user: User = {
  id: "1",
  name: "Ura"
}
```

```json
{
  "name": "ura-blog",
  "private": true
}
```

```diff
- const title = "old"
+ const title = "new"
```

````

```ts
type User = {
  id: string
  name: string
}

const user: User = {
  id: "1",
  name: "Ura"
}
```

```json
{
  "name": "ura-blog",
  "private": true
}
```

```diff
- const title = "old"
+ const title = "new"
```

---

## 引用

```md
> これは引用です。
>
> - 引用の中にリスト
> - も含められます。
```

> これは引用です。
>
> - 引用の中にリスト
> - も含められます。

---

## テーブル

```md
| Left | Center | Right |
| :--- | :----: | ----: |
| Data1 | Data2 | 100 |
| Data4 | **Data5** | 200 |
```

| Left | Center | Right |
| :--- | :----: | ----: |
| Data1 | Data2 | 100 |
| Data4 | **Data5** | 200 |

---

## 水平線

```md
---
```

---
