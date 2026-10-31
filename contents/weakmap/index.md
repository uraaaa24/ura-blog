---
thumbnail: 🗝️
title: WeakMapとMapは何が違う？
excerpt: AIが生成したコードで初めて見かけたWeakMap。Mapとの違いを、オブジェクトの参照とガベージコレクションから整理します。
date: 2026-10-31
tags:
  - Development
  - JavaScript
published: false
---

仕事でAIが生成したコードを読んでいたとき、`WeakMap`を初めて見かけました。気になって調べると、`Map`との違いの一つは、キーにしたオブジェクトの回収を妨げないことでした。

普段のフロントエンド開発では、正直ガベージコレクションまで意識する機会はあまりなかったです。自分の整理も兼ねて、`WeakMap`の使い方と`Map`との違いを整理しようと思います。

## WeakMapとは

`WeakMap`は、オブジェクトや未登録のSymbolをキーにして値を保存できる仕組みです。

例えば、ユーザー情報を持つオブジェクトに対して、ログイン状態を保存したい場合を考えてみます。

```ts
const user = { id: 1, name: "Taro" }

const weakMap = new WeakMap()

weakMap.set(user, { isLoggedIn: true })

console.log(weakMap.get(user)) // { isLoggedIn: true }
```

`set()`で保存したデータを、同じ`user`オブジェクトを使って`get()`で取り出しています。元のオブジェクトにプロパティを追加せず、別のデータを紐づけられます。

基本的な操作は、次の4つのメソッドです。

| メソッド | 説明 | 
| --- | --- |
| set(key, value) | データを保存する |
| get(key) | データを取得する |
| has(key) | データが存在するか確認する |
| delete(key) | データを削除する |

これらの操作は`Map`とほとんど同じです。

## MapとWeakMapの違い

主な違いを表にまとめます。

| 項目 | Map | WeakMap | 
| --- | --- | --- |
| キーに使える値 | 文字列・数値・オブジェクトなど | オブジェクト、未登録のSymbol | 
| キーと値を列挙する | できる | できない | 
| データの件数を取得する | できる | できない |
| キーとなるオブジェクトの保持 | 保持し続ける | 回収を妨げない |

### キーに使える値が違う

`Map`では、文字列や数値など、さまざまな値をキーにできます。

```ts
const map = new Map()

map.set("name", "Taro")
map.set(1, "one")
map.set({ id: 1 }, "user")
```

一方、`WeakMap`では文字列や数値をキーにできません。オブジェクトのほか、`Symbol()`で作った未登録のSymbolも使えます。

```ts
const weakMap = new WeakMap()

weakMap.set({ id: 1 }, "user") // OK

weakMap.set("name", "Taro") // TypeScriptでは型エラー。JavaScriptで実行するとTypeError
```

オブジェクトの中身が同じでも、別々に作られたものは異なるキーです。これは`Map`でも同じです。

```ts
const weakMap = new WeakMap()

const user1 = { id: 1 }
const user2 = { id: 1 }

weakMap.set(user1, "Taro")

console.log(weakMap.get(user1)) // "Taro"
console.log(weakMap.get(user2)) // undefined
```

### WeakMapの中身は一覧にできない

Mapでは、保存したデータをまとめて取り出せます。

```ts
const map = new Map([
  ["apple", 100],
  ["banana", 200],
])

for (const [key, value] of map) {
  console.log(key, value)
}

// apple 100
// banana 200
```

`WeakMap`には`keys()`や`entries()`がなく、`for...of`でも列挙できません。件数を示す`size`プロパティもありません。

キーとなるオブジェクトは、ほかから参照されなくなると回収される可能性があります。もしキーを一覧にできれば、その結果が回収のタイミングに左右されてしまいます。

## なぜWeakMapを使う？

この違いを理解するために、ガベージコレクションを簡単に確認します。

### ガベージコレクションとは？

JavaScriptでは、オブジェクトなどを作成すると、メモリを自動的に確保します。
使用されなくなったメモリは、実行環境によって自動的に解放されます。
これがガベージコレクションという仕組みです。

例えば、次のコードを見てください。

```ts
const createUser = () => {
  const user = { name: "Taro" }

  console.log(user.name)
}

createUser()
```

`createUser()`の実行中は、`user`を通じてオブジェクトにアクセスできます。関数の実行が終わり、ほかの場所からも参照されていなければ、回収できる状態になります。

