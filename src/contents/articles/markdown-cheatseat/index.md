---
title: 'マークダウン表現集'
date: '2024-10-12'
tags: [markdown]
---

このブログで使っているマークダウン表現のチートシートです。
ほぼ自分の参照用になります。

---

### 見出し

```md
## Heading2

### Heading3

#### Heading4
```

## Heading2

### Heading3

#### Heading4

---

### リスト

```md
- Sample text
- Sample text
- Sample text
  - Sample text
  - Sample text
```

- Sample text
- Sample text
- Sample text
  - Sample text
  - Sample text

```md
1. Sample text
2. Sample text
3. Sample text
4. Sample text
5. Sample text
```

1. Sample text
2. Sample text
3. Sample text
4. Sample text
5. Sample text

---

### インラインテキスト装飾

```md
_イタリック_
**太字**
~~打ち消し線~~
インラインで`code`を挿入する
こちらは[`uraaaa24`のTwitterのリンク](https://x.com/uraaaa24)
```

_イタリック_

**太字**

~~打ち消し線~~

インラインで`code`を挿入する

こちらは[uraaaa24のTwitterのリンク](https://x.com/uraaaa24)です。

---

### テーブル

```md
| Head | Head | Head |
| ---- | ---- | ---- |
| Text | Text | Text |
| Text | Text | Text |
```

| Head | Head | Head |
| ---- | ---- | ---- |
| Text | Text | Text |
| Text | Text | Text |

---

### コード

````md
```css
body {
  color: red;
}
```
````

```css
body {
  color: red;
}
```

---

### 画像

```md
![sampleAlt](./sample.jpg)
```

![sampleAlt](./sample.jpg)

画像ファイルは投稿のindex.mdと同フォルダ内に配置する

#### 画像のサイズ調整

```md
[[imageMedium]]
| ![alt](./sample.jpg)

[[imageSmall]]
| ![alt](./sample.jpg)
```

[[imageMedium]]
| ![alt](./sample.jpg)

[[imageSmall]]
| ![alt](./sample.jpg)

---

### ボックス

```md
[[simple | Hello]]
| Some note here

[[info | Memo]]
| Some note here

[[notice | Note]]
| Some note here

[[alert | 🙅 Danger!]]
| - You can also use lists
| - like this
```

[[simple | Hello]]
| Some note here

[[info | Memo]]
| Some note here

[[notice | Note]]
| Some note here

[[alert | 🙅 Danger!]]
| - You can also use lists
| - like this

---

### 水平線

```md
---
```

---

### Youtube埋め込み

```md
`youtube:https://www.youtube.com/embed/19R93fiKyRA`
```

`youtube:https://www.youtube.com/embed/19R93fiKyRA`

### ツイート埋め込み

```md
//scriptコードは除くこと

<blockquote class="twitter-tweet" data-lang="ja">
  <p lang="ja" dir="ltr">だれでも簡単に美しいWebポートフォリオを作成できるサービス RESUME（レジュメ）をリリースしました🎉<br><br>イラストレーター、カメラマン、デザイナー、エンジニアだけでなく、研究者、マーケターなどなど誰でも使えるサービスです！<br>ポートフォリオを作りたい人に届け〜<a href="https://t.co/DtTLqSqs7I">https://t.co/DtTLqSqs7I</a> <a href="https://t.co/Oq7ib0Um3k">pic.twitter.com/Oq7ib0Um3k</a></p>&mdash; CatNose😺 (@catnose99) <a href="https://twitter.com/catnose99/status/1090554889816555520?ref_src=twsrc%5Etfw">2019年1月30日</a>
</blockquote>
```

<blockquote class="twitter-tweet" data-lang="ja">
  <p lang="ja" dir="ltr">だれでも簡単に美しいWebポートフォリオを作成できるサービス RESUME（レジュメ）をリリースしました🎉<br><br>イラストレーター、カメラマン、デザイナー、エンジニアだけでなく、研究者、マーケターなどなど誰でも使えるサービスです！<br>ポートフォリオを作りたい人に届け〜<a href="https://t.co/DtTLqSqs7I">https://t.co/DtTLqSqs7I</a> <a href="https://t.co/Oq7ib0Um3k">pic.twitter.com/Oq7ib0Um3k</a></p>&mdash; CatNose😺 (@catnose99) <a href="https://twitter.com/catnose99/status/1090554889816555520?ref_src=twsrc%5Etfw">2019年1月30日</a>
</blockquote>
