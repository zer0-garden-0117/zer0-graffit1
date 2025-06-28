---
date: "2025-06-29"
description: ""
tags: ["Electron", "Next.js", "Nextron", "Typescript", "IPC"]
title: "CMUForMe開発日記3"
---

## 前回のあらすじ

実際に開発する中で下記の2つが課題になった。
1. レンダラープロセスからメインプロセスの機能の呼び出し
2. メインプロセスとレンダラープロセスの両方で使う共有の型

今回は1と2のそれぞれの対応について。

## レンダラープロセスからメインプロセスの機能の呼び出し

下記の流れで実装する。
1. メインプロセス側でハンドラ登録(ipcMain.handle(channel, handler))
2. レンダラープロセス側でそれを呼び出す(ipcRenderer.invoke(channel, ...args))

### メインプロセス側でハンドラ登録

main/backend.ts
```tsx
registerHandlers();
```

main/handlers/index.ts
```tsx
import { ipcMain } from 'electron';
import * as shellHandler from './shellHandler';

const handlers: { [key: string]: (...args: any[]) => any } = {
  'execute-shell-script': shellHandler.executeShellScript,
};

export function registerHandlers() {
  Object.entries(handlers).forEach(([channel, handler]) => {
    ipcMain.handle(channel, async (event, ...args) => {
      return handler(...args);
	});
  });
}
```

上記でハンドラを登録し、そのハンドラの呼び出しをcontextBridegeでレンダラープロセスから呼べるようにする。

main/preload.ts
```tsx
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  executeShellScript: (scriptPath: string, args?: string[]) => ipcRenderer.invoke('execute-shell-script', scriptPath, args),
});
```

### レンダラープロセス側で呼び出し

まずは安全に呼べるように型の設定。

renderer/preload.ts
```tsx
import { IpcHandler } from '../main/preload' 

declare global {
  interface Window {
    electronAPI: {
      executeShellScript: (scriptPath: string, args?: string[]) => Promise<string>,
    };
  }
}
```


最後に、それをUIコンポーネントから呼び出しする。
```tsx
const scriptPath = 'scripts/example.sh';
const result = await window.electronAPI.executeShellScript(scriptPath, ['-la']);
```

上記で、ようやくレンダリングプロセスからメインプロセスの機能の呼び出しができるようになる。

## メインプロセスとレンダラープロセスの両方で使う型の設定

共通で使う型は、mainディレクトリやrendererディレクトリとは別にsharedディレクトリを用意し、そこにinterfaceやunionを定義する。

next.config.jsでトランスパイルにsharedを追加
```js
module.exports = {
  // sharedを追加
  transpilePackages: ['shared'],
}
```

shared/interface/post.d.ts
```tsx
import { StatusType } from '../types/status';

export interface PostData {
  status?: StatusType;
}
```

shared/type/status.ts
```tsx
export const StatusType = {
  PENDING: 'pending',
  POSTED: 'posted',
  FAILED: 'failed',
} as const;

export type StatusType = typeof StatusType[keyof typeof StatusType];

export const AllStatusType = Object.values(StatusType);
```

上記をmainやrendererでimportして使う。


## 最後に

CrossMediaUploaderForMeの開発日記はここまで。

当初挙げていた下記の3つの機能については、
- 複数のSNSに同時投稿
- 投稿画面にD&D＋メタデータ入力
- 投稿予約

6/19頃に大体は作り込みが終わって、6/20から試験的に運用しています。

今後のToDoは下記を考えていますが、優先度は低めに設定しています。
- ウォーターマーク追加
- 予約投稿リストの定期的なリロード表示
- パッケージング対応

ウォーターマーク追加は、メインプロセス側がNode.jsで動いているのでsharpを入れたらできそう。Angel SandboxでもSampleの透かしを入れるのにsharpを使ったのでそれを参考にすれば実装もそんなに大変ではない。ただ、ウォーターマークのデザインを考えるのが面倒でしばらく後回しになりそう。