ただし、関数が終了した瞬間にメモリが解放されるわけではありません。いつ回収するかは実行環境が判断します。

### Mapはオブジェクトを保持し続ける

今度は`Map`にオブジェクトを保存します。

```ts
const map = new Map()

const registerUser = () => {
  const user = { name: "Taro" }

  map.set(user, { isActive: true })
}

registerUser()
```

`registerUser()`の実行後、関数内の`user`変数にはアクセスできません。しかし、`map`が残っている間は、そこからキーのオブジェクトにアクセスできます。そのため、このオブジェクトは回収されません。

このように、オブジェクトの回収を妨げる参照を「強参照」といいます。

後からキーを使いたいなら、この動作が必要です。一方、不要になったキーを`Map`から削除しなければ、メモリを使い続けることがあります。

### WeakMapはオブジェクトの回収を妨げない

同じ処理を`WeakMap`で書いてみます。

```ts
const weakMap = new WeakMap()

const registerUser = () => {
  const user = { name: "Taro" }

  weakMap.set(user, { isActive: true })
}

registerUser()
```

`WeakMap`はキーのオブジェクトを強く保持しません。`registerUser()`の実行後、ほかに参照がなければ、キーは回収できる状態になります。これが「弱い」参照と呼ばれる理由です。

ただし、`WeakMap`自身がメモリを解放するわけではありません。回収するかどうか、いつ回収するかは実行環境が判断します。

## 具体的なWeakMapの使い方

ボタンの状態管理と計算結果のキャッシュを例に、`WeakMap`の使い方をみていきます。

### ボタンの状態を管理する

例えば、ボタンがクリックされたかどうかを記録したい場合です。

HTML要素の`data-*`属性に、クリック状態を保存できます。

```ts
const button = document.querySelector<HTMLButtonElement>("#button")
if (!button) throw new Error("ボタンが見つかりません")

button.dataset.clicked = "false"

button.addEventListener("click", () => {
  button.dataset.clicked = "true"
})
```

これでも動作しますが、HTML要素に`data-clicked`属性を追加することになります。

元の要素を変更せずにクリック状態を管理したい場合は、`WeakMap`を使う方法があります。

```ts
const clicked = new WeakMap<HTMLButtonElement, boolean>()
const button = document.querySelector<HTMLButtonElement>("#button")
if (!button) throw new Error("ボタンが見つかりません")

clicked.set(button, false)

button.addEventListener("click", () => {
  clicked.set(button, true)

  console.log(clicked.get(button)) // true
})
```

`clicked`には、ボタンのHTML要素をキーとして、クリックされたかどうかを保存しています。

クリック前は`false`、クリック後は`true`。元のHTML要素に属性を追加する必要はありません。

これ自体は`Map`でも実現できますが、`WeakMap`とはボタンが不要になったときに違いが出ます。

例えば、Webアプリケーションでは、画面の切り替えなどでHTML要素が削除されることがあります。

まずは`Map`を使って、ボタンを作成・削除する処理を書いてみます。

```ts
const clicked = new Map()
const createButton = () => {
  const button = document.createElement("button")

  document.body.append(button)
  clicked.set(button, false)

  button.remove() // 画面から削除
}

createButton()
```

ボタンは画面から削除されていますが、`Map`にはキーとして登録されたままです。
`Map`が残っている限り、ボタンへの参照も残るため、不要になったHTML要素がメモリに保持され続けます。

同じ処理を`WeakMap`で書くと、次のようになります。

```ts
const clicked = new WeakMap()

const createButton = () => {
  const button = document.createElement("button")

  document.body.append(button)
  clicked.set(button, false)

  button.remove()
}

createButton()
```

違いは`new Map()`を`new WeakMap()`に変更しただけです。

`WeakMap`は、キーとなるボタンを強く参照しません。関数の実行が終わり、他にボタンへの参照が残っていなければ、ガベージコレクションによって回収できる状態になります。

ボタンがなくなれば、そのクリック状態も必要なくなります。

このように、`WeakMap`の使い所の一つは、オブジェクトが存在している間だけ必要な情報を、元のオブジェクトを変更せずに管理できることです。

なお、`button.remove()`を呼び出しただけで、メモリが解放されるわけではありません。別の変数や配列などがボタンを参照していれば、その間は回収されないです。

### 計算結果をキャッシュする

