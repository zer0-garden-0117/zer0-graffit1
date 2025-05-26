'use client';

import { CodeHighlightAdapterProvider, createShikiAdapter } from '@mantine/code-highlight';
import { ReactNode } from 'react';

// Shiki requires async code to load the highlighter
async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json', 'python', 'java'],
    themes: ['github-dark'],
  });
  await shiki.loadTheme('github-dark'); 
  return shiki;
}

const shikiAdapter = createShikiAdapter(loadShiki);

interface CustomMantineProviderProps {
  children: ReactNode;
}

export const CustomCodeHighlightAdapterProvider: React.FC<CustomMantineProviderProps> = ({ children }) => {
  return (
    <CodeHighlightAdapterProvider adapter={shikiAdapter}>
      {children}
    </CodeHighlightAdapterProvider>
  );
}