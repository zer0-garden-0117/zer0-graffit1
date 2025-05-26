---
date: "2025-05-27"
description: ""
tags: ["ComfyUI", "NudenetModel", "AIイラスト", "LLM"]
title: "逮捕されないためにNudenetModelを使おう"
---
# 逮捕されないためにNudenetModelをつかおう



## はじめに



- [「ＦＣ２」創業者を逮捕　わいせつ動画公開容疑―京都府警(時事ドットコム)]([https://www.jiji.com/jc/article?k=2024110800526&g=soc](https://www.jiji.com/jc/article?k=2024110800526&g=soc))

ちょっと前のニュースを引っ張るが、FC2の創業者が逮捕された。

わいせつ物頒布等の罪の疑いで。

- [わいせつ物頒布等の罪 (wikipedia)]([https://ja.wikipedia.org/wiki/%E3%82%8F%E3%81%84%E3%81%9B%E3%81%A4%E7%89%A9%E9%A0%92%E5%B8%83%E7%AD%89%E3%81%AE%E7%BD%AA](https://ja.wikipedia.org/wiki/%E3%82%8F%E3%81%84%E3%81%9B%E3%81%A4%E7%89%A9%E9%A0%92%E5%B8%83%E7%AD%89%E3%81%AE%E7%BD%AA))


ここでいう「わいせつ」の基準は、非常に曖昧なもので、時代や国によって変わったりする。

今の日本だと、無修正の性器を出した人が逮捕されていて修正を入れていた人が逮捕されない傾向にあるらしく、そこが一つの線引きとなっているらしい。

AIイラストの生成だと、簡単に無修正のものがバンバン生成されてしまうが、それをそのままSNSにアップすると、

***『違法。捕まるよマジで（CV：トメ吉）』***

となる可能性があります。

ということで、逮捕されないためにモザイク修正を入れましょう。

## 生成の簡単さ < モザイク修正を入れる手間



でも、無修正の絵はLLMの技術で容易に生成できるのに対して、手動での修正は手間がかかります。


そこで、この修正もLLMの技術で入れてしまいましょう。

むしろこういった面倒な作業こそLLMの使い所だとすら思います。

## LLMでのモザイク修正



色々あるみたいですが、今回はComfyUIのカスタムノードのNudenetModelを使って修正を入れていきます。



## NudenetModelのインストール



NudenetModelはカスタムノードです。カスタムノードといえば、ComfyUI-Managerが便利なので

まだの場合は下記を先に入れてください。

[https://github.com/Comfy-Org/ComfyUI-Manager](https://github.com/Comfy-Org/ComfyUI-Manager)  



CmfyUI-ManagerでNudenetModelをインストールします。

[https://github.com/phuvinh010701/ComfyUI-Nudenet](https://github.com/phuvinh010701/ComfyUI-Nudenet)  

## LLMでモザイク Before/After

![LLMでモザイク](/posts/mosaic_by_nudenetmodel.png)


## 最後に


LLMで生成した無修正の絵にはLLMでモザイクを。