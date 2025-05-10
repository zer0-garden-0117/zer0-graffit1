import '@mantine/core/styles.css';
import { type ReactNode } from "react";
import { MantineProvider } from '@mantine/core';
import { Montserrat, Noto_Sans_JP } from 'next/font/google';

// Montserrat と Noto Sans JP をインポート
const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

interface CustomMantineProviderProps {
  children: ReactNode;
}

export const CustomMantineProvider: React.FC<CustomMantineProviderProps> = ({ children }) => {
  return (
    <MantineProvider
      theme={{
        fontFamily: `${montserrat.style.fontFamily}, ${notoSansJP.style.fontFamily}, sans-serif`,
        headings: { fontFamily: `${montserrat.style.fontFamily}, ${notoSansJP.style.fontFamily}, sans-serif` },
      }}
    >
      {children}
    </MantineProvider>
  );
};