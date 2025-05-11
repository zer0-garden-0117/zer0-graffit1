import '@mantine/core/styles.css';
import { type ReactNode } from "react";
import { MantineProvider } from '@mantine/core';
import { Inter, Noto_Sans_JP } from 'next/font/google';

const inter = Inter({
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
        fontFamily: `${inter.style.fontFamily}, ${notoSansJP.style.fontFamily}, sans-serif`,
        headings: { fontFamily: `${inter.style.fontFamily}, ${notoSansJP.style.fontFamily}, sans-serif` },
      }}
    >
      {children}
    </MantineProvider>
  );
};