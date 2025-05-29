---
date: "2025-05-29"
description: ""
tags: ["Trello", "Power-Up"]
title: "TrelloのAPIを使って日付のリストを一括生成する"
---

# TrelloのAPIを使って日付のリストを一括生成する

## はじめに

タスク管理にTrelloを使うことがある。
使い方としては、あらかじめ1ヶ月分の日付のリストを作成し、各日付のリストにtodoをカードとして作成してメンテする。
この「あらかじめ1ヶ月分の日付のリストを作成する」は、
例えば今が6月だとしたら、
6/1(日)、6/2(月)、・・・、6/30(月)の30個のリストをあらかじめ作成し、
各日付のリストにやることをカードとして作成するイメージ。
この日付のリストを1個ずつ手動で作成するのが面倒なので、TrelloのREST APIを使って一括生成して楽したい。

## 日付のリストを一括生成する手順

1. TrelloのAPIキーとTokenを取得
2. APIで日付のリストを作成するボードのIDを取得
3. APIで日付のリストを作成

## TrelloのAPIキーとTokenを取得

https://trello.com/power-ups/admin にアクセスし、新規ボタンを押下し、Power-Up(プロジェクトのようなもの)を作成する。
作成したPower-Upを開き、APIキーの生成ボタンを押下し、APIキーとトークンを取得する。

## APIで日付のリストを作成するボードのIDを取得

先ほど取得したAPIキーとトークンを使って、
ボードの一覧を取得し、日付のリストを作成するボードのIDを確認する。

下記のAPIを呼び出しすると、
```sh
curl -X GET 'https://trello.com/1/members/tatsumiryota1/boards' \
  -G \
  -d 'key=<YOUR_API_KEY>' \
  -d 'token=<YOUR_API_TOKEN>' \
  -d 'fields=name' \
| jq
```
下記のようなJSONが返される。
```json
[
  {
    "id":"<YOUR_BOARD_ID>",
    "name":"<YOUR_BOARD_NAME>"
  }
]
```

## APIで日付のリストを作成

最後に、リストを作成するAPIを使って、日付のリストを作成する。

その前に試しにリスト作成のAPIを呼んでみる。
下記のname=のところにtestと記述して呼び出しすると、成功するとtestというリストが作成される。
```sh
curl -X POST 'https://api.trello.com/1/lists' \
  -d 'name=test' \
  -d 'idBoard=<YOUR_BOURD_ID>' \
  -d 'key=<YOUR_API_KEY>' \
  -d 'token=<YOUR_API_TOKEN>'
```

今回は日付のリストを作成したいので、nameに日付+(曜日)を入れる。
それをfor文で回すスクリプトを作成する。
スクリプトは下記のgithubで公開しているので詳細はそちらを参照ください。
https://github.com/zer0-garden-0117/trello-create-calendar-lists