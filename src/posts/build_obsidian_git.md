---
date: "2025-06-02"
description: ""
tags: ["obsidian", "git", "obsidian git"]
title: "Obsidian Git 環境構築手順"
---

# Obsidian Git環境構築手順

## やりたいこと
Obsidianをマルチデバイス(MacBook、MacMini、iPhone、Win11)で使うために
プラグインのObsidian Gitを使ってmdファイル群をGitで管理したい。

## 環境構築手順
1. Vault(*1)を管理するためのGitアカウントとリポジトリを作成
2. PC(Macbook)で各種設定
    - .ssh/configで認証設定
    - リポジトリをclone
    - Obsidianでcloneしたフォルダを開く
    - .gitignoreで.obsidianを追加してコミット
    - ObsidianでObsidian Gitのプラグインをインストール
    - 設定で自動プル/自動コミット
3. スマホ(iPhonen)で各種設定
    - Working Copyでリポジトリをclone
    - Working CopyでSync to Locale
    - ObsidianでLocaleを開く？
    - ショートカットで自動プル/自動コミット

上記で、データの管理をgithubで行い、自動同期(プル/コミットプッシュ)の環境を構築する。

*1 Vault：obsidianでノートを管理するフォルダのこと。Vaultには、mdファイル群と隠しファイルの.obsidianが格納される。読み方はボルトと読むらしい。

## Vaultを管理するためのGitアカウントとリポジトリを作成

まずはVaultを管理するためだけのGithubアカウントを作成し、リポジトリを作成する。

（既にあるGithubアカウントを使用するでもいいのだけど、私は分けたかったので分けました。）

## PC(Macbook)で各種設定

### ssh接続設定

それ用のGithubアカウントを作成したので、ssh接続の設定をする。

まずは鍵生成。

```sh
ssh-keygen -t rsa -C "<YOUR_GITHUB_EMAIL_ADDRESS>" -f id_rsa_obsidian
```

~/.ssh/configで下記を設定する。

```sh
# Obsidian用
Host github-obsidian
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_obsidian
```

Github側でssh鍵を登録する。

```sh
pbcopy < ~/.ssh/id_rsa_obsidian.pub
```

登録したら、下記で接続確認する。

```sh
ssh -T github-obsidian
```

### リポジトリをclone

最後に、先ほどのユーザーを使ってcloneする。

```sh
git clone github-obsidian:<YOUR_ACCOUNT_NAME>/<YOUR_REPOSITORY_NAME>.git
```

### Obsidianでcloneしたフォルダを開く

保管庫の管理→開く→先ほどcloneしたフォルダを指定して開く。

すると、先ほどcloneしたフォルダに.obsidianが作成される。

これを.gitignoreに追加してコミット。

```sh
echo ".obsidian/" > .gitignore
git add .
git commit -m "add .gitignore"
```



### ObsidianでObsidian Gitのプラグインをインストール

設定→community plugin→turn on→Browse→Gitを入力して検索

Obsidian gitをインストールしてEnableを設定


### 設定で自動プル/自動コミット

Auto commit-and-sync interval (minutes)と、Auto pull interval (minutes)を設定。
とりあえず15分とかに設定しておく。

## スマホ(iPhonen)で各種設定

### ObsidianアプリでVaultを作成

create new vault→iCloudに保存をオフにして作成

### ファイルアプリでVaultの作成確認

このiPhone内→Obsidian→github-obsidianのフォルダがあることを確認

### Working Copyでリポジトリをclone

github-obsidianのリポジトリをclone

### cloneしたリポジトリと、ObsidianアプリのVaultの参照先を同期設定

WorkingCopyでcloneしたリポジトリを開き、

Setup Sync for→Directory→このiPhone内→Obsidian→github-obsian

これで、WorkingCopyとObisidanが同期され、Obsidianで編集したらWorkingCopyに反映され、WorkingCopyでファイル操作したらObsidianにその変更が反映される。

### ショートカットアプリで自動プル/コミット

ショートカットアプリを開き下記を設定。

- Obsidianを開いたとき、github-obsidianをpullする。
- Obsidianを閉じたとき、github-obsidianをComitti(modified)しpushする。
