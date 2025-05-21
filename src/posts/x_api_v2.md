---
date: "2025-05-12"
description: ""
image: "/images/sample.png"
tags: ["X", "X API v2", "Twitter"]
title: "X API v2を使って画像をポストする"
---

## X API v2を使って画像をポストする

### 前提

- X Developersは無料(Free)プランを使用
- x api v2を使って画像付き投稿をcurlコマンドでやってみる

### curlでの投稿手順

1. X Developpersの設定（登録、プロジェクトとアプリ作成、認証設定）
2. 認可リクエスト
3. トークンリクエスト
4. X API v2を使ってメディアリクエスト
5. X API v2を使って画像付き投稿

### X Developersの設定（登録、プロジェクトとアプリ作成、認証設定）

下記を参考に設定しました。

 - [X APIを使用する](https://qiita.com/hisashi_matsui/items/55e445b6a34a522dcbd8#oauth-20-flow-with-pkce%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B)

### 認可リクエスト

下記の認可URLに、自身の<YOUR\_CLIENT\_ID>、<YOUR\_REDIRECT\_URL>をセットして、ブラウザで開いてください。

```
https://twitter.com/i/oauth2/authorize?response_type=code&client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URL>&scope=tweet.read%20tweet.write%20users.read%20offline.access%20media.write&state=state&code_challenge=challenge&code_challenge_method=plain
```

この時のポイントは、scopeにmedia.writeを含めること。

このscopeがないと、後々の画像アップロードで403エラーになります。

認可を実行すると、指定したリダイレクトURLへ遷移し、認可Codeが返されます。

```
<YOUR_REDIRECT_URL>/?state=state&code=xxxxxxxxxxxx
```

これのcode=移行が認可Codeになります。

### トークンリクエスト

先ほどの認可Codeを使って、OAuth2に認証トークンをリクエストします。

```
curl --location --request POST 'https://api.twitter.com/2/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic <YOUR_BASE64_SECRETS>' \
--data-urlencode 'code=<YOUR_AUTHORIZATION_Code>' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'redirect_uri=<YOUR_REDIRECT_URL>' \
--data-urlencode 'code_verifier=challenge' \
--data-urlencode 'client_id=<YOUR_CLIENT_ID>'
```

成功すると下記が返されます。

```
{
 "token_type":"bearer",
 "expires_in":7200,
 "access_token":"xxxx",
 "scope":"offline.access tweet.write media.write users.read tweet.read",
 "refresh_token"yyyy"
}
```

この中のaccess\_tokenを使ってX API v2を呼び出ししていきます。

### X API v2を使ってメディアリクエスト

```
curl -v -X POST 'https://api.twitter.com/2/media/upload' \
--header 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
-F 'media=@"<YOUR_IMAGE_FILE>"'
```

成功したら下記が返されます。

```
{
 "id":"8888888888",
 "size":184258,
 "expires_after_secs":86400,
 "image":{
  "image_type":"image\/jpeg",
  "w":1152,
  "h":1728
 }
}
```

これでようやく、画像付き投稿の準備が完了しました。

この中のidがメディアIDで、ポストするときに使います。

### X API v2を使って画像付き投稿

```
curl -X POST 'https://api.twitter.com/2/tweets' \
  --header 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{
    "text": "X APIから画像付きの投稿テスト",
    "media": {
      "media_ids": ["<YOUR_MEDIA_ID>"]
    }
  }'
```
