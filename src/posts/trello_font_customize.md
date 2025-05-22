---
date: "2025-05-23"
description: ""
image: "/images/x_api_v2.jpeg"
tags: ["trello", "font", "フォント", "PlemolJP"]
title: "trelloのフォントをカスタマイズする"
---

## trelloのフォントをカスタマイズする

### やりたいこと

trelloのフォントをPlemolJPにする

### 手順

1. Chrome拡張のユーザースクリプト管理ツールを入れる
2. trelloのフォントを上書きするスクリプトを設定

### Chrome拡張のユーザースクリプト管理ツールを入れる

スクリプトが設定できるものなら何でもいいですが、
例としてViolentmonkeyをインストールします。
https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag

Violentmonkeyの紹介記事
https://gigazine.net/news/20210211-violentmonkey/

### trelloのフォントを上書きするスクリプトを設定

下記のスクリプトをコピーしてtrelloのサイトで有効にしてください。
下記ではフォントにPlemolJPを設定していますが、任意のフォントに修正してください。
```
// ==UserScript==
// @name        Trello Font Customizer
// @namespace   Violentmonkey Scripts
// @match       https://trello.com/b/g6HLmRf4/%E6%97%A5%E5%B8%B8*
// @grant       GM_addStyle
// @version     1.1
// @author      -
// @description Customizes fonts on Trello boards (changes to PlemolJP font family)
// ==/UserScript==

GM_addStyle(`
  :root {
    --ds-font-body: 'PlemolJP', -apple-system, sans-serif;
  }

  body, .list-card-title {
    font-family: 'PlemolJP', -apple-system, sans-serif !important;
  }
`);
```

ちなみに、このスクリプトは下記でも公開しています。
https://greasyfork.org/ja/scripts/536875-trello-font-customizer