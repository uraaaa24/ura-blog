---
thumbnail: 🐈
title: 改めてreducerについて調べてみる
excerpt: Next.jsとApp Routerを使った個人ブログの作り方について解説します。
date: 2026-07-11
tags:
  - Development
  - React
  - Frontend
published: false
---

useReducerについて改めて考えた時に、何となく使っているなーと思い、公式ドキュメントを読んでみました。
そうしたら結構理解が足りていなかったと思うことがあったので、記事にまとめてみました。

## useReducerとは

`useReducer`とは、簡単にいうと「複雑な状態更新ロジックを整理・管理するためのHook」です。
Stateを扱うHookとしては、`useState`が思い浮かぶと思います。

`useState`では、Stateの更新処理をそれぞれの場所で書く必要があります。
一方、`useReducer`では、それらの更新処理を1か所にまとめて管理できます。

そのため、状態更新ロジックが複雑になればなるほど、`useReducer`を使うメリットが大きくなります。

## useReducerを使う場面

## reducerの仕組み

## Actionの考え方

## 良いReducerを書くためのポイント

## まとめ

## 参考資料

- [state ロジックをリデューサに抽出する](https://ja.react.dev/learn/extracting-state-logic-into-a-reducer)
