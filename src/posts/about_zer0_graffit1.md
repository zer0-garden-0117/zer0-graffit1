---
date: "2025-05-25"
description: ""
tags: ["NextJS", "MantineUI", "giscus"]
title: "zer0 graffit1の紹介"
---

# zer0 graffit1の紹介

## zer0 graffit1とは？

zer0(HN) と graffiti(落書き)の造語。

私はプログラマーの端くれで、日々何らかの開発をしており、その際に生成したメモを落書きとしてアップする場所になります。

0が1になればいいなという願いを込めてgraffitiの最後は1にしました。

## zer0 graffit1の構成について

zer0 graffit1の目的は、開発メモを簡単にアップすること。それなりに読めるような形で。

もう少し具体的にいうと、普段メモはMarkdown形式でとっているので、

そのmdファイルをそのままWebで読める形式(HTML)に変換されて表示されるのがいいなと思った。

あとは落書きとはいえせっかくアップするのでコメント機能もあればいいなと思った。

ということで、下記の3つの機能を用意しました。
1. mdをHTMLにパース
2. パースしたHTMLをいい感じに表示
3. コメント機能

## mdをHTMLにパース

すでに色々作成されている方がいたので参考にしました。

特に下記を参考にさせていただきました。

- [Next.js14で静的なMarkdownブログを作成するサンプル]([https://exiz.org/posts/nextjs14-create-markdown-blog/](https://exiz.org/posts/nextjs14-create-markdown-blog/))

## パースしたHTMLをいい感じに表示

最近ハマっているMantineUIというUIライブラリを使って装飾しました。

具体的には、html-react-parserを使用して、HTML要素にMantineコンポーネントを割り当てて見栄えを良くしました。

```tsx
const MantineMarkdownRenderer = ({ html }: { html: string }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "tag" && domNode.name) {
        switch (domNode.name) {
          // 各HTML要素に対するMantineコンポーネントの割り当て
        }
      }
    },
  };
  return <>{parse(html, options)}</>;
};
```

各HTMLに対するMantineコンポーネントの割り当てについては、例えば、下記のようにh2だとMantineUIのTitleを使って表示しDividerでアンダーラインを入れたりしました。

```tsx
case "h2":
  return (
    <Stack gap={0}>
      <Title order={2} mt="xs">
        {domToReact(domNode.children as DOMNode[], options)}
      </Title>
      <Divider my="1" mb="xs"/>
    </Stack>
  );
```

## コメント機能
各落書き毎にコメントできるようにするには、普通考えるとDBが必要になってくるが、そのためにDBを用意するのも面倒だった。

簡単にコメント実装できるものを探していて、今回はGiscusというGitHub Discussionsを利用したコメントシステムを使うことにしました。

Giscusを使えば、コメントはGithub Discussionsに保存されるので、わざわざDBを作る手間を省ける。

ちょっと気になるのは、コメントするにはGithubアカウントでログインが必要になること。

ただ、これも今回は開発系のメモなので、コメントする人もきっとGithubのアカウントを持っているに違いないから問題にならなそう。~~そもそも誰も見ていない気がしないでもない。~~