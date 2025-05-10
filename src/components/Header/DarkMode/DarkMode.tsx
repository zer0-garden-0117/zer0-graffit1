import React from 'react';
import { Box, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { MdDarkMode } from 'react-icons/md';

export const DarkMode: React.FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const onIconClick = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box mt={2}>
      <ActionIcon
        onClick={onIconClick}
        variant="outline"
        color={"var(--mantine-color-dimmed)"} 
        radius='md'
        styles={{
          root: {
            borderColor: "var(--mantine-color-dimmed)",
          }
        }}
      >
        <MdDarkMode color="gray"/>
      </ActionIcon>
    </Box>
  );
};