---
date: "2025-06-07"
description: ""
tags: ["Electron", "Next.js"]
title: "CMUForMe開発日記1"
---

## はじめに

今回はシリーズもので、その名もCMUForMe開発日記1日目。

CMUForMeは個人で作ろうとしているアプリの名前（仮称）で、

CrossMediaUploaderForMeの略になります。

CMUForMeがどんなアプリかといえば、複数のSNSに楽に画像をアップロードできるようにアプリになります。

これがあれば、自分のAIイラスト投稿が100倍楽になる。（多分）

今回はその要件定義と技術選定をしていきます。

## 要件定義

やりたいことは、自分の画像投稿を楽にすること。

用途は個人利用に限定する。他のユーザーの使用も考慮するとバックエンドを色々作る必要があるので今回はやらない。

ローカルだとMacMiniM4が常時稼働しているので、そこで動くネイティブのデスクトップ型のアプリにする。

楽に投稿するの「楽に」の部分だけど、

複数SNSに一括はもちろんのこと、画像のD&Dは対応したい。

あと、予約投稿もできるようにしたい。

ということで、要件を整理すると下記のような感じになる。

CMUForMe (Cross Media Uploader For Me)の要件整理

- 複数のSNSに一括投稿
- 投稿画面：画像のD&D対応＋メタデータ入力＋投稿日時設定
- 投稿予約リスト画面：予約済みの投稿表示、編集、削除

## デスクトップアプリ構築の技術スタック選定

結露から言えば、Next.js+Electron(Nextron)でやることにする。

Pythonでやろうと一瞬思った。PyQtとかのGUIライブラリを駆使すれば画面も作れるらしい。D&Dも実装できるらしい。

投稿画面一枚だけだとすると、ChatGPTとかに聞きながらPythonでやった方がはやいと思う。

ただ、今回は投稿画面だけでなく、予約リスト画面も必要になる。となると、画面遷移が絡んでくる。

となれば、React的な、できれば使ったことがあるNext.js的な実装ができたらいいなと思って調べたら、Nextron(Next.js+Electron)でできそうなことが分かった。

今回はこれを採用する。

Electronは使ったことがない。が、Nextronを使えば、Electronの領域はセットされていてほとんど気にせずに実装できそう。

## Nextronで起動

とりあえず下記でPJを作成。
```sh
git clone --depth 1 --branch main https://github.com/electron-react-boilerplate/electron-react-boilerplate.git election-ui
```

ソースを確認すると、page routerっぽい。

app routerの方がいいんだけど、ここはまだNextronが未対応らしい。

他のNext.js+Electronも調べたがapp routerはしない方がいいという記事も見かけたので、page routerのままにする。
