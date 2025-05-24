// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@gfazioli/mantine-text-animate/styles.css';

import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { AppShellLayout } from '@/components/AppShellLayout/AppShellLayout';
import { CustomMantineProvider } from '@/providers/mantine/mantineProvider';

export const metadata = {
  title: 'zer0 graffit1',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <CustomMantineProvider>
          <AppShellLayout>
            {children}
          </AppShellLayout>
        </CustomMantineProvider>
      </body>
    </html>
  );
}