`WeakMap`は、計算結果のキャッシュにも利用できます。

例えば、カートに入っている商品の合計金額を計算する関数です。

```ts
type Cart = { items: { price: number }[] }

const calculateTotal = (cart: Cart) => {
  const total = cart.items.reduce(
    (sum, item) => sum + item.price,
    0
  )

  return total
}
```
この関数は、呼び出すたびに合計金額を計算します。同じカートに対して何度も呼び出すなら、計算結果を保存して再利用できます。

```ts
type Cart = { items: { price: number }[] }

const cache = new WeakMap<Cart, number>()

const calculateTotal = (cart: Cart) => {
  const cachedTotal = cache.get(cart)
  if (cachedTotal !== undefined) return cachedTotal

  const total = cart.items.reduce(
    (sum, item) => sum + item.price,
    0
  )

  cache.set(cart, total)

  return total
}
```
この関数を実行すると、次のようになります。

```ts
const cart = {
  items: [
    { price: 100 },
    { price: 200 },
  ]
}

console.log(calculateTotal(cart)) // 300
console.log(calculateTotal(cart)) // 300
```

最初の呼び出しでは合計金額を計算し、計算結果を`WeakMap`に保存します。

2回目も同じオブジェクトが渡されているため、すでに計算済みの300を返します。合計金額を計算し直す必要はありません。

`Map`でもキャッシュは実装できますが、`Map`はキーとなるオブジェクトを保持し続けます。

`WeakMap`なら、カートのオブジェクトが不要になったとき、キャッシュがその回収を妨げることはないです。

### キャッシュで使う時の注意点

`WeakMap`はオブジェクトの中身ではなく、同じオブジェクトかどうかでキーを判断します。

そのため、保存した後にオブジェクトの内容を変更しても、キャッシュは自動的には更新されません。

```ts
const cart = {
  items: [
    { price: 100 },
    { price: 200 },
  ]
}

calculateTotal(cart) // 300

cart.items.push({ price: 300 }) // 商品を追加

calculateTotal(cart) // 300
// 本来の合計は600
```

商品を追加したので本来の合計は600ですが、結果は300が出力されます。

なので、内容を変更する場合は、キャッシュを削除するか、新しいオブジェクトを作成する必要があります。

```ts
const cart = {
  items: [
    { price: 100 },
    { price: 200 },
  ]
}

const updatedCart = {
  ...cart,
  items: [...cart.items, { price: 300 }],
}

calculateTotal(updatedCart) // 600
```
新しいオブジェクトは別のキーとして扱われるため、合計金額が改めて計算されるようになります。

## WeakMapを使うときの注意点と使い分け

ここまでの仕組みを踏まえて、`WeakMap`を使うときの注意点を確認します。

### WeakMapを使えばメモリの問題が解決するわけではない

`WeakMap`を使っても、ほかの場所に参照が残っていればキーは回収されません。

例えば、次のコードです。

```ts
const elements = []
const metadata = new WeakMap()

const button = document.createElement("button")

elements.push(button)
metadata.set(button, { count: 0 })
```

`metadata`には`WeakMap`を使っていますが、`elements`にも`button`を保存しています。配列がボタンを保持している間は、ボタンは回収されません。

### メモリが回収されるタイミングは決められない

キーを参照しなくなっても、回収のタイミングは決められません。イベントリスナーの解除やタイマーの停止など、必要な後片付けは自分で行います。

### MapとWeakMapはどう使い分ける？

迷ったときは、キーを一覧にしたいか、キーのオブジェクトを保持し続けたいかを考えます。

例えば、ユーザーIDをキーにして情報を管理するなら`Map`が適しています。文字列や数値をキーにでき、保存したデータもまとめて取り出せます。

オブジェクトごとの処理回数や計算結果のキャッシュなど、元のオブジェクトと一緒に関連データも不要になるなら`WeakMap`が候補になります。

## おわりに

今回整理してみて、`WeakMap`を理解するために特に重要なのは、キーとなるオブジェクトをどう保持するかという違いでした。

`Map`はキーを保持し続けますが、`WeakMap`はキーが不要になったときに、その回収を妨げません。

使うかどうか迷ったときは、「このオブジェクトが不要になったら、関連するデータも不要になるか？」と考えてみるとよさそうです。

## 参考資料

- [MDN - WeakMap](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN - Map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN - メモリー管理](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Memory_management)
