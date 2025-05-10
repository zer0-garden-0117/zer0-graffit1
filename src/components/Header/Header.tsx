import React from 'react';
import { Group } from '@mantine/core';
import { Logo } from './Logo/Logo';
import { DarkMode } from './DarkMode/DarkMode';
import { GithubLink } from './GithubLink/GithubLink';

export const Header: React.FC = () => {
  return (
    <>
      <Group justify="space-between" w="100%" gap="8" mt={10} mr={10} ml={10}>
        <Logo />
        <Group gap="8">
          <DarkMode />
          <GithubLink />
        </Group>
      </Group>
    </>
  );
};