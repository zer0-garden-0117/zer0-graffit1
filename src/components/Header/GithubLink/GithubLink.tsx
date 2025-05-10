import React from 'react';
import { Box, ActionIcon } from '@mantine/core';
import { BsGithub } from "react-icons/bs";

export const GithubLink: React.FC = () => {
  
  const onIconClick = async () => {
    window.location.href = 'https://github.com/zer0-garden-0117/angel-sandbox'
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
      <BsGithub
        size="1.1rem"
        height="32"
        style={{ 
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
      />
      </ActionIcon>
    </Box>
  );
};