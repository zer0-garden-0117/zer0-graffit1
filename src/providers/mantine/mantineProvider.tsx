import '@mantine/core/styles.css';
import { type ReactNode } from "react";
import { MantineProvider } from '@mantine/core';
import { Caveat, Noto_Sans_JP } from 'next/font/google';

// Montserrat と Noto Sans JP をインポート
const caveat = Caveat({
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
        fontFamily: `${caveat.style.fontFamily}, ${notoSansJP.style.fontFamily}, sans-serif`,
        headings: { fontFamily: `${caveat.style.fontFamily}, ${notoSansJP.style.fontFamily}, sans-serif` },
      }}
    >
      {children}
    </MantineProvider>
  );
};