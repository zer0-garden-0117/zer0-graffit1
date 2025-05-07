'use client';

import { AppShell } from "@mantine/core";

export const AppShellLayout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <AppShell
      header={{ height: 120 }}
      footer={{ height: 20 }}
      padding="md"
      transitionDuration={0}
      transitionTimingFunction="ease"
      styles={(theme) => ({
        root: {
          '--app-shell-border-color': 'transparent',
        },
        main: {
          maxWidth: '1200px', // コンテンツエリアの最大幅を設定
          margin: '0 auto', // 両脇に自動で隙間を入れる
          paddingLeft: theme.breakpoints.lg ? '20px' : '10px', // lg以上のときにパディングを調整
          paddingRight: theme.breakpoints.lg ? '20px' : '10px',
        },
        header: {
          maxWidth: '1200px', // ヘッダーの最大幅を設定
          margin: '0 auto',   // 両脇に自動で隙間を入れる
          paddingLeft: theme.breakpoints.lg ? '20px' : '10px', // lg以上のときにパディングを調整
          paddingRight: theme.breakpoints.lg ? '20px' : '10px',
        },
      })}
    >
      <AppShell.Header>
      </AppShell.Header>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};