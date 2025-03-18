---
title: "マークダウン表現チートシート"
thumbnail: 😏
date: "2025-03-14"
excerpt: "Next.jsとApp Routerを使った個人ブログの作り方について解説します。"
tags: ["Self"]
---

マークダウンがどのように表示されるかを一覧で確認する自分用のメモです。

---

## 見出し

```md
## H2 見出し
### H3 見出し
```

## H2 見出し
### H3 見出し

---

## テキストの装飾

```md
これが**太字**です
これが*イタリック*です
これが~~打ち消し線~~です
これが`インラインコード`です
```

これが**太字**です
これが*イタリック*です
これが~~打ち消し線~~です
これが`インラインコード`です

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

---

## リンクと画像

```md
[Google](https://www.google.com)

![サンプル画像](https://placehold.jp/150x150.png)
![サンプル画像](https://placehold.jp/500x500.png)
![サンプル画像](https://placehold.jp/1000x1000.png)
```

[Google](https://www.google.com)

![サンプル画像](https://placehold.jp/150x150.png)
![サンプル画像](https://placehold.jp/500x500.png)
![サンプル画像](https://placehold.jp/1000x500.png)

---

## コードブロック

````md
```javascript
console.log("Hello, World!");
```

```python
print("Hello, World!")
```

````

```js
console.log("Hello, World!");
```

```python
print("Hello, World!")
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
| Head1 | Head2 | Head3 |
| ----- | ----- | ----- |
| Data1 | Data2 | Data3 |
| Data4 | Data5 | Data6 |
```

| Head1 | Head2 | Head3 |
| ----- | ----- | ----- |
| Data1 | Data2 | Data3 |
| Data4 | Data5 | Data6 |

---

## 水平線

```md
---
```

---